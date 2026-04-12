var d=()=>!!document.querySelector('[name="astro-view-transitions-enabled"]');window.addEventListener("load",()=>{d()||document.dispatchEvent(new Event("astro:page-load"))});const h={owner:new Set(["owner"]),admin:new Set(["owner","admin"]),editor:new Set(["owner","admin","editor"]),visitor:new Set(["owner","admin","editor","visitor"]),unknown:new Set(["owner","admin","editor","visitor","unknown"])},m=["/studiocms_api/","/_studiocms-devapps/","/_web-vitals"],l="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADSklEQVR4AdSWS2xMYRTHjQXRRupRKVWrJhrxSCRigTQpYUHq0VYsarwi8RgJ0rCwFJEQEQ1psZFQXWgGRZB6NdFalkSFFRutV1UJNhLj9+dcOubeud8dC2lzfvd/7vedc77TO999DB/2n/+GZgOpVCoOSegx5K/N5WJGugIsNhHusNBZqIJiQ/455tqgiDFni9QAVZthIVyBBTAWJsBKeAOL4Tw4m3MD/GebqVoBV2Ox2ArohAHog1bGZ0MfLCJ2A+pkzg1QrRpkB3X4G5p4xdhOkOknkYYSpYE5Vu2pqZ/ctUFdDXOzS5QGvlkplxyXmJ/lnAOJfgSyMh0C0AbVVJcOLkRp4JQV3GeaJmy8SQzUg6xRBxecG2CTaaffpGgli12DeVAAhaDb8CFzhXCZ2Ouokzk3YNU2ordhGXTCALyDS6AH0C10CzhbpAb4z16DHjZxVtCivWgPJCHO3BJ4i+9skRrwqrJIE1TBZCiBGmjy5qNoTg1EWSAsNlIDbLZi2AEt0A2fDPkX8BOguyFs3d/zTg1QNB+OkPUcjkMNTIfRhvzV+CfgBbGHYBR+qIU2QCG97dqpVAcjoRuOgpqYggr5GnvCuWL2ou3kjkOzWtYGKFBAdgfoPfAR1S02iw1XB0l4achXgzOJ2QaKnYt2WA1cfwtsgETNtZA2FXR/l7LYaUhx7muag5NMloI+XKahzdSKob6mRXwnGEyA7nm949dQ+D3nTmax2hN6SC0lSVcOyTTfBuhYl36/hddS8IP5zmI56y3hADW1Ye30j/g2wLQ21Ri0i0JtaE5G7g0SH8N40PsCSbegBiot7J7pv4hXw6uZViuogRkWpdvP3JzFq6E7JKNIUAP63FbwJn67KsjTSRSUA/o2XGd5Xk07/SVBDei7/zshq0Bvun6KtcIeqIUKKAM9IfNQ+RrTnGL07dBvufrtVesM5xnm2wCbZyuRer9vR+/DCFgOh0FvPX18PsP/DF9AvsY0pxjFKke5up2LqLmLuAzzbUBRJOh7vxEt57wEVKABvQgPQO+Fr6iQrzHNKWY343pNl5PfAHqWMJRpgQ0MDqVAL9RDAqphPujJmI8K+RrTnGKOMa6PlcFlfH2nBnwzHQfDwn4AAAD//6qWhy8AAAAGSURBVAMAJXQ0UKI3Vu0AAAAASUVORK5CYII=",p=`
:host {
    --border: hsl(240 5% 17%);
    --background-base: hsl(0 0% 6%);
    --background-step-1: hsl(0 0% 8%);
    --background-step-2: hsl(0 0% 10%);
    --background-step-3: hsl(0 0% 14%);
    --primary-base: hsl(259 83% 73%);
    --success-base: hsl(142 71% 46%);
    --warning-base: hsl(48 96% 53%);
    --danger-base: hsl(339 97% 31%);
    --info-base: hsl(217 92% 52%);
    --light: 70;
    --threshold: 50;
}

[data-theme="light"] {
    --border: hsl(263 5% 68%);
    --background-base: hsl(0 0% 97%);
    --background-step-1: hsl(0 0% 90%);
    --background-step-2: hsl(0 0% 85%);
    --background-step-3: hsl(0 0% 80%);
    --primary-base: hsl(259 85% 61%);
    --success-base: hsl(142 59% 47%);
    --warning-base: hsl(48 92% 46%);
    --danger-base: hsl(339 97% 31%);
    --info-base: hsl(217 92% 52%);
}

.menu_overlay {
    position: fixed;
    background: rgba(0,0,0,0.4);
    inset: 0;
    z-index: 500;
    display: none;
}

.menu_overlay.menuOpened {
    display: block;
}

.cornerMenu {
    position: fixed;
    right: 25px;
    bottom: 25px;
    width: 50px;
    height: 50px;
    background: var(--background-step-1);
    box-shadow: 0 3px 7px rgba(0,0,0,0.3);
    border-radius: 50%;
    z-index: 600;
    cursor: pointer;
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-container {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--background-step-1);
    border: 1px solid var(--border);
    object-fit: cover;
    z-index: 700;
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar {
    width: 100%;
    height: 100%;
    background: var(--background-step-1);
    border: 1px solid var(--border);
    border-radius: 50%;
    object-fit: cover;
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-error {
    width: 100%;
	height: auto;
	margin: 2.5rem;
	border: none;
}

.cornerMenu.menuOpened .avatar-container {
    transform: scale(1.5);
    border: 1px solid var(--border);
}

.menu {
    --switch: calc((var(--light) - var(--threshold)) * -100%);
    position: absolute;
    width: 32px;
    height: 32px;
    background: var(--background-step-2);
    box-shadow: 0 3px 7px rgba(0,0,0,0.1);
    border-radius: 50%;
    border: 1px solid var(--border);
    color: hsl(0, 0%, var(--switch));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    top: -5px;
    left: -5px;
    opacity: 0;
    z-index: 550;
    pointer-events: none;
    user-select: none;
    transition: all 0.4s ease-in-out;
    text-decoration: none;
}

.menu svg {
    width: 24px;
    height: 24px;
}

.cornerMenu.menuOpened .menu {
    opacity: 1;
    cursor: pointer;
    transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.15s ease;
}

.cornerMenu.menuOpened .menu:hover {
    background: var(--background-step-3);
}

/* Click protection: Only enable pointer events when menu is ready */
.cornerMenu.menu-ready .menu {
    pointer-events: all;
    box-shadow: 0 3px 7px rgba(0,0,0,0.1),
                0 0 0 1px color-mix(in hsl, var(--primary-base) 20%, transparent);
}

.cornerMenu.menu-ready .menu:hover {
    box-shadow: 0 3px 7px rgba(0,0,0,0.2),
                0 0 0 2px color-mix(in hsl, var(--primary-base) 40%, transparent);
}

/* Visual feedback for ignored clicks */
.menu.click-ignored {
    animation: shake 0.3s ease-in-out;
}

@keyframes shake {
    0%, 100% { transform: translateX(0) translateY(0); }
    25% { transform: translateX(-2px) translateY(-1px); }
    50% { transform: translateX(2px) translateY(1px); }
    75% { transform: translateX(-1px) translateY(-2px); }
}

.cornerMenu.menuOpened .menu:nth-child(1) { transform: translate(-105px, 20px); transition-delay: 0s; }
.cornerMenu.menuOpened .menu:nth-child(2) { transform: translate(-78px, -33px); transition-delay: 0.05s; }
.cornerMenu.menuOpened .menu:nth-child(3) { transform: translate(-38px, -76px); transition-delay: 0.1s; }
.cornerMenu.menuOpened .menu:nth-child(4) { transform: translate(18px, -99px); transition-delay: 0.15s; }

.menu.logout { color: var(--danger-base); }
.menu.profile { color: var(--primary-base); }
.menu.dashboard { color: var(--success-base); }
.menu.edit { color: var(--warning-base); }
`;function g(a,e){return h[e]?.has(a)??!1}function u(a){return m.some(e=>a.includes(e))}function v(a,e){return a.includes(e)}class c extends HTMLElement{sessionData=null;isMenuOpen=!1;menuItemsReady=!1;lastMenuToggleTime=0;readyTimeout=null;themeObserver=null;cornerMenu=null;menuOverlay=null;isInitialized=!1;userInteractionListeners=[];CLICK_PROTECTION_DURATION=400;MENU_READY_DELAY=350;static MENU_ITEMS=[{name:"Logout",svg:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" /></svg>',permission:"visitor",cssClass:"logout"},{name:"Profile",svg:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>',permission:"visitor",cssClass:"profile"},{name:"Dashboard",svg:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" /></svg>',permission:"editor",cssClass:"dashboard"},{name:"Edit",svg:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>',permission:"editor",cssClass:"edit"}];get menuItems(){return c.MENU_ITEMS}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const e=window.location.pathname;u(e)||this.initOnUserInteraction()}initOnUserInteraction(){const e=["mouseenter","mousemove","touchstart","scroll","keydown","click"],t=()=>{this.isInitialized||(this.removeInteractionListeners(),this.scheduleInitialization())};e.forEach(s=>{const n=t;document.addEventListener(s,n,{passive:!0,once:!0}),this.userInteractionListeners.push({event:s,handler:n})})}removeInteractionListeners(){this.userInteractionListeners.forEach(({event:e,handler:t})=>{document.removeEventListener(e,t)}),this.userInteractionListeners=[]}scheduleInitialization(){if(this.isInitialized)return;this.isInitialized=!0;const e=()=>{const t=window.location.pathname;this.initializeAsync(t).catch(s=>{console.error("UserQuickTools initialization failed:",s)})};"requestIdleCallback"in window?requestIdleCallback(e,{timeout:1e3}):setTimeout(e,0)}async initializeAsync(e){try{const t=await this.getSession();if(!t?.isLoggedIn||v(e,t.routes.dashboardIndex))return;this.sessionData=t,this.scheduleRender()}catch(t){console.warn("UserQuickTools failed to initialize:",t)}}scheduleRender(){const e=()=>{this.render(),this.setupEventListeners(),this.setupThemeObserver()};requestAnimationFrame(()=>{"requestIdleCallback"in window?requestIdleCallback(e,{timeout:500}):setTimeout(e,0)})}disconnectedCallback(){this.cleanup(),this.removeInteractionListeners()}async render(){if(!this.shadowRoot||!this.sessionData)return;this.menuOverlay=document.createElement("div"),this.menuOverlay.className="menu_overlay",this.cornerMenu=document.createElement("div"),this.cornerMenu.className="cornerMenu",this.cornerMenu.dataset.theme=document.documentElement.dataset.theme??"dark";const e=document.createElement("style");e.textContent=p,this.addMenuItems(),this.shadowRoot.append(e,this.menuOverlay,this.cornerMenu),this.addUserAvatar().catch(t=>console.warn("Avatar load failed:",t))}addMenuItems(){if(!this.cornerMenu||!this.sessionData)return;const{routes:e,permissionLevel:t}=this.sessionData,s={Logout:e.logout,Profile:e.userProfile,Dashboard:e.dashboardIndex,Edit:e.contentManagement};this.menuItems.forEach(n=>{if(g(t,n.permission)){const r=this.createMenuElement({...n,href:s[n.name]});this.cornerMenu.appendChild(r)}})}createMenuElement(e){if(e.name==="Logout")return this.createLogoutElement(e);const t=document.createElement("a");t.className=`menu ${e.cssClass}`,t.title=e.name;const r=new DOMParser().parseFromString(e.svg,"image/svg+xml").documentElement;return r&&r.nodeName==="svg"?t.appendChild(r.cloneNode(!0)):console.warn("Invalid SVG content for menu item:",e.name),t.href=e.href,t.addEventListener("click",i=>{const o=Date.now()-this.lastMenuToggleTime;if(!this.menuItemsReady||o<this.CLICK_PROTECTION_DURATION)return i.preventDefault(),i.stopPropagation(),t.classList.add("click-ignored"),setTimeout(()=>t.classList.remove("click-ignored"),300),!1}),t}createLogoutElement(e){const t=document.createElement("a");t.className=`menu ${e.cssClass}`,t.title=e.name,t.href="#";const r=new DOMParser().parseFromString(e.svg,"image/svg+xml").documentElement;return r&&r.nodeName==="svg"&&t.appendChild(r.cloneNode(!0)),t.addEventListener("click",i=>{i.preventDefault();const o=Date.now()-this.lastMenuToggleTime;if(!this.menuItemsReady||o<this.CLICK_PROTECTION_DURATION){t.classList.add("click-ignored"),setTimeout(()=>t.classList.remove("click-ignored"),300);return}this.submitLogoutForm(e.href)}),t}submitLogoutForm(e){const t=document.createElement("form");t.method="POST",t.action=e,t.style.display="none",document.body.appendChild(t),t.submit()}async testAvatarURL(e){let t;try{t=new URL(e)}catch{console.warn("Invalid avatar URL:",e);return}if(t.protocol!=="https:"){console.error(`Insecure avatar URL protocol: ${t.protocol}`);return}const s=new AbortController,n=window.setTimeout(()=>s.abort(),4e3);try{const r=await fetch(e,{method:"HEAD",signal:s.signal,cache:"no-cache"});if(!r.ok)return;const i=(r.headers.get("content-type")||"").split(";")[0].trim();if(!i.startsWith("image/"))return;if(i==="image/svg+xml"){console.error("Remote SVG avatars are disallowed for security.");return}return{type:i}}catch(r){console.warn("Avatar HEAD check failed:",r);return}finally{clearTimeout(n)}}async addUserAvatar(){if(!this.cornerMenu||!this.sessionData)return;const{user:e,permissionLevel:t}=this.sessionData,s=document.createElement("div");s.className="avatar-container";const n=document.createElement("img"),r=await(async()=>{let i=l;return e.avatar&&await this.testAvatarURL(e.avatar)&&(i=e.avatar),i})();n.src=r,n.width=64,n.height=64,n.className="avatar",n.alt=`${e.name} - ${this.capitalizeFirst(t)}`,n.loading="lazy",n.decoding="async",n.referrerPolicy="no-referrer",r===l&&n.classList.add("avatar-error"),n.onerror=function(){this.src=l},n.setAttribute("aria-hidden","true"),s.appendChild(n),this.cornerMenu.appendChild(s)}setupEventListeners(){!this.cornerMenu||!this.menuOverlay||(this.cornerMenu.addEventListener("click",this.handleMenuToggle.bind(this)),this.menuOverlay.addEventListener("click",this.handleOverlayClick.bind(this)))}handleMenuToggle(){this.lastMenuToggleTime=Date.now(),this.isMenuOpen=!this.isMenuOpen,this.isMenuOpen?(this.menuItemsReady=!1,this.cornerMenu?.classList.remove("menu-ready"),this.readyTimeout=window.setTimeout(()=>{this.menuItemsReady=!0,this.cornerMenu?.classList.add("menu-ready")},this.MENU_READY_DELAY)):(this.menuItemsReady=!1,this.cornerMenu?.classList.remove("menu-ready"),this.readyTimeout&&(clearTimeout(this.readyTimeout),this.readyTimeout=null)),this.updateMenuState()}handleOverlayClick(){this.isMenuOpen&&(this.isMenuOpen=!1,this.menuItemsReady=!1,this.cornerMenu?.classList.remove("menu-ready"),this.readyTimeout&&(clearTimeout(this.readyTimeout),this.readyTimeout=null),this.updateMenuState())}updateMenuState(){if(!this.cornerMenu||!this.menuOverlay)return;const e=this.isMenuOpen?"add":"remove";this.cornerMenu.classList[e]("menuOpened"),this.menuOverlay.classList[e]("menuOpened")}setupThemeObserver(){if(!this.cornerMenu)return;const e=()=>{const t=document.documentElement.getAttribute("data-theme");this.cornerMenu.dataset.theme=t==="light"?"light":"dark"};this.themeObserver=new MutationObserver(e),this.themeObserver.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]})}async getSession(){try{const e=new AbortController,t=setTimeout(()=>e.abort(),5e3),s=await fetch("/studiocms_api/dashboard/verify-session",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({originPathname:window.location.toString()}),signal:e.signal});return clearTimeout(t),s.ok?await s.json():null}catch(e){return e instanceof Error&&e.name==="AbortError"?console.warn("Session verification timed out"):console.warn("Session verification failed:",e),null}}capitalizeFirst(e){return e.charAt(0).toUpperCase()+e.slice(1)}cleanup(){this.themeObserver?.disconnect(),this.themeObserver=null,this.readyTimeout&&(clearTimeout(this.readyTimeout),this.readyTimeout=null),this.cornerMenu=null,this.menuOverlay=null,this.sessionData=null,this.isInitialized=!1,this.menuItemsReady=!1,this.lastMenuToggleTime=0}}class f extends c{config;constructor(){super(),this.config={strategy:this.getAttribute("data-init-strategy")||"interaction",timeout:Number.parseInt(this.getAttribute("data-timeout")||"1000",10),clickProtectionDuration:Number.parseInt(this.getAttribute("data-click-protection")||"400",10),menuReadyDelay:Number.parseInt(this.getAttribute("data-menu-delay")||"350",10)},this.config.clickProtectionDuration&&(this.CLICK_PROTECTION_DURATION=this.config.clickProtectionDuration),this.config.menuReadyDelay&&(this.MENU_READY_DELAY=this.config.menuReadyDelay)}connectedCallback(){const e=window.location.pathname;if(!u(e))switch(this.config.strategy){case"immediate":this.scheduleInitialization();break;case"idle":"requestIdleCallback"in window?requestIdleCallback(()=>this.scheduleInitialization(),{timeout:this.config.timeout}):setTimeout(()=>this.scheduleInitialization(),0);break;case"interaction":this.initOnUserInteraction();break;default:console.warn(`Unknown initialization strategy: ${this.config.strategy}`),this.initOnUserInteraction();break}}}"customElements"in window&&!customElements.get("user-quick-tools")&&customElements.define("user-quick-tools",f);function b(){const a=()=>{if(!document.querySelector("user-quick-tools")){const e=document.createElement("user-quick-tools");e.setAttribute("data-init-strategy","idle"),e.setAttribute("data-timeout","1000"),e.setAttribute("data-click-protection","400"),e.setAttribute("data-menu-delay","350"),document.body.appendChild(e)}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{setTimeout(a,0)}):setTimeout(a,0)}b();export{p as COMPONENT_STYLES,f as ConfigurableUserQuickTools,l as DEFAULT_AVATAR,m as KNOWN_API_ROUTES,h as PERMISSION_HIERARCHY,c as UserQuickTools,b as initializeWhenReady,v as isDashboardRoute,u as shouldSkipRendering,g as verifyUserPermissionLevel};
