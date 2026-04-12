import { l as logger } from './_studiocms_logger_DedMAODS.mjs';
import { M as Mailer } from './index_BGOImdQ1.mjs';
import { S as SDKCoreJs } from './index_DmoCs122.mjs';
import { t as templateEngine } from './index_BYVMfRrk.mjs';
import { Effect } from 'effect';
import { g as genLogger } from './logger_bcCLNlRx.mjs';

const userNotifications = {
  account_updated: (name) => `Hello ${name}! There has been an update to your account. If you did not make this change, please contact a system administrator.`
};
const editorNotifications = {
  page_updated: (title) => `The page "${title}" has been updated.`,
  page_deleted: (title) => `The page "${title}" has been deleted.`,
  new_page: (title) => `A new page "${title}" has been created.`,
  folder_updated: (name) => `The folder "${name}" has been updated.`,
  folder_deleted: (name) => `The folder "${name}" has been deleted.`,
  new_folder: (name) => `A new folder "${name}" has been created.`,
  new_tag: (tagName) => `A new tag "${tagName}" has been created.`,
  update_tag: (tagName) => `The tag "${tagName}" has been updated.`,
  delete_tag: (tagName) => `The tag "${tagName}" has been deleted.`,
  new_category: (categoryName) => `A new category "${categoryName}" has been created.`,
  update_category: (categoryName) => `The category "${categoryName}" has been updated.`,
  delete_category: (categoryName) => `The category "${categoryName}" has been deleted.`
};
const adminNotifications = {
  user_updated: (username) => `The user "${username}" has been updated.`,
  user_deleted: (username) => `The user "${username}" has been deleted.`,
  new_user: (username) => `A new user "${username}" has been created.`
};
const notificationTitleStrings = {
  account_updated: "Account Updated",
  page_updated: "Page Updated",
  page_deleted: "Page Deleted",
  new_page: "New Page",
  folder_updated: "Folder Updated",
  folder_deleted: "Folder Deleted",
  new_folder: "New Folder",
  user_updated: "User Updated",
  user_deleted: "User Deleted",
  new_user: "New User",
  new_tag: "Tag Created",
  update_tag: "Tag Updated",
  delete_tag: "Tag Deleted",
  new_category: "Category Created",
  update_category: "Category Updated",
  delete_category: "Category Deleted"
};
const notificationTypes = {
  user: Object.keys(userNotifications),
  editor: Object.keys(editorNotifications),
  admin: Object.keys(adminNotifications)
};
const userRanks = ["visitor", "editor", "admin", "owner"];
const editorRanks = ["editor", "admin", "owner"];
const adminRanks = ["admin", "owner"];
const forked = logger.fork("studiocms:runtime/notifier");
const makeLogger = Effect.succeed(forked);
class Notifications extends Effect.Service()(
  "studiocms/lib/notifier/Notifications",
  {
    effect: genLogger("studiocms/lib/notifier/Notifications.effect")(function* () {
      const MailService = yield* Mailer;
      const logger = yield* makeLogger;
      const getConfig = genLogger("studiocms/lib/notifier/Notifications.getConfig")(function* () {
        const data = yield* SDKCoreJs.GET.siteConfig();
        if (!data) {
          return {
            title: "StudioCMS",
            enableMailer: false
          };
        }
        return data.data;
      });
      const getUsersWithNotifications = (notification, userRanks2) => genLogger("studiocms/lib/notifier/Notifications.getUsersWithNotifications")(function* () {
        const userTable = yield* SDKCoreJs.GET.users.all();
        const users = userTable.filter(
          (user) => user.permissionsData?.rank && userRanks2.includes(user.permissionsData?.rank)
        );
        const usersWithEnabledNotifications = [];
        for (const user of users) {
          if (user.notifications) {
            const enabledNotifications = user.notifications.split(",");
            if (enabledNotifications.includes(notification)) {
              usersWithEnabledNotifications.push(user);
            }
          }
        }
        return usersWithEnabledNotifications;
      });
      const sendMail = ({
        users,
        config: { title },
        message,
        notification
      }) => genLogger("studiocms/lib/notifier/Notifications.sendMail")(function* () {
        const engine = yield* templateEngine;
        const siteConfigFull = yield* SDKCoreJs.GET.siteConfig();
        const { title: siteTitle, description, siteIcon } = siteConfigFull.data;
        const notificationTemplate = yield* engine.render("notifications", {
          site: { title: siteTitle, description, icon: siteIcon ?? void 0 },
          data: {
            title: `New Notification - ${notificationTitleStrings[notification]}`,
            message
          }
        });
        for (const { email } of users) {
          if (!email) continue;
          yield* MailService.sendMail({
            to: email,
            subject: `${title} - New Notification`,
            html: notificationTemplate
          });
        }
      });
      const sendUserNotification = (notification, userId) => genLogger("studiocms/lib/notifier/Notifications.sendUserNotification")(function* () {
        const config = yield* getConfig;
        if (!config.enableMailer) return;
        const testConnection = yield* MailService.verifyMailConnection;
        if ("error" in testConnection) {
          logger.error(`Error verifying mail connection: ${testConnection.error}`);
          return;
        }
        const users = yield* getUsersWithNotifications(notification, userRanks);
        const user = users.find(({ id }) => id === userId);
        if (!user) return;
        yield* sendMail({
          users: [user],
          config,
          message: userNotifications[notification](user.name),
          notification
        });
        return;
      });
      const sendEditorNotification = (notification, data) => genLogger("studiocms/lib/notifier/Notifications.sendEditorNotification")(function* () {
        const config = yield* getConfig;
        if (!config.enableMailer) return;
        const testConnection = yield* MailService.verifyMailConnection;
        if ("error" in testConnection) {
          logger.error(`Error verifying mail connection: ${testConnection.error}`);
          return;
        }
        const editors = yield* getUsersWithNotifications(notification, editorRanks);
        yield* sendMail({
          users: editors,
          config,
          message: editorNotifications[notification](data),
          notification
        });
        return;
      });
      const sendAdminNotification = (notification, data) => genLogger("studiocms/lib/notifier/Notifications.sendAdminNotification")(function* () {
        const config = yield* getConfig;
        if (!config.enableMailer) return;
        const testConnection = yield* MailService.verifyMailConnection;
        if ("error" in testConnection) {
          logger.error(`Error verifying mail connection: ${testConnection.error}`);
          return;
        }
        const admins = yield* getUsersWithNotifications(notification, adminRanks);
        yield* sendMail({
          users: admins,
          config,
          message: adminNotifications[notification](data),
          notification
        });
        return;
      });
      return {
        sendUserNotification,
        sendEditorNotification,
        sendAdminNotification
      };
    }),
    dependencies: [Mailer.Default]
  }
) {
  static Provide = Effect.provide(this.Default);
}

export { Notifications as N, notificationTypes as n };
