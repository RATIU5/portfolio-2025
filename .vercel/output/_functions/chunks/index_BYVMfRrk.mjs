import { a as SDKCore } from './index_DmoCs122.mjs';
import { Data, Effect } from 'effect';

class TemplateParser {
  static VARIABLE_REGEX = /\{\{([^}]+)\}\}/g;
  /**
   * Parse a template string to find all variables
   * @param template The template string to parse
   * @returns Array of found template variables
   */
  static parse(template) {
    const variables = [];
    let match;
    TemplateParser.VARIABLE_REGEX.lastIndex = 0;
    while ((match = TemplateParser.VARIABLE_REGEX.exec(template)) !== null) {
      const fullMatch = match[0];
      const variableName = match[1].trim();
      variables.push({
        match: fullMatch,
        name: variableName,
        start: match.index,
        end: match.index + fullMatch.length
      });
    }
    return variables;
  }
  /**
   * Check if a template contains any variables
   * @param template The template string to check
   * @returns True if template contains variables
   */
  static hasVariables(template) {
    TemplateParser.VARIABLE_REGEX.lastIndex = 0;
    return TemplateParser.VARIABLE_REGEX.test(template);
  }
}

class TemplateRenderer {
  options;
  constructor(options = {}) {
    this.options = {
      strict: options.strict ?? false,
      defaultValue: options.defaultValue ?? ""
    };
  }
  /**
   * Render a template with the provided data
   * @param template The template string to render
   * @param data The data context for variable replacement
   * @returns The rendered template string
   */
  render(template, data) {
    const variables = TemplateParser.parse(template);
    if (variables.length === 0) {
      return template;
    }
    variables.sort((a, b) => b.start - a.start);
    let result = template;
    for (const variable of variables) {
      const value = this.resolveValue(variable.name, data);
      result = result.substring(0, variable.start) + value + result.substring(variable.end);
    }
    return result;
  }
  /**
   * Resolve a variable value from the data context
   * @param variableName The name of the variable to resolve
   * @param data The data context
   * @returns The resolved value as a string
   */
  resolveValue(variableName, data) {
    const value = this.getNestedValue(data, variableName);
    if (value === void 0 || value === null) {
      if (this.options.strict) {
        throw new Error(`Template variable '${variableName}' not found in data context`);
      }
      return this.options.defaultValue;
    }
    return String(value);
  }
  /**
   * Get a nested value from an object using dot notation
   * @param obj The object to search in
   * @param path The dot-separated path (e.g., "user.name")
   * @returns The found value or undefined
   */
  // biome-ignore lint/suspicious/noExplicitAny: this is intentional
  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== void 0 ? current[key] : void 0;
    }, obj);
  }
  /**
   * Update renderer options
   * @param options New options to merge
   */
  setOptions(options) {
    this.options = { ...this.options, ...options };
  }
}

class TemplateEngine {
  renderer;
  constructor(options = {}) {
    this.renderer = new TemplateRenderer(options);
  }
  /**
   * Render a template string with data
   * @param template The template string containing {{variable}} placeholders
   * @param data The data context for variable replacement
   * @returns The rendered template string
   */
  render(template, data) {
    return this.renderer.render(template, data);
  }
  /**
   * Check if a template string contains any variables
   * @param template The template string to check
   * @returns True if the template contains variables
   */
  hasVariables(template) {
    return TemplateParser.hasVariables(template);
  }
  /**
   * Get all variable names from a template
   * @param template The template string to analyze
   * @returns Array of variable names found in the template
   */
  getVariables(template) {
    const variables = TemplateParser.parse(template);
    return [...new Set(variables.map((v) => v.name))];
  }
  /**
   * Update engine options
   * @param options New options to merge with current options
   */
  setOptions(options) {
    this.renderer.setOptions(options);
  }
  /**
   * Create a template function that can be reused with different data
   * @param template The template string
   * @returns A function that takes data and returns rendered template
   */
  compile(template) {
    return (data) => this.render(template, data);
  }
}

const defaultTemplates = {
  /**
   * A simple HTML template for general notifications.
   *
   * Variables:
   * - `data.title`: The title of the notification.
   * - `data.message`: The message content of the notification.
   */
  notifications: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <h3
                style="font-weight:bold;text-align:left;margin:0;font-size:20px;padding:32px 24px 0px 24px"
              >
                {{data.title}}
              </h3>
              <div
                style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:8px 24px 16px 24px"
              >
                {{data.message}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`,
  /**
   * A simple HTML template for password reset emails.
   *
   * Variables:
   * - `data.link`: The password reset link.
   */
  passwordReset: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <h3
                style="font-weight:bold;text-align:left;margin:0;font-size:20px;padding:32px 24px 0px 24px"
              >
                Reset Your Password
              </h3>
              <div
                style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:8px 24px 16px 24px"
              >
                Click the button below, or copy-paste the link to reset your password!
                <br />
                <br />
                If you didn't request a password reset, you can ignore this email and
                your password will not be changed.
              </div>
              <div style="text-align:left;padding:12px 24px 32px 24px">
                <a
                  href="{{data.link}}"
                  style="color:#FFFFFF;font-size:14px;font-weight:bold;background-color:#0068FF;display:inline-block;padding:12px 20px;text-decoration:none"
                  target="_blank"
                  ><span>Reset Password</span></a
                >
              </div>
              <div
                style="font-size:12px;font-weight:normal;padding:16px 24px 16px 24px"
              >
                Link: {{data.link}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`,
  /**
   * A simple HTML template for user invite emails.
   *
   * Variables:
   * - `site.title`: The title of the inviting organization or application.
   * - `data.link`: The link for the user to set their password and get started.
   */
  userInvite: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <h3
                style="font-weight:bold;text-align:left;margin:0;font-size:20px;padding:32px 24px 0px 24px"
              >
                New User Invite from {{site.title}}
              </h3>
              <div
                style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:8px 24px 16px 24px"
              >
                You have been invited to join {{site.title}}! Click the button below to set your password and get started.
              </div>
              <div style="text-align:left;padding:12px 24px 32px 24px">
                <a
                  href="{{data.link}}"
                  style="color:#FFFFFF;font-size:14px;font-weight:bold;background-color:#0068FF;display:inline-block;padding:12px 20px;text-decoration:none"
                  target="_blank"
                  ><span>Set Password</span
                  ></a
                >
              </div>
              <div
                style="font-size:12px;font-weight:normal;padding:16px 24px 16px 24px"
              >
                Link: {{data.link}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`,
  /**
   * A simple HTML template for email verification.
   *
   * Variables:
   * - `data.link`: The email verification link.
   */
  verifyEmail: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <h3
                style="font-weight:bold;text-align:left;margin:0;font-size:20px;padding:32px 24px 0px 24px"
              >
                Verify your Email
              </h3>
              <div
                style="color:#474849;font-size:14px;font-weight:normal;text-align:left;padding:8px 24px 16px 24px"
              >
                Click the button below, or copy-paste the link to verify your
                email!
              </div>
              <div style="text-align:left;padding:12px 24px 32px 24px">
                <a
                  href="{{data.link}}"
                  style="color:#FFFFFF;font-size:14px;font-weight:bold;background-color:#0068FF;display:inline-block;padding:12px 20px;text-decoration:none"
                  target="_blank"
                  ><span>Verify Email</span></a
                >
              </div>
              <div
                style="font-size:12px;font-weight:normal;padding:16px 24px 16px 24px"
              >
                Link: {{data.link}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`
};
var default_templates_default = defaultTemplates;

const engine = new TemplateEngine({ strict: true });
class TemplateEngineError extends Data.TaggedError("TemplateEngineError") {
}
const templateEngine = Effect.gen(function* () {
  const sdk = yield* SDKCore;
  let config = yield* sdk.CONFIG.templateConfig.get();
  if (!config) {
    config = yield* sdk.CONFIG.templateConfig.init(default_templates_default);
  }
  if (!config) {
    return yield* new TemplateEngineError({
      message: "Failed to initialize template configuration."
    });
  }
  const { _config_version, ...templates } = config.data;
  const templateKeys = Object.keys(templates);
  return {
    /**
     * Retrieves the specified email template.
     *
     * @param key - The key of the template to retrieve.
     * @returns The specified email template.
     */
    getTemplate: (key) => templates[key],
    /**
     * Retrieves the default email template.
     *
     * @param key - The key of the default template to retrieve.
     * @returns The default email template.
     */
    getDefaultTemplate: (key) => default_templates_default[key],
    availableTemplates: templateKeys,
    allTemplates: templates,
    defaultTemplates: default_templates_default,
    /**
     * Updates the email templates with new templates.
     *
     * @param newTemplates - An object containing the new templates to update.
     */
    updateTemplates: (newTemplates) => sdk.CONFIG.templateConfig.update(newTemplates),
    /**
     * Renders the specified email template with the provided context data.
     *
     * @param key - The key of the template to render.
     * @param context - The context data to use for rendering the template.
     * @returns The rendered email content.
     */
    render: (key, context) => {
      const template = templates[key] || default_templates_default[key];
      return Effect.try({
        try: () => engine.render(template, context),
        catch: (cause) => new TemplateEngineError({
          message: `Failed to render template "${key}": ${cause.message}`,
          cause
        })
      });
    }
  };
});

export { TemplateEngine as T, templateEngine as t };
