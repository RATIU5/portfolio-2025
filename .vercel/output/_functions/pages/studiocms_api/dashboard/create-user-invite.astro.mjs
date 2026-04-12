import { U as User } from '../../../chunks/core_DE9YiRdf.mjs';
import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { M as Mailer } from '../../../chunks/index_BGOImdQ1.mjs';
import { N as Notifications } from '../../../chunks/index_3ryTCcQ9.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { t as templateEngine } from '../../../chunks/index_BYVMfRrk.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect, pipe } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
import { h as coerce } from '../../../chunks/astro/server_D64VbtqW.mjs';
import { a as appendSearchParamsToUrl } from '../../../chunks/effect_DkdxkRrn.mjs';
export { renderers } from '../../../renderers.mjs';

const generateResetUrl = ({
  locals: {
    StudioCMS: {
      routeMap: {
        mainLinks: { dashboardIndex }
      }
    }
  }
}, baseUrl, { id, userId, token }) => {
  const resetURL = new URL(`${dashboardIndex}/password-reset`, baseUrl);
  return pipe(
    resetURL,
    appendSearchParamsToUrl("userid", userId),
    appendSearchParamsToUrl("token", token),
    appendSearchParamsToUrl("id", id)
  );
};
const noMailerError = (message, resetLink) => `Failed to send email: ${message}. You can provide the following Reset link to your User: ${resetLink}`;
const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/create-user-invite.POST")(function* () {
      const [userHelper, mailer, notify, sdk] = yield* Effect.all([
        User,
        Mailer,
        Notifications,
        SDKCore
      ]);
      const siteConfig = ctx.locals.StudioCMS.siteConfig.data;
      if (!siteConfig) {
        return apiResponseLogger(500, "Failed to get site config");
      }
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isAdmin;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const { username, email, displayname, rank, originalUrl } = yield* readAPIContextJson(ctx);
      if (!username) {
        return apiResponseLogger(400, "Missing field: Username is required");
      }
      if (!email) {
        return apiResponseLogger(400, "Missing field: Email is required");
      }
      if (!displayname) {
        return apiResponseLogger(400, "Missing field: Display name is required");
      }
      if (!rank) {
        return apiResponseLogger(400, "Missing field: Rank is required");
      }
      const userPerms = ctx.locals.StudioCMS.security?.userPermissionLevel;
      if (rank === "owner" && !userPerms?.isOwner) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const checkEmail = coerce.string().email({ message: "Email address is invalid" }).safeParse(email);
      if (!checkEmail.success) {
        return apiResponseLogger(400, `Invalid email: ${checkEmail.error.message}`);
      }
      const [verifyUsernameResponse, { usernameSearch, emailSearch }] = yield* Effect.all([
        userHelper.verifyUsernameInput(username),
        sdk.AUTH.user.searchUsersForUsernameOrEmail(username, checkEmail.data)
      ]);
      if (verifyUsernameResponse !== true) {
        return apiResponseLogger(400, verifyUsernameResponse);
      }
      if (usernameSearch.length > 0) {
        return apiResponseLogger(400, "Invalid username: Username is already in use");
      }
      if (emailSearch.length > 0) {
        return apiResponseLogger(400, "Invalid email: Email is already in use");
      }
      const token = yield* sdk.AUTH.user.create(
        {
          username,
          email: checkEmail.data,
          name: displayname,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          id: crypto.randomUUID(),
          avatar: void 0,
          emailVerified: false,
          notifications: void 0,
          password: void 0,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          url: void 0
        },
        rank
      ).pipe(Effect.flatMap((newUser) => sdk.resetTokenBucket.new(newUser.id)));
      if (!token) {
        return apiResponseLogger(500, "Failed to create reset token");
      }
      const resetLink = generateResetUrl(ctx, originalUrl, token);
      yield* notify.sendAdminNotification("new_user", username);
      if (siteConfig.enableMailer) {
        const checkMailConnection = yield* mailer.verifyMailConnection;
        if (!checkMailConnection) {
          return apiResponseLogger(
            500,
            noMailerError("Failed to connect to mail server", resetLink)
          );
        }
        if ("error" in checkMailConnection) {
          return apiResponseLogger(
            500,
            noMailerError("Failed to connect to mail server", resetLink)
          );
        }
        const engine = yield* templateEngine;
        const { title: siteTitle, description, siteIcon } = siteConfig;
        const userInviteTemplate = yield* engine.render("userInvite", {
          site: { title: siteTitle, description, icon: siteIcon ?? void 0 },
          data: { link: resetLink.toString() }
        });
        const mailResponse = yield* mailer.sendMail({
          to: checkEmail.data,
          subject: `You have been invited to join ${siteConfig.title}!`,
          html: userInviteTemplate
        });
        if (!mailResponse) {
          return apiResponseLogger(500, noMailerError("Failed to send email", resetLink));
        }
        if ("error" in mailResponse) {
          return apiResponseLogger(500, noMailerError(mailResponse.error, resetLink));
        }
        return apiResponseLogger(200, "User invite created and email sent");
      }
      return apiResponseLogger(200, resetLink.toString());
    }).pipe(Mailer.Provide, Notifications.Provide),
    OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["POST"] })),
    ALL: () => Effect.try(() => AllResponse())
  },
  {
    cors: { methods: ["POST", "OPTIONS"] },
    onError: (error) => {
      console.error("API Error:", error);
      return createJsonResponse(
        { error: "Internal Server Error" },
        {
          status: 500
        }
      );
    }
  }
);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL,
	OPTIONS,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
