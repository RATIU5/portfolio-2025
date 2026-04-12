import { P as Password, U as User } from '../../../chunks/core_DE9YiRdf.mjs';
import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { N as Notifications } from '../../../chunks/index_3ryTCcQ9.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { V as ValidRanks, U as UserPermissionLevel } from '../../../chunks/consts_CvAQFK6n.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
import { h as coerce } from '../../../chunks/astro/server_D64VbtqW.mjs';
export { renderers } from '../../../renderers.mjs';

const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/create-user.POST")(function* () {
      const [pass, userHelper, notify, sdk] = yield* Effect.all([
        Password,
        User,
        Notifications,
        SDKCore
      ]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isAdmin;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      let { username, password, email, displayname, rank } = yield* readAPIContextJson(ctx);
      if (!username) {
        return apiResponseLogger(400, "Missing field: Username is required");
      }
      if (!password) {
        password = yield* sdk.UTIL.Generators.generateRandomPassword(12);
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
      if (!ValidRanks.has(rank) || rank === "unknown") {
        return apiResponseLogger(400, "Invalid rank");
      }
      const callerPerm = yield* userHelper.getUserPermissionLevel(userData);
      const rankToPerm = (r) => {
        switch (r) {
          case "owner":
            return UserPermissionLevel.owner;
          case "admin":
            return UserPermissionLevel.admin;
          case "editor":
            return UserPermissionLevel.editor;
          case "visitor":
            return UserPermissionLevel.visitor;
          default:
            return UserPermissionLevel.unknown;
        }
      };
      const targetPerm = rankToPerm(rank);
      const permWeight = (lvl) => {
        switch (lvl) {
          case UserPermissionLevel.owner:
            return 4;
          case UserPermissionLevel.admin:
            return 3;
          case UserPermissionLevel.editor:
            return 2;
          case UserPermissionLevel.visitor:
            return 1;
          default:
            return 0;
        }
      };
      if (rank === "owner" && callerPerm !== UserPermissionLevel.owner) {
        return createJsonResponse({ error: "Forbidden" }, { status: 403 });
      }
      if (permWeight(callerPerm) < permWeight(targetPerm)) {
        return createJsonResponse({ error: "Forbidden" }, { status: 403 });
      }
      const checkEmail = coerce.string().email({ message: "Email address is invalid" }).safeParse(email);
      if (!checkEmail.success) {
        return apiResponseLogger(400, `Invalid email: ${checkEmail.error.message}`);
      }
      const [verifyUsernameResponse, verifyPasswordResponse, { usernameSearch, emailSearch }] = yield* Effect.all([
        userHelper.verifyUsernameInput(username),
        pass.verifyPasswordStrength(password),
        sdk.AUTH.user.searchUsersForUsernameOrEmail(username, checkEmail.data)
      ]);
      if (verifyUsernameResponse !== true) {
        return apiResponseLogger(400, verifyUsernameResponse);
      }
      if (verifyPasswordResponse !== true) {
        return apiResponseLogger(400, verifyPasswordResponse);
      }
      if (usernameSearch.length > 0) {
        return apiResponseLogger(400, "Invalid username: Username is already in use");
      }
      if (emailSearch.length > 0) {
        return apiResponseLogger(400, "Invalid email: Email is already in use");
      }
      yield* userHelper.createLocalUser(displayname, username, email, password).pipe(
        Effect.flatMap(
          (newUser) => sdk.UPDATE.permissions({
            user: newUser.id,
            rank
          })
        ),
        Effect.tap(() => notify.sendAdminNotification("new_user", username))
      );
      return apiResponseLogger(
        200,
        JSON.stringify({ username, email, displayname, rank, password })
      );
    }).pipe(Notifications.Provide),
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
