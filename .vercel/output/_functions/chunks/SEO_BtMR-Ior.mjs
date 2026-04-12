import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, d as renderTemplate, e as renderComponent, r as renderScript, f as renderSlot, u as unescapeHTML, s as spreadAttributes, F as Fragment, o as defineScriptVars, j as renderHead } from './astro/server_D64VbtqW.mjs';
/* empty css                          */
import { DOMImplementation, XMLSerializer } from '@xmldom/xmldom';
import rough from 'roughjs';
import { a as $$Font } from './_astro_assets_BnXYBOz6.mjs';

const $$Astro$7 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Footer;
  const { class: className } = Astro2.props;
  const date = /* @__PURE__ */ new Date();
  const copyrightYears = date.getFullYear() === 2025 ? "2025" : `2025 - ${date.getFullYear()}`;
  return renderTemplate`${maybeRenderHead()}<footer${addAttribute(className, "class")} role="contentinfo"> <div class="px-space py-16 md:py-20"> <p class="text-lg w-full text-center">
© ${copyrightYears} RATIU5. All rights reserved.
</p> </div> </footer>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/global/Footer.astro", void 0);

const $$Astro$6 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$ResponsiveHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ResponsiveHeader;
  const {
    breakpoint = 768,
    closeOnEscape = true,
    closeOnResize = true,
    closeOnNavClick = true,
    closeOnBackdropClick = true,
    trapFocus = true,
    lockScroll = true,
    openClass,
    closedClass,
    stateTargets = "[data-menu], [data-backdrop]",
    class: className = "",
    initialState = "closed"
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "responsive-header", "responsive-header", { "class:list": {
    block: true,
    [className]: Boolean(className)
  }, "data-menu-state": initialState, "data-breakpoint": breakpoint, "data-close-on-escape": closeOnEscape, "data-close-on-resize": closeOnResize, "data-close-on-nav-click": closeOnNavClick, "data-close-on-backdrop-click": closeOnBackdropClick, "data-trap-focus": trapFocus, "data-lock-scroll": lockScroll, "data-open-class": openClass || "", "data-closed-class": closedClass || "", "data-state-targets": stateTargets, "data-astro-cid-xsjpuxpl": true }, { "default": () => renderTemplate` ${renderSlot($$result, $$slots["default"])} ` })}  ${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/global/header/ResponsiveHeader.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/global/header/ResponsiveHeader.astro", void 0);

function generateSketchLine(seed, width = 100, height = 8, options) {
  const {
    stroke = "#2c2c2c",
    strokeWidth = 3,
    roughness = 1.5,
    bowing = 0.5
  } = options ?? {};
  const doc = new DOMImplementation().createDocument(
    "http://www.w3.org/2000/svg",
    "svg",
    null
  );
  const svg = doc.documentElement;
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");
  const rc = rough.svg(svg);
  const line = rc.line(0, height / 2, width, height / 2, {
    stroke,
    strokeWidth,
    roughness,
    bowing,
    seed
  });
  svg.appendChild(line);
  return new XMLSerializer().serializeToString(svg);
}

const $$Astro$5 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$SketchDivider = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$SketchDivider;
  const {
    stroke = "#2c2c2c",
    roughness = 2,
    strokeWidth = 2,
    height = 8,
    seed = 12345,
    class: className = ""
  } = Astro2.props;
  const svg = generateSketchLine(seed, 1e3, height, {
    stroke,
    strokeWidth,
    roughness,
    bowing: 0.5
  });
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["sketch-divider block w-full", className], "class:list")}${addAttribute(`height: ${height}px`, "style")}>${unescapeHTML(svg)}</div> `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/ui/elements/SketchDivider.astro", void 0);

const $$Astro$4 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Button;
  const CONFIG = {
    defaults: {
      roughness: 2,
      strokeColor: "#2c2c2c",
      fillColor: "#ffffff"
    },
    button: {
      small: {
        text: "text-sm",
        padding: "px-3 py-1.5",
        depthOffset: 4,
        lineSpacing: 4
      },
      medium: {
        text: "text-base",
        padding: "px-4 py-2",
        depthOffset: 6,
        lineSpacing: 5
      },
      large: {
        text: "text-lg",
        padding: "px-6 py-3",
        depthOffset: 8,
        lineSpacing: 6
      }
    },
    link: {
      small: { text: "text-lg", underlineGap: -2, underlineHeight: 5 },
      medium: { text: "text-xl", underlineGap: -1, underlineHeight: 7 },
      large: { text: "text-2xl", underlineGap: 0, underlineHeight: 9 }
    }};
  const {
    size = "medium",
    disabled = false,
    class: className = "",
    type,
    roughness = CONFIG.defaults.roughness,
    strokeColor = CONFIG.defaults.strokeColor,
    ...rest
  } = Astro2.props;
  const isLink = type === "link";
  if (isLink && !("href" in rest)) {
    throw new Error("Button: 'href' required when type is 'link'");
  }
  const buttonConfig = CONFIG.button[size];
  const linkConfig = CONFIG.link[size];
  const depthOffset = isLink ? 0 : rest.depthOffset ?? buttonConfig.depthOffset;
  const lineSpacing = isLink ? 0 : rest.lineSpacing ?? buttonConfig.lineSpacing;
  const fillColor = isLink ? "transparent" : rest.fillColor ?? CONFIG.defaults.fillColor;
  const underlineGap = isLink ? rest.underlineGap ?? linkConfig.underlineGap : 0;
  const iconPosition = isLink ? rest.iconPosition ?? "right" : "right";
  const hasIcon = Astro2.slots.has("icon");
  const dataAttrs = {
    "data-sketch-type": type,
    "data-size": size,
    "data-roughness": roughness,
    "data-depth-offset": depthOffset,
    "data-line-spacing": lineSpacing,
    "data-stroke": strokeColor,
    "data-fill": fillColor,
    ...isLink && { "data-underline-gap": underlineGap }
  };
  const buttonClasses = [
    "sketch-button",
    "relative inline-block cursor-pointer bg-transparent border-none",
    "hover:translate-y-[3px] active:translate-y-[4px] transition-transform",
    buttonConfig.padding,
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  ];
  const linkClasses = [
    "sketch-link",
    "relative inline-block cursor-pointer",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  ];
  const buttonTextClasses = [
    "relative z-10 font-bold tracking-wide pointer-events-none font-mono",
    buttonConfig.text
  ];
  const linkTextClasses = [
    "relative font-bold tracking-wider font-sans",
    linkConfig.text
  ];
  const linkContentClasses = [
    hasIcon && "inline-flex items-center gap-1"
  ];
  return renderTemplate`${isLink ? renderTemplate`${maybeRenderHead()}<a${addAttribute(linkClasses, "class:list")}${addAttribute(rest.target === "_blank" ? "noopener noreferrer" : rest.rel, "rel")}${addAttribute(disabled, "aria-disabled")}${addAttribute(disabled ? -1 : void 0, "tabindex")} data-no-sketch-underline${spreadAttributes(dataAttrs)}${spreadAttributes(rest)}><span${addAttribute([linkTextClasses, linkContentClasses], "class:list")}${addAttribute(`color: ${strokeColor}`, "style")}>${hasIcon && iconPosition === "left" && renderTemplate`${renderSlot($$result, $$slots["icon"])}`}${renderSlot($$result, $$slots["default"])}${hasIcon && iconPosition === "right" && renderTemplate`${renderSlot($$result, $$slots["icon"])}`}</span><svg class="sketch-svg block absolute left-0 w-full"${addAttribute(`bottom: ${underlineGap}px`, "style")}${addAttribute(linkConfig.underlineHeight, "height")} aria-hidden="true"></svg></a>` : renderTemplate`<button${addAttribute(buttonClasses, "class:list")}${addAttribute(type, "type")}${addAttribute(disabled, "disabled")}${addAttribute(rest.form, "form")}${spreadAttributes(dataAttrs)}><svg class="sketch-svg absolute inset-0 pointer-events-none" aria-hidden="true"></svg><span${addAttribute(buttonTextClasses, "class:list")}${addAttribute(`color: ${strokeColor}`, "style")}>${renderSlot($$result, $$slots["default"])}</span></button>`}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/ui/elements/Button.astro", void 0);

const GithubIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g><path d=\"M5.247935562040614 4.561960784996051 C5.247935562040614 4.561960784996051, 5.247935562040614 4.561960784996051, 5.247935562040614 4.561960784996051 M5.247935562040614 4.561960784996051 C5.247935562040614 4.561960784996051, 5.247935562040614 4.561960784996051, 5.247935562040614 4.561960784996051 M3.250893034373352 8.327129577101145 C4.287909850470342 7.109217507764641, 5.582086876097503 5.8701503157594015, 7.21821853074487 3.2215507512314248 M3.2356242166016296 8.367795839761694 C4.3993620314815125 6.818571476435673, 5.789716488203975 5.6043672117270615, 7.154935023979726 3.588750151415061 M2.9600368716411505 10.351783340804872 C3.6336836297916104 9.07052565324653, 5.003929510871753 6.833961641682064, 8.574614517769119 3.081007575754133 M2.408484548312524 10.335982781153891 C4.213808329660871 8.613274952872636, 5.151313300664649 7.465884110768808, 9.32407407158303 2.5220585734424086 M2.664563582611865 11.917135507850945 C4.140016891601544 10.663388109897507, 4.954220817752933 9.490418008540855, 8.014375166744125 6.962449134181334 M3.024310307402572 11.625213556921025 C4.385972957187738 9.941699860216906, 5.760283080489803 8.16626303613203, 7.52388526122504 6.335155154292055 M7.470087164280095 6.022304127687952 C8.74219678910426 5.3863223130535, 10.434247317852053 3.97504911714097, 11.733224562839641 2.2634156516555253 M7.407364111454663 6.606715342840245 C8.406300480474535 5.224389938334202, 9.560582064298446 3.6818545676228323, 11.300178289724466 2.057352346455562 M3.1464562393087605 13.432088019285082 C3.789884827141335 12.296426336262245, 4.478803119806544 10.931786726372625, 6.610524557498396 8.683299502231963 M3.155851356224674 13.206624677919136 C4.6127856579342215 11.382410871825345, 5.766367949523103 9.930187578606992, 6.77907332141121 8.545759934726533 M8.225429500471206 7.05240311300615 C8.61470345918466 6.555594325458527, 10.131974171941339 5.697745300495384, 11.92367003188886 2.6184832596404726 M8.308607793590518 7.259775288491956 C9.928047261283243 5.374871687003503, 11.34821182852139 3.403830271742362, 12.26342892714424 2.719597959951605 M2.443360929978094 15.526054299364338 C3.6933370260396363 14.020908927602767, 4.371223860127443 12.737114544379834, 7.385032760423588 10.310050791415039 M2.742109326465548 15.66470307053496 C3.932008415211213 13.844753188416773, 5.106444806710238 12.337162697858359, 7.133169147278688 10.288536171006124 M9.668731990039673 6.788628300290704 C10.967082039464529 5.959466815466993, 12.098355608103148 4.0229214427375375, 13.413590991916925 2.7020382054035976 M9.56011572482909 6.905980236606019 C10.82493112498469 5.7727659786929575, 12.262741489303513 4.038697467924319, 13.431302856921358 2.5277737938572282 M2.8991165832041097 15.663278219940064 C4.413781658535216 15.148963950506674, 5.462168713205593 13.856814434745472, 7.304753861763637 11.2309669793316 M3.189184451695566 16.226564651417018 C4.210796185323168 14.8478756089572, 5.0921351585062 14.00415615502431, 6.979338185445279 11.749953543013223 M11.4058429613941 6.9704150608305095 C11.753982899612282 5.775058958773089, 12.279190164946783 5.380191436894014, 14.255240960311173 2.811926645592065 M10.879580838117885 7.106809893288829 C11.998538758906067 6.177111606040393, 12.424860021056963 5.471617622320805, 14.536289019986182 3.193075134945913 M3.9424011143984306 16.865848924360105 C4.873548993920379 15.25612110660554, 5.835897144200949 14.32873701715998, 6.350949149225941 13.39311062891801 M3.858178768467872 16.609574052654153 C4.696135569766068 15.914774932014932, 5.107732422808346 15.359795968409843, 6.73306988880705 13.697240500885039 M12.394500565002074 7.0317542814725265 C13.05380424326822 6.113758363935851, 13.797212503614384 5.258605791822671, 15.444721603477994 3.5826791338952177 M12.584615802999915 6.857348649928258 C13.243840144322885 5.941419432044927, 14.106220975087671 4.903654167967299, 15.038580144092446 3.852350044559593 M4.684785340746556 17.28670035792756 C5.050140307658702 17.149049175567118, 5.158733559501927 16.79025910603684, 5.340079660593188 16.64768988667289 M4.754362281752281 17.359977006503364 C4.85479999881157 17.170524808359605, 5.031333516750921 16.95171385412305, 5.357625352665129 16.630696103242496 M5.287497353900103 16.638527097510536 C6.344260831460066 15.577072812917352, 7.134457761616687 14.609944823101939, 7.306213306665237 14.40959298316474 M5.320580524077765 16.701187014804194 C6.258580991458594 15.842937536925115, 6.972699913192129 14.89735058097354, 7.358494419383043 14.30201168777998 M13.857764737664722 6.495618025305062 C14.59475842418233 5.968242253948161, 15.97062477441279 4.27819553694853, 16.31454493090049 4.033744031944085 M13.944188464883748 6.770179548029633 C14.899230909697387 5.853932768812474, 15.651338152023076 4.848143128357078, 16.37487406300205 3.609871571086585 M4.877669308810026 18.665077292700836 C5.209929101254041 18.540096422966485, 5.423226307676309 18.143700810427863, 6.148196389159023 17.109565148071844 M4.898330518492253 18.839771936599828 C5.249019275213661 18.277932958182863, 5.761210961213234 17.720166739821, 6.0816526226395045 17.194396253057125 M6.216997370358866 17.135328638281422 C6.866019400620295 16.31765500675786, 7.564543006327455 15.551953088351937, 8.016608398362369 14.908139387067273 M6.104422640760918 17.228937592453107 C6.656398451695872 16.428929268391855, 7.437081516703016 15.752219974452219, 8.063255039828084 14.933914918455462 M15.298688898582851 6.5808172714228705 C16.263125362901114 5.65343046451713, 17.02840464504468 5.126551039517444, 17.217452960211375 4.528086452858244 M15.354064884160397 6.786714030384033 C15.607767563144673 6.190441733324645, 16.06561255416277 5.698599325190198, 17.401555019097174 4.425669320906779 M5.515795074846743 19.454833498606146 C5.813579764534687 19.185176051818853, 6.030068317983756 18.90349936266423, 6.189564890458971 18.65900655816565 M5.550009784024503 19.413141414438496 C5.867909658465713 19.157984729858438, 6.1045294174355185 18.8610721192533, 6.260837574115407 18.669396233811767 M7.043289738036173 17.902647395781543 C7.553801390252264 17.009288122917788, 8.457661429050747 16.365567731656107, 9.031250393804639 15.416217515543332 M6.840085181574557 17.96968689901494 C7.748716044261926 17.130971906220356, 8.527676440776617 16.25107263668954, 8.907798480636718 15.526240278616006 M16.700928790920138 6.740384124717058 C17.00714829614156 6.238835564973649, 17.360707590565852 5.536781818244685, 18.149044497468434 5.183106562223239 M16.767432382271437 6.6046401494073965 C17.23781295409018 5.991510143502209, 17.709497134442508 5.398461945376966, 17.962899938743487 5.008105258969905 M6.280859925082406 20.01871536925045 C6.529518621659041 19.812282422477935, 6.7771354829984585 19.534606143870562, 6.940383068292586 19.261516386315083 M6.364557797420004 20.109805984669435 C6.476489300239669 19.857499847267015, 6.689505353700462 19.675419589504518, 6.9503124683570485 19.344787433377764 M8.228452239213949 17.908715804085087 C8.497859217549307 17.357764762907454, 9.007449426567693 16.881950983124945, 9.649549756538578 16.264954548508403 M8.31926735853845 17.774227245460647 C8.679976211169567 17.36750549173806, 9.097542370486684 16.786412231257206, 9.648337754198437 16.356388539856848 M18.024498654116922 6.501232668087188 C18.523878065185418 5.984843443840262, 18.935134887884722 5.424522069598553, 19.471565553678005 5.105324827113692 M18.12515775995154 6.465973765376643 C18.56448261989872 6.144724307863967, 18.917985329715894 5.663222649346746, 19.48428840637237 5.060574706930058 M7.042112418713043 20.641475230450542 C7.391234212211895 20.21886977966851, 7.635267690682634 20.067281760676238, 8.351852662537011 19.386863364763126 M7.012062884175203 20.687805706972256 C7.400494783590918 20.37230761376645, 7.729328487135525 20.012307733074834, 8.46892494776983 19.251453045976287 M18.076748205424103 8.070130705344482 C18.631273328308033 7.663559604478416, 18.65681617140592 7.29107580539278, 19.496818139733627 6.283186791985584 M18.277997196698557 7.8633094270534 C18.723639490119567 7.31177520954738, 19.20750733610401 6.929776160892713, 19.603599450831144 6.432166720933767 M8.598778873401319 20.58222195334442 C8.728362327876692 20.147410393345723, 9.385196160616799 19.740199760498985, 9.937880662013702 19.025465653849363 M8.469363097312234 20.703857095502016 C9.054069514695655 19.98911064185633, 9.47674042604597 19.42025048531032, 9.825013751466987 19.161983920802594 M18.163924725520527 9.472155272850864 C18.850351492329604 8.658994114180564, 20.003928907169936 7.5669635689217545, 20.503134361482143 6.817410996885236 M18.372274197147814 9.200904672654282 C18.654405907092833 8.904872223062336, 19.139740552858225 8.35671207728195, 20.263860006683906 7.155855119392591 M9.25327939525435 21.293882993090875 C9.25327939525435 21.293882993090875, 9.25327939525435 21.293882993090875, 9.25327939525435 21.293882993090875 M9.25327939525435 21.293882993090875 C9.25327939525435 21.293882993090875, 9.25327939525435 21.293882993090875, 9.25327939525435 21.293882993090875 M18.36507420340577 10.898882931257068 C19.2339558683879 9.8928818482556, 19.61375338119346 9.193966061562833, 20.624135757102156 8.233291596570128 M18.331450474345022 10.726645951329797 C19.030641690438994 9.99438267380175, 19.83089914374439 9.281856928512358, 20.431758027503367 8.487004196876843 M14.600402178410672 16.666974960521976 C14.600402178410672 16.666974960521976, 14.600402178410672 16.666974960521976, 14.600402178410672 16.666974960521976 M14.600402178410672 16.666974960521976 C14.600402178410672 16.666974960521976, 14.600402178410672 16.666974960521976, 14.600402178410672 16.666974960521976 M18.681588968081495 11.972097967280785 C19.43833209706424 11.159310898067051, 20.42489567594368 10.404448706422565, 21.055908084827013 9.034582945218805 M18.37470297201942 12.04650588940734 C19.36060085622819 11.26574143940469, 20.010399970970337 10.39106792058564, 21.320399491738797 9.151115946937121 M14.192236352385684 17.392804387365977 C16.255025377198756 15.709805261566455, 17.689405375968693 14.10976002250218, 21.354808987865603 10.79725549058148 M14.572039436585156 18.260523299536196 C16.511068158911545 15.76687818352907, 18.200977586747236 14.591548610187013, 21.262323938030978 10.894795148791964 M15.6365963092046 19.726510407535375 C18.445608412152765 15.462209345891164, 19.774792386388963 12.395551240969136, 22.655021928034895 11.18784130408621 M14.554645121185034 19.890085030286006 C17.13633700172395 16.91853875902306, 19.339330616630573 14.321812731940664, 21.60712529199191 11.267972416177685 M15.000805026641862 20.775950604987422 C18.63534210056402 16.503274534834876, 21.383244996088038 14.732184230480033, 21.836322344574974 12.659324749651198 M15.146735064721662 19.79652024490663 C18.384205082874487 17.03774729606193, 20.780781672245595 14.839505524657685, 22.268804066839508 12.994360514899345 M16.279653361722932 22.209139079885432 C17.739026530543214 19.48548263269658, 19.50655683487751 15.829747233863333, 21.90377277075703 14.530931163131626 M15.486914315797966 21.381049028864137 C16.86117731555338 19.57831679046775, 18.817860465903248 18.364061115557757, 21.667190467489757 14.930250893767694\" stroke=\"currentColor\" stroke-width=\"0.5\" fill=\"none\"/><path d=\"M12 2 C5.805377039275886 2.968322185957812, 2.4962700410530987 5.492131193477326, 1.822492607463594 11.868995527441953 M10.636164430364548 1.153202538855155 C6.45926308526767 3.429029477810002, 3.901136695699557 7.504743245259226, 1.791658514648831 12.261729908426993 M2 12 C0.5828403858914788 17.34153976742213, 3.7812645835728964 19.01175963388549, 7.728969237523772 20.8048369869789 M0.7497500084510234 10.826548864867513 C0.3291524897113194 16.77664151370922, 5.801906319475283 19.248315266234844, 7.94645834967566 22.52004106580109 M8.84 21.5 C8.341391976549719 22.519886398825918, 8.455479120504119 21.373481089102857, 9.250437326419561 22.399866682967218 M10.493414010427614 20.14592508056264 C8.786927125939165 22.966155327658647, 8.997128254453944 19.468637954870196, 7.62125946284786 20.876617123544495 M9.420518852914725 21.08179859076565 C9.499356260098887 20.4502692632097, 9.555887444244826 19.974787852237206, 9.564466824698052 19.35421333675679 M9.489084684456154 20.945776940015218 C9.511542708546246 20.439926735217842, 9.556390737420067 19.9628308150432, 9.448575921338616 19.336551200825046 M9.5 19.31 C7.46330817068525 18.48062794905235, 5.092469604633743 19.449810748703012, 7.47096998281729 19.106279112366384 M9.542129449904797 18.762726909830487 C6.984030293586997 21.807209542044472, 7.992783183888258 17.779227207574017, 7.00434214967407 18.378923568834036 M6.140000000000001 17.97 C5.606393573911694 17.211782515855468, 3.801551567593955 16.82281168685352, 3.6610968328472078 15.102232941291888 M6.55872340224722 19.56823193490231 C5.020966940121607 17.571019433111307, 6.4498443610221985 17.42882655463258, 4.844136080243564 16.59395441154954 M5.03 16.5 C4.544402647206722 16.683559475315278, 6.386914038344573 15.654063493297162, 5.905300561039234 14.453637130007301 M6.567271651645001 16.651250158264688 C4.986466786188641 14.119305525600957, 4.577357358991513 17.096753449528084, 3.606157973058327 14.112157455469003 M5.1000000000000005 15.9 C7.427926197885641 15.887084769529032, 6.834960832978783 16.402753539404088, 6.845313678829447 18.44086770692784 M3.783703935917182 17.468314143878796 C7.509695101680397 15.532478729910213, 6.56244308370876 16.039296997383094, 8.477043752287507 18.49267052336317 M6.630000000000001 16.93 C6.243138124259075 19.156237359147994, 7.7454352379179054 19.51537586940356, 10.436076221913112 19.274459079679552 M7.366157460721856 18.016944982306054 C8.684249725561902 18.928154845471944, 10.22843723711628 16.705979542059442, 10.231053304509016 18.55989250110176 M9.540000000000001 17.759999999999998 C7.973281795773809 16.16671092830169, 8.478542200452354 17.180996800553466, 11.678535279720968 16.566914230250916 M8.05624695919904 17.9741500839095 C8.507256274081639 16.056496703101818, 11.420095146157214 15.506673763947468, 8.555072438982211 17.37268962251089 M10.170000000000002 16.419999999999998 C8.895274995248474 17.138442650664977, 4.907398710806206 14.700113803289344, 7.05931786920107 10.296819988732977 M8.92117795066934 15.263541217874893 C9.76832221037922 17.68433098489755, 4.429006144177318 13.498250862711352, 6.931475404762114 9.758707841376522 M5.620000000000002 11.499999999999998 C5.778760670164519 11.58145029457829, 6.009528804043804 8.101072461366861, 6.88488441328943 8.248403535129293 M5.073959675215821 11.994110041609025 C4.338808023524365 10.686944147760995, 5.774459880773038 10.42421094031796, 6.172283984635733 9.315290751107172 M6.650000000000002 8.79 C4.936234015117907 9.007761975354814, 6.660140932172602 8.808122828796517, 7.086859455997751 5.537343757233541 M5.091524790441089 9.906645265503926 C7.987265787115044 7.500498489946343, 6.440813193532877 8.096488177013319, 7.988422340003682 6.603004896873753 M6.750000000000002 6.149999999999999 C8.38263397564496 7.741842383437394, 7.738751590248862 6.03908761995049, 9.295830914283167 7.7442959087343715 M5.259550166126098 7.542659693522343 C8.642643081273441 4.947214418929187, 7.1749014911662155 4.052815462489756, 8.085525204086075 5.934974636035033 M9.500000000000002 7.169999999999998 C9.823210284866697 7.332173862785626, 11.181923256276223 6.602081873063738, 13.570751649823553 6.812515625063849 M11.134624899696638 8.37247812946742 C8.57683014087333 6.965869789487783, 10.745730697476102 6.440880069143823, 13.438599055389595 8.35723754551979 M12.000000000000002 6.839999999999998 C11.819064807458787 5.705154882994459, 14.548075188496453 6.986329735247455, 15.088402448346162 7.166186711687715 M11.280684393222643 8.433877349230611 C11.829313096224109 8.487776125636085, 15.63056073349086 7.432299311739808, 15.220932594777546 6.518710574733087 M14.500000000000002 7.169999999999998 C15.621347212254351 6.774712058470923, 16.041231819168 5.456296120840018, 17.723835488550144 7.025075003108148 M13.965788073178775 8.609376925539076 C16.156349972205764 4.0803942321284, 18.258557102026924 6.029933613371704, 17.963376028755142 7.619352713549552 M17.25 6.149999999999999 C16.80219833545348 5.933811456072377, 18.1367374752703 8.678408313753776, 17.46076119787476 9.104949962869238 M18.54960680830349 4.949443702481156 C18.064132977349278 8.800760841143372, 17.91088038256833 10.248732900452238, 17.132505331309453 8.84324394535356 M17.35 8.79 C16.8313273463672 9.675836316686521, 18.97167386635605 11.060947760952956, 18.847842173790177 11.072384554552029 M18.0926121540381 7.856400528931269 C17.787540793299307 10.361071672961023, 19.85193986105305 9.306177139848701, 18.614454818453567 9.854991229086256 M18.380000000000003 11.5 C17.914192766639662 15.245551402992502, 17.53617035920683 17.726925870143553, 12.953994053130522 17.16596679796922 M17.44626758686543 12.897035324296594 C19.946220516943903 14.26016804889123, 17.751959548250447 14.896738265710583, 12.12417977208581 17.6561490642572 M13.810000000000002 16.41 C13.536758499868307 16.34717667642353, 15.077809598685134 18.951390708721775, 14.850597875828539 18.06203154475558 M13.7445540004754 16.11734716579387 C13.799651398364631 18.00736471907852, 14.853155426836677 15.780261773181437, 15.831222974194826 18.324390175312782 M14.5153701204004 18.095202147350875 C14.49798445489881 19.260992229079474, 14.676248570567726 19.979013398588965, 14.625156011939593 20.92735642302755 M14.486704645703888 18.144699196432093 C14.505447915325428 19.10464338298187, 14.551686188305633 20.02092493464471, 14.515433195427107 20.89493046519981 M14.500000000000002 21 C14.815242018412992 20.990038810930482, 15.31286913108731 22.772857684749447, 15.67223748273185 22.504767574587422 M14.654922201895818 21.916879083447583 C16.025074055982895 21.662561633533, 14.820962091591683 19.674859751410906, 14.070845477882306 20.78103289084788 M15.170000000000002 21.5 C19.59951913746231 21.67178430542053, 21.004368872439258 16.104318887757884, 21.103895687847924 11.844137547901093 M16.21632384364698 20.852352178725894 C19.80260486652816 19.545601736895318, 21.003184824550488 17.326901751628778, 20.241209021356454 13.20200272902079 M22 12 C23.309075518694215 4.9028916314526825, 17.691807065012405 2.3604347241746635, 11.136117158617047 2.7891162200762847 M22.667511558854617 11.20522549765897 C22.447435672027545 4.748713897541545, 17.344987043973433 0.6136774971156971, 11.793451329121364 3.2285305138330855\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/></g></svg>";

const HamburgerIcon = "<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n\tclass=\"sketch-icon-svg\"\n\twidth=\"32\"\n\theight=\"32\"\n\tviewBox=\"0 0 32 32\"\n\taria-hidden=\"true\"\n\tdata-initialized=\"true\"\n>\n\t<g>\n\t\t<path\n\t\t\td=\"M2.526895433664322 7.769478410482407 C5.400246489048005 6.3919931567907335, 17.568427866697313 3.719520202994347, 28.810686975717545 0.6710048615932465 M4.668873593211174 3.197217896580696 C13.350490227341652 5.295840908527374, 19.675463184714317 1.9506122364997864, 29.251426979899406 3.6317467242479324\"\n\t\t\tstroke=\"currentColor\"\n\t\t\tstroke-width=\"2\"\n\t\t\tfill=\"none\"\n\t\t></path>\n\t</g>\n\t<g>\n\t\t<path\n\t\t\td=\"M0.24142232909798622 17.69724788889289 C8.760846735537053 16.545153149947524, 12.44839629456401 16.08600772319734, 31.223497662693262 17.45567586645484 M5.371542466804385 17.726415114477277 C12.741840717568994 17.005072749435904, 22.873138647899033 16.52049884873629, 26.090678406879306 15.13737847097218\"\n\t\t\tstroke=\"currentColor\"\n\t\t\tstroke-width=\"2\"\n\t\t\tfill=\"none\"\n\t\t></path>\n\t</g>\n\t<g>\n\t\t<path\n\t\t\td=\"M5.9559492245316505 27.62501736730337 C12.1214469820261 26.986313143104315, 15.328364722430706 28.740495243400336, 25.63630834966898 26.240346871316433 M2.0742113403975964 28.255612332373857 C12.133191207796337 28.71430459034443, 22.07081411108375 27.090385460972787, 26.929929833859205 26.64301021769643\"\n\t\t\tstroke=\"currentColor\"\n\t\t\tstroke-width=\"2\"\n\t\t\tfill=\"none\"\n\t\t></path>\n\t</g>\n</svg>\n";

const $$Astro$3 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Header;
  const { class: className } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  const navItems = [{ href: "/", label: "articles" }];
  const iconLinks = [
    // { href: "/search", label: "Search", icon: SearchIcon },
    { href: "https://github.com/RATIU5", label: "GitHub", icon: GithubIcon }
  ];
  const isExternal = (url) => url.startsWith("http://") || url.startsWith("https://");
  return renderTemplate`${renderComponent($$result, "ResponsiveHeader", $$ResponsiveHeader, { "class:list": ["sticky top-0 z-mobile-menu bg-paper", {
    [className]: Boolean(className)
  }], "breakpoint": 768, "closeOnNavClick": true, "openClass": "opacity-100 pointer-events-auto", "closedClass": "opacity-0 pointer-events-none" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<nav class="relative hidden md:block px-space pt-5"> <div class="w-full flex flex-col gap-4"> <div class="flex items-center justify-between"> <div class="flex items-center gap-6"> ${navItems.map((item) => renderTemplate`${renderComponent($$result2, "Button", $$Button, { "type": "link", "size": "large", "href": item.href, "aria-current": currentPath === item.href ? "page" : void 0 }, { "default": ($$result3) => renderTemplate`${item.label}` })}`)} </div> <div class="flex items-center gap-4 [&_svg]:w-9 [&_svg]:h-9"> ${iconLinks.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(isExternal(item.href) ? "_blank" : void 0, "target")}${addAttribute(isExternal(item.href) ? "noopener noreferrer" : void 0, "rel")}${addAttribute(item.label, "aria-label")} class="hover:rotate-6 focus:rotate-6 hover:scale-110 focus:scale-110"> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(item.icon)}` })} </a>`)} </div> </div> ${renderComponent($$result2, "SketchDivider", $$SketchDivider, { "roughness": 5 })} </div> </nav> <div class="mobile-header px-space pt-3 md:hidden"> <div class="flex items-center justify-end"> <div class="flex items-center gap-3"> <button type="button" data-trigger aria-label="Toggle menu" class="p-2 -mr-2 text-neutral-900"> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(HamburgerIcon)}` })} </button> </div> </div> ${renderComponent($$result2, "SketchDivider", $$SketchDivider, { "roughness": 5, "class": "in-data-[menu-state='open']:hidden" })} </div> <div data-backdrop class="md:hidden fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-mobile-backdrop opacity-0 pointer-events-none"></div> <div data-menu class="md:hidden fixed inset-0 z-mobile-menu bg-neutral-50 flex flex-col opacity-0 pointer-events-none" role="dialog" aria-modal="true" aria-label="Mobile navigation"> <div class="px-space py-3"> <div class="flex items-center justify-end"> <button type="button" data-close aria-label="Close menu" class="p-2 -mr-2 text-neutral-900"> <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" data-initialized="true"> <g> <path d="M5.053790867328644 7.538956820964813 C5.875183393716814 9.655774499177934, 17.41154614901543 17.326616777181627, 25.62137395143509 25.342009723186493 M3.337747186422348 4.394435793161392 C11.162762935638428 12.026490578174592, 18.21270885038376 16.626841995239257, 28.502853959798813 29.263493448495865" stroke="currentColor" stroke-width="2" fill="none"></path> </g> <g> <path d="M26.768317762762308 5.466726299375296 C23.22848082603514 7.957512302502991, 16.252419603332875 17.841790001645684, 4.034184638410807 30.126680728048086 M28.04041606001556 2.923633011057973 C18.77073198610544 12.20877833122015, 14.020494542807338 20.18222992399335, 5.342105386778712 28.769125195220113" stroke="currentColor" stroke-width="2" fill="none"></path> </g> </svg> </button> </div> ${renderComponent($$result2, "SketchDivider", $$SketchDivider, { "roughness": 5, "class": "hidden in-data-[menu-state='open']:block" })} </div> <nav class="flex-1 flex flex-col items-center justify-center px-space pb-32 overflow-y-auto"> <h2 class="text-7xl font-serif tracking-widest mb-32">menu</h2> <div class="flex flex-col gap-4"> ${navItems.map((item) => renderTemplate`${renderComponent($$result2, "Button", $$Button, { "type": "link", "size": "large", "href": item.href, "aria-current": currentPath === item.href ? "page" : void 0, "class": "text-4xl" }, { "default": ($$result3) => renderTemplate`${item.label}` })}`)} </div> <div class="flex items-center gap-8 mt-12 [&_svg]:w-12 [&_svg]:h-12"> ${iconLinks.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(isExternal(item.href) ? "_blank" : void 0, "target")}${addAttribute(isExternal(item.href) ? "noopener noreferrer" : void 0, "rel")}${addAttribute(item.label, "aria-label")} class="text-neutral-900 hover:rotate-6 focus:rotate-6 hover:scale-110 focus:scale-110"> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(item.icon)}` })} </a>`)} </div> </nav> </div> ` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/global/header/Header.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$SketchLinks = createComponent(($$result, $$props, $$slots) => {
  const VARIANT_COUNT = 10;
  const underlineSvgs = Array.from(
    { length: VARIANT_COUNT },
    (_, i) => generateSketchLine(1e4 + i * 1337, 100, 8)
  );
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<script>(function(){", '\n(() => {\n	let idx = 0;\n\n	const initSketchLinks = () => {\n		const links = document.querySelectorAll(".prose a:not(.anchor-link):not([data-no-sketch-underline]), a[data-sketch-prose]:not(.anchor-link):not([data-no-sketch-underline])");\n		links.forEach((link) => {\n			if (link.dataset.sketchProseInit) return;\n\n			link.style.position = "relative";\n			link.style.display = "inline-block";\n			link.style.textDecoration = "none";\n\n			const wrapper = document.createElement("span");\n			wrapper.innerHTML = underlineSvgs[idx % underlineSvgs.length];\n			idx++;\n			const svg = wrapper.firstChild;\n\n			svg.style.position = "absolute";\n			svg.style.left = "0";\n			svg.style.bottom = "5px";\n			svg.style.width = "100%";\n			svg.style.height = "6px";\n			svg.style.pointerEvents = "none";\n			svg.classList.add("sketch-underline");\n\n			link.appendChild(svg);\n			link.dataset.sketchProseInit = "true";\n		});\n	};\n\n	initSketchLinks();\n	document.addEventListener("astro:page-load", () => {\n		idx = 0;\n		initSketchLinks();\n	});\n})();\n})();<\/script> '])), defineScriptVars({ underlineSvgs }));
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/global/SketchLinks.astro", void 0);

const $$SketchButtons = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/global/SketchButtons.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/global/SketchButtons.astro", void 0);

const $$SketchCodeBlocks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/global/SketchCodeBlocks.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/global/SketchCodeBlocks.astro", void 0);

const $$DitherImages = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/global/DitherImages.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/global/DitherImages.astro", void 0);

const $$Astro$2 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Base;
  const { class: className } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}>${renderComponent($$result, "Font", $$Font, { "cssVariable": "--ftg", "preload": true })}${renderComponent($$result, "Font", $$Font, { "cssVariable": "--cm", "preload": true })}${renderComponent($$result, "Font", $$Font, { "cssVariable": "--typrighter", "preload": true })}<link rel="alternate" type="application/rss+xml" title="RATIU5 RSS Feed" href="/rss.xml">${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body${addAttribute({ "min-h-screen": true, [className]: Boolean(className) }, "class:list")}> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "SketchLinks", $$SketchLinks, {})} ${renderComponent($$result, "SketchButtons", $$SketchButtons, {})} ${renderComponent($$result, "SketchCodeBlocks", $$SketchCodeBlocks, {})} ${renderComponent($$result, "DitherImages", $$DitherImages, {})} </body></html>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/layouts/Base.astro", void 0);

const $$Page = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "class": "flex flex-col" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "Header", $$Header, { "class": "shrink-0" })} ${renderSlot($$result2, $$slots["default"])} ${renderComponent($$result2, "Footer", $$Footer, { "class": "shrink-0" })} `, "head": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["head"])}` })}`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/layouts/Page.astro", void 0);

const $$Astro$1 = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$ProseMain = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProseMain;
  const { class: classNames = "", isArticle = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<main${addAttribute(["px-space", [
    classNames
  ]], "class:list")}> <div class="prose max-w-none prose-headings prose-anchor prose-precode prose-lists"> ${renderSlot($$result, $$slots["default"])} ${isArticle && renderTemplate`<div class="flex w-full justify-end"> <p class="font-bold">~~RATIU5</p> </div>`} </div> </main>`;
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/ui/sections/ProseMain.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://portfolio-2025-five-pearl.vercel.app");
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SEO;
  const {
    title,
    description,
    image,
    type = "website",
    publishedAt,
    siteName = "RATIU5"
  } = Astro2.props;
  const canonical = new URL(Astro2.url.pathname, Astro2.site);
  const jsonLd = type === "article" ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: canonical.href,
    ...image && { image },
    ...publishedAt && { datePublished: publishedAt }
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: canonical.href,
    description
  };
  return renderTemplate(_a || (_a = __template(["<title>", " | ", '</title><meta name="description"', '><link rel="canonical"', '><!-- Open Graph --><meta property="og:type"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:site_name"', '><meta property="og:locale" content="en_US">', "", '<!-- Twitter Card --><meta name="twitter:card"', '><meta name="twitter:title"', '><meta name="twitter:description"', ">", '<!-- JSON-LD Structured Data --><script type="application/ld+json">', "<\/script>"])), title, siteName, addAttribute(description, "content"), addAttribute(canonical.href, "href"), addAttribute(type, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(canonical.href, "content"), addAttribute(siteName, "content"), image && renderTemplate`<meta property="og:image"${addAttribute(image, "content")}>`, publishedAt && renderTemplate`<meta property="article:published_time"${addAttribute(publishedAt, "content")}>`, addAttribute(image ? "summary_large_image" : "summary", "content"), addAttribute(title, "content"), addAttribute(description, "content"), image && renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>`, unescapeHTML(JSON.stringify(jsonLd)));
}, "/Users/john.memmott/Developer/ratiu5/portfolio-2025/src/components/global/SEO.astro", void 0);

export { $$Page as $, $$SEO as a, $$ProseMain as b, $$Button as c };
