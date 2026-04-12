import { a as createComponent, e as renderComponent, d as renderTemplate, r as renderScript, c as createAstro, m as maybeRenderHead, s as spreadAttributes, f as renderSlot, b as addAttribute, F as Fragment, u as unescapeHTML } from './astro/server_D64VbtqW.mjs';
/* empty css                              */
import { $ as $$Icon, a as $$Button, d as defaultLang, c as $$LanguageSelector, b as $$Dropdown } from './LanguageSelector_D2Mp70Tp.mjs';
import { s as studioCMSSocials, a as dashboardConfig } from './consts_CvAQFK6n.mjs';
import { u as useTranslations, $ as $$Divider } from './Divider_D5DMoGSW.mjs';
import { p as pluginsList } from './_studiocms_plugins_BDmfe-c6.mjs';
import { $ as $$SSRUser } from './SSRUser_mXPz4_Au.mjs';
import { c as currentVersion } from './_studiocms_version_DVGMptkz.mjs';
import 'node:path';
import { S as StudioCMSRoutes, m as makeDashboardRoute } from './routeMap_Dx-D39YV.mjs';
import { l as logger } from './_studiocms_logger_DedMAODS.mjs';
import { c as convertToSafeString } from './safeString_DaScySBP.mjs';
import { U as User } from './core_DE9YiRdf.mjs';
import { V as VerifyEmail } from './verify-email_Bpr69dg6.mjs';
import { Effect } from 'effect';
import { $ as $$Modal, a as $$Center } from './Modal_B-agW0rH.mjs';
import { g as generateID, $ as $$Input } from './Input_mJ0hT4yn.mjs';
/* empty css                         */
/* empty css                                 */
import { p as parseMarkdown } from './tinyMDParser_CSO28P3U.mjs';
import { a as $$BaseLayout } from './BaseLayout_Dwmia_ez.mjs';

const componentKeys = [];

const Components = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    componentKeys
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$h = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Ambients = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Ambients;
  return renderTemplate`${componentKeys.length > 0 && componentKeys.map((key) => {
    const Component = Components[key];
    return renderTemplate`${renderComponent($$result, "Component", Component, {})}`;
  })}${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/Ambients.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/Ambients.astro", void 0);

const $$Astro$g = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Single = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Single;
  const props = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<aside id="sui-sidebar"${spreadAttributes(props, void 0, { "class": "astro-gztxjo66" })} data-astro-cid-gztxjo66> ${renderSlot($$result, $$slots["default"])} </aside> `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Sidebar/Single.astro", void 0);

const $$Double = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="sui-sidebars" class="active inner" data-astro-cid-wnaiuqj4> <div id="sui-sidebar-outer" data-astro-cid-wnaiuqj4> ${renderSlot($$result, $$slots["outer"])} </div> <div id="sui-sidebar-inner" data-astro-cid-wnaiuqj4> ${renderSlot($$result, $$slots["inner"])} </div> </div> `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Sidebar/Double.astro", void 0);

const $$Group = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="sui-group"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Group/Group.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const footerYear = year === 2024 ? year : `2024 - ${year}`;
  return renderTemplate`${maybeRenderHead()}<footer class="dashboard-footer"> <span>&copy; ${footerYear} <a${addAttribute(studioCMSSocials.githubLicense, "href")}><strong>MIT Licensed</strong></a></span> <span><a${addAttribute(studioCMSSocials.github, "href")}>withstudiocms/studiocms</a></span> </footer>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/Footer.astro", void 0);

const $$Astro$f = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$SidebarLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$SidebarLink;
  const { icon, class: className, ...props } = Astro2.props;
  const activeIcon = icon.endsWith("-solid") ? icon : `${icon}-solid`;
  const compId = crypto.randomUUID();
  return renderTemplate`${renderComponent($$result, "sidebar-link", "sidebar-link", { "id": compId, "class:list": ["sidebar-link", className], "data-dashboard-index": Astro2.locals.StudioCMS.routeMap.mainLinks.dashboardIndex, ...props }, { "default": () => renderTemplate` ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "id": "not-selected-icon", "class": "sidebar-link-icon not-selected", "width": 24, "height": 24 })} ${renderComponent($$result, "Icon", $$Icon, { "name": activeIcon, "id": "selected-icon", "class": "sidebar-link-icon selected", "width": 24, "height": 24 })} ${maybeRenderHead()}<span class="sidebar-link-text"> ${renderSlot($$result, $$slots["default"])} </span> ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/SidebarLink.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/SidebarLink.astro", void 0);

const $$Astro$e = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$SidebarPluginLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$SidebarPluginLink;
  const { name, identifier } = Astro2.props;
  const href = Astro2.locals.StudioCMS.routeMap.mainLinks.plugins + identifier;
  const isActive = Astro2.url.pathname === href && "active";
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(["sidebar-plugin-link", [isActive && "active"]], "class:list")} data-astro-cid-ncy3kudw> <span class="sidebar-plugin-name" data-astro-cid-ncy3kudw>${name}</span> <span class="sidebar-plugin-identifier" data-astro-cid-ncy3kudw>${identifier}</span> </a> `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/SidebarPluginLink.astro", void 0);

const $$Astro$d = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$StudioCMSLogo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$StudioCMSLogo;
  const { width = 755, height = 792, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(width, "width")}${addAttribute(height, "height")} viewBox="0 0 755 792" fill="none" xmlns="http://www.w3.org/2000/svg"${spreadAttributes(props)}> <rect x="295" width="460" height="466" rx="32" fill="currentColor"></rect> <path d="M272 434V166H180C162.327 166 148 180.327 148 198V597C148 614.673 162.327 629 180 629H577.5C595.173 629 609.5 614.673 609.5 597V490H328C297.072 490 272 464.928 272 434Z" fill="currentColor"></path> <path d="M124 597V329H32C14.3269 329 0 343.327 0 361V760C0 777.673 14.3269 792 32 792H429.5C447.173 792 461.5 777.673 461.5 760V653H180C149.072 653 124 627.928 124 597Z" fill="currentColor"></path> </svg>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/StudioCMSLogo.astro", void 0);

const $$Astro$c = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$UserAccount = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$UserAccount;
  const { currentUser } = Astro2.props;
  const lang = Astro2.locals.StudioCMS.defaultLang;
  const t = useTranslations(lang, "@studiocms/dashboard:user-component");
  const permissionLevel = currentUser?.permissionLevel || "unknown";
  const id = `sidebar-user-account-${currentUser?.user?.id || "unknown"}`;
  const userProps = {
    id,
    name: currentUser?.user?.name || "Visitor",
    description: t(permissionLevel)
  };
  if (currentUser?.user?.avatar) {
    userProps.avatar = currentUser.user.avatar;
  }
  return renderTemplate`${renderComponent($$result, "User", $$SSRUser, { ...userProps })} ${maybeRenderHead()}<div id="logged-in-user-details" style="display: none;"${addAttribute(permissionLevel, "data-permission-level")}${addAttribute(id, "data-selector-id")}></div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/sidebar/UserAccount.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/sidebar/UserAccount.astro", void 0);

var re = {exports: {}};

var constants;
var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;

	// Note: this is the semver.org version of the spec that it implements
	// Not necessarily the package version of this code.
	const SEMVER_SPEC_VERSION = '2.0.0';

	const MAX_LENGTH = 256;
	const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
	/* istanbul ignore next */ 9007199254740991;

	// Max safe segment length for coercion.
	const MAX_SAFE_COMPONENT_LENGTH = 16;

	// Max safe length for a build identifier. The max length minus 6 characters for
	// the shortest version with a build 0.0.0+BUILD.
	const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;

	const RELEASE_TYPES = [
	  'major',
	  'premajor',
	  'minor',
	  'preminor',
	  'patch',
	  'prepatch',
	  'prerelease',
	];

	constants = {
	  MAX_LENGTH,
	  MAX_SAFE_COMPONENT_LENGTH,
	  MAX_SAFE_BUILD_LENGTH,
	  MAX_SAFE_INTEGER,
	  RELEASE_TYPES,
	  SEMVER_SPEC_VERSION,
	  FLAG_INCLUDE_PRERELEASE: 0b001,
	  FLAG_LOOSE: 0b010,
	};
	return constants;
}

var debug_1;
var hasRequiredDebug;

function requireDebug () {
	if (hasRequiredDebug) return debug_1;
	hasRequiredDebug = 1;

	const debug = (
	  typeof process === 'object' &&
	  process.env &&
	  process.env.NODE_DEBUG &&
	  /\bsemver\b/i.test(process.env.NODE_DEBUG)
	) ? (...args) => console.error('SEMVER', ...args)
	  : () => {};

	debug_1 = debug;
	return debug_1;
}

var hasRequiredRe;

function requireRe () {
	if (hasRequiredRe) return re.exports;
	hasRequiredRe = 1;
	(function (module, exports$1) {

		const {
		  MAX_SAFE_COMPONENT_LENGTH,
		  MAX_SAFE_BUILD_LENGTH,
		  MAX_LENGTH,
		} = requireConstants();
		const debug = requireDebug();
		exports$1 = module.exports = {};

		// The actual regexps go on exports.re
		const re = exports$1.re = [];
		const safeRe = exports$1.safeRe = [];
		const src = exports$1.src = [];
		const safeSrc = exports$1.safeSrc = [];
		const t = exports$1.t = {};
		let R = 0;

		const LETTERDASHNUMBER = '[a-zA-Z0-9-]';

		// Replace some greedy regex tokens to prevent regex dos issues. These regex are
		// used internally via the safeRe object since all inputs in this library get
		// normalized first to trim and collapse all extra whitespace. The original
		// regexes are exported for userland consumption and lower level usage. A
		// future breaking change could export the safer regex only with a note that
		// all input should have extra whitespace removed.
		const safeRegexReplacements = [
		  ['\\s', 1],
		  ['\\d', MAX_LENGTH],
		  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
		];

		const makeSafeRegex = (value) => {
		  for (const [token, max] of safeRegexReplacements) {
		    value = value
		      .split(`${token}*`).join(`${token}{0,${max}}`)
		      .split(`${token}+`).join(`${token}{1,${max}}`);
		  }
		  return value
		};

		const createToken = (name, value, isGlobal) => {
		  const safe = makeSafeRegex(value);
		  const index = R++;
		  debug(name, index, value);
		  t[name] = index;
		  src[index] = value;
		  safeSrc[index] = safe;
		  re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
		  safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined);
		};

		// The following Regular Expressions can be used for tokenizing,
		// validating, and parsing SemVer version strings.

		// ## Numeric Identifier
		// A single `0`, or a non-zero digit followed by zero or more digits.

		createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
		createToken('NUMERICIDENTIFIERLOOSE', '\\d+');

		// ## Non-numeric Identifier
		// Zero or more digits, followed by a letter or hyphen, and then zero or
		// more letters, digits, or hyphens.

		createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);

		// ## Main Version
		// Three dot-separated numeric identifiers.

		createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
		                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
		                   `(${src[t.NUMERICIDENTIFIER]})`);

		createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
		                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
		                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`);

		// ## Pre-release Version Identifier
		// A numeric identifier, or a non-numeric identifier.
		// Non-numeric identifiers include numeric identifiers but can be longer.
		// Therefore non-numeric identifiers must go first.

		createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NONNUMERICIDENTIFIER]
		}|${src[t.NUMERICIDENTIFIER]})`);

		createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NONNUMERICIDENTIFIER]
		}|${src[t.NUMERICIDENTIFIERLOOSE]})`);

		// ## Pre-release Version
		// Hyphen, followed by one or more dot-separated pre-release version
		// identifiers.

		createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
		}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);

		createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
		}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);

		// ## Build Metadata Identifier
		// Any combination of digits, letters, or hyphens.

		createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`);

		// ## Build Metadata
		// Plus sign, followed by one or more period-separated build metadata
		// identifiers.

		createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
		}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);

		// ## Full Version String
		// A main version, followed optionally by a pre-release version and
		// build metadata.

		// Note that the only major, minor, patch, and pre-release sections of
		// the version string are capturing groups.  The build metadata is not a
		// capturing group, because it should not ever be used in version
		// comparison.

		createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
		}${src[t.PRERELEASE]}?${
		  src[t.BUILD]}?`);

		createToken('FULL', `^${src[t.FULLPLAIN]}$`);

		// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
		// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
		// common in the npm registry.
		createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
		}${src[t.PRERELEASELOOSE]}?${
		  src[t.BUILD]}?`);

		createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);

		createToken('GTLT', '((?:<|>)?=?)');

		// Something like "2.*" or "1.2.x".
		// Note that "x.x" is a valid xRange identifer, meaning "any version"
		// Only the first item is strictly required.
		createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
		createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);

		createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:${src[t.PRERELEASE]})?${
		                     src[t.BUILD]}?` +
		                   `)?)?`);

		createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:${src[t.PRERELEASELOOSE]})?${
		                          src[t.BUILD]}?` +
		                        `)?)?`);

		createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
		createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);

		// Coercion.
		// Extract anything that could conceivably be a part of a valid semver
		createToken('COERCEPLAIN', `${'(^|[^\\d])' +
		              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
		              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
		              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
		createToken('COERCE', `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
		createToken('COERCEFULL', src[t.COERCEPLAIN] +
		              `(?:${src[t.PRERELEASE]})?` +
		              `(?:${src[t.BUILD]})?` +
		              `(?:$|[^\\d])`);
		createToken('COERCERTL', src[t.COERCE], true);
		createToken('COERCERTLFULL', src[t.COERCEFULL], true);

		// Tilde ranges.
		// Meaning is "reasonably at or greater than"
		createToken('LONETILDE', '(?:~>?)');

		createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
		exports$1.tildeTrimReplace = '$1~';

		createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
		createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);

		// Caret ranges.
		// Meaning is "at least and backwards compatible with"
		createToken('LONECARET', '(?:\\^)');

		createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
		exports$1.caretTrimReplace = '$1^';

		createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
		createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);

		// A simple gt/lt/eq thing, or just "" to indicate "any version"
		createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
		createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);

		// An expression to strip any whitespace between the gtlt and the thing
		// it modifies, so that `> 1.2.3` ==> `>1.2.3`
		createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
		}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
		exports$1.comparatorTrimReplace = '$1$2$3';

		// Something like `1.2.3 - 1.2.4`
		// Note that these all use the loose form, because they'll be
		// checked against either the strict or loose comparator form
		// later.
		createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
		                   `\\s+-\\s+` +
		                   `(${src[t.XRANGEPLAIN]})` +
		                   `\\s*$`);

		createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
		                        `\\s+-\\s+` +
		                        `(${src[t.XRANGEPLAINLOOSE]})` +
		                        `\\s*$`);

		// Star ranges basically just allow anything at all.
		createToken('STAR', '(<|>)?=?\\s*\\*');
		// >=0.0.0 is like a star
		createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
		createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$'); 
	} (re, re.exports));
	return re.exports;
}

var parseOptions_1;
var hasRequiredParseOptions;

function requireParseOptions () {
	if (hasRequiredParseOptions) return parseOptions_1;
	hasRequiredParseOptions = 1;

	// parse out just the options we care about
	const looseOption = Object.freeze({ loose: true });
	const emptyOpts = Object.freeze({ });
	const parseOptions = options => {
	  if (!options) {
	    return emptyOpts
	  }

	  if (typeof options !== 'object') {
	    return looseOption
	  }

	  return options
	};
	parseOptions_1 = parseOptions;
	return parseOptions_1;
}

var identifiers;
var hasRequiredIdentifiers;

function requireIdentifiers () {
	if (hasRequiredIdentifiers) return identifiers;
	hasRequiredIdentifiers = 1;

	const numeric = /^[0-9]+$/;
	const compareIdentifiers = (a, b) => {
	  if (typeof a === 'number' && typeof b === 'number') {
	    return a === b ? 0 : a < b ? -1 : 1
	  }

	  const anum = numeric.test(a);
	  const bnum = numeric.test(b);

	  if (anum && bnum) {
	    a = +a;
	    b = +b;
	  }

	  return a === b ? 0
	    : (anum && !bnum) ? -1
	    : (bnum && !anum) ? 1
	    : a < b ? -1
	    : 1
	};

	const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);

	identifiers = {
	  compareIdentifiers,
	  rcompareIdentifiers,
	};
	return identifiers;
}

var semver$1;
var hasRequiredSemver$1;

function requireSemver$1 () {
	if (hasRequiredSemver$1) return semver$1;
	hasRequiredSemver$1 = 1;

	const debug = requireDebug();
	const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants();
	const { safeRe: re, t } = requireRe();

	const parseOptions = requireParseOptions();
	const { compareIdentifiers } = requireIdentifiers();
	class SemVer {
	  constructor (version, options) {
	    options = parseOptions(options);

	    if (version instanceof SemVer) {
	      if (version.loose === !!options.loose &&
	        version.includePrerelease === !!options.includePrerelease) {
	        return version
	      } else {
	        version = version.version;
	      }
	    } else if (typeof version !== 'string') {
	      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`)
	    }

	    if (version.length > MAX_LENGTH) {
	      throw new TypeError(
	        `version is longer than ${MAX_LENGTH} characters`
	      )
	    }

	    debug('SemVer', version, options);
	    this.options = options;
	    this.loose = !!options.loose;
	    // this isn't actually relevant for versions, but keep it so that we
	    // don't run into trouble passing this.options around.
	    this.includePrerelease = !!options.includePrerelease;

	    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);

	    if (!m) {
	      throw new TypeError(`Invalid Version: ${version}`)
	    }

	    this.raw = version;

	    // these are actually numbers
	    this.major = +m[1];
	    this.minor = +m[2];
	    this.patch = +m[3];

	    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
	      throw new TypeError('Invalid major version')
	    }

	    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
	      throw new TypeError('Invalid minor version')
	    }

	    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
	      throw new TypeError('Invalid patch version')
	    }

	    // numberify any prerelease numeric ids
	    if (!m[4]) {
	      this.prerelease = [];
	    } else {
	      this.prerelease = m[4].split('.').map((id) => {
	        if (/^[0-9]+$/.test(id)) {
	          const num = +id;
	          if (num >= 0 && num < MAX_SAFE_INTEGER) {
	            return num
	          }
	        }
	        return id
	      });
	    }

	    this.build = m[5] ? m[5].split('.') : [];
	    this.format();
	  }

	  format () {
	    this.version = `${this.major}.${this.minor}.${this.patch}`;
	    if (this.prerelease.length) {
	      this.version += `-${this.prerelease.join('.')}`;
	    }
	    return this.version
	  }

	  toString () {
	    return this.version
	  }

	  compare (other) {
	    debug('SemVer.compare', this.version, this.options, other);
	    if (!(other instanceof SemVer)) {
	      if (typeof other === 'string' && other === this.version) {
	        return 0
	      }
	      other = new SemVer(other, this.options);
	    }

	    if (other.version === this.version) {
	      return 0
	    }

	    return this.compareMain(other) || this.comparePre(other)
	  }

	  compareMain (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }

	    if (this.major < other.major) {
	      return -1
	    }
	    if (this.major > other.major) {
	      return 1
	    }
	    if (this.minor < other.minor) {
	      return -1
	    }
	    if (this.minor > other.minor) {
	      return 1
	    }
	    if (this.patch < other.patch) {
	      return -1
	    }
	    if (this.patch > other.patch) {
	      return 1
	    }
	    return 0
	  }

	  comparePre (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }

	    // NOT having a prerelease is > having one
	    if (this.prerelease.length && !other.prerelease.length) {
	      return -1
	    } else if (!this.prerelease.length && other.prerelease.length) {
	      return 1
	    } else if (!this.prerelease.length && !other.prerelease.length) {
	      return 0
	    }

	    let i = 0;
	    do {
	      const a = this.prerelease[i];
	      const b = other.prerelease[i];
	      debug('prerelease compare', i, a, b);
	      if (a === undefined && b === undefined) {
	        return 0
	      } else if (b === undefined) {
	        return 1
	      } else if (a === undefined) {
	        return -1
	      } else if (a === b) {
	        continue
	      } else {
	        return compareIdentifiers(a, b)
	      }
	    } while (++i)
	  }

	  compareBuild (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }

	    let i = 0;
	    do {
	      const a = this.build[i];
	      const b = other.build[i];
	      debug('build compare', i, a, b);
	      if (a === undefined && b === undefined) {
	        return 0
	      } else if (b === undefined) {
	        return 1
	      } else if (a === undefined) {
	        return -1
	      } else if (a === b) {
	        continue
	      } else {
	        return compareIdentifiers(a, b)
	      }
	    } while (++i)
	  }

	  // preminor will bump the version up to the next minor release, and immediately
	  // down to pre-release. premajor and prepatch work the same way.
	  inc (release, identifier, identifierBase) {
	    if (release.startsWith('pre')) {
	      if (!identifier && identifierBase === false) {
	        throw new Error('invalid increment argument: identifier is empty')
	      }
	      // Avoid an invalid semver results
	      if (identifier) {
	        const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
	        if (!match || match[1] !== identifier) {
	          throw new Error(`invalid identifier: ${identifier}`)
	        }
	      }
	    }

	    switch (release) {
	      case 'premajor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor = 0;
	        this.major++;
	        this.inc('pre', identifier, identifierBase);
	        break
	      case 'preminor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor++;
	        this.inc('pre', identifier, identifierBase);
	        break
	      case 'prepatch':
	        // If this is already a prerelease, it will bump to the next version
	        // drop any prereleases that might already exist, since they are not
	        // relevant at this point.
	        this.prerelease.length = 0;
	        this.inc('patch', identifier, identifierBase);
	        this.inc('pre', identifier, identifierBase);
	        break
	      // If the input is a non-prerelease version, this acts the same as
	      // prepatch.
	      case 'prerelease':
	        if (this.prerelease.length === 0) {
	          this.inc('patch', identifier, identifierBase);
	        }
	        this.inc('pre', identifier, identifierBase);
	        break
	      case 'release':
	        if (this.prerelease.length === 0) {
	          throw new Error(`version ${this.raw} is not a prerelease`)
	        }
	        this.prerelease.length = 0;
	        break

	      case 'major':
	        // If this is a pre-major version, bump up to the same major version.
	        // Otherwise increment major.
	        // 1.0.0-5 bumps to 1.0.0
	        // 1.1.0 bumps to 2.0.0
	        if (
	          this.minor !== 0 ||
	          this.patch !== 0 ||
	          this.prerelease.length === 0
	        ) {
	          this.major++;
	        }
	        this.minor = 0;
	        this.patch = 0;
	        this.prerelease = [];
	        break
	      case 'minor':
	        // If this is a pre-minor version, bump up to the same minor version.
	        // Otherwise increment minor.
	        // 1.2.0-5 bumps to 1.2.0
	        // 1.2.1 bumps to 1.3.0
	        if (this.patch !== 0 || this.prerelease.length === 0) {
	          this.minor++;
	        }
	        this.patch = 0;
	        this.prerelease = [];
	        break
	      case 'patch':
	        // If this is not a pre-release version, it will increment the patch.
	        // If it is a pre-release it will bump up to the same patch version.
	        // 1.2.0-5 patches to 1.2.0
	        // 1.2.0 patches to 1.2.1
	        if (this.prerelease.length === 0) {
	          this.patch++;
	        }
	        this.prerelease = [];
	        break
	      // This probably shouldn't be used publicly.
	      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
	      case 'pre': {
	        const base = Number(identifierBase) ? 1 : 0;

	        if (this.prerelease.length === 0) {
	          this.prerelease = [base];
	        } else {
	          let i = this.prerelease.length;
	          while (--i >= 0) {
	            if (typeof this.prerelease[i] === 'number') {
	              this.prerelease[i]++;
	              i = -2;
	            }
	          }
	          if (i === -1) {
	            // didn't increment anything
	            if (identifier === this.prerelease.join('.') && identifierBase === false) {
	              throw new Error('invalid increment argument: identifier already exists')
	            }
	            this.prerelease.push(base);
	          }
	        }
	        if (identifier) {
	          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
	          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
	          let prerelease = [identifier, base];
	          if (identifierBase === false) {
	            prerelease = [identifier];
	          }
	          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
	            if (isNaN(this.prerelease[1])) {
	              this.prerelease = prerelease;
	            }
	          } else {
	            this.prerelease = prerelease;
	          }
	        }
	        break
	      }
	      default:
	        throw new Error(`invalid increment argument: ${release}`)
	    }
	    this.raw = this.format();
	    if (this.build.length) {
	      this.raw += `+${this.build.join('.')}`;
	    }
	    return this
	  }
	}

	semver$1 = SemVer;
	return semver$1;
}

var parse_1;
var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse_1;
	hasRequiredParse = 1;

	const SemVer = requireSemver$1();
	const parse = (version, options, throwErrors = false) => {
	  if (version instanceof SemVer) {
	    return version
	  }
	  try {
	    return new SemVer(version, options)
	  } catch (er) {
	    if (!throwErrors) {
	      return null
	    }
	    throw er
	  }
	};

	parse_1 = parse;
	return parse_1;
}

var valid_1;
var hasRequiredValid$1;

function requireValid$1 () {
	if (hasRequiredValid$1) return valid_1;
	hasRequiredValid$1 = 1;

	const parse = requireParse();
	const valid = (version, options) => {
	  const v = parse(version, options);
	  return v ? v.version : null
	};
	valid_1 = valid;
	return valid_1;
}

var clean_1;
var hasRequiredClean;

function requireClean () {
	if (hasRequiredClean) return clean_1;
	hasRequiredClean = 1;

	const parse = requireParse();
	const clean = (version, options) => {
	  const s = parse(version.trim().replace(/^[=v]+/, ''), options);
	  return s ? s.version : null
	};
	clean_1 = clean;
	return clean_1;
}

var inc_1;
var hasRequiredInc;

function requireInc () {
	if (hasRequiredInc) return inc_1;
	hasRequiredInc = 1;

	const SemVer = requireSemver$1();

	const inc = (version, release, options, identifier, identifierBase) => {
	  if (typeof (options) === 'string') {
	    identifierBase = identifier;
	    identifier = options;
	    options = undefined;
	  }

	  try {
	    return new SemVer(
	      version instanceof SemVer ? version.version : version,
	      options
	    ).inc(release, identifier, identifierBase).version
	  } catch (er) {
	    return null
	  }
	};
	inc_1 = inc;
	return inc_1;
}

var diff_1;
var hasRequiredDiff;

function requireDiff () {
	if (hasRequiredDiff) return diff_1;
	hasRequiredDiff = 1;

	const parse = requireParse();

	const diff = (version1, version2) => {
	  const v1 = parse(version1, null, true);
	  const v2 = parse(version2, null, true);
	  const comparison = v1.compare(v2);

	  if (comparison === 0) {
	    return null
	  }

	  const v1Higher = comparison > 0;
	  const highVersion = v1Higher ? v1 : v2;
	  const lowVersion = v1Higher ? v2 : v1;
	  const highHasPre = !!highVersion.prerelease.length;
	  const lowHasPre = !!lowVersion.prerelease.length;

	  if (lowHasPre && !highHasPre) {
	    // Going from prerelease -> no prerelease requires some special casing

	    // If the low version has only a major, then it will always be a major
	    // Some examples:
	    // 1.0.0-1 -> 1.0.0
	    // 1.0.0-1 -> 1.1.1
	    // 1.0.0-1 -> 2.0.0
	    if (!lowVersion.patch && !lowVersion.minor) {
	      return 'major'
	    }

	    // If the main part has no difference
	    if (lowVersion.compareMain(highVersion) === 0) {
	      if (lowVersion.minor && !lowVersion.patch) {
	        return 'minor'
	      }
	      return 'patch'
	    }
	  }

	  // add the `pre` prefix if we are going to a prerelease version
	  const prefix = highHasPre ? 'pre' : '';

	  if (v1.major !== v2.major) {
	    return prefix + 'major'
	  }

	  if (v1.minor !== v2.minor) {
	    return prefix + 'minor'
	  }

	  if (v1.patch !== v2.patch) {
	    return prefix + 'patch'
	  }

	  // high and low are prereleases
	  return 'prerelease'
	};

	diff_1 = diff;
	return diff_1;
}

var major_1;
var hasRequiredMajor;

function requireMajor () {
	if (hasRequiredMajor) return major_1;
	hasRequiredMajor = 1;

	const SemVer = requireSemver$1();
	const major = (a, loose) => new SemVer(a, loose).major;
	major_1 = major;
	return major_1;
}

var minor_1;
var hasRequiredMinor;

function requireMinor () {
	if (hasRequiredMinor) return minor_1;
	hasRequiredMinor = 1;

	const SemVer = requireSemver$1();
	const minor = (a, loose) => new SemVer(a, loose).minor;
	minor_1 = minor;
	return minor_1;
}

var patch_1;
var hasRequiredPatch;

function requirePatch () {
	if (hasRequiredPatch) return patch_1;
	hasRequiredPatch = 1;

	const SemVer = requireSemver$1();
	const patch = (a, loose) => new SemVer(a, loose).patch;
	patch_1 = patch;
	return patch_1;
}

var prerelease_1;
var hasRequiredPrerelease;

function requirePrerelease () {
	if (hasRequiredPrerelease) return prerelease_1;
	hasRequiredPrerelease = 1;

	const parse = requireParse();
	const prerelease = (version, options) => {
	  const parsed = parse(version, options);
	  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
	};
	prerelease_1 = prerelease;
	return prerelease_1;
}

var compare_1;
var hasRequiredCompare;

function requireCompare () {
	if (hasRequiredCompare) return compare_1;
	hasRequiredCompare = 1;

	const SemVer = requireSemver$1();
	const compare = (a, b, loose) =>
	  new SemVer(a, loose).compare(new SemVer(b, loose));

	compare_1 = compare;
	return compare_1;
}

var rcompare_1;
var hasRequiredRcompare;

function requireRcompare () {
	if (hasRequiredRcompare) return rcompare_1;
	hasRequiredRcompare = 1;

	const compare = requireCompare();
	const rcompare = (a, b, loose) => compare(b, a, loose);
	rcompare_1 = rcompare;
	return rcompare_1;
}

var compareLoose_1;
var hasRequiredCompareLoose;

function requireCompareLoose () {
	if (hasRequiredCompareLoose) return compareLoose_1;
	hasRequiredCompareLoose = 1;

	const compare = requireCompare();
	const compareLoose = (a, b) => compare(a, b, true);
	compareLoose_1 = compareLoose;
	return compareLoose_1;
}

var compareBuild_1;
var hasRequiredCompareBuild;

function requireCompareBuild () {
	if (hasRequiredCompareBuild) return compareBuild_1;
	hasRequiredCompareBuild = 1;

	const SemVer = requireSemver$1();
	const compareBuild = (a, b, loose) => {
	  const versionA = new SemVer(a, loose);
	  const versionB = new SemVer(b, loose);
	  return versionA.compare(versionB) || versionA.compareBuild(versionB)
	};
	compareBuild_1 = compareBuild;
	return compareBuild_1;
}

var sort_1;
var hasRequiredSort;

function requireSort () {
	if (hasRequiredSort) return sort_1;
	hasRequiredSort = 1;

	const compareBuild = requireCompareBuild();
	const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
	sort_1 = sort;
	return sort_1;
}

var rsort_1;
var hasRequiredRsort;

function requireRsort () {
	if (hasRequiredRsort) return rsort_1;
	hasRequiredRsort = 1;

	const compareBuild = requireCompareBuild();
	const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
	rsort_1 = rsort;
	return rsort_1;
}

var gt_1;
var hasRequiredGt;

function requireGt () {
	if (hasRequiredGt) return gt_1;
	hasRequiredGt = 1;

	const compare = requireCompare();
	const gt = (a, b, loose) => compare(a, b, loose) > 0;
	gt_1 = gt;
	return gt_1;
}

var lt_1;
var hasRequiredLt;

function requireLt () {
	if (hasRequiredLt) return lt_1;
	hasRequiredLt = 1;

	const compare = requireCompare();
	const lt = (a, b, loose) => compare(a, b, loose) < 0;
	lt_1 = lt;
	return lt_1;
}

var eq_1;
var hasRequiredEq;

function requireEq () {
	if (hasRequiredEq) return eq_1;
	hasRequiredEq = 1;

	const compare = requireCompare();
	const eq = (a, b, loose) => compare(a, b, loose) === 0;
	eq_1 = eq;
	return eq_1;
}

var neq_1;
var hasRequiredNeq;

function requireNeq () {
	if (hasRequiredNeq) return neq_1;
	hasRequiredNeq = 1;

	const compare = requireCompare();
	const neq = (a, b, loose) => compare(a, b, loose) !== 0;
	neq_1 = neq;
	return neq_1;
}

var gte_1;
var hasRequiredGte;

function requireGte () {
	if (hasRequiredGte) return gte_1;
	hasRequiredGte = 1;

	const compare = requireCompare();
	const gte = (a, b, loose) => compare(a, b, loose) >= 0;
	gte_1 = gte;
	return gte_1;
}

var lte_1;
var hasRequiredLte;

function requireLte () {
	if (hasRequiredLte) return lte_1;
	hasRequiredLte = 1;

	const compare = requireCompare();
	const lte = (a, b, loose) => compare(a, b, loose) <= 0;
	lte_1 = lte;
	return lte_1;
}

var cmp_1;
var hasRequiredCmp;

function requireCmp () {
	if (hasRequiredCmp) return cmp_1;
	hasRequiredCmp = 1;

	const eq = requireEq();
	const neq = requireNeq();
	const gt = requireGt();
	const gte = requireGte();
	const lt = requireLt();
	const lte = requireLte();

	const cmp = (a, op, b, loose) => {
	  switch (op) {
	    case '===':
	      if (typeof a === 'object') {
	        a = a.version;
	      }
	      if (typeof b === 'object') {
	        b = b.version;
	      }
	      return a === b

	    case '!==':
	      if (typeof a === 'object') {
	        a = a.version;
	      }
	      if (typeof b === 'object') {
	        b = b.version;
	      }
	      return a !== b

	    case '':
	    case '=':
	    case '==':
	      return eq(a, b, loose)

	    case '!=':
	      return neq(a, b, loose)

	    case '>':
	      return gt(a, b, loose)

	    case '>=':
	      return gte(a, b, loose)

	    case '<':
	      return lt(a, b, loose)

	    case '<=':
	      return lte(a, b, loose)

	    default:
	      throw new TypeError(`Invalid operator: ${op}`)
	  }
	};
	cmp_1 = cmp;
	return cmp_1;
}

var coerce_1;
var hasRequiredCoerce;

function requireCoerce () {
	if (hasRequiredCoerce) return coerce_1;
	hasRequiredCoerce = 1;

	const SemVer = requireSemver$1();
	const parse = requireParse();
	const { safeRe: re, t } = requireRe();

	const coerce = (version, options) => {
	  if (version instanceof SemVer) {
	    return version
	  }

	  if (typeof version === 'number') {
	    version = String(version);
	  }

	  if (typeof version !== 'string') {
	    return null
	  }

	  options = options || {};

	  let match = null;
	  if (!options.rtl) {
	    match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
	  } else {
	    // Find the right-most coercible string that does not share
	    // a terminus with a more left-ward coercible string.
	    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
	    // With includePrerelease option set, '1.2.3.4-rc' wants to coerce '2.3.4-rc', not '2.3.4'
	    //
	    // Walk through the string checking with a /g regexp
	    // Manually set the index so as to pick up overlapping matches.
	    // Stop when we get a match that ends at the string end, since no
	    // coercible string can be more right-ward without the same terminus.
	    const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
	    let next;
	    while ((next = coerceRtlRegex.exec(version)) &&
	        (!match || match.index + match[0].length !== version.length)
	    ) {
	      if (!match ||
	            next.index + next[0].length !== match.index + match[0].length) {
	        match = next;
	      }
	      coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
	    }
	    // leave it in a clean state
	    coerceRtlRegex.lastIndex = -1;
	  }

	  if (match === null) {
	    return null
	  }

	  const major = match[2];
	  const minor = match[3] || '0';
	  const patch = match[4] || '0';
	  const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : '';
	  const build = options.includePrerelease && match[6] ? `+${match[6]}` : '';

	  return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options)
	};
	coerce_1 = coerce;
	return coerce_1;
}

var lrucache;
var hasRequiredLrucache;

function requireLrucache () {
	if (hasRequiredLrucache) return lrucache;
	hasRequiredLrucache = 1;

	class LRUCache {
	  constructor () {
	    this.max = 1000;
	    this.map = new Map();
	  }

	  get (key) {
	    const value = this.map.get(key);
	    if (value === undefined) {
	      return undefined
	    } else {
	      // Remove the key from the map and add it to the end
	      this.map.delete(key);
	      this.map.set(key, value);
	      return value
	    }
	  }

	  delete (key) {
	    return this.map.delete(key)
	  }

	  set (key, value) {
	    const deleted = this.delete(key);

	    if (!deleted && value !== undefined) {
	      // If cache is full, delete the least recently used item
	      if (this.map.size >= this.max) {
	        const firstKey = this.map.keys().next().value;
	        this.delete(firstKey);
	      }

	      this.map.set(key, value);
	    }

	    return this
	  }
	}

	lrucache = LRUCache;
	return lrucache;
}

var range;
var hasRequiredRange;

function requireRange () {
	if (hasRequiredRange) return range;
	hasRequiredRange = 1;

	const SPACE_CHARACTERS = /\s+/g;

	// hoisted class for cyclic dependency
	class Range {
	  constructor (range, options) {
	    options = parseOptions(options);

	    if (range instanceof Range) {
	      if (
	        range.loose === !!options.loose &&
	        range.includePrerelease === !!options.includePrerelease
	      ) {
	        return range
	      } else {
	        return new Range(range.raw, options)
	      }
	    }

	    if (range instanceof Comparator) {
	      // just put it in the set and return
	      this.raw = range.value;
	      this.set = [[range]];
	      this.formatted = undefined;
	      return this
	    }

	    this.options = options;
	    this.loose = !!options.loose;
	    this.includePrerelease = !!options.includePrerelease;

	    // First reduce all whitespace as much as possible so we do not have to rely
	    // on potentially slow regexes like \s*. This is then stored and used for
	    // future error messages as well.
	    this.raw = range.trim().replace(SPACE_CHARACTERS, ' ');

	    // First, split on ||
	    this.set = this.raw
	      .split('||')
	      // map the range to a 2d array of comparators
	      .map(r => this.parseRange(r.trim()))
	      // throw out any comparator lists that are empty
	      // this generally means that it was not a valid range, which is allowed
	      // in loose mode, but will still throw if the WHOLE range is invalid.
	      .filter(c => c.length);

	    if (!this.set.length) {
	      throw new TypeError(`Invalid SemVer Range: ${this.raw}`)
	    }

	    // if we have any that are not the null set, throw out null sets.
	    if (this.set.length > 1) {
	      // keep the first one, in case they're all null sets
	      const first = this.set[0];
	      this.set = this.set.filter(c => !isNullSet(c[0]));
	      if (this.set.length === 0) {
	        this.set = [first];
	      } else if (this.set.length > 1) {
	        // if we have any that are *, then the range is just *
	        for (const c of this.set) {
	          if (c.length === 1 && isAny(c[0])) {
	            this.set = [c];
	            break
	          }
	        }
	      }
	    }

	    this.formatted = undefined;
	  }

	  get range () {
	    if (this.formatted === undefined) {
	      this.formatted = '';
	      for (let i = 0; i < this.set.length; i++) {
	        if (i > 0) {
	          this.formatted += '||';
	        }
	        const comps = this.set[i];
	        for (let k = 0; k < comps.length; k++) {
	          if (k > 0) {
	            this.formatted += ' ';
	          }
	          this.formatted += comps[k].toString().trim();
	        }
	      }
	    }
	    return this.formatted
	  }

	  format () {
	    return this.range
	  }

	  toString () {
	    return this.range
	  }

	  parseRange (range) {
	    // memoize range parsing for performance.
	    // this is a very hot path, and fully deterministic.
	    const memoOpts =
	      (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) |
	      (this.options.loose && FLAG_LOOSE);
	    const memoKey = memoOpts + ':' + range;
	    const cached = cache.get(memoKey);
	    if (cached) {
	      return cached
	    }

	    const loose = this.options.loose;
	    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
	    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
	    range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
	    debug('hyphen replace', range);

	    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
	    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
	    debug('comparator trim', range);

	    // `~ 1.2.3` => `~1.2.3`
	    range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
	    debug('tilde trim', range);

	    // `^ 1.2.3` => `^1.2.3`
	    range = range.replace(re[t.CARETTRIM], caretTrimReplace);
	    debug('caret trim', range);

	    // At this point, the range is completely trimmed and
	    // ready to be split into comparators.

	    let rangeList = range
	      .split(' ')
	      .map(comp => parseComparator(comp, this.options))
	      .join(' ')
	      .split(/\s+/)
	      // >=0.0.0 is equivalent to *
	      .map(comp => replaceGTE0(comp, this.options));

	    if (loose) {
	      // in loose mode, throw out any that are not valid comparators
	      rangeList = rangeList.filter(comp => {
	        debug('loose invalid filter', comp, this.options);
	        return !!comp.match(re[t.COMPARATORLOOSE])
	      });
	    }
	    debug('range list', rangeList);

	    // if any comparators are the null set, then replace with JUST null set
	    // if more than one comparator, remove any * comparators
	    // also, don't include the same comparator more than once
	    const rangeMap = new Map();
	    const comparators = rangeList.map(comp => new Comparator(comp, this.options));
	    for (const comp of comparators) {
	      if (isNullSet(comp)) {
	        return [comp]
	      }
	      rangeMap.set(comp.value, comp);
	    }
	    if (rangeMap.size > 1 && rangeMap.has('')) {
	      rangeMap.delete('');
	    }

	    const result = [...rangeMap.values()];
	    cache.set(memoKey, result);
	    return result
	  }

	  intersects (range, options) {
	    if (!(range instanceof Range)) {
	      throw new TypeError('a Range is required')
	    }

	    return this.set.some((thisComparators) => {
	      return (
	        isSatisfiable(thisComparators, options) &&
	        range.set.some((rangeComparators) => {
	          return (
	            isSatisfiable(rangeComparators, options) &&
	            thisComparators.every((thisComparator) => {
	              return rangeComparators.every((rangeComparator) => {
	                return thisComparator.intersects(rangeComparator, options)
	              })
	            })
	          )
	        })
	      )
	    })
	  }

	  // if ANY of the sets match ALL of its comparators, then pass
	  test (version) {
	    if (!version) {
	      return false
	    }

	    if (typeof version === 'string') {
	      try {
	        version = new SemVer(version, this.options);
	      } catch (er) {
	        return false
	      }
	    }

	    for (let i = 0; i < this.set.length; i++) {
	      if (testSet(this.set[i], version, this.options)) {
	        return true
	      }
	    }
	    return false
	  }
	}

	range = Range;

	const LRU = requireLrucache();
	const cache = new LRU();

	const parseOptions = requireParseOptions();
	const Comparator = requireComparator();
	const debug = requireDebug();
	const SemVer = requireSemver$1();
	const {
	  safeRe: re,
	  t,
	  comparatorTrimReplace,
	  tildeTrimReplace,
	  caretTrimReplace,
	} = requireRe();
	const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = requireConstants();

	const isNullSet = c => c.value === '<0.0.0-0';
	const isAny = c => c.value === '';

	// take a set of comparators and determine whether there
	// exists a version which can satisfy it
	const isSatisfiable = (comparators, options) => {
	  let result = true;
	  const remainingComparators = comparators.slice();
	  let testComparator = remainingComparators.pop();

	  while (result && remainingComparators.length) {
	    result = remainingComparators.every((otherComparator) => {
	      return testComparator.intersects(otherComparator, options)
	    });

	    testComparator = remainingComparators.pop();
	  }

	  return result
	};

	// comprised of xranges, tildes, stars, and gtlt's at this point.
	// already replaced the hyphen ranges
	// turn into a set of JUST comparators.
	const parseComparator = (comp, options) => {
	  comp = comp.replace(re[t.BUILD], '');
	  debug('comp', comp, options);
	  comp = replaceCarets(comp, options);
	  debug('caret', comp);
	  comp = replaceTildes(comp, options);
	  debug('tildes', comp);
	  comp = replaceXRanges(comp, options);
	  debug('xrange', comp);
	  comp = replaceStars(comp, options);
	  debug('stars', comp);
	  return comp
	};

	const isX = id => !id || id.toLowerCase() === 'x' || id === '*';

	// ~, ~> --> * (any, kinda silly)
	// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
	// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
	// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
	// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
	// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
	// ~0.0.1 --> >=0.0.1 <0.1.0-0
	const replaceTildes = (comp, options) => {
	  return comp
	    .trim()
	    .split(/\s+/)
	    .map((c) => replaceTilde(c, options))
	    .join(' ')
	};

	const replaceTilde = (comp, options) => {
	  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
	  return comp.replace(r, (_, M, m, p, pr) => {
	    debug('tilde', comp, _, M, m, p, pr);
	    let ret;

	    if (isX(M)) {
	      ret = '';
	    } else if (isX(m)) {
	      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
	    } else if (isX(p)) {
	      // ~1.2 == >=1.2.0 <1.3.0-0
	      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
	    } else if (pr) {
	      debug('replaceTilde pr', pr);
	      ret = `>=${M}.${m}.${p}-${pr
	      } <${M}.${+m + 1}.0-0`;
	    } else {
	      // ~1.2.3 == >=1.2.3 <1.3.0-0
	      ret = `>=${M}.${m}.${p
	      } <${M}.${+m + 1}.0-0`;
	    }

	    debug('tilde return', ret);
	    return ret
	  })
	};

	// ^ --> * (any, kinda silly)
	// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
	// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
	// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
	// ^1.2.3 --> >=1.2.3 <2.0.0-0
	// ^1.2.0 --> >=1.2.0 <2.0.0-0
	// ^0.0.1 --> >=0.0.1 <0.0.2-0
	// ^0.1.0 --> >=0.1.0 <0.2.0-0
	const replaceCarets = (comp, options) => {
	  return comp
	    .trim()
	    .split(/\s+/)
	    .map((c) => replaceCaret(c, options))
	    .join(' ')
	};

	const replaceCaret = (comp, options) => {
	  debug('caret', comp, options);
	  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
	  const z = options.includePrerelease ? '-0' : '';
	  return comp.replace(r, (_, M, m, p, pr) => {
	    debug('caret', comp, _, M, m, p, pr);
	    let ret;

	    if (isX(M)) {
	      ret = '';
	    } else if (isX(m)) {
	      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
	    } else if (isX(p)) {
	      if (M === '0') {
	        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
	      } else {
	        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
	      }
	    } else if (pr) {
	      debug('replaceCaret pr', pr);
	      if (M === '0') {
	        if (m === '0') {
	          ret = `>=${M}.${m}.${p}-${pr
	          } <${M}.${m}.${+p + 1}-0`;
	        } else {
	          ret = `>=${M}.${m}.${p}-${pr
	          } <${M}.${+m + 1}.0-0`;
	        }
	      } else {
	        ret = `>=${M}.${m}.${p}-${pr
	        } <${+M + 1}.0.0-0`;
	      }
	    } else {
	      debug('no pr');
	      if (M === '0') {
	        if (m === '0') {
	          ret = `>=${M}.${m}.${p
	          }${z} <${M}.${m}.${+p + 1}-0`;
	        } else {
	          ret = `>=${M}.${m}.${p
	          }${z} <${M}.${+m + 1}.0-0`;
	        }
	      } else {
	        ret = `>=${M}.${m}.${p
	        } <${+M + 1}.0.0-0`;
	      }
	    }

	    debug('caret return', ret);
	    return ret
	  })
	};

	const replaceXRanges = (comp, options) => {
	  debug('replaceXRanges', comp, options);
	  return comp
	    .split(/\s+/)
	    .map((c) => replaceXRange(c, options))
	    .join(' ')
	};

	const replaceXRange = (comp, options) => {
	  comp = comp.trim();
	  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
	  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
	    debug('xRange', comp, ret, gtlt, M, m, p, pr);
	    const xM = isX(M);
	    const xm = xM || isX(m);
	    const xp = xm || isX(p);
	    const anyX = xp;

	    if (gtlt === '=' && anyX) {
	      gtlt = '';
	    }

	    // if we're including prereleases in the match, then we need
	    // to fix this to -0, the lowest possible prerelease value
	    pr = options.includePrerelease ? '-0' : '';

	    if (xM) {
	      if (gtlt === '>' || gtlt === '<') {
	        // nothing is allowed
	        ret = '<0.0.0-0';
	      } else {
	        // nothing is forbidden
	        ret = '*';
	      }
	    } else if (gtlt && anyX) {
	      // we know patch is an x, because we have any x at all.
	      // replace X with 0
	      if (xm) {
	        m = 0;
	      }
	      p = 0;

	      if (gtlt === '>') {
	        // >1 => >=2.0.0
	        // >1.2 => >=1.3.0
	        gtlt = '>=';
	        if (xm) {
	          M = +M + 1;
	          m = 0;
	          p = 0;
	        } else {
	          m = +m + 1;
	          p = 0;
	        }
	      } else if (gtlt === '<=') {
	        // <=0.7.x is actually <0.8.0, since any 0.7.x should
	        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
	        gtlt = '<';
	        if (xm) {
	          M = +M + 1;
	        } else {
	          m = +m + 1;
	        }
	      }

	      if (gtlt === '<') {
	        pr = '-0';
	      }

	      ret = `${gtlt + M}.${m}.${p}${pr}`;
	    } else if (xm) {
	      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
	    } else if (xp) {
	      ret = `>=${M}.${m}.0${pr
	      } <${M}.${+m + 1}.0-0`;
	    }

	    debug('xRange return', ret);

	    return ret
	  })
	};

	// Because * is AND-ed with everything else in the comparator,
	// and '' means "any version", just remove the *s entirely.
	const replaceStars = (comp, options) => {
	  debug('replaceStars', comp, options);
	  // Looseness is ignored here.  star is always as loose as it gets!
	  return comp
	    .trim()
	    .replace(re[t.STAR], '')
	};

	const replaceGTE0 = (comp, options) => {
	  debug('replaceGTE0', comp, options);
	  return comp
	    .trim()
	    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
	};

	// This function is passed to string.replace(re[t.HYPHENRANGE])
	// M, m, patch, prerelease, build
	// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
	// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
	// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
	// TODO build?
	const hyphenReplace = incPr => ($0,
	  from, fM, fm, fp, fpr, fb,
	  to, tM, tm, tp, tpr) => {
	  if (isX(fM)) {
	    from = '';
	  } else if (isX(fm)) {
	    from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
	  } else if (isX(fp)) {
	    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
	  } else if (fpr) {
	    from = `>=${from}`;
	  } else {
	    from = `>=${from}${incPr ? '-0' : ''}`;
	  }

	  if (isX(tM)) {
	    to = '';
	  } else if (isX(tm)) {
	    to = `<${+tM + 1}.0.0-0`;
	  } else if (isX(tp)) {
	    to = `<${tM}.${+tm + 1}.0-0`;
	  } else if (tpr) {
	    to = `<=${tM}.${tm}.${tp}-${tpr}`;
	  } else if (incPr) {
	    to = `<${tM}.${tm}.${+tp + 1}-0`;
	  } else {
	    to = `<=${to}`;
	  }

	  return `${from} ${to}`.trim()
	};

	const testSet = (set, version, options) => {
	  for (let i = 0; i < set.length; i++) {
	    if (!set[i].test(version)) {
	      return false
	    }
	  }

	  if (version.prerelease.length && !options.includePrerelease) {
	    // Find the set of versions that are allowed to have prereleases
	    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
	    // That should allow `1.2.3-pr.2` to pass.
	    // However, `1.2.4-alpha.notready` should NOT be allowed,
	    // even though it's within the range set by the comparators.
	    for (let i = 0; i < set.length; i++) {
	      debug(set[i].semver);
	      if (set[i].semver === Comparator.ANY) {
	        continue
	      }

	      if (set[i].semver.prerelease.length > 0) {
	        const allowed = set[i].semver;
	        if (allowed.major === version.major &&
	            allowed.minor === version.minor &&
	            allowed.patch === version.patch) {
	          return true
	        }
	      }
	    }

	    // Version has a -pre, but it's not one of the ones we like.
	    return false
	  }

	  return true
	};
	return range;
}

var comparator;
var hasRequiredComparator;

function requireComparator () {
	if (hasRequiredComparator) return comparator;
	hasRequiredComparator = 1;

	const ANY = Symbol('SemVer ANY');
	// hoisted class for cyclic dependency
	class Comparator {
	  static get ANY () {
	    return ANY
	  }

	  constructor (comp, options) {
	    options = parseOptions(options);

	    if (comp instanceof Comparator) {
	      if (comp.loose === !!options.loose) {
	        return comp
	      } else {
	        comp = comp.value;
	      }
	    }

	    comp = comp.trim().split(/\s+/).join(' ');
	    debug('comparator', comp, options);
	    this.options = options;
	    this.loose = !!options.loose;
	    this.parse(comp);

	    if (this.semver === ANY) {
	      this.value = '';
	    } else {
	      this.value = this.operator + this.semver.version;
	    }

	    debug('comp', this);
	  }

	  parse (comp) {
	    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
	    const m = comp.match(r);

	    if (!m) {
	      throw new TypeError(`Invalid comparator: ${comp}`)
	    }

	    this.operator = m[1] !== undefined ? m[1] : '';
	    if (this.operator === '=') {
	      this.operator = '';
	    }

	    // if it literally is just '>' or '' then allow anything.
	    if (!m[2]) {
	      this.semver = ANY;
	    } else {
	      this.semver = new SemVer(m[2], this.options.loose);
	    }
	  }

	  toString () {
	    return this.value
	  }

	  test (version) {
	    debug('Comparator.test', version, this.options.loose);

	    if (this.semver === ANY || version === ANY) {
	      return true
	    }

	    if (typeof version === 'string') {
	      try {
	        version = new SemVer(version, this.options);
	      } catch (er) {
	        return false
	      }
	    }

	    return cmp(version, this.operator, this.semver, this.options)
	  }

	  intersects (comp, options) {
	    if (!(comp instanceof Comparator)) {
	      throw new TypeError('a Comparator is required')
	    }

	    if (this.operator === '') {
	      if (this.value === '') {
	        return true
	      }
	      return new Range(comp.value, options).test(this.value)
	    } else if (comp.operator === '') {
	      if (comp.value === '') {
	        return true
	      }
	      return new Range(this.value, options).test(comp.semver)
	    }

	    options = parseOptions(options);

	    // Special cases where nothing can possibly be lower
	    if (options.includePrerelease &&
	      (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
	      return false
	    }
	    if (!options.includePrerelease &&
	      (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
	      return false
	    }

	    // Same direction increasing (> or >=)
	    if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
	      return true
	    }
	    // Same direction decreasing (< or <=)
	    if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
	      return true
	    }
	    // same SemVer and both sides are inclusive (<= or >=)
	    if (
	      (this.semver.version === comp.semver.version) &&
	      this.operator.includes('=') && comp.operator.includes('=')) {
	      return true
	    }
	    // opposite directions less than
	    if (cmp(this.semver, '<', comp.semver, options) &&
	      this.operator.startsWith('>') && comp.operator.startsWith('<')) {
	      return true
	    }
	    // opposite directions greater than
	    if (cmp(this.semver, '>', comp.semver, options) &&
	      this.operator.startsWith('<') && comp.operator.startsWith('>')) {
	      return true
	    }
	    return false
	  }
	}

	comparator = Comparator;

	const parseOptions = requireParseOptions();
	const { safeRe: re, t } = requireRe();
	const cmp = requireCmp();
	const debug = requireDebug();
	const SemVer = requireSemver$1();
	const Range = requireRange();
	return comparator;
}

var satisfies_1;
var hasRequiredSatisfies;

function requireSatisfies () {
	if (hasRequiredSatisfies) return satisfies_1;
	hasRequiredSatisfies = 1;

	const Range = requireRange();
	const satisfies = (version, range, options) => {
	  try {
	    range = new Range(range, options);
	  } catch (er) {
	    return false
	  }
	  return range.test(version)
	};
	satisfies_1 = satisfies;
	return satisfies_1;
}

var toComparators_1;
var hasRequiredToComparators;

function requireToComparators () {
	if (hasRequiredToComparators) return toComparators_1;
	hasRequiredToComparators = 1;

	const Range = requireRange();

	// Mostly just for testing and legacy API reasons
	const toComparators = (range, options) =>
	  new Range(range, options).set
	    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '));

	toComparators_1 = toComparators;
	return toComparators_1;
}

var maxSatisfying_1;
var hasRequiredMaxSatisfying;

function requireMaxSatisfying () {
	if (hasRequiredMaxSatisfying) return maxSatisfying_1;
	hasRequiredMaxSatisfying = 1;

	const SemVer = requireSemver$1();
	const Range = requireRange();

	const maxSatisfying = (versions, range, options) => {
	  let max = null;
	  let maxSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      // satisfies(v, range, options)
	      if (!max || maxSV.compare(v) === -1) {
	        // compare(max, v, true)
	        max = v;
	        maxSV = new SemVer(max, options);
	      }
	    }
	  });
	  return max
	};
	maxSatisfying_1 = maxSatisfying;
	return maxSatisfying_1;
}

var minSatisfying_1;
var hasRequiredMinSatisfying;

function requireMinSatisfying () {
	if (hasRequiredMinSatisfying) return minSatisfying_1;
	hasRequiredMinSatisfying = 1;

	const SemVer = requireSemver$1();
	const Range = requireRange();
	const minSatisfying = (versions, range, options) => {
	  let min = null;
	  let minSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      // satisfies(v, range, options)
	      if (!min || minSV.compare(v) === 1) {
	        // compare(min, v, true)
	        min = v;
	        minSV = new SemVer(min, options);
	      }
	    }
	  });
	  return min
	};
	minSatisfying_1 = minSatisfying;
	return minSatisfying_1;
}

var minVersion_1;
var hasRequiredMinVersion;

function requireMinVersion () {
	if (hasRequiredMinVersion) return minVersion_1;
	hasRequiredMinVersion = 1;

	const SemVer = requireSemver$1();
	const Range = requireRange();
	const gt = requireGt();

	const minVersion = (range, loose) => {
	  range = new Range(range, loose);

	  let minver = new SemVer('0.0.0');
	  if (range.test(minver)) {
	    return minver
	  }

	  minver = new SemVer('0.0.0-0');
	  if (range.test(minver)) {
	    return minver
	  }

	  minver = null;
	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];

	    let setMin = null;
	    comparators.forEach((comparator) => {
	      // Clone to avoid manipulating the comparator's semver object.
	      const compver = new SemVer(comparator.semver.version);
	      switch (comparator.operator) {
	        case '>':
	          if (compver.prerelease.length === 0) {
	            compver.patch++;
	          } else {
	            compver.prerelease.push(0);
	          }
	          compver.raw = compver.format();
	          /* fallthrough */
	        case '':
	        case '>=':
	          if (!setMin || gt(compver, setMin)) {
	            setMin = compver;
	          }
	          break
	        case '<':
	        case '<=':
	          /* Ignore maximum versions */
	          break
	        /* istanbul ignore next */
	        default:
	          throw new Error(`Unexpected operation: ${comparator.operator}`)
	      }
	    });
	    if (setMin && (!minver || gt(minver, setMin))) {
	      minver = setMin;
	    }
	  }

	  if (minver && range.test(minver)) {
	    return minver
	  }

	  return null
	};
	minVersion_1 = minVersion;
	return minVersion_1;
}

var valid;
var hasRequiredValid;

function requireValid () {
	if (hasRequiredValid) return valid;
	hasRequiredValid = 1;

	const Range = requireRange();
	const validRange = (range, options) => {
	  try {
	    // Return '*' instead of '' so that truthiness works.
	    // This will throw if it's invalid anyway
	    return new Range(range, options).range || '*'
	  } catch (er) {
	    return null
	  }
	};
	valid = validRange;
	return valid;
}

var outside_1;
var hasRequiredOutside;

function requireOutside () {
	if (hasRequiredOutside) return outside_1;
	hasRequiredOutside = 1;

	const SemVer = requireSemver$1();
	const Comparator = requireComparator();
	const { ANY } = Comparator;
	const Range = requireRange();
	const satisfies = requireSatisfies();
	const gt = requireGt();
	const lt = requireLt();
	const lte = requireLte();
	const gte = requireGte();

	const outside = (version, range, hilo, options) => {
	  version = new SemVer(version, options);
	  range = new Range(range, options);

	  let gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
	    case '>':
	      gtfn = gt;
	      ltefn = lte;
	      ltfn = lt;
	      comp = '>';
	      ecomp = '>=';
	      break
	    case '<':
	      gtfn = lt;
	      ltefn = gte;
	      ltfn = gt;
	      comp = '<';
	      ecomp = '<=';
	      break
	    default:
	      throw new TypeError('Must provide a hilo val of "<" or ">"')
	  }

	  // If it satisfies the range it is not outside
	  if (satisfies(version, range, options)) {
	    return false
	  }

	  // From now on, variable terms are as if we're in "gtr" mode.
	  // but note that everything is flipped for the "ltr" function.

	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];

	    let high = null;
	    let low = null;

	    comparators.forEach((comparator) => {
	      if (comparator.semver === ANY) {
	        comparator = new Comparator('>=0.0.0');
	      }
	      high = high || comparator;
	      low = low || comparator;
	      if (gtfn(comparator.semver, high.semver, options)) {
	        high = comparator;
	      } else if (ltfn(comparator.semver, low.semver, options)) {
	        low = comparator;
	      }
	    });

	    // If the edge version comparator has a operator then our version
	    // isn't outside it
	    if (high.operator === comp || high.operator === ecomp) {
	      return false
	    }

	    // If the lowest version comparator has an operator and our version
	    // is less than it then it isn't higher than the range
	    if ((!low.operator || low.operator === comp) &&
	        ltefn(version, low.semver)) {
	      return false
	    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
	      return false
	    }
	  }
	  return true
	};

	outside_1 = outside;
	return outside_1;
}

var gtr_1;
var hasRequiredGtr;

function requireGtr () {
	if (hasRequiredGtr) return gtr_1;
	hasRequiredGtr = 1;

	// Determine if version is greater than all the versions possible in the range.
	const outside = requireOutside();
	const gtr = (version, range, options) => outside(version, range, '>', options);
	gtr_1 = gtr;
	return gtr_1;
}

var ltr_1;
var hasRequiredLtr;

function requireLtr () {
	if (hasRequiredLtr) return ltr_1;
	hasRequiredLtr = 1;

	const outside = requireOutside();
	// Determine if version is less than all the versions possible in the range
	const ltr = (version, range, options) => outside(version, range, '<', options);
	ltr_1 = ltr;
	return ltr_1;
}

var intersects_1;
var hasRequiredIntersects;

function requireIntersects () {
	if (hasRequiredIntersects) return intersects_1;
	hasRequiredIntersects = 1;

	const Range = requireRange();
	const intersects = (r1, r2, options) => {
	  r1 = new Range(r1, options);
	  r2 = new Range(r2, options);
	  return r1.intersects(r2, options)
	};
	intersects_1 = intersects;
	return intersects_1;
}

var simplify;
var hasRequiredSimplify;

function requireSimplify () {
	if (hasRequiredSimplify) return simplify;
	hasRequiredSimplify = 1;

	// given a set of versions and a range, create a "simplified" range
	// that includes the same versions that the original range does
	// If the original range is shorter than the simplified one, return that.
	const satisfies = requireSatisfies();
	const compare = requireCompare();
	simplify = (versions, range, options) => {
	  const set = [];
	  let first = null;
	  let prev = null;
	  const v = versions.sort((a, b) => compare(a, b, options));
	  for (const version of v) {
	    const included = satisfies(version, range, options);
	    if (included) {
	      prev = version;
	      if (!first) {
	        first = version;
	      }
	    } else {
	      if (prev) {
	        set.push([first, prev]);
	      }
	      prev = null;
	      first = null;
	    }
	  }
	  if (first) {
	    set.push([first, null]);
	  }

	  const ranges = [];
	  for (const [min, max] of set) {
	    if (min === max) {
	      ranges.push(min);
	    } else if (!max && min === v[0]) {
	      ranges.push('*');
	    } else if (!max) {
	      ranges.push(`>=${min}`);
	    } else if (min === v[0]) {
	      ranges.push(`<=${max}`);
	    } else {
	      ranges.push(`${min} - ${max}`);
	    }
	  }
	  const simplified = ranges.join(' || ');
	  const original = typeof range.raw === 'string' ? range.raw : String(range);
	  return simplified.length < original.length ? simplified : range
	};
	return simplify;
}

var subset_1;
var hasRequiredSubset;

function requireSubset () {
	if (hasRequiredSubset) return subset_1;
	hasRequiredSubset = 1;

	const Range = requireRange();
	const Comparator = requireComparator();
	const { ANY } = Comparator;
	const satisfies = requireSatisfies();
	const compare = requireCompare();

	// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
	// - Every simple range `r1, r2, ...` is a null set, OR
	// - Every simple range `r1, r2, ...` which is not a null set is a subset of
	//   some `R1, R2, ...`
	//
	// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
	// - If c is only the ANY comparator
	//   - If C is only the ANY comparator, return true
	//   - Else if in prerelease mode, return false
	//   - else replace c with `[>=0.0.0]`
	// - If C is only the ANY comparator
	//   - if in prerelease mode, return true
	//   - else replace C with `[>=0.0.0]`
	// - Let EQ be the set of = comparators in c
	// - If EQ is more than one, return true (null set)
	// - Let GT be the highest > or >= comparator in c
	// - Let LT be the lowest < or <= comparator in c
	// - If GT and LT, and GT.semver > LT.semver, return true (null set)
	// - If any C is a = range, and GT or LT are set, return false
	// - If EQ
	//   - If GT, and EQ does not satisfy GT, return true (null set)
	//   - If LT, and EQ does not satisfy LT, return true (null set)
	//   - If EQ satisfies every C, return true
	//   - Else return false
	// - If GT
	//   - If GT.semver is lower than any > or >= comp in C, return false
	//   - If GT is >=, and GT.semver does not satisfy every C, return false
	//   - If GT.semver has a prerelease, and not in prerelease mode
	//     - If no C has a prerelease and the GT.semver tuple, return false
	// - If LT
	//   - If LT.semver is greater than any < or <= comp in C, return false
	//   - If LT is <=, and LT.semver does not satisfy every C, return false
	//   - If LT.semver has a prerelease, and not in prerelease mode
	//     - If no C has a prerelease and the LT.semver tuple, return false
	// - Else return true

	const subset = (sub, dom, options = {}) => {
	  if (sub === dom) {
	    return true
	  }

	  sub = new Range(sub, options);
	  dom = new Range(dom, options);
	  let sawNonNull = false;

	  OUTER: for (const simpleSub of sub.set) {
	    for (const simpleDom of dom.set) {
	      const isSub = simpleSubset(simpleSub, simpleDom, options);
	      sawNonNull = sawNonNull || isSub !== null;
	      if (isSub) {
	        continue OUTER
	      }
	    }
	    // the null set is a subset of everything, but null simple ranges in
	    // a complex range should be ignored.  so if we saw a non-null range,
	    // then we know this isn't a subset, but if EVERY simple range was null,
	    // then it is a subset.
	    if (sawNonNull) {
	      return false
	    }
	  }
	  return true
	};

	const minimumVersionWithPreRelease = [new Comparator('>=0.0.0-0')];
	const minimumVersion = [new Comparator('>=0.0.0')];

	const simpleSubset = (sub, dom, options) => {
	  if (sub === dom) {
	    return true
	  }

	  if (sub.length === 1 && sub[0].semver === ANY) {
	    if (dom.length === 1 && dom[0].semver === ANY) {
	      return true
	    } else if (options.includePrerelease) {
	      sub = minimumVersionWithPreRelease;
	    } else {
	      sub = minimumVersion;
	    }
	  }

	  if (dom.length === 1 && dom[0].semver === ANY) {
	    if (options.includePrerelease) {
	      return true
	    } else {
	      dom = minimumVersion;
	    }
	  }

	  const eqSet = new Set();
	  let gt, lt;
	  for (const c of sub) {
	    if (c.operator === '>' || c.operator === '>=') {
	      gt = higherGT(gt, c, options);
	    } else if (c.operator === '<' || c.operator === '<=') {
	      lt = lowerLT(lt, c, options);
	    } else {
	      eqSet.add(c.semver);
	    }
	  }

	  if (eqSet.size > 1) {
	    return null
	  }

	  let gtltComp;
	  if (gt && lt) {
	    gtltComp = compare(gt.semver, lt.semver, options);
	    if (gtltComp > 0) {
	      return null
	    } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
	      return null
	    }
	  }

	  // will iterate one or zero times
	  for (const eq of eqSet) {
	    if (gt && !satisfies(eq, String(gt), options)) {
	      return null
	    }

	    if (lt && !satisfies(eq, String(lt), options)) {
	      return null
	    }

	    for (const c of dom) {
	      if (!satisfies(eq, String(c), options)) {
	        return false
	      }
	    }

	    return true
	  }

	  let higher, lower;
	  let hasDomLT, hasDomGT;
	  // if the subset has a prerelease, we need a comparator in the superset
	  // with the same tuple and a prerelease, or it's not a subset
	  let needDomLTPre = lt &&
	    !options.includePrerelease &&
	    lt.semver.prerelease.length ? lt.semver : false;
	  let needDomGTPre = gt &&
	    !options.includePrerelease &&
	    gt.semver.prerelease.length ? gt.semver : false;
	  // exception: <1.2.3-0 is the same as <1.2.3
	  if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
	      lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
	    needDomLTPre = false;
	  }

	  for (const c of dom) {
	    hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
	    hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';
	    if (gt) {
	      if (needDomGTPre) {
	        if (c.semver.prerelease && c.semver.prerelease.length &&
	            c.semver.major === needDomGTPre.major &&
	            c.semver.minor === needDomGTPre.minor &&
	            c.semver.patch === needDomGTPre.patch) {
	          needDomGTPre = false;
	        }
	      }
	      if (c.operator === '>' || c.operator === '>=') {
	        higher = higherGT(gt, c, options);
	        if (higher === c && higher !== gt) {
	          return false
	        }
	      } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) {
	        return false
	      }
	    }
	    if (lt) {
	      if (needDomLTPre) {
	        if (c.semver.prerelease && c.semver.prerelease.length &&
	            c.semver.major === needDomLTPre.major &&
	            c.semver.minor === needDomLTPre.minor &&
	            c.semver.patch === needDomLTPre.patch) {
	          needDomLTPre = false;
	        }
	      }
	      if (c.operator === '<' || c.operator === '<=') {
	        lower = lowerLT(lt, c, options);
	        if (lower === c && lower !== lt) {
	          return false
	        }
	      } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) {
	        return false
	      }
	    }
	    if (!c.operator && (lt || gt) && gtltComp !== 0) {
	      return false
	    }
	  }

	  // if there was a < or >, and nothing in the dom, then must be false
	  // UNLESS it was limited by another range in the other direction.
	  // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
	  if (gt && hasDomLT && !lt && gtltComp !== 0) {
	    return false
	  }

	  if (lt && hasDomGT && !gt && gtltComp !== 0) {
	    return false
	  }

	  // we needed a prerelease range in a specific tuple, but didn't get one
	  // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
	  // because it includes prereleases in the 1.2.3 tuple
	  if (needDomGTPre || needDomLTPre) {
	    return false
	  }

	  return true
	};

	// >=1.2.3 is lower than >1.2.3
	const higherGT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare(a.semver, b.semver, options);
	  return comp > 0 ? a
	    : comp < 0 ? b
	    : b.operator === '>' && a.operator === '>=' ? b
	    : a
	};

	// <=1.2.3 is higher than <1.2.3
	const lowerLT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare(a.semver, b.semver, options);
	  return comp < 0 ? a
	    : comp > 0 ? b
	    : b.operator === '<' && a.operator === '<=' ? b
	    : a
	};

	subset_1 = subset;
	return subset_1;
}

var semver;
var hasRequiredSemver;

function requireSemver () {
	if (hasRequiredSemver) return semver;
	hasRequiredSemver = 1;

	// just pre-load all the stuff that index.js lazily exports
	const internalRe = requireRe();
	const constants = requireConstants();
	const SemVer = requireSemver$1();
	const identifiers = requireIdentifiers();
	const parse = requireParse();
	const valid = requireValid$1();
	const clean = requireClean();
	const inc = requireInc();
	const diff = requireDiff();
	const major = requireMajor();
	const minor = requireMinor();
	const patch = requirePatch();
	const prerelease = requirePrerelease();
	const compare = requireCompare();
	const rcompare = requireRcompare();
	const compareLoose = requireCompareLoose();
	const compareBuild = requireCompareBuild();
	const sort = requireSort();
	const rsort = requireRsort();
	const gt = requireGt();
	const lt = requireLt();
	const eq = requireEq();
	const neq = requireNeq();
	const gte = requireGte();
	const lte = requireLte();
	const cmp = requireCmp();
	const coerce = requireCoerce();
	const Comparator = requireComparator();
	const Range = requireRange();
	const satisfies = requireSatisfies();
	const toComparators = requireToComparators();
	const maxSatisfying = requireMaxSatisfying();
	const minSatisfying = requireMinSatisfying();
	const minVersion = requireMinVersion();
	const validRange = requireValid();
	const outside = requireOutside();
	const gtr = requireGtr();
	const ltr = requireLtr();
	const intersects = requireIntersects();
	const simplifyRange = requireSimplify();
	const subset = requireSubset();
	semver = {
	  parse,
	  valid,
	  clean,
	  inc,
	  diff,
	  major,
	  minor,
	  patch,
	  prerelease,
	  compare,
	  rcompare,
	  compareLoose,
	  compareBuild,
	  sort,
	  rsort,
	  gt,
	  lt,
	  eq,
	  neq,
	  gte,
	  lte,
	  cmp,
	  coerce,
	  Comparator,
	  Range,
	  satisfies,
	  toComparators,
	  maxSatisfying,
	  minSatisfying,
	  minVersion,
	  validRange,
	  outside,
	  gtr,
	  ltr,
	  intersects,
	  simplifyRange,
	  subset,
	  SemVer,
	  re: internalRe.re,
	  src: internalRe.src,
	  tokens: internalRe.t,
	  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
	  RELEASE_TYPES: constants.RELEASE_TYPES,
	  compareIdentifiers: identifiers.compareIdentifiers,
	  rcompareIdentifiers: identifiers.rcompareIdentifiers,
	};
	return semver;
}

var semverExports = requireSemver();

const $$Astro$b = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$VersionCheck = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$VersionCheck;
  const { versionCheck } = Astro2.props;
  const status = (() => {
    if (!versionCheck) return false;
    const latestVersion = Astro2.locals.StudioCMS.latestVersion;
    const comparison = semverExports.compare(currentVersion, latestVersion.version);
    return comparison === -1 ? "outdated" : comparison === 0 ? "latest" : "future";
  })();
  return renderTemplate`${renderComponent($$result, "Button", $$Button, { "size": "sm", "variant": "flat", "class": "version-container", "id": "version-modal-trigger", "title": "Click for more information", "aria-label": "Click for more information", "data-version-check": versionCheck, "data-astro-cid-gu6sux77": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<code class="version-check" data-astro-cid-gu6sux77> <span data-astro-cid-gu6sux77>v${currentVersion}</span> ${status && renderTemplate`<span${addAttribute(["status", [status]], "class:list")} data-astro-cid-gu6sux77></span>`} </code> ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/sidebar/VersionCheck.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/sidebar/VersionCheck.astro", void 0);

const components$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const currentComponents$1 = [];

						const dashboardPages$1 = currentComponents$1.map((item) => {
							const page = {
								...item,
								components: {
									PageBodyComponent: components$1[convertToSafeString(item.title + 'pageBodyComponent')],
									PageActionsComponent: components$1[convertToSafeString(item.title + 'pageActionsComponent')] || null,
									InnerSidebarComponent: item.sidebar === 'double' ? components$1[convertToSafeString(item.title + 'innerSidebarComponent')] || null : null,
								},
							};

							return page;
						});

const components = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const currentComponents = [];

						const dashboardPages = currentComponents.map((item) => {
							const page = {
								...item,
								components: {
									PageBodyComponent: components[convertToSafeString(item.title + 'pageBodyComponent')],
									PageActionsComponent: components[convertToSafeString(item.title + 'pageActionsComponent')] || null,
									InnerSidebarComponent: item.sidebar === 'double' ? components[convertToSafeString(item.title + 'innerSidebarComponent')] || null : null,
								},
							};

							return page;
						});

function getPluginDashboardPages() {
  return {
    userPages: dashboardPages,
    adminPages: dashboardPages$1
  };
}

const loggerMessage = (title, slug, admin) => `Plugin page ${title} (${slug}) is not an ${admin ? "admin" : "user"} page but is part of the ${admin ? "adminPages" : "userPages"} array, this page will not be shown in the sidebar.`;
function filterAndProcessPages(pages, admin, permission, lang) {
  const filteredPages = [];
  for (const { title: t, icon: ico, slug, requiredPermissions } of pages) {
    const href = makeDashboardRoute(slug);
    const icon = ico || "heroicons:cube-transparent";
    const title = t[lang] || t[defaultLang];
    if (admin) {
      if (requiredPermissions === void 0) {
        logger.warn(loggerMessage(title, slug, admin));
        continue;
      }
      if (requiredPermissions === "none") {
        logger.warn(loggerMessage(title, slug, admin));
        continue;
      }
      if (requiredPermissions === "visitor") {
        filteredPages.push({ title, icon, href });
        continue;
      }
      if (requiredPermissions === "editor") {
        filteredPages.push({ title, icon, href });
        continue;
      }
    } else {
      if (requiredPermissions === "admin") {
        logger.warn(loggerMessage(title, slug, admin));
        continue;
      }
      if (requiredPermissions === "owner") {
        logger.warn(loggerMessage(title, slug, admin));
        continue;
      }
    }
    if (permission?.includes(requiredPermissions || "none")) {
      filteredPages.push({ title, icon, href });
    }
  }
  return filteredPages;
}
function getSidebarLinks(lang) {
  const { adminPages, userPages } = getPluginDashboardPages();
  const baseLinks = [
    {
      key: "dashboard-link-label",
      icon: "heroicons:home",
      href: StudioCMSRoutes.mainLinks.dashboardIndex
    },
    ...filterAndProcessPages(userPages, false, ["none", "visitor"], lang)
  ];
  const editorLinks = [
    {
      key: "content-management-label",
      icon: "heroicons:pencil-square",
      href: StudioCMSRoutes.mainLinks.contentManagement
    },
    {
      key: "taxonomy-label",
      icon: "heroicons:tag",
      href: StudioCMSRoutes.mainLinks.taxonomy
    },
    ...filterAndProcessPages(userPages, false, ["editor"], lang)
  ];
  const adminLinks = [
    {
      key: "user-management-label",
      icon: "heroicons:user-group",
      href: StudioCMSRoutes.mainLinks.userManagement
    },
    ...filterAndProcessPages(adminPages, true, ["admin"], lang)
  ];
  const ownerLinks = [
    {
      key: "site-configuration-label",
      icon: "heroicons:cog-6-tooth",
      href: StudioCMSRoutes.mainLinks.siteConfiguration
    },
    {
      key: "mailer-configuration-label",
      icon: "heroicons:inbox",
      href: StudioCMSRoutes.mainLinks.smtpConfiguration
    },
    {
      key: "system-management-label",
      icon: "heroicons:server-stack",
      href: StudioCMSRoutes.mainLinks.systemManagement
    },
    ...filterAndProcessPages(adminPages, true, ["owner"], lang)
  ];
  return {
    baseLinks,
    editorLinks,
    adminLinks,
    ownerLinks
  };
}

const $$Astro$a = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$MainSidebarContent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$MainSidebarContent;
  const { versionCheck } = dashboardConfig;
  const lang = Astro2.locals.StudioCMS.defaultLang;
  const t = useTranslations(lang, "@studiocms/dashboard:sidebar");
  const sidebar = getSidebarLinks(lang);
  const { currentUser: userData } = Astro2.props;
  const { isEditor, isAdmin, isOwner } = Astro2.locals.StudioCMS.security?.userPermissionLevel ?? {
    isEditor: false,
    isAdmin: false,
    isOwner: false
  };
  const filteredPluginList = pluginsList.filter((plugin) => !!plugin.settingsPage);
  return renderTemplate`${maybeRenderHead()}<div class="sidebar-links-container" data-astro-cid-gbbroepi> <div class="sidebar-header" data-astro-cid-gbbroepi> <div class="sidebar-header-text" data-astro-cid-gbbroepi> ${renderComponent($$result, "StudioCMSLogo", $$StudioCMSLogo, { "class": "sidebar-logo", "data-astro-cid-gbbroepi": true })} <span class="sidebar-title" data-astro-cid-gbbroepi>StudioCMS</span> </div> <div class="sidebar-subtitle" data-astro-cid-gbbroepi> ${renderComponent($$result, "Group", $$Group, { "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "LanguageSelector", $$LanguageSelector, { "data-astro-cid-gbbroepi": true })} ${renderComponent($$result2, "VersionCheck", $$VersionCheck, { "versionCheck": versionCheck, "data-astro-cid-gbbroepi": true })} ${renderComponent($$result2, "Button", $$Button, { "size": "sm", "variant": "outlined", "color": "default", "id": "studiocms-theme-toggle", "data-astro-cid-gbbroepi": true }, { "default": async ($$result3) => renderTemplate` <div id="dark-content" data-astro-cid-gbbroepi> ${renderComponent($$result3, "Icon", $$Icon, { "name": "heroicons:moon-16-solid", "width": 16, "height": 16, "slot": "dark", "data-astro-cid-gbbroepi": true })} </div> <div id="light-content" data-astro-cid-gbbroepi> ${renderComponent($$result3, "Icon", $$Icon, { "name": "heroicons:sun-16-solid", "width": 16, "height": 16, "slot": "light", "data-astro-cid-gbbroepi": true })} </div> <div id="fallback-content" data-astro-cid-gbbroepi> ${renderComponent($$result3, "Icon", $$Icon, { "name": "heroicons:arrow-path-16-solid", "width": 16, "height": 16, "slot": "fallback", "data-astro-cid-gbbroepi": true })} </div> ` })} ` })} ${renderComponent($$result, "Button", $$Button, { "color": "primary", "size": "sm", "id": "nav-close", "class": "mobile-btn mid-size-btn", "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "heroicons:x-mark", "height": 16, "width": 16, "data-astro-cid-gbbroepi": true })} ` })} </div> </div> ${renderComponent($$result, "Divider", $$Divider, { "background": "background-step-1", "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "t-sidebar", "t-sidebar", { "key": "category-1-header", "data-astro-cid-gbbroepi": true }, { "default": () => renderTemplate`${t("category-1-header")}` })} ` })} <div class="sidebar-link-group" data-astro-cid-gbbroepi> ${sidebar.baseLinks.map(({ href, icon, title, key }) => {
    if (title) {
      return renderTemplate`${renderComponent($$result, "SidebarLink", $$SidebarLink, { "icon": icon, "href": href, "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate`${title}` })}`;
    }
    if (key) {
      return renderTemplate`${renderComponent($$result, "SidebarLink", $$SidebarLink, { "icon": icon, "href": href, "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "t-sidebar", "t-sidebar", { "key": key, "data-astro-cid-gbbroepi": true }, { "default": () => renderTemplate`${t(key)}` })}` })}`;
    }
  })} ${isEditor && sidebar.editorLinks.map(({ href, icon, title, key }) => {
    if (title) {
      return renderTemplate`${renderComponent($$result, "SidebarLink", $$SidebarLink, { "icon": icon, "href": href, "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate`${title}` })}`;
    }
    if (key) {
      return renderTemplate`${renderComponent($$result, "SidebarLink", $$SidebarLink, { "icon": icon, "href": href, "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "t-sidebar", "t-sidebar", { "key": key, "data-astro-cid-gbbroepi": true }, { "default": () => renderTemplate`${t(key)}` })}` })}`;
    }
  })} </div> ${isAdmin && renderTemplate`${renderComponent($$result, "Divider", $$Divider, { "background": "background-step-1", "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "t-sidebar", "t-sidebar", { "key": "category-2-header", "data-astro-cid-gbbroepi": true }, { "default": () => renderTemplate`${t("category-2-header")}` })} ` })}
    <div class="sidebar-link-group" data-astro-cid-gbbroepi> ${isOwner && sidebar.ownerLinks.map(({ href, icon, title, key }) => {
    if (title) {
      return renderTemplate`${renderComponent($$result, "SidebarLink", $$SidebarLink, { "icon": icon, "href": href, "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate`${title}` })}`;
    }
    if (key) {
      return renderTemplate`${renderComponent($$result, "SidebarLink", $$SidebarLink, { "icon": icon, "href": href, "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "t-sidebar", "t-sidebar", { "key": key, "data-astro-cid-gbbroepi": true }, { "default": () => renderTemplate`${t(key)}` })}` })}`;
    }
  })} ${sidebar.adminLinks.map(({ href, icon, title, key }) => {
    if (title) {
      return renderTemplate`${renderComponent($$result, "SidebarLink", $$SidebarLink, { "icon": icon, "href": href, "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate`${title}` })}`;
    }
    if (key) {
      return renderTemplate`${renderComponent($$result, "SidebarLink", $$SidebarLink, { "icon": icon, "href": href, "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "t-sidebar", "t-sidebar", { "key": key, "data-astro-cid-gbbroepi": true }, { "default": () => renderTemplate`${t(key)}` })}` })}`;
    }
  })} </div>
    ${renderComponent($$result, "Divider", $$Divider, { "background": "background-step-1", "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "t-sidebar", "t-sidebar", { "key": "category-3-header", "data-astro-cid-gbbroepi": true }, { "default": () => renderTemplate`${t("category-3-header")}` })} ` })}
    <div class="sidebar-link-group" data-astro-cid-gbbroepi> ${filteredPluginList.length > 0 ? filteredPluginList.map(({ identifier, name }) => renderTemplate`${renderComponent($$result, "SidebarPluginLink", $$SidebarPluginLink, { "identifier": identifier, "name": name, "data-astro-cid-gbbroepi": true })}`) : renderTemplate`<span class="empty-placeholder-span" data-astro-cid-gbbroepi> ${renderComponent($$result, "t-sidebar", "t-sidebar", { "key": "category-3-empty-placeholder", "data-astro-cid-gbbroepi": true }, { "default": () => renderTemplate` ${t("category-3-empty-placeholder")} ` })} </span>`} </div>`} </div> <div data-astro-cid-gbbroepi> ${renderComponent($$result, "Dropdown", $$Dropdown, { "id": "sidebar-user-dropdown", "options": [
    { label: t("user-dropdown:settings"), icon: "heroicons:user", value: Astro2.locals.StudioCMS.routeMap.mainLinks.userProfile },
    { label: t("user-dropdown:view-site"), icon: "heroicons:globe-alt", value: Astro2.locals.StudioCMS.routeMap.mainLinks.baseSiteURL },
    { label: t("user-dropdown:logout"), icon: "heroicons:arrow-left-start-on-rectangle", color: "danger", value: Astro2.locals.StudioCMS.routeMap.authLinks.logoutAPI }
  ], "offset": 8, "data-astro-cid-gbbroepi": true }, { "default": async ($$result2) => renderTemplate` <div class="user-dropdown-trigger-container" data-astro-cid-gbbroepi> ${renderComponent($$result2, "UserAccount", $$UserAccount, { "currentUser": userData, "data-astro-cid-gbbroepi": true })} </div> ` })} ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-gbbroepi": true })} </div> <div style="display: none;" id="dropdown-user-options"${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.userProfile, "data-settings")}${addAttribute(Astro2.locals.StudioCMS.routeMap.mainLinks.baseSiteURL, "data-view-site")}${addAttribute(Astro2.locals.StudioCMS.routeMap.authLinks.logoutAPI, "data-logout")} data-astro-cid-gbbroepi></div> ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/MainSidebarContent.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/MainSidebarContent.astro?astro&type=script&index=1&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/MainSidebarContent.astro", void 0);

const $$Astro$9 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$DoubleSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$DoubleSidebar;
  const { currentUser } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "SuiDoubleSidebar", $$Double, { "class": "sidebar" }, { "inner": ($$result2) => renderTemplate`${maybeRenderHead()}<div> ${renderSlot($$result2, $$slots["default"])} </div>`, "outer": ($$result2) => renderTemplate`<div class="outer-sidebar-container"> ${renderComponent($$result2, "MainSidebarContent", $$MainSidebarContent, { "currentUser": currentUser })} </div>` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/DoubleSidebar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/DoubleSidebar.astro", void 0);

const $$Astro$8 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$LoginChecker = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$LoginChecker;
  const { requiredPermission, currentUser } = Astro2.props;
  let [isAuthorized, emailVerified] = await Effect.runPromise(
    Effect.gen(function* () {
      const [{ isUserAllowed }, { isEmailVerified }] = yield* Effect.all([User, VerifyEmail]);
      return yield* Effect.all([
        isUserAllowed(currentUser, requiredPermission),
        isEmailVerified(currentUser)
      ]);
    }).pipe(VerifyEmail.Provide)
  );
  let redirectProfile = Astro2.locals.StudioCMS.routeMap.mainLinks.userProfile;
  if (Astro2.locals.StudioCMS.security?.emailVerificationEnabled && emailVerified === false) {
    isAuthorized = false;
    redirectProfile = Astro2.locals.StudioCMS.routeMap.mainLinks.unverifiedEmail;
  }
  const redirectLogin = Astro2.locals.StudioCMS.routeMap.authLinks.loginURL;
  return renderTemplate`${renderComponent($$result, "login-check", "login-check", { "data-is-logged-in": `${currentUser?.isLoggedIn ?? false}`, "data-authorized": `${isAuthorized}`, "data-redirect-profile": redirectProfile, "data-redirect-login": redirectLogin, "style": "display: none;" })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/LoginChecker.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/LoginChecker.astro", void 0);

const $$Astro$7 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Badge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Badge;
  const {
    color = "primary",
    icon,
    size = "md",
    variant = "outlined",
    rounding = "full",
    iconPosition = "left",
    label,
    class: className,
    ...props
  } = Astro2.props;
  let iconSize = 16;
  if (size === "sm") {
    iconSize = 8;
  } else if (size === "lg") {
    iconSize = 24;
  }
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(["sui-badge", [color, size, variant, rounding, className]], "class:list")}${spreadAttributes(props)}> ${icon && iconPosition === "left" && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "width": iconSize, "height": iconSize })}`} ${label} ${icon && iconPosition === "right" && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "width": iconSize, "height": iconSize })}`} </span>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Badge/Badge.astro", void 0);

const $$Astro$6 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Select = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Select;
  const {
    label,
    defaultValue,
    class: className,
    name = generateID("select"),
    isRequired,
    options = [],
    disabled,
    fullWidth,
    placeholder = "Select",
    multiple = false,
    max = void 0
  } = Astro2.props;
  let selected;
  if (multiple && Array.isArray(defaultValue)) {
    selected = defaultValue.map((x) => options.find((y) => y.value === x));
  } else {
    selected = options.find((x) => x.value === defaultValue);
  }
  const defaultLabel = selected ? Array.isArray(selected) ? selected.map((x) => x?.label) : selected.label : placeholder;
  return renderTemplate`${renderComponent($$result, "sui-select", "sui-select", { "id": `${name}-container`, "class:list": ["sui-select-label", [disabled && "disabled", className, fullWidth && "full"]], "data-options": JSON.stringify(options), "data-multiple": multiple ? "true" : void 0, "data-multiple-max": multiple && max !== void 0 ? max : void 0 }, { "default": () => renderTemplate` ${label && renderTemplate`${maybeRenderHead()}<label class="label"${addAttribute(`${name}-select-btn`, "for")}> ${label} <span class="req-star">${isRequired && "*"}</span> </label>`} <div class="sui-select-dropdown-container"> <button class="sui-select-button" role="combobox"${addAttribute(`${name}-dropdown`, "aria-controls")} aria-expanded="false"${addAttribute(`${name}-select-btn`, "id")}${addAttribute(disabled ? -1 : 0, "tabindex")} type="button"${addAttribute(placeholder, "aria-label")}${addAttribute(placeholder, "title")}> <span class="sui-select-value-span"${addAttribute(`${name}-value-span`, "id")}> ${Array.isArray(selected) ? renderTemplate`<div class="sui-select-badge-container">${selected.map((s) => s && renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "class": "sui-select-badge", "data-value": s.value, "size": "sm", "label": s.label, "iconPosition": "right", "icon": "heroicons:x-mark" })}`)}</div>` : selected?.label ?? defaultLabel} </span> ${renderComponent($$result, "Icon", $$Icon, { "name": "heroicons:chevron-up-down", "width": 24, "height": 24, "class": "sui-select-chevron" })} </button> <div class="sui-select-dropdown"> <ul class="sui-select-dropdown-list" role="listbox"${addAttribute(`${name}-dropdown`, "id")}> ${options.map((x, i) => {
    const isSelected = Array.isArray(selected) ? selected.map((y) => y && y.value).includes(x.value) : selected?.value === x.value;
    return renderTemplate`<li role="option"${addAttribute(x.value, "value")}${addAttribute(["sui-select-option", [
      isSelected && `selected`,
      x.disabled && "disabled"
    ]], "class:list")}${addAttribute(isSelected ? `${name}-selected` : "", "id")}${addAttribute(i, "data-option-index")}> ${x.label} </li>`;
  })} </ul> </div> </div> <select class="sui-hidden-select"${addAttribute(name, "id")}${addAttribute(name, "name")}${addAttribute(isRequired, "required")}${addAttribute(multiple ? "" : void 0, "multiple")} hidden tabindex="-1"> <option${addAttribute("", "value")}> Select </option> ${options.map((x) => {
    const isSelected = Array.isArray(selected) ? selected.map((y) => y && y.value).includes(x.value) : selected?.value === x.value;
    return renderTemplate`<option${addAttribute(x.value, "value")}${addAttribute(isSelected, "selected")}${addAttribute(x.disabled, "disabled")}> ${x.label} </option>`;
  })} </select> ${multiple && max !== void 0 && renderTemplate`<span class="sui-select-max-span"> <span class="sui-select-select-count">0</span> / ${max} selected
</span>`} ${multiple && Array.isArray(selected ?? []) && renderTemplate`<div class="sui-select-badge-container-below"></div>`} ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Select/Select.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/Select/Select.astro", void 0);

const $$Astro$5 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$SearchSelect = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$SearchSelect;
  const {
    label,
    defaultValue,
    class: className,
    name = generateID("search-select"),
    isRequired,
    options = [],
    disabled,
    fullWidth,
    placeholder = "Select",
    multiple = false,
    max = void 0
  } = Astro2.props;
  let selected;
  if (multiple && Array.isArray(defaultValue)) {
    selected = defaultValue.map((x) => options.find((y) => y.value === x));
  } else {
    selected = options.find((x) => x.value === defaultValue);
  }
  const defaultLabel = selected ? Array.isArray(selected) ? placeholder : selected.label : placeholder;
  return renderTemplate`${renderComponent($$result, "sui-combobox", "sui-combobox", { "id": `${name}-container`, "class:list": ["sui-search-select-label", [disabled && "disabled", className, fullWidth && "full"]], "data-options": JSON.stringify(options), "data-multiple": multiple ? "true" : void 0, "data-multiple-max": multiple && max !== void 0 ? max : void 0, "data-id": name }, { "default": () => renderTemplate` ${maybeRenderHead()}<div class="sui-search-select-dropdown-container"> <div class="sui-search-input-wrapper"${addAttribute(`${name}-search-input-wrapper`, "id")}> ${renderComponent($$result, "Input", $$Input, { "placeholder": defaultLabel, "role": "combobox", "aria-controls": `${name}-dropdown`, "aria-expanded": "false", "tabindex": disabled ? -1 : 0, "label": label || "", "isRequired": isRequired || false, "name": name ? `${name}-input` : void 0, "icon": {
    name: "heroicons:chevron-up-down",
    position: "right"
  } })} </div> <div class="sui-search-select-dropdown"> <ul class="sui-search-select-dropdown-list" role="listbox"${addAttribute(`${name}-dropdown`, "id")}> ${options.map((x, i) => {
    const isSelected = Array.isArray(selected) ? selected.map((y) => y && y.value).includes(x.value) : selected?.value === x.value;
    return renderTemplate`<li role="option"${addAttribute(x.value, "value")}${addAttribute(["sui-search-select-option", [
      isSelected && `selected`,
      x.disabled && "disabled"
    ]], "class:list")}${addAttribute(isSelected ? `${name}-selected` : "", "id")}${addAttribute(i, "data-option-index")}${addAttribute(x.value, "data-value")}> ${x.label} </li>`;
  })} </ul> </div> </div> <select class="sui-hidden-search-select"${addAttribute(name, "id")}${addAttribute(name, "name")}${addAttribute(isRequired, "required")}${addAttribute(multiple ? "" : void 0, "multiple")} hidden tabindex="-1"> <option${addAttribute("", "value")}> Select </option> ${options.map((x) => {
    const isSelected = Array.isArray(selected) ? selected.map((y) => y && y.value).includes(x.value) : selected?.value === x.value;
    return renderTemplate`<option${addAttribute(x.value, "value")}${addAttribute(isSelected, "selected")}${addAttribute(x.disabled, "disabled")}> ${x.label} </option>`;
  })} </select> ${multiple && max !== void 0 && renderTemplate`<span class="sui-search-select-max-span"> <span class="sui-search-select-select-count">0</span> / ${max} selected
</span>`} ${multiple && Array.isArray(selected ?? []) && renderTemplate`<div class="sui-search-select-badge-container"> ${(selected ?? []).map(
    (s) => s && renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "class": "sui-search-select-badge", "data-value": s.value, "size": "sm", "label": s.label, "iconPosition": "right", "icon": "heroicons:x-mark" })}`
  )} </div>`} ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/SearchSelect/SearchSelect.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/@studiocms+ui@1.1.1_astro@5.17.1_@types+node@25.2.1_@vercel+functions@2.2.13_@aws-sdk+credent_ol352ksmrpb2vnaeullhxl37jq/node_modules/@studiocms/ui/dist/components/SearchSelect/SearchSelect.astro", void 0);

const $$UserManagementModals = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Modal", $$Modal, { "id": "create-new-user-modal", "cancelButton": { label: "Cancel", color: "default" }, "actionButton": { label: "Confirm", color: "danger" }, "isForm": true, "data-astro-cid-tufos2tf": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="modal-body" data-astro-cid-tufos2tf> <p data-astro-cid-tufos2tf>Please save this information now. It will not be shown to you again.</p> ${renderComponent($$result2, "Input", $$Input, { "label": "Username", "name": "create-new-username", "type": "text", "isRequired": true, "data-astro-cid-tufos2tf": true })} ${renderComponent($$result2, "Input", $$Input, { "label": "Email Address", "name": "create-new-email", "type": "email", "isRequired": true, "data-astro-cid-tufos2tf": true })} ${renderComponent($$result2, "Input", $$Input, { "label": "Display Name", "name": "create-new-display_name", "type": "text", "isRequired": true, "data-astro-cid-tufos2tf": true })} ${renderComponent($$result2, "Input", $$Input, { "label": "Password", "name": "create-new-password", "type": "password", "data-astro-cid-tufos2tf": true })} ${renderComponent($$result2, "Select", $$Select, { "fullWidth": true, "name": "create-new-rank", "label": "User Rank", "defaultValue": "visitor", "options": [
    { label: "Visitor", value: "visitor" },
    { label: "Editor", value: "editor" },
    { label: "Administrator", value: "admin" },
    { label: "Owner", value: "owner" }
  ], "data-astro-cid-tufos2tf": true })} </div> `, "header": ($$result2) => renderTemplate`<h2 data-astro-cid-tufos2tf>Create New User</h2>` })} ${renderComponent($$result, "Modal", $$Modal, { "id": "create-user-invite-modal", "cancelButton": { label: "Cancel", color: "default" }, "actionButton": { label: "Confirm", color: "danger" }, "isForm": true, "data-astro-cid-tufos2tf": true }, { "default": ($$result2) => renderTemplate`  <div class="modal-body" data-astro-cid-tufos2tf> ${renderComponent($$result2, "Input", $$Input, { "label": "Username", "name": "create-user-invite-username", "type": "text", "isRequired": true, "data-astro-cid-tufos2tf": true })} ${renderComponent($$result2, "Input", $$Input, { "label": "Email Address", "name": "create-user-invite-email", "type": "email", "isRequired": true, "data-astro-cid-tufos2tf": true })} ${renderComponent($$result2, "Input", $$Input, { "label": "Display Name", "name": "create-user-invite-display_name", "type": "text", "isRequired": true, "data-astro-cid-tufos2tf": true })} ${renderComponent($$result2, "Select", $$Select, { "fullWidth": true, "name": "create-user-invite-rank", "label": "User Rank", "defaultValue": "visitor", "options": [
    { label: "Visitor", value: "visitor" },
    { label: "Editor", value: "editor" },
    { label: "Administrator", value: "admin" },
    { label: "Owner", value: "owner" }
  ], "data-astro-cid-tufos2tf": true })} </div> `, "header": ($$result2) => renderTemplate`<h2 data-astro-cid-tufos2tf>Create User Invite</h2>` })} ${renderComponent($$result, "Modal", $$Modal, { "id": "invite-response-modal", "data-astro-cid-tufos2tf": true }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Center", $$Center, { "data-astro-cid-tufos2tf": true }, { "default": ($$result3) => renderTemplate` <div class="modal-body" data-astro-cid-tufos2tf> <span data-astro-cid-tufos2tf>This will only be shown once, please save this information.</span> <div class="link-container" data-astro-cid-tufos2tf> <code id="invite-response-placeholder" data-astro-cid-tufos2tf></code> ${renderComponent($$result3, "Button", $$Button, { "color": "primary", "size": "sm", "class": "copy-btn", "data-astro-cid-tufos2tf": true }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Icon", $$Icon, { "name": "heroicons:document-duplicate-20-solid", "width": 20, "height": 20, "data-astro-cid-tufos2tf": true })} ` })} </div> </div> ` })} `, "header": ($$result2) => renderTemplate`<h2 data-astro-cid-tufos2tf>Invite Link</h2>` })} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/sidebar-modals/UserManagementModals.astro", void 0);

const changelog = "## 0.2.0\n\n- [#1197](https://github.com/withstudiocms/studiocms/pull/1197) [`4b542ec`](https://github.com/withstudiocms/studiocms/commit/4b542eca8934996f7ed9eaf1c9f040305ea5e471) Thanks [@Adammatthiesen](https://github.com/Adammatthiesen)! - Tweaks optional dependencies, and chunkSizeWarningLimit for Astro config to prevent warnings from WYSIWYG plugin\n\n- [#1219](https://github.com/withstudiocms/studiocms/pull/1219) [`9122ddd`](https://github.com/withstudiocms/studiocms/commit/9122ddd16f9c7ab61c5df227ae7a81edd8620bb0) Thanks [@Adammatthiesen](https://github.com/Adammatthiesen)! - Move to updated and migrated cli-kit package\n\n- [#1222](https://github.com/withstudiocms/studiocms/pull/1222) [`0f6b4c7`](https://github.com/withstudiocms/studiocms/commit/0f6b4c74886f09ebf35ee73d5d8579d26f8e534a) Thanks [@Adammatthiesen](https://github.com/Adammatthiesen)! - Tweaks package linking to pnpm catalog\n\n- [#1211](https://github.com/withstudiocms/studiocms/pull/1211) [`b269e44`](https://github.com/withstudiocms/studiocms/commit/b269e44d68c8fd0da8eb3147c75b7d1cc899580d) Thanks [@Adammatthiesen](https://github.com/Adammatthiesen)! - Adds regex and proper error handling to prevent illegal characters (non-url-safe) from being used for S3 objects.\n\n- [#1220](https://github.com/withstudiocms/studiocms/pull/1220) [`3324f2b`](https://github.com/withstudiocms/studiocms/commit/3324f2be74a6c7d21005d1cc0b4a8695f376c53b) Thanks [@kunjabijukchhe](https://github.com/kunjabijukchhe)! - Fixes an issue where saving a page that does not have `draft` set to true, would previously update the `publishedAt` date value.\n\n- [#1214](https://github.com/withstudiocms/studiocms/pull/1214) [`efc10be`](https://github.com/withstudiocms/studiocms/commit/efc10bee20db090fdd75463622c30dda390c50ad) Thanks [@Adammatthiesen](https://github.com/Adammatthiesen)! - Fix: Reworks permission checks for dashboard routes to be at the middleware level to prevent unauthorized access\n\n- Updated dependencies \\[[`0f6b4c7`](https://github.com/withstudiocms/studiocms/commit/0f6b4c74886f09ebf35ee73d5d8579d26f8e534a), [`93e62f6`](https://github.com/withstudiocms/studiocms/commit/93e62f65f779192403361826bc2a7fb997762521), [`2dd709f`](https://github.com/withstudiocms/studiocms/commit/2dd709f7f83efbb64c4ccb83f49db2d589ca9404), [`0f6b4c7`](https://github.com/withstudiocms/studiocms/commit/0f6b4c74886f09ebf35ee73d5d8579d26f8e534a), [`4b542ec`](https://github.com/withstudiocms/studiocms/commit/4b542eca8934996f7ed9eaf1c9f040305ea5e471), [`4b542ec`](https://github.com/withstudiocms/studiocms/commit/4b542eca8934996f7ed9eaf1c9f040305ea5e471), [`e628b43`](https://github.com/withstudiocms/studiocms/commit/e628b431f3128da1ad378138bdda2ca14794e76e), [`8a0ea71`](https://github.com/withstudiocms/studiocms/commit/8a0ea7176350b9526203d5722e1ff45d7fe6dfeb), [`59e5517`](https://github.com/withstudiocms/studiocms/commit/59e5517963cfd5f62fd3631b5ee69ae1e423ef50), [`c68668b`](https://github.com/withstudiocms/studiocms/commit/c68668b0a83341dd6cbdc378e1673017afef1d73)]:\n\n- Includes: @withstudiocms/cli-kit@0.2.0, @withstudiocms/effect@0.2.0, @withstudiocms/kysely@0.2.0, @withstudiocms/sdk@0.2.0, @withstudiocms/auth-kit@0.1.2, @withstudiocms/component-registry@0.1.2&#x20;\n";

const DTConfig = Object.freeze({
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZoneName: "short"
});
function dateWithTimeAndZone(date) {
  return date.toLocaleString(void 0, DTConfig);
}

function timeAgo(date) {
  const now = /* @__PURE__ */ new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();
  if (Number.isNaN(diffInMs)) {
    return "Invalid date";
  }
  const minutes = Math.floor(diffInMs / (1e3 * 60)) % 60;
  const hours = Math.floor(diffInMs / (1e3 * 60 * 60)) % 24;
  const days = Math.floor(diffInMs / (1e3 * 60 * 60 * 24));
  const parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (days === 0) {
    if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
    if (minutes > 0 || parts.length === 0) parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);
  }
  return `${parts.join(", ")} ago`;
}

const css = ".prose {\n  color: var(--sui-prose-body);\n  --sui-prose-body: var(--text-dimmed);\n  --sui-prose-headings: var(--text-normal);\n  --sui-prose-links: var(--primary-hover);\n  --sui-prose-bold: var(--text-normal);\n  --sui-prose-counters: var(--text-normal);\n  --sui-prose-bullets: var(--text-normal);\n  --sui-prose-hr: var(--border);\n  --sui-prose-quotes: var(--text-dimmed);\n  --sui-prose-quote-borders: var(--border);\n  --sui-prose-captions: var(--text-normal);\n  --sui-prose-kbd: var(--background-step-2);\n  --sui-prose-kbd-shadows: var(--shadow);\n  --sui-prose-code: var(--text-normal);\n  --sui-prose-pre-code: var(--text-normal);\n  --sui-prose-pre-bg: var(--background-step-2);\n  --sui-prose-th-borders: var(--border);\n  --sui-prose-td-borders: var(--border);\n  max-width: 65ch;\n  font-size: 1rem;\n  line-height: 1.75;\n}\n.prose :where(p):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 1.25em;\n  margin-bottom: 1.25em;\n}\n.prose :where(a):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-links);\n  font-weight: 500;\n  text-decoration: underline;\n}\n.prose :where(strong):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-bold);\n  font-weight: 600;\n}\n.prose :where(a strong):not(:where([class~=not-prose], [class~=not-prose] *)),\n.prose :where(blockquote strong):not(:where([class~=not-prose], [class~=not-prose] *)),\n.prose :where(thead th strong):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: inherit;\n}\n.prose :where(ol):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 1.25em;\n  margin-bottom: 1.25em;\n  padding-inline-start: 1.625em;\n  list-style-type: decimal;\n}\n.prose :where(ol[type=A]):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  list-style-type: upper-alpha;\n}\n.prose :where(ol[type=a]):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  list-style-type: lower-alpha;\n}\n.prose :where(ol[type=\"A s\"]):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  list-style-type: upper-alpha;\n}\n.prose :where(ol[type=\"a s\"]):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  list-style-type: lower-alpha;\n}\n.prose :where(ol[type=I]):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  list-style-type: upper-roman;\n}\n.prose :where(ol[type=i]):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  list-style-type: lower-roman;\n}\n.prose :where(ol[type=\"I s\"]):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  list-style-type: upper-roman;\n}\n.prose :where(ol[type=\"i s\"]):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  list-style-type: lower-roman;\n}\n.prose :where(ol[type=\"1\"]):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  list-style-type: decimal;\n}\n.prose :where(ul):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 1.25em;\n  margin-bottom: 1.25em;\n  padding-inline-start: 1.625em;\n  list-style-type: disc;\n}\n.prose :where(ol > li):not(:where([class~=not-prose], [class~=not-prose] *))::marker {\n  color: var(--sui-prose-counters);\n  font-weight: 400;\n}\n.prose :where(ul > li):not(:where([class~=not-prose], [class~=not-prose] *))::marker {\n  color: var(--sui-prose-bullets);\n}\n.prose :where(dt):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-headings);\n  margin-top: 1.25em;\n  font-weight: 600;\n}\n.prose :where(hr):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  border-color: var(--sui-prose-hr);\n  border-top-width: 1px;\n  margin-top: 3em;\n  margin-bottom: 3em;\n}\n.prose :where(blockquote):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-quotes);\n  border-inline-start-width: 0.25rem;\n  border-inline-start-style: solid;\n  border-inline-start-color: var(--sui-prose-quote-borders);\n  quotes: \"\\201c\" \"\\201d\" \"\\2018\" \"\\2019\";\n  margin-top: 1.6em;\n  margin-bottom: 1.6em;\n  padding-inline-start: 1em;\n  font-style: italic;\n  font-weight: 500;\n}\n.prose :where(h1):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-headings);\n  margin-top: 0;\n  margin-bottom: 0.888889em;\n  font-size: 2.25em;\n  font-weight: 800;\n  line-height: 1.11111;\n}\n.prose :where(h1 strong):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: inherit;\n  font-weight: 900;\n}\n.prose :where(h2):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-headings);\n  margin-top: 2em;\n  margin-bottom: 1em;\n  font-size: 1.5em;\n  font-weight: 700;\n  line-height: 1.33333;\n}\n.prose :where(h2 strong):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: inherit;\n  font-weight: 800;\n}\n.prose :where(h3):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-headings);\n  margin-top: 1.6em;\n  margin-bottom: 0.6em;\n  font-size: 1.25em;\n  font-weight: 600;\n  line-height: 1.6;\n}\n.prose :where(h3 strong):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: inherit;\n  font-weight: 700;\n}\n.prose :where(h4):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-headings);\n  margin-top: 1.5em;\n  margin-bottom: 0.5em;\n  font-weight: 600;\n  line-height: 1.5;\n}\n.prose :where(h4 strong):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: inherit;\n  font-weight: 700;\n}\n.prose :where(img):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 2em;\n  margin-bottom: 2em;\n}\n.prose :where(picture):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 2em;\n  margin-bottom: 2em;\n  display: block;\n}\n.prose :where(video):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 2em;\n  margin-bottom: 2em;\n}\n.prose :where(kbd):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-kbd);\n  padding-top: 0.1875em;\n  padding-inline-end: 0.375em;\n  padding-bottom: 0.1875em;\n  border-radius: 0.3125rem;\n  padding-inline-start: 0.375em;\n  font-family: inherit;\n  font-size: 0.875em;\n  font-weight: 500;\n}\n.prose :where(code):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-code);\n  font-size: 0.875em;\n  font-weight: 600;\n  background: var(--background-step-3);\n  padding: 0.125rem 0.25rem;\n  border-radius: 0.25rem;\n}\n.prose :where(a code):not(:where([class~=not-prose], [class~=not-prose] *)),\n.prose :where(h1 code):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: inherit;\n}\n.prose :where(h2 code):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: inherit;\n  font-size: 0.875em;\n}\n.prose :where(h3 code):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: inherit;\n  font-size: 0.9em;\n}\n.prose :where(h4 code):not(:where([class~=not-prose], [class~=not-prose] *)),\n.prose :where(blockquote code):not(:where([class~=not-prose], [class~=not-prose] *)),\n.prose :where(thead th code):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: inherit;\n}\n.prose :where(pre):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-pre-code);\n  background-color: var(--sui-prose-pre-bg);\n  padding-top: 0.857143em;\n  padding-inline-end: 1.14286em;\n  padding-bottom: 0.857143em;\n  border-radius: 0.375rem;\n  margin-top: 1.71429em;\n  margin-bottom: 1.71429em;\n  padding-inline-start: 1.14286em;\n  font-size: 0.875em;\n  font-weight: 400;\n  line-height: 1.71429;\n  overflow-x: auto;\n}\n.prose :where(pre code):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  font-weight: inherit;\n  color: inherit;\n  font-size: inherit;\n  font-family: inherit;\n  line-height: inherit;\n  background-color: #0000;\n  border-width: 0;\n  border-radius: 0;\n  padding: 0;\n}\n.prose :where(pre code):not(:where([class~=not-prose], [class~=not-prose] *)):before,\n.prose :where(pre code):not(:where([class~=not-prose], [class~=not-prose] *)):after {\n  content: none;\n}\n.prose :where(table):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  table-layout: auto;\n  width: 100%;\n  margin-top: 2em;\n  margin-bottom: 2em;\n  font-size: 0.875em;\n  line-height: 1.71429;\n}\n.prose :where(thead):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  border-bottom-width: 1px;\n  border-bottom-color: var(--sui-prose-th-borders);\n}\n.prose :where(thead th):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-headings);\n  vertical-align: bottom;\n  padding-inline-end: 0.571429em;\n  padding-bottom: 0.571429em;\n  padding-inline-start: 0.571429em;\n  font-weight: 600;\n}\n.prose :where(tbody tr):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  border-bottom-width: 1px;\n  border-bottom-color: var(--sui-prose-td-borders);\n}\n.prose :where(tbody tr:last-child):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  border-bottom-width: 0;\n}\n.prose :where(tbody td):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  vertical-align: baseline;\n}\n.prose :where(tfoot):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  border-top-width: 1px;\n  border-top-color: var(--sui-prose-th-borders);\n}\n.prose :where(tfoot td):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  vertical-align: top;\n}\n.prose :where(th, td):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  text-align: start;\n}\n.prose :where(figure > *):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.prose :where(figcaption):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  color: var(--sui-prose-captions);\n  margin-top: 0.857143em;\n  font-size: 0.875em;\n  line-height: 1.42857;\n}\n.prose :where(picture > img):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.prose :where(li):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 0.5em;\n  margin-bottom: 0.5em;\n}\n.prose :where(ol > li):not(:where([class~=not-prose], [class~=not-prose] *)),\n.prose :where(ul > li):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  padding-inline-start: 0.375em;\n}\n.prose :where(.prose > ul > li p):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 0.75em;\n  margin-bottom: 0.75em;\n}\n.prose :where(.prose > ul > li > p:first-child):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 1.25em;\n}\n.prose :where(.prose > ul > li > p:last-child):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-bottom: 1.25em;\n}\n.prose :where(.prose > ol > li > p:first-child):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 1.25em;\n}\n.prose :where(.prose > ol > li > p:last-child):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-bottom: 1.25em;\n}\n.prose :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 0.75em;\n  margin-bottom: 0.75em;\n}\n.prose :where(dl):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 1.25em;\n  margin-bottom: 1.25em;\n}\n.prose :where(dd):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 0.5em;\n  padding-inline-start: 1.625em;\n}\n.prose :where(hr + *):not(:where([class~=not-prose], [class~=not-prose] *)),\n.prose :where(h2 + *):not(:where([class~=not-prose], [class~=not-prose] *)),\n.prose :where(h3 + *):not(:where([class~=not-prose], [class~=not-prose] *)),\n.prose :where(h4 + *):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 0;\n}\n.prose :where(thead th:first-child):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  padding-inline-start: 0;\n}\n.prose :where(thead th:last-child):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  padding-inline-end: 0;\n}\n.prose :where(tbody td, tfoot td):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  padding-top: 0.571429em;\n  padding-inline-end: 0.571429em;\n  padding-bottom: 0.571429em;\n  padding-inline-start: 0.571429em;\n}\n.prose :where(tbody td:first-child, tfoot td:first-child):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  padding-inline-start: 0;\n}\n.prose :where(tbody td:last-child, tfoot td:last-child):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  padding-inline-end: 0;\n}\n.prose :where(figure):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 2em;\n  margin-bottom: 2em;\n}\n.prose :where(.prose > :first-child):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-top: 0;\n}\n.prose :where(.prose > :last-child):not(:where([class~=not-prose], [class~=not-prose] *)) {\n  margin-bottom: 0;\n}\n";

const $$Astro$4 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$VersionCheckChangelog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$VersionCheckChangelog;
  const { link, changelog } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "frame-button", "frame-button", { "data-link": link, "data-changelog": changelog, "data-styles": css }, { "default": () => renderTemplate` ${renderSlot($$result, $$slots["default"])} ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/sidebar/VersionCheckChangelog.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/sidebar/VersionCheckChangelog.astro", void 0);

const $$Astro$3 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$VersionModal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$VersionModal;
  const { lang } = Astro2.props;
  const t = useTranslations(lang, "@studiocms/dashboard:versionCheckModal");
  const latestVersion = Astro2.locals.StudioCMS.latestVersion;
  const lastChecked = new Date(Astro2.locals.StudioCMS.latestVersion.lastCacheUpdate);
  return renderTemplate`${renderComponent($$result, "Modal", $$Modal, { "id": "version-modal", "size": "lg", "data-astro-cid-oraodghz": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div data-astro-cid-oraodghz> <div class="version-modal-top-row" data-astro-cid-oraodghz> <div class="version-modal-col" data-astro-cid-oraodghz> <span class="version-modal-col-title" data-astro-cid-oraodghz>${renderComponent($$result2, "t-vcm", "t-vcm", { "key": "current-version", "data-astro-cid-oraodghz": true }, { "default": () => renderTemplate`${t("current-version")}` })}</span> <code class="version-modal-col-value" data-astro-cid-oraodghz>v${currentVersion}</code> </div> <div class="version-modal-col" data-astro-cid-oraodghz> <span class="version-modal-col-title" data-astro-cid-oraodghz>${renderComponent($$result2, "t-vcm", "t-vcm", { "key": "latest-version", "data-astro-cid-oraodghz": true }, { "default": () => renderTemplate`${t("latest-version")}` })}</span> <code id="latest-version" class="version-modal-col-value" data-astro-cid-oraodghz>v${latestVersion.version}</code> </div> <div class="version-modal-col" data-astro-cid-oraodghz> <span class="version-modal-col-title" data-astro-cid-oraodghz>${renderComponent($$result2, "t-vcm", "t-vcm", { "key": "last-check", "data-astro-cid-oraodghz": true }, { "default": () => renderTemplate`${t("last-check")}` })}</span> <span class="version-modal-col-value" data-astro-cid-oraodghz> <time id="version-modal-last-checked-date"${addAttribute(lastChecked.toISOString(), "datetime")} data-astro-cid-oraodghz>${dateWithTimeAndZone(lastChecked)}</time> <span id="latest-update-check" class="latest-update-check" data-astro-cid-oraodghz>(${timeAgo(lastChecked)})</span> </span> </div> </div> <div class="version-modal-release-notes" data-astro-cid-oraodghz> <div class="prose" data-astro-cid-oraodghz>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(parseMarkdown(changelog))}` })}</div> <span class="release-notes-read-more" data-astro-cid-oraodghz> ${renderComponent($$result2, "VersionCheckChangelog", $$VersionCheckChangelog, { "changelog": studioCMSSocials.changelog, "link": Astro2.locals.StudioCMS.routeMap.sdk.changelog, "data-astro-cid-oraodghz": true }, { "default": ($$result3) => renderTemplate`<span class="read-more-text" data-astro-cid-oraodghz>${renderComponent($$result3, "t-vcm", "t-vcm", { "key": "full-changelog", "data-astro-cid-oraodghz": true }, { "default": () => renderTemplate`${t("full-changelog")}` })}</span>` })} </span> </div> <div class="version-modal-links" data-astro-cid-oraodghz> <span class="version-modal-row-title" data-astro-cid-oraodghz>${renderComponent($$result2, "t-vcm", "t-vcm", { "key": "view-on", "data-astro-cid-oraodghz": true }, { "default": () => renderTemplate`${t("view-on")}` })}</span> <a${addAttribute(studioCMSSocials.releases, "href")} target="_blank" rel="noopener noreferrer" class="version-link" title="GitHub" aria-label="GitHub" data-astro-cid-oraodghz><span class="brand--github" data-astro-cid-oraodghz></span> </a> <a${addAttribute(studioCMSSocials.npm, "href")} target="_blank" rel="noopener noreferrer" class="version-link" title="NPM" aria-label="NPM" data-astro-cid-oraodghz><span class="brand--npm" data-astro-cid-oraodghz></span> </a> </div> </div> `, "header": ($$result2) => renderTemplate`<h2 class="inline-title" data-astro-cid-oraodghz> <span data-astro-cid-oraodghz>${renderComponent($$result2, "t-vcm", "t-vcm", { "key": "header-title", "data-astro-cid-oraodghz": true }, { "default": () => renderTemplate`${t("header-title")}` })}</span> <button${addAttribute(Astro2.locals.StudioCMS.routeMap.sdk.updateLatestVersionCache, "data-link")} id="version-modal-reload" class="reload-button" title="Check for updates" aria-label="Check for updates" data-astro-cid-oraodghz><span class="reload" data-astro-cid-oraodghz></span> </button> </h2>` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/sidebar-modals/VersionModal.astro?astro&type=script&index=0&lang.ts")}  `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/sidebar-modals/VersionModal.astro", void 0);

const $$Astro$2 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$SidebarModals = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SidebarModals;
  const { lang } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "VersionModal", $$VersionModal, { "lang": lang })} ${renderComponent($$result, "UserManagementModals", $$UserManagementModals, {})}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/SidebarModals.astro", void 0);

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$SingleSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SingleSidebar;
  const { currentUser } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Sidebar", $$Single, { "class": "sidebar" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MainSidebarContent", $$MainSidebarContent, { "currentUser": currentUser })} ` })} ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/SingleSidebar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/components/dashboard/SingleSidebar.astro", void 0);

const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$DashboardLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DashboardLayout;
  const makePageTitle = (pageName, config2, separator) => {
    const separatorString = "|";
    return `${pageName} ${separatorString} ${config2.title}`;
  };
  const {
    config,
    title: propTitle,
    description: propDescription,
    lang = defaultLang,
    requiredPermission = "unknown",
    sidebar = "single",
    currentUser
  } = Astro2.props;
  const title = makePageTitle(propTitle, config.data);
  const description = propDescription ?? config.data.description;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": lang, "title": title, "description": description, "data-astro-cid-ermac4fi": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Ambients", $$Ambients, { "data-astro-cid-ermac4fi": true })} ${renderComponent($$result2, "SidebarModals", $$SidebarModals, { "lang": lang, "data-astro-cid-ermac4fi": true })} ${requiredPermission !== "none" && renderTemplate`${renderComponent($$result2, "LoginChecker", $$LoginChecker, { "requiredPermission": requiredPermission, "currentUser": currentUser, "data-astro-cid-ermac4fi": true })}`}${sidebar === "single" && renderTemplate`${renderComponent($$result2, "SingleSidebar", $$SingleSidebar, { "currentUser": currentUser, "data-astro-cid-ermac4fi": true })}`}${sidebar === "double" && renderTemplate`${renderComponent($$result2, "DoubleSidebar", $$DoubleSidebar, { "currentUser": currentUser, "data-astro-cid-ermac4fi": true }, { "default": ($$result3) => renderTemplate` ${renderSlot($$result3, $$slots["double-sidebar"])} ` })}`}${renderSlot($$result2, $$slots["external"])} ${maybeRenderHead()}<main data-astro-cid-ermac4fi> <div class="container" data-astro-cid-ermac4fi> <div class="page-header" data-astro-cid-ermac4fi> ${renderSlot($$result2, $$slots["header"])} </div> <div class="container-content" data-astro-cid-ermac4fi> ${renderSlot($$result2, $$slots["default"])} </div> </div> </main>  ${renderScript($$result2, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/layouts/DashboardLayout.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/node_modules/.pnpm/studiocms@https+++pkg.pr.new+withstudiocms+studiocms@6056264_ioxrvcce7fgbazaiswkk3ba7fi/node_modules/studiocms/frontend/layouts/DashboardLayout.astro", void 0);

export { $$DashboardLayout as $, $$Group as a, $$Select as b, $$Badge as c };
