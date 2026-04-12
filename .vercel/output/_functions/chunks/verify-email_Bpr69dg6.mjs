import 'node:path';
import { S as StudioCMSRoutes } from './routeMap_Dx-D39YV.mjs';
import { M as Mailer } from './index_BGOImdQ1.mjs';
import { S as SDKCoreJs } from './index_DmoCs122.mjs';
import { t as templateEngine } from './index_BYVMfRrk.mjs';
import { C as CMSNotificationSettingsId } from './consts_CvAQFK6n.mjs';
import { Effect, Data } from 'effect';
import { g as genLogger, p as pipeLogger } from './logger_bcCLNlRx.mjs';

const site = "https://portfolio-2025-five-pearl.vercel.app";

class VerifyEmailError extends Data.TaggedError("VerifyEmailError") {
}
class VerifyEmail extends Effect.Service()(
  "studiocms/virtuals/auth/verify-email/VerifyEmail",
  {
    effect: genLogger("studiocms/virtuals/auth/verify-email/VerifyEmail.effect")(function* () {
      const MailService = yield* Mailer;
      const getMailerStatus = () => pipeLogger("studiocms/virtuals/auth/verify-email/VerifyEmail.getMailerStatus")(
        MailService.isEnabled
      );
      const getSettings = () => genLogger("studiocms/virtuals/auth/verify-email/VerifyEmail.getSettings")(function* () {
        const { data: settings } = yield* SDKCoreJs.notificationSettings.site.get();
        if (!settings) {
          return {
            id: CMSNotificationSettingsId,
            emailVerification: false,
            requireAdminVerification: false,
            requireEditorVerification: false,
            oAuthBypassVerification: false
          };
        }
        return settings;
      });
      const isEmailVerificationEnabled = () => genLogger("studiocms/virtuals/auth/verify-email/VerifyEmail.isEmailVerificationEnabled")(
        function* () {
          const mailer = yield* getMailerStatus();
          const settings = yield* getSettings();
          if (!mailer) return false;
          return settings.emailVerification;
        }
      );
      const getEmailVerificationRequest = (id) => pipeLogger("studiocms/virtuals/auth/verify-email/VerifyEmail.getEmailVerificationRequest")(
        SDKCoreJs.AUTH.verifyEmail.get(id)
      );
      const deleteEmailVerificationRequest = (id) => pipeLogger(
        "studiocms/virtuals/auth/verify-email/VerifyEmail.deleteEmailVerificationRequest"
      )(SDKCoreJs.AUTH.verifyEmail.delete(id));
      const createEmailVerificationRequest = (userId) => genLogger(
        "studiocms/virtuals/auth/verify-email/VerifyEmail.createEmailVerificationRequest"
      )(function* () {
        yield* deleteEmailVerificationRequest(userId);
        return yield* SDKCoreJs.AUTH.verifyEmail.create(userId);
      });
      const generateUrl = (base, path, params) => pipeLogger("studiocms/virtuals/auth/verify-email/VerifyEmail.generateUrl")(
        Effect.try({
          try: () => {
            const url = new URL(path, base);
            for (const [key, value] of Object.entries(params || {})) {
              url.searchParams.append(key, value);
            }
            return url;
          },
          catch: (cause) => new VerifyEmailError({ message: `URL generation error: ${cause}` })
        })
      );
      const sendVerificationEmail = (userId, isOAuth = false) => genLogger("studiocms/virtuals/auth/verify-email/VerifyEmail.sendVerificationEmail")(
        function* () {
          const mailer = yield* getMailerStatus();
          const settings = yield* getSettings();
          const user = yield* SDKCoreJs.GET.users.byId(userId);
          const siteConfig = yield* SDKCoreJs.GET.siteConfig();
          if (!siteConfig) {
            return yield* new VerifyEmailError({ message: "Site configuration not found" });
          }
          const { data: config } = siteConfig;
          if (!mailer || isOAuth && settings.oAuthBypassVerification) {
            return;
          }
          if (!user) {
            return yield* new VerifyEmailError({ message: "User not found" });
          }
          const verificationToken = yield* createEmailVerificationRequest(userId);
          if (!verificationToken) {
            return yield* new VerifyEmailError({
              message: "Failed to create verification token"
            });
          }
          const email = user.email;
          if (!email) {
            return yield* new VerifyEmailError({ message: "User does not have an email" });
          }
          const verifyLink = yield* generateUrl(
            site,
            StudioCMSRoutes.endpointLinks.verifyEmail,
            { token: verificationToken.id, userId }
          );
          const engine = yield* templateEngine;
          const { title: siteTitle, description, siteIcon } = config;
          const verifyEmailTemplate = yield* engine.render("verifyEmail", {
            site: { title: siteTitle, description, icon: siteIcon ?? void 0 },
            data: { link: verifyLink.toString() }
          });
          const mailResponse = yield* MailService.sendMail({
            to: email,
            subject: `Email Verification | ${config?.title || "StudioCMS"}`,
            html: verifyEmailTemplate
          });
          return mailResponse;
        }
      );
      const isEmailVerified = (user) => genLogger("studiocms/virtuals/auth/verify-email/VerifyEmail.isEmailVerified")(function* () {
        if (!user) return false;
        const mailer = yield* getMailerStatus();
        const settings = yield* getSettings();
        const {
          emailVerification,
          oAuthBypassVerification,
          requireAdminVerification,
          requireEditorVerification
        } = settings;
        if (!mailer || !emailVerification) {
          return true;
        }
        let userToCheck = "id" in user ? user : void 0;
        if ("user" in user) {
          const tUser = user.user;
          if (!tUser) {
            return false;
          }
          const possibleUser = yield* SDKCoreJs.GET.users.byId(tUser.id);
          if (!possibleUser) {
            return false;
          }
          userToCheck = possibleUser;
        }
        if ("id" in user) {
          userToCheck = user;
        }
        if (!userToCheck) {
          return false;
        }
        if (oAuthBypassVerification && userToCheck.oAuthData && userToCheck.oAuthData.length > 0) {
          return true;
        }
        switch (userToCheck.permissionsData?.rank) {
          case "owner":
            return true;
          case "admin": {
            if (requireAdminVerification) {
              return userToCheck.emailVerified;
            }
            return true;
          }
          case "editor": {
            if (requireEditorVerification) {
              return userToCheck.emailVerified;
            }
            return true;
          }
          default:
            return userToCheck.emailVerified;
        }
      });
      return {
        isEmailVerificationEnabled,
        getEmailVerificationRequest,
        deleteEmailVerificationRequest,
        createEmailVerificationRequest,
        sendVerificationEmail,
        isEmailVerified
      };
    }),
    dependencies: [Mailer.Default]
  }
) {
  static Provide = Effect.provide(this.Default);
}

export { VerifyEmail as V };
