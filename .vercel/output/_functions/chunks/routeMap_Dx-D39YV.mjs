import { a as dashboardConfig } from './consts_CvAQFK6n.mjs';

function makeAPIRoute(path) {
  return function api(route) {
    return `/studiocms_api/${path}/${route}`;
  };
}

function pathWithBase(path) {
  let newPath = path;
  newPath = stripLeadingSlash(newPath);
  return newPath ? `/${newPath}` : "/";
}
function stripLeadingSlash(href) {
  let newHref = href;
  if (newHref[0] === "/") newHref = newHref.slice(1);
  return newHref;
}
function stripTrailingSlash(href) {
  let newHref = href;
  if (newHref[newHref.length - 1] === "/") newHref = newHref.slice(0, -1);
  return newHref;
}
function stripLeadingAndTrailingSlashes(href) {
  let newHref = href;
  newHref = stripLeadingSlash(newHref);
  newHref = stripTrailingSlash(newHref);
  return newHref;
}

function createURLGenFactory(defaultDashboardRoute) {
  return function urlGenFactory(isDashboardRoute, path, DashboardRouteOverride) {
    let url;
    let dashboardRoute = stripLeadingAndTrailingSlashes(defaultDashboardRoute);
    if (DashboardRouteOverride) {
      dashboardRoute = stripLeadingAndTrailingSlashes(DashboardRouteOverride);
    }
    if (path) {
      const cleanPath = stripLeadingAndTrailingSlashes(path);
      if (isDashboardRoute) {
        url = pathWithBase(`${dashboardRoute}/${cleanPath}`);
      } else {
        url = pathWithBase(cleanPath);
      }
    } else {
      if (isDashboardRoute) {
        url = pathWithBase(dashboardRoute);
      } else {
        url = pathWithBase("");
      }
    }
    return url;
  };
}

const urlGenFactory = createURLGenFactory("dashboard");
var urlGen_default = urlGenFactory;

const { dashboardRouteOverride } = dashboardConfig;
function makeNonDashboardRoute(route) {
  return urlGen_default(false, route);
}
function makeDashboardRoute(route) {
  return urlGen_default(true, route, dashboardRouteOverride);
}
const authAPIRoute = makeAPIRoute("auth");
const dashboardAPIRoute = makeAPIRoute("dashboard");
const partialsAPIRoute = makeAPIRoute("partials");
const sdkRoute = makeAPIRoute("sdk");
const StudioCMSRoutes = {
  mainLinks: {
    /**
     * Base URL for the non-dashboard site.
     */
    baseSiteURL: makeNonDashboardRoute(),
    /**
     * URL for the dashboard index.
     */
    dashboardIndex: makeDashboardRoute(),
    /**
     * URL for the user profile page.
     */
    userProfile: makeDashboardRoute("profile"),
    /**
     * URL for the content management page.
     */
    contentManagement: makeDashboardRoute("content-management"),
    /**
     * URL for creating content in the content management page.
     */
    contentManagementCreate: makeDashboardRoute("content-management/create"),
    /**
     * URL for editing content in the content management page.
     */
    contentManagementEdit: makeDashboardRoute("content-management/edit"),
    /**
     * URL for creating a folder in the content management page.
     */
    contentManagementFolderCreate: makeDashboardRoute("content-management/create-folder"),
    /**
     * URL for editing a folder in the content management page.
     */
    contentManagementFolderEdit: makeDashboardRoute("content-management/edit-folder"),
    /**
     * URL for viewing content differences in the content management page.
     */
    contentManagementDiff: makeDashboardRoute("content-management/diff"),
    /**
     * URL for the taxonomy page.
     */
    taxonomy: makeDashboardRoute("taxonomy"),
    /**
     * URL for the taxonomy categories page.
     */
    taxonomyCategories: makeDashboardRoute("taxonomy/categories"),
    /**
     * URL for the taxonomy tags page.
     */
    taxonomyTags: makeDashboardRoute("taxonomy/tags"),
    /**
     * URL for creating a new page.
     */
    createPage: makeDashboardRoute("create-page"),
    /**
     * URL for the site configuration page.
     */
    siteConfiguration: makeDashboardRoute("configuration"),
    /**
     * URL for the smtp configuration page.
     */
    smtpConfiguration: makeDashboardRoute("smtp-configuration"),
    /**
     * URL for the user management page.
     */
    userManagement: makeDashboardRoute("user-management"),
    /**
     * URL for editing user management details.
     */
    userManagementEdit: makeDashboardRoute("user-management/edit"),
    /**
     * URL for the plugins page.
     */
    plugins: makeDashboardRoute("plugins/"),
    /**
     * URL for unverified email page.
     */
    unverifiedEmail: makeDashboardRoute("unverified-email"),
    /**
     * URL for the password reset page.
     */
    passwordReset: makeDashboardRoute("password-reset"),
    /**
     * URL for the system management page.
     */
    systemManagement: makeDashboardRoute("system-management")
  },
  authLinks: {
    /**
     * URL for the login page.
     */
    loginURL: makeDashboardRoute("login"),
    /**
     * URL for the logout page.
     */
    logoutURL: makeDashboardRoute("logout"),
    /**
     * URL for the signup page.
     */
    signupURL: makeDashboardRoute("signup"),
    /**
     * API route for logging in.
     */
    loginAPI: authAPIRoute("login"),
    /**
     * API route for logging out.
     */
    logoutAPI: authAPIRoute("logout"),
    /**
     * API route for registering a new user.
     */
    registerAPI: authAPIRoute("register"),
    /**
     * API route for OAuth authentication.
     *
     * @param provider - The name of the OAuth provider (e.g., 'github', 'google').
     * @returns The complete API route for the specified OAuth provider.
     */
    oAuthIndex: (provider) => authAPIRoute(`${provider}/`),
    /**
     * API route for OAuth callback.
     */
    oAuthCallback: (provider) => authAPIRoute(`${provider}/callback`),
    forgotPasswordAPI: authAPIRoute("forgot-password")
  },
  endpointLinks: {
    /**
     * API route for searching lists.
     */
    searchList: dashboardAPIRoute("search-list"),
    partials: {
      /**
       * API route for live preview box rendering.
       */
      livePreviewBox: partialsAPIRoute("render"),
      /**
       * API route for fetching user list items.
       */
      userListItems: partialsAPIRoute("user-list-items"),
      /**
       * API route for rendering content.
       */
      render: partialsAPIRoute("render"),
      /**
       * API route for the editor.
       */
      editor: partialsAPIRoute("editor")
    },
    /**
     * API route for fetching configuration.
     */
    config: dashboardAPIRoute("config"),
    /**
     * API route for fetching users.
     */
    users: dashboardAPIRoute("users"),
    /**
     * API route for fetching user profile.
     */
    profile: dashboardAPIRoute("profile"),
    /**
     * API route for creating a password reset link.
     */
    createResetLink: dashboardAPIRoute("create-reset-link"),
    /**
     * API route for resetting password.
     */
    resetPassword: dashboardAPIRoute("reset-password"),
    content: {
      /**
       * API route for fetching page content.
       */
      page: dashboardAPIRoute("content/page"),
      /**
       * API route for fetching folder content.
       */
      folder: dashboardAPIRoute("content/folder"),
      diff: dashboardAPIRoute("content/diff")
    },
    /**
     * API route for taxonomy management.
     */
    taxonomy: dashboardAPIRoute("taxonomy"),
    taxonomySearch: dashboardAPIRoute("taxonomy-search"),
    /**
     * API route for fetching plugins.
     */
    plugins: dashboardAPIRoute("plugins/"),
    newUsers: {
      /**
       * API route for creating a new user.
       */
      create: dashboardAPIRoute("create-user"),
      /**
       * API route for inviting a new user.
       */
      invite: dashboardAPIRoute("create-user-invite")
    },
    /**
     * API route for fetching API tokens.
     */
    apiTokens: dashboardAPIRoute("api-tokens"),
    /**
     * API route for verifying a user session.
     */
    verifySession: dashboardAPIRoute("verify-session"),
    /**
     * API routes for the mailer configuration.
     */
    mailer: {
      /**
       * API route for updating the mailer configuration
       */
      config: dashboardAPIRoute("mailer/config"),
      /**
       * API route for testing the mailer configuration.
       */
      testEmail: dashboardAPIRoute("mailer/test-email")
    },
    verifyEmail: dashboardAPIRoute("verify-email"),
    emailNotificationSettingsSite: dashboardAPIRoute("email-notification-settings-site"),
    resendVerificationEmail: dashboardAPIRoute("resend-verify-email"),
    updateUserNotifications: dashboardAPIRoute("update-user-notifications"),
    templates: dashboardAPIRoute("templates")
  },
  sdk: {
    /**
     * SDK route for listing pages.
     */
    pages: sdkRoute("list-pages"),
    /**
     * SDK route for updating the latest version cache.
     */
    updateLatestVersionCache: sdkRoute("update-latest-version-cache"),
    /**
     * SDK route for the full changelog JSON.
     */
    changelog: sdkRoute("full-changelog.json")
  },
  fts: {
    /**
     * API route for step 1 of the FTS process.
     */
    step1: dashboardAPIRoute("step-1"),
    /**
     * API route for step 2 of the FTS process.
     */
    step2: dashboardAPIRoute("step-2")
  }
};

export { StudioCMSRoutes as S, makeDashboardRoute as m, stripLeadingAndTrailingSlashes as s };
