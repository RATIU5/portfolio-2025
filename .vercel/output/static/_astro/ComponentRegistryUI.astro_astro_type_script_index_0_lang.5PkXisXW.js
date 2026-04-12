import{k as d}from"./client.BCzGrtn1.js";import"./preload-helper.BlTxHScW.js";class u extends HTMLElement{constructor(){super(...arguments),this.registryData=[],this.selectedComponent=null,this.propValues=new Map,this.modalOpen=!1,this.noOutput=!1,this.triggerId=null,this.translations={},this.currentLang="en",this.localStorageLangKey=null}t(t){return this.translations[this.currentLang]?.[t]??this.translations.en[t]??t}getCurrentLocale(){if(this.localStorageLangKey){const e=localStorage.getItem(this.localStorageLangKey);if(e)return e}const t=document.documentElement.lang;return t&&this.translations[t]?t:"en"}connectedCallback(){const t=this.getAttribute("data-registry");if(t)try{this.registryData=JSON.parse(t)}catch(s){console.error("Failed to parse registry data:",s)}const e=this.getAttribute("data-lang-storage-key");e&&(this.localStorageLangKey=e);const n=this.getAttribute("data-translations");if(n)try{this.translations=JSON.parse(n),this.currentLang=this.getCurrentLocale()}catch(s){console.error("Failed to parse translations:",s)}else throw new Error("No translations provided");const o=this.getAttribute("data-no-output");if(this.noOutput=o==="true",this.triggerId=this.getAttribute("data-trigger-id"),this.triggerId){const s=document.getElementById(this.triggerId);s?s.addEventListener("click",()=>this.openModal()):console.warn(`ComponentRegistryUI: Trigger element with ID "${this.triggerId}" not found.`)}else throw new Error("ComponentRegistryUI: triggerId attribute is required.");d.subscribe(s=>{this.handleLanguageChange(s)})}handleLanguageChange(t){this.translations[t]?(this.currentLang=t,this.modalOpen&&this.rerenderModal()):console.warn(`Translation for language "${t}" not found. Available languages: ${Object.keys(this.translations).join(", ")}`)}rerenderModal(){const t=this.querySelector(".modal-overlay");if(!t)return;const e=t.classList.contains("hidden");t.remove(),this.renderModal();const n=this.querySelector(".modal-overlay");n&&!e&&n.classList.remove("hidden"),this.selectedComponent?(this.renderComponentList(),this.renderPropsSection(),this.renderOutputSection()):this.renderComponentList()}openModal(){if(this.modalOpen)return;this.modalOpen=!0;let t=this.querySelector(".modal-overlay");t||(this.renderModal(),t=this.querySelector(".modal-overlay")),t&&(t.classList.add("hidden"),requestAnimationFrame(()=>{t?.classList.remove("hidden")}))}closeModal(){this.modalOpen=!1;const t=this.querySelector(".modal-overlay");t&&t.classList.add("hidden"),this.selectedComponent=null,this.propValues.clear()}selectComponent(t){this.selectedComponent=t,this.propValues.clear(),t.props.forEach(e=>{e.defaultValue?this.propValues.set(e.name,e.defaultValue):this.propValues.set(e.name,"")}),this.updateModalContent()}generateHTMLString(){if(!this.selectedComponent)return"";const t=this.selectedComponent.name,e=[];return this.selectedComponent.props.forEach(n=>{const o=this.propValues.get(n.name);o&&e.push(`${n.name}="${o}"`)}),e.length>0?`<${t} ${e.join(" ")}></${t}>`:`<${t}></${t}>`}copyToClipboard(){const t=this.generateHTMLString(),e=this.querySelector(".copy-button");if(!e)return;const n=e.textContent;navigator.clipboard.writeText(t).then(()=>{e.textContent=this.t("copiedSuccess"),setTimeout(()=>{e.textContent=n},2e3)}).catch(o=>{console.error(this.t("copyFailed"),o),e.textContent=this.t("copyFailed"),setTimeout(()=>{e.textContent=n},2e3)})}renderModal(){const t=document.createElement("div");t.className="modal-overlay hidden",t.innerHTML=`
        <div class="modal-container">
          <div class="modal-header">
            <h2 class="modal-title">${this.t("modalTitle")}</h2>
            <button class="close-button" type="button" aria-label="${this.t("closeButton")}">&times;</button>
          </div>
          <div class="modal-body">
            <div class="modal-content-row">
              <div class="component-list-wrapper">
                <div class="component-list"></div>
              </div>
              <div class="props-wrapper" style="display: none;">
              </div>
            </div>
            <div class="output-wrapper">
              <div class="output-section" style="display: none;"></div>
            </div>
          </div>
        </div>
      `,t.querySelector(".close-button")?.addEventListener("click",()=>this.closeModal()),t.addEventListener("click",e=>{e.target===t&&this.closeModal()}),this.appendChild(t),this.renderComponentList()}createDisplayName(t){return t.replace(/-/g," ").replace(/\b\w/g,n=>n.toUpperCase())}renderComponentList(){const t=this.querySelector(".component-list");if(t){if(t.innerHTML="",this.registryData.length===0){t.innerHTML=`<div class="empty-state">${this.t("noComponentsFound")}</div>`;return}this.registryData.forEach(e=>{const n=document.createElement("div");n.className="component-card",this.selectedComponent?.name===e.name&&n.classList.add("selected"),n.innerHTML=`
          <h3 class="component-name">${this.createDisplayName(e.name)}</h3>
          <div class="component-tag-display">${this.t("tagLabel")}: &lt;${e.name}&gt;</div>
        `,n.addEventListener("click",()=>this.selectComponent(e)),t.appendChild(n)})}}updateModalContent(){this.renderComponentList(),this.renderPropsSection(),this.renderOutputSection()}renderPropsSection(){const t=this.querySelector(".props-wrapper");if(!(!t||!this.selectedComponent)){if(t.style.display="block",t.innerHTML=`<h3 class="props-title">${this.t("componentPropsTitle")}</h3>`,this.selectedComponent.props.length===0){t.innerHTML+=`<div class="empty-state">${this.t("noPropsAvailable")}</div>`;return}this.selectedComponent.props.forEach(e=>{const n=document.createElement("div");n.className="prop-group";const o=this.t("optionalLabel"),s=e.optional?`${e.type} (${o})`:e.type,a=e.description?` - ${e.description}`:"",i=`prop-${e.name}-${Date.now()}`,r=this.noOutput?e.defaultValue?e.defaultValue:this.t("noDefaultValue"):`${this.t("enterPlaceholder")} ${e.name}...`;n.innerHTML=`
          <label class="prop-label" for="${i}">
            ${e.name}
            <span class="prop-info">${s}${a}</span>
          </label>
          <input
            type="text"
            class="prop-input"
            id="${i}"
            name="${e.name}"
            data-prop-name="${e.name}"
            value="${this.noOutput?"":this.propValues.get(e.name)}"
            placeholder="${r}"
            ${this.noOutput?"readonly disabled":""}
          />
        `,n.querySelector("input")?.addEventListener("input",l=>{const c=l.target;this.propValues.set(e.name,c.value),this.renderOutputSection()}),t.appendChild(n)})}}renderOutputSection(){const t=this.querySelector(".output-section");if(!t||!this.selectedComponent)return;if(this.noOutput){t.style.display="none";return}t.style.display="block";const e=this.generateHTMLString();t.innerHTML=`
        <h3 class="output-title">${this.t("generatedHtmlTitle")}</h3>
        <pre class="code-container scrollbar output-code"><code class="custom-code">${this.escapeHtml(e)}</code></pre>
        <div class="button-group">
          <button class="sui-button md primary copy-button" type="button">
            ${this.t("copyToClipboard")}
          </button>
          <button class="sui-button md danger reset-button" type="button">
            ${this.t("resetProps")}
          </button>
        </div>
      `,t.querySelector(".copy-button")?.addEventListener("click",()=>this.copyToClipboard()),t.querySelector(".reset-button")?.addEventListener("click",()=>{this.selectedComponent&&this.selectComponent(this.selectedComponent)})}escapeHtml(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}}customElements.get("component-registry-modal")||customElements.define("component-registry-modal",u);
