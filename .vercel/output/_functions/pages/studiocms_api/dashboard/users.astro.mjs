import { U as User } from '../../../chunks/core_DE9YiRdf.mjs';
import { a as apiResponseLogger } from '../../../chunks/_studiocms_logger_DedMAODS.mjs';
import { N as Notifications } from '../../../chunks/index_3ryTCcQ9.mjs';
import { a as SDKCore } from '../../../chunks/index_DmoCs122.mjs';
import { V as ValidRanks, U as UserPermissionLevel } from '../../../chunks/consts_CvAQFK6n.mjs';
import { b as createEffectAPIRoutes, a as createJsonResponse, A as AllResponse, O as OptionsResponse } from '../../../chunks/response-helpers_CuTopjH7.mjs';
import { Effect } from 'effect';
import { g as genLogger } from '../../../chunks/logger_bcCLNlRx.mjs';
import { r as readAPIContextJson } from '../../../chunks/context-utils_B5oaSSnO.mjs';
export { renderers } from '../../../renderers.mjs';

const { POST, DELETE, OPTIONS, ALL } = createEffectAPIRoutes(
  {
    POST: (ctx) => genLogger("studiocms/routes/api/dashboard/users.POST")(function* () {
      const [userHelper, notifications, sdk] = yield* Effect.all([User, Notifications, SDKCore]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isAdmin;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const { id, rank, emailVerified } = yield* readAPIContextJson(ctx);
      if (!id || !rank) {
        return apiResponseLogger(400, "Invalid request");
      }
      if (!ValidRanks.has(rank) || rank === "unknown") {
        return apiResponseLogger(400, "Invalid rank supplied");
      }
      const insertData = {
        user: id,
        rank
      };
      const user = yield* sdk.GET.users.byId(id);
      if (!user) {
        return apiResponseLogger(404, "User not found");
      }
      const userPermissionLevel = yield* userHelper.getUserPermissionLevel(userData);
      const toLevel = (r) => {
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
      const targetCurrentLevel = toLevel(
        user.permissionsData?.rank
      );
      const targetNewLevel = toLevel(rank);
      const weight = (lvl) => {
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
      const isAllowedToUpdateRank = weight(userPermissionLevel) > weight(targetCurrentLevel) && weight(userPermissionLevel) >= weight(targetNewLevel) && (rank !== "owner" || userPermissionLevel === UserPermissionLevel.owner);
      if (!isAllowedToUpdateRank) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const updatedData = yield* sdk.UPDATE.permissions(insertData);
      if (!updatedData) {
        return apiResponseLogger(400, "Failed to update user rank");
      }
      const existingUser = yield* sdk.GET.users.byId(id);
      if (!existingUser) {
        return apiResponseLogger(404, "User not found");
      }
      if (typeof emailVerified === "boolean") {
        yield* sdk.AUTH.user.update({
          userId: id,
          userData: {
            id,
            name: existingUser.name,
            username: existingUser.username,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
            createdAt: void 0,
            emailVerified
          }
        });
      }
      yield* Effect.all([
        notifications.sendUserNotification("account_updated", id),
        notifications.sendAdminNotification("user_updated", user.username)
      ]);
      return apiResponseLogger(200, "User rank updated successfully");
    }).pipe(Notifications.Provide),
    DELETE: (ctx) => genLogger("studiocms/routes/api/dashboard/users.DELETE")(function* () {
      const [notifications, sdk] = yield* Effect.all([Notifications, SDKCore]);
      const userData = ctx.locals.StudioCMS.security?.userSessionData;
      if (!userData?.isLoggedIn) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const isAuthorized = ctx.locals.StudioCMS.security?.userPermissionLevel.isAdmin;
      if (!isAuthorized) {
        return apiResponseLogger(403, "Unauthorized");
      }
      const { userId, username, usernameConfirm } = yield* readAPIContextJson(ctx);
      if (!userId || !username || !usernameConfirm) {
        return apiResponseLogger(400, "Invalid request");
      }
      if (username !== usernameConfirm) {
        return apiResponseLogger(400, "Username does not match");
      }
      const targetUser = yield* sdk.GET.users.byId(userId);
      if (!targetUser) {
        return apiResponseLogger(404, "User not found");
      }
      if (targetUser.username !== username) {
        return apiResponseLogger(400, "Username confirmation does not match target user");
      }
      if (userData.user?.id && userData.user.id === userId) {
        return apiResponseLogger(403, "You cannot delete your own account");
      }
      const actorPerm = ctx.locals.StudioCMS.security?.userPermissionLevel;
      if (targetUser.permissionsData?.rank === "owner" && !actorPerm?.isOwner) {
        return apiResponseLogger(403, "Insufficient privileges to delete an owner account");
      }
      if (targetUser.permissionsData?.rank === "owner") {
        const allUsers = yield* sdk.GET.users.all();
        const ownerCount = allUsers.filter((u) => u.permissionsData?.rank === "owner").length;
        if (ownerCount <= 1) {
          return apiResponseLogger(403, "Cannot delete the last owner account");
        }
      }
      const response = yield* sdk.DELETE.user(userId);
      if (!response) {
        return apiResponseLogger(400, "Failed to delete user");
      }
      if (response.status === "error") {
        return apiResponseLogger(400, response.message);
      }
      yield* notifications.sendAdminNotification("user_deleted", username);
      return apiResponseLogger(200, response.message);
    }).pipe(Notifications.Provide),
    OPTIONS: () => Effect.try(() => OptionsResponse({ allowedMethods: ["POST", "DELETE"] })),
    ALL: () => Effect.try(() => AllResponse())
  },
  {
    cors: { methods: ["POST", "DELETE", "OPTIONS"] },
    onError: (error) => {
      console.error("API Error:", error);
      return createJsonResponse({ error: "Internal Server Error" }, { status: 500 });
    }
  }
);

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ALL,
	DELETE,
	OPTIONS,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
