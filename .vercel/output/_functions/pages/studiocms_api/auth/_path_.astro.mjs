import { a as SDKCore, s as site } from '../../../chunks/index_DmoCs122.mjs';
import { U as User, P as Password, S as Session } from '../../../chunks/core_DE9YiRdf.mjs';
import { V as VerifyEmail } from '../../../chunks/verify-email_Bpr69dg6.mjs';
import 'node:path';
import { S as StudioCMSRoutes } from '../../../chunks/routeMap_Dx-D39YV.mjs';
import { a as apiResponseLogger, l as logger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { M as Mailer } from '../../../chunks/index_BGOImdQ1.mjs';
import { N as Notifications } from '../../../chunks/index_3ryTCcQ9.mjs';
import { t as templateEngine } from '../../../chunks/index_BYVMfRrk.mjs';
import { A as AuthSessionCookieName } from '../../../chunks/consts_CvAQFK6n.mjs';
import { c as createSimplePathRouter } from '../../../chunks/rest-router_nRSMzoTu.mjs';
import { g as AstroUserError, h as coerce } from '../../../chunks/astro/server_D64VbtqW.mjs';
import { a as parseFormDataEntryToString, b as readAPIContextFormData, r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
import { Effect, Schema, Layer, pipe } from 'effect';
import { g as genLogger, p as pipeLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { a as createJsonResponse, b as createEffectAPIRoutes, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { a as appendSearchParamsToUrl } from '../../../chunks/effect_DkdxkRrn.mjs';
export { renderers } from '../../../renderers.mjs';

class FormDataEntryFields extends Schema.Class("FormDataEntryFields")({
  title: Schema.String,
  description: Schema.String
}) {
}
class AuthAPIUtils extends Effect.Service()(
  "studiocms/routes/api/auth/shared/AuthAPIUtils",
  {
    effect: genLogger("studiocms/routes/api/auth/shared/AuthAPIUtils.effect")(function* () {
      return {
        parseFormDataEntryToString,
        // biome-ignore lint/suspicious/noExplicitAny: This is a generic utility function
        readJson: (context) => readAPIContextJson(context),
        readFormData: (context) => readAPIContextFormData(context),
        badFormDataEntry: (title, description) => genLogger("studiocms/routes/api/auth/shared/AuthAPIUtils.badFormDataEntry")(function* () {
          const error = yield* Schema.decode(FormDataEntryFields)({ title, description });
          return createJsonResponse(
            { error },
            {
              status: 400,
              statusText: "Bad Request"
            }
          );
        }),
        validateEmail: (email) => Effect.try({
          try: () => {
            const emailSchema = coerce.string().email({ message: "Email address is invalid" });
            return emailSchema.safeParse(email);
          },
          catch: () => new AstroUserError("Failed to parse email with zod.")
        })
      };
    })
  }
) {
  static {
    this.Provide = Effect.provide(this.Default);
  }
}

const loginRegisterDependencies = Layer.mergeAll(AuthAPIUtils.Default, VerifyEmail.Default);
const forgotPasswordDependencies = Layer.mergeAll(
  Mailer.Default,
  Notifications.Default,
  AuthAPIUtils.Default
);
function generateResetLink(token) {
  return pipe(
    new URL(StudioCMSRoutes.mainLinks.passwordReset, site),
    appendSearchParamsToUrl("userid", token.userId),
    appendSearchParamsToUrl("token", token.token),
    appendSearchParamsToUrl("id", token.id)
  );
}
const onError = (error) => {
  const errorDetails = error instanceof Error ? error.message : String(error);
  logger.error(`API Error: ${errorDetails}`);
  return createJsonResponse(
    { error: "Internal Server Error" },
    {
      status: 500
    }
  );
};
const sharedHandlers = {
  OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["POST"] })),
  ALL: () => Effect.try(() => AllResponse())
};
const cors = {
  methods: ["POST", "OPTIONS"]
};
const router = {
  "forgot-password": createEffectAPIRoutes(
    {
      POST: (ctx) => genLogger("studiocms/routes/api/auth/forgot-password/POST")(function* () {
        const [sdk, { sendMail }, { sendAdminNotification }, { readJson, validateEmail }] = yield* Effect.all([SDKCore, Mailer, Notifications, AuthAPIUtils]);
        const config = ctx.locals.StudioCMS.siteConfig.data;
        if (!config.enableMailer) {
          return apiResponseLogger(500, "Mailer is not enabled");
        }
        const jsonData = yield* readJson(ctx);
        const { email } = jsonData;
        if (!email) {
          return apiResponseLogger(400, "Invalid form data, email is required");
        }
        const checkEmail = yield* validateEmail(email);
        if (!checkEmail.success) {
          return apiResponseLogger(400, checkEmail.error.message);
        }
        const { emailSearch } = yield* sdk.AUTH.user.searchUsersForUsernameOrEmail(
          "",
          checkEmail.data
        );
        if (emailSearch.length === 0) {
          return apiResponseLogger(
            200,
            "If an account exists for this email, a reset link has been sent."
          );
        }
        const user = emailSearch[0];
        const token = yield* sdk.resetTokenBucket.new(user.id);
        if (!token) {
          return apiResponseLogger(500, "Failed to create reset link");
        }
        yield* sendAdminNotification("user_updated", user.username);
        const resetLink = generateResetLink(token);
        if (!user.email) {
          return apiResponseLogger(500, "Failed to send email to user, no email address found");
        }
        const engine = yield* templateEngine;
        const { title: siteTitle, description, siteIcon } = config;
        const passwordResetTemplate = yield* engine.render("passwordReset", {
          site: { title: siteTitle, description, icon: siteIcon ?? void 0 },
          data: { link: resetLink.toString() }
        });
        const mailRes = yield* sendMail({
          to: user.email,
          subject: "Password Reset",
          html: passwordResetTemplate
        });
        if (!mailRes) {
          return apiResponseLogger(500, "Failed to send email to user");
        }
        if ("error" in mailRes) {
          return apiResponseLogger(500, `Failed to send email to user: ${mailRes.error}`);
        }
        return apiResponseLogger(
          200,
          "If an account exists for this email, a reset link has been sent."
        );
      }).pipe(Effect.provide(forgotPasswordDependencies)),
      ...sharedHandlers
    },
    {
      cors,
      onError
    }
  ),
  login: createEffectAPIRoutes(
    {
      POST: (ctx) => genLogger("studiocms/routes/api/auth/login/POST")(function* () {
        const [
          sdk,
          { badFormDataEntry, parseFormDataEntryToString, readFormData },
          { verifyPasswordHash },
          { createUserSession },
          { isEmailVerified }
        ] = yield* Effect.all([SDKCore, AuthAPIUtils, Password, Session, VerifyEmail]);
        const formData = yield* readFormData(ctx);
        const [username, password] = yield* pipeLogger(
          "studiocms/routes/api/auth/login/POST.parseFormData"
        )(
          Effect.all([
            parseFormDataEntryToString(formData, "username"),
            parseFormDataEntryToString(formData, "password")
          ])
        );
        if (!username)
          return yield* badFormDataEntry("Invalid credentials", "Invalid credentials");
        if (!password)
          return yield* badFormDataEntry("Invalid credentials", "Invalid credentials");
        const existingUser = yield* sdk.GET.users.byUsername(username);
        if (!existingUser)
          return yield* badFormDataEntry("Invalid credentials", "Invalid credentials");
        if (!existingUser.password)
          return yield* badFormDataEntry("Invalid credentials", "Invalid credentials");
        const validPassword = yield* verifyPasswordHash(existingUser.password, password);
        if (!validPassword)
          return yield* badFormDataEntry("Invalid credentials", "Invalid credentials");
        const isEmailAccountVerified = yield* isEmailVerified(existingUser);
        if (!isEmailAccountVerified)
          return yield* badFormDataEntry(
            "Email not verified",
            "Please verify your email before logging in"
          );
        yield* createUserSession(existingUser.id, ctx);
        return new Response();
      }).pipe(Effect.provide(loginRegisterDependencies)),
      ...sharedHandlers
    },
    {
      cors,
      onError
    }
  ),
  logout: createEffectAPIRoutes(
    {
      POST: (ctx) => genLogger("studiocms/routes/api/auth/logout/POST")(function* () {
        const { validateSessionToken, deleteSessionTokenCookie, invalidateSession } = yield* Session;
        const { cookies, redirect } = ctx;
        const sessionToken = cookies.get(AuthSessionCookieName)?.value ?? null;
        if (!sessionToken) return redirect(StudioCMSRoutes.authLinks.loginURL);
        const { session, user } = yield* validateSessionToken(sessionToken);
        if (session === null) {
          yield* deleteSessionTokenCookie(ctx);
          return redirect(StudioCMSRoutes.authLinks.loginURL);
        }
        if (!user || user === null) {
          yield* deleteSessionTokenCookie(ctx);
          return redirect(StudioCMSRoutes.authLinks.loginURL);
        }
        yield* Effect.all([invalidateSession(session.id), deleteSessionTokenCookie(ctx)]);
        return redirect(StudioCMSRoutes.mainLinks.baseSiteURL);
      }),
      ...sharedHandlers
    },
    {
      cors,
      onError
    }
  ),
  register: createEffectAPIRoutes(
    {
      POST: (ctx) => genLogger("studiocms/routes/api/auth/register/POST")(function* () {
        const [
          sdk,
          { badFormDataEntry, parseFormDataEntryToString, readFormData, validateEmail },
          { verifyUsernameInput, createLocalUser },
          { sendVerificationEmail },
          { verifyPasswordStrength },
          { createUserSession }
        ] = yield* Effect.all([SDKCore, AuthAPIUtils, User, VerifyEmail, Password, Session]);
        const formData = yield* readFormData(ctx);
        const [username, password, email, name] = yield* pipeLogger(
          "studiocms/routes/api/auth/register/POST.parseFormData"
        )(
          Effect.all([
            parseFormDataEntryToString(formData, "username"),
            parseFormDataEntryToString(formData, "password"),
            parseFormDataEntryToString(formData, "email"),
            parseFormDataEntryToString(formData, "displayname")
          ])
        );
        if (!username) return yield* badFormDataEntry("MISSING_USERNAME", "Username is required");
        if (!password) return yield* badFormDataEntry("MISSING_PASSWORD", "Password is required");
        if (!email) return yield* badFormDataEntry("MISSING_EMAIL", "Email is required");
        if (!name)
          return yield* badFormDataEntry("MISSING_DISPLAY_NAME", "Display name is required");
        const verifyUsernameResponse = yield* verifyUsernameInput(username);
        if (verifyUsernameResponse !== true)
          return yield* badFormDataEntry("Invalid username", verifyUsernameResponse);
        const verifyPasswordResponse = yield* verifyPasswordStrength(password);
        if (verifyPasswordResponse !== true) {
          return yield* badFormDataEntry("Invalid password", verifyPasswordResponse);
        }
        const checkEmail = yield* validateEmail(email);
        if (!checkEmail.success)
          return yield* badFormDataEntry("Invalid email", checkEmail.error.message);
        const { usernameSearch, emailSearch } = yield* sdk.AUTH.user.searchUsersForUsernameOrEmail(username, checkEmail.data);
        if (usernameSearch.length > 0)
          return yield* badFormDataEntry("Invalid username", "Username is already in use");
        if (emailSearch.length > 0)
          return yield* badFormDataEntry("Invalid email", "Email is already in use");
        const newUser = yield* createLocalUser(name, username, email, password);
        yield* sendVerificationEmail(newUser.id);
        yield* createUserSession(newUser.id, ctx);
        return new Response();
      }).pipe(Effect.provide(loginRegisterDependencies)),
      ...sharedHandlers
    },
    {
      cors,
      onError
    }
  )
};
const ALL = createSimplePathRouter("studiocms:auth", router);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
