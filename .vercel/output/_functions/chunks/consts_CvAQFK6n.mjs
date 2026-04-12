const config = {"logLevel":"Info","db":{"dialect":"libsql"},"locale":{"dateLocale":"en-us","dateTimeFormat":{"year":"numeric","month":"short","day":"numeric"},"i18n":{"defaultLocale":"en"}},"features":{"dashboardConfig":{"versionCheck":true}}};
const dashboardConfig = config.features.dashboardConfig;
const db = config.db;

const availablePermissionRanks = ["owner", "admin", "editor", "visitor", "unknown"];
var UserPermissionLevel = /* @__PURE__ */ ((UserPermissionLevel2) => {
  UserPermissionLevel2[UserPermissionLevel2["visitor"] = 1] = "visitor";
  UserPermissionLevel2[UserPermissionLevel2["editor"] = 2] = "editor";
  UserPermissionLevel2[UserPermissionLevel2["admin"] = 3] = "admin";
  UserPermissionLevel2[UserPermissionLevel2["owner"] = 4] = "owner";
  UserPermissionLevel2[UserPermissionLevel2["unknown"] = 0] = "unknown";
  return UserPermissionLevel2;
})(UserPermissionLevel || {});

const CMSNotificationSettingsId = "1";
const studioCMSSocials = {
  github: "https://github.com/withstudiocms/studiocms",
  githubLicense: "https://github.com/withstudiocms/studiocms/blob/main/packages/studiocms/LICENSE",
  discord: "https://chat.studiocms.dev",
  changelog: "https://github.com/withstudiocms/studiocms/blob/main/packages/studiocms/CHANGELOG.md",
  releases: "https://github.com/withstudiocms/studiocms/releases",
  npm: "https://npm.im/studiocms"
};
const GhostUserDefaults = {
  id: "_StudioCMS_Ghost_User_",
  name: "Ghost (deleted user)",
  username: "studiocms_ghost_user",
  avatar: "https://cdn.studiocms.dev/default_avatar.png"
};
const NotificationSettingsDefaults = {
  emailVerification: false,
  oAuthBypassVerification: false,
  requireEditorVerification: false,
  requireAdminVerification: false
};
const STUDIOCMS_EDITOR_CSRF_COOKIE_NAME = "studiocms-editor-csrf-token";
const STUDIOCMS_THEME_COLOR = "#a581f3";
const STUDIOCMS_CDN_URL = "https://cdn.studiocms.dev";
const FAVICON_ASSETS = {
  svg: `${STUDIOCMS_CDN_URL}/favicon.svg`,
  png: {
    light: `${STUDIOCMS_CDN_URL}/favicon-light.png`,
    dark: `${STUDIOCMS_CDN_URL}/favicon-dark.png`
  }
};
const AuthSessionCookieName = "auth_session";
const ValidRanks = new Set(availablePermissionRanks);

export { AuthSessionCookieName as A, CMSNotificationSettingsId as C, FAVICON_ASSETS as F, GhostUserDefaults as G, NotificationSettingsDefaults as N, STUDIOCMS_THEME_COLOR as S, UserPermissionLevel as U, ValidRanks as V, dashboardConfig as a, STUDIOCMS_EDITOR_CSRF_COOKIE_NAME as b, config as c, db as d, studioCMSSocials as s };
