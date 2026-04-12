import { P as Password } from '../../../chunks/core_DE9YiRdf.mjs';
import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { N as Notifications } from '../../../chunks/index_3ryTCcQ9.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../renderers.mjs';

const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/reset-password.POST")(function* () {
      const [notify, sdk, pass] = yield* Effect.all([Notifications, SDKCore, Password]);
      const { token, id, userid, password, confirm_password } = yield* readAPIContextJson(ctx);
      if (!token) {
        return apiResponseLogger(400, "Invalid form data, token is required");
      }
      if (!id) {
        return apiResponseLogger(400, "Invalid form data, id is required");
      }
      if (!userid) {
        return apiResponseLogger(400, "Invalid form data, userid is required");
      }
      if (!password) {
        return apiResponseLogger(400, "Invalid form data, password is required");
      }
      if (!confirm_password) {
        return apiResponseLogger(400, "Invalid form data, confirm_password is required");
      }
      if (password !== confirm_password) {
        return apiResponseLogger(400, "Passwords do not match");
      }
      const verifyPasswordResponse = yield* pass.verifyPasswordStrength(password);
      if (verifyPasswordResponse !== true) {
        return apiResponseLogger(400, verifyPasswordResponse);
      }
      const hashedPassword = yield* pass.hashPassword(password);
      const isTokenValid = yield* sdk.resetTokenBucket.check(token);
      if (!isTokenValid) {
        return apiResponseLogger(403, "Invalid or expired reset token");
      }
      const tokenInfo = yield* sdk.UTIL.Generators.testToken(token);
      if (!tokenInfo || !tokenInfo.userId) {
        return apiResponseLogger(403, "Invalid or expired reset token");
      }
      const targetUserId = tokenInfo.userId;
      const userUpdate = { password: hashedPassword };
      const userData = yield* sdk.GET.users.byId(targetUserId);
      if (!userData) {
        return apiResponseLogger(404, "User not found");
      }
      yield* sdk.AUTH.user.update({
        userId: targetUserId,
        userData: {
          id: targetUserId,
          name: userData.name,
          username: userData.username,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          emailVerified: userData.emailVerified,
          createdAt: void 0,
          ...userUpdate
        }
      });
      yield* Effect.all([
        sdk.resetTokenBucket.delete(targetUserId),
        notify.sendUserNotification("account_updated", targetUserId),
        notify.sendAdminNotification("user_updated", userData.username)
      ]);
      return apiResponseLogger(200, "User password updated successfully");
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
