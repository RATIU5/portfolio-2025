import { P as Password, U as User } from '../../../chunks/core_DE9YiRdf.mjs';
import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { N as Notifications } from '../../../chunks/index_3ryTCcQ9.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
import { h as coerce } from '../../../chunks/astro/server_D64VbtqW.mjs';
export { renderers } from '../../../renderers.mjs';

const { POST, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/profile.POST")(function* () {
      const [pass, userHelper, notify, sdk] = yield* Effect.all([
        Password,
        User,
        Notifications,
        SDKCore
      ]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(401, "Unauthorized");
      }
      if (!ctx.locals.StudioCMS.security?.userPermissionLevel.isVisitor) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const userProfileUpdate = yield* readAPIContextJson(ctx);
      switch (userProfileUpdate.mode) {
        case "basic": {
          const { data: r } = userProfileUpdate;
          const data = r;
          if (!data.name) {
            return apiResponseLogger(400, "Invalid form data, name is required");
          }
          if (!data.email) {
            return apiResponseLogger(400, "Invalid form data, email is required");
          }
          if (!data.username) {
            return apiResponseLogger(400, "Invalid form data, username is required");
          }
          const verifyUsernameResponse = yield* userHelper.verifyUsernameInput(data.username);
          if (verifyUsernameResponse !== true) {
            return apiResponseLogger(400, verifyUsernameResponse);
          }
          const checkEmail = coerce.string().email({ message: "Email address is invalid" }).safeParse(data.email);
          if (!checkEmail.success)
            return apiResponseLogger(400, `Invalid email: ${checkEmail.error.message}`);
          const { usernameSearch, emailSearch } = yield* sdk.AUTH.user.searchUsersForUsernameOrEmail(data.username, checkEmail.data);
          if (userData.user?.username !== data.username) {
            if (usernameSearch.length > 0)
              return apiResponseLogger(400, "Invalid username: Username is already in use");
          }
          if (userData.user?.email !== data.email) {
            if (emailSearch.length > 0)
              return apiResponseLogger(400, "Invalid email: Email is already in use");
          }
          yield* sdk.AUTH.user.update({
            userId: userData.user.id,
            userData: { ...data, id: userData.user.id }
          });
          return apiResponseLogger(200, "User profile updated successfully");
        }
        case "password": {
          const { data: r } = userProfileUpdate;
          const data = r;
          const { currentPassword, newPassword, confirmNewPassword } = data;
          if (!currentPassword) {
            if (userData.user?.password) {
              return apiResponseLogger(400, "Invalid form data, current password is required");
            }
          }
          if (!newPassword) {
            return apiResponseLogger(400, "Invalid form data, new password is required");
          }
          if (currentPassword && userData.user?.password) {
            const isValid = yield* pass.verifyPasswordHash(
              userData.user.password,
              currentPassword
            );
            if (!isValid) {
              return apiResponseLogger(400, "Invalid current password");
            }
          }
          if (!confirmNewPassword) {
            return apiResponseLogger(400, "Invalid form data, confirm new password is required");
          }
          if (newPassword !== confirmNewPassword) {
            return apiResponseLogger(
              400,
              "Invalid form data, new password and confirm new password do not match"
            );
          }
          const verifyPasswordResponse = yield* pass.verifyPasswordStrength(newPassword);
          if (verifyPasswordResponse !== true) {
            return apiResponseLogger(400, verifyPasswordResponse);
          }
          const userUpdate = {
            password: yield* pass.hashPassword(newPassword)
          };
          if (userData.user)
            yield* Effect.all([
              sdk.AUTH.user.update({
                userId: userData.user.id,
                userData: {
                  id: userData.user.id,
                  name: userData.user.name,
                  username: userData.user.username,
                  updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
                  emailVerified: userData.user.emailVerified,
                  createdAt: void 0,
                  ...userUpdate
                }
              }),
              notify.sendUserNotification("account_updated", userData.user.id),
              notify.sendAdminNotification("user_updated", userData.user.username)
            ]);
          return apiResponseLogger(200, "User password updated successfully");
        }
        case "avatar": {
          if (!userData.user?.email) {
            return apiResponseLogger(400, "User email required");
          }
          if (userData.user)
            yield* userHelper.createUserAvatar(userData.user.email).pipe(
              Effect.flatMap(
                (newAvatar) => Effect.all([
                  sdk.AUTH.user.update({
                    userId: userData.user.id,
                    userData: {
                      id: userData.user.id,
                      name: userData.user.name,
                      username: userData.user.username,
                      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
                      emailVerified: userData.user.emailVerified,
                      createdAt: void 0,
                      avatar: newAvatar
                    }
                  }),
                  notify.sendUserNotification("account_updated", userData.user.id),
                  notify.sendAdminNotification("user_updated", userData.user.username)
                ])
              )
            );
          return apiResponseLogger(200, "User Avatar updated successfully");
        }
        default:
          return apiResponseLogger(400, "Invalid form data, mode is required or unsupported");
      }
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
