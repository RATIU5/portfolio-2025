import{k as $}from"./client.BCzGrtn1.js";import"./preload-helper.BlTxHScW.js";const y=/^[a-zA-Z0-9._-]+(?:\/[a-zA-Z0-9._-]+)*$/;class m extends Error{#e;constructor(e){super("The following filenames are invalid: (Only alphanumeric characters and . _ - / are allowed.)"),this.#e=e,this.name="InvalidFileNameError"}get files(){return this.#e}}class k extends HTMLElement{currentPath="";selectedFile=null;triggerId;targetInputId;fileTypes;filesOnly;returnType;modalId;contentId;isUploading=!1;apiEndpoint="/studiocms_api/integrations/storage/manager";pendingFiles=[];fileToDelete=null;fileToRename=null;connectionEstablished=!1;currentLocale;translations;translationMap;localI18nStorageKey="studiocms-i18n-locale";connectionTestResponse={status:0,message:""};constructor(){super(),window.addEventListener("storage-browser:locale-change",(e=>{e.detail.locale?this.setLocale(e.detail.locale):this.updateLocale()}))}$=e=>this.querySelector(e);$all=e=>this.querySelectorAll(e);$$id=e=>document.getElementById(e);getAttr(e,t){const s=t??null;return this.getAttribute(e)??s}setLocale(e){this.translationMap[e]?(this.currentLocale=e,this.translations=this.translationMap[e],localStorage.setItem(this.localI18nStorageKey,e),this.isConnected&&(this.render(),this.attachEventListeners(),this.loadFiles())):console.warn(`Locale "${e}" not found, falling back to "en"`)}updateLocale(){let e=localStorage.getItem(this.localI18nStorageKey);e||(e="en",console.warn(`No saved locale found, using fallback lang "${e}"`)),this.setLocale(e)}t(e){return this.translations[e]||this.translationMap.en[e]||e}resetEventListeners(){const e=this.cloneNode(!0);this.replaceWith(e)}connectedCallback(){const e=this.getAttr("translation-map","{}");this.translationMap=JSON.parse(e),this.translations=this.translationMap[this.currentLocale]||this.translationMap.en;const t=localStorage.getItem(this.localI18nStorageKey);this.setLocale(t||"en"),this.triggerId=this.getAttr("trigger-id",""),this.targetInputId=this.getAttr("target-input-id")||void 0;const s=this.getAttr("file-types","[]");this.fileTypes=JSON.parse(s),this.filesOnly=this.getAttr("files-only","false")==="true",this.returnType=this.getAttr("return-type","url"),this.modalId=`storage-browser-${this.triggerId}`,this.contentId=`storage-browser-content-${this.triggerId}`,this.render(),this.attachEventListeners()}render(){this.innerHTML=`
      <div id="${this.modalId}" class="storage-browser-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title-${this.triggerId}">
        <div class="storage-browser-overlay" aria-hidden="true"></div>
        <div class="storage-browser-container">
          <div class="storage-browser-header">
            <h3 id="modal-title-${this.triggerId}">${this.t("selectFile")}</h3>
            <button class="storage-browser-close" data-close-modal="${this.modalId}" aria-label="${this.t("closeFileBrowser")}">&times;</button>
          </div>
          
          <div class="storage-browser-toolbar" role="toolbar" aria-label="${this.t("fileBrowserActions")}">
            <nav id="breadcrumb-${this.triggerId}" class="storage-browser-breadcrumb" aria-label="${this.t("filePathBreadcrumb")}"></nav>
            <div class="storage-browser-toolbar-actions">
              <button class="storage-browser-btn storage-browser-btn-small" data-upload="${this.triggerId}" aria-label="${this.t("upload")}">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                ${this.t("upload")}
              </button>
              ${this.filesOnly?"":`<button class="storage-browser-btn storage-browser-btn-small" data-create-folder="${this.triggerId}" aria-label="${this.t("newFolder")}">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                ${this.t("newFolder")}
              </button>`}
              <button class="storage-browser-btn storage-browser-btn-small" data-refresh="${this.triggerId}" aria-label="${this.t("refresh")}">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                ${this.t("refresh")}
              </button>
            </div>
            <input type="file" id="upload-input-${this.triggerId}" style="display: none;" multiple aria-label="${this.t("fileUploadInput")}" />
          </div>

          <div id="${this.contentId}" class="storage-browser-content" role="region" aria-label="${this.t("fileBrowserContent")}" aria-live="polite">
            <div class="storage-browser-loading" role="status" aria-live="polite">${this.t("loadingFiles")}</div>
          </div>

          <div class="storage-browser-footer">
            <div class="storage-browser-selected" id="selected-${this.triggerId}" role="status" aria-live="polite" aria-atomic="true">
              ${this.t("noFileSelected")}
            </div>
            <div class="storage-browser-actions">
              <button class="storage-browser-btn storage-browser-btn-secondary" data-close-modal="${this.modalId}">${this.t("cancel")}</button>
              <button class="storage-browser-btn storage-browser-btn-primary" id="select-btn-${this.triggerId}" disabled aria-disabled="true">${this.t("select")}</button>
            </div>
          </div>
        </div>
      </div>

      <div id="upload-dialog-${this.triggerId}" class="storage-browser-upload-dialog" role="dialog" aria-modal="true" aria-labelledby="upload-dialog-title-${this.triggerId}" style="display: none;">
        <div class="storage-browser-overlay" aria-hidden="true"></div>
        <div class="storage-browser-dialog-container">
          <div class="storage-browser-dialog-header">
            <h3 id="upload-dialog-title-${this.triggerId}">${this.t("customizeFilenames")}</h3>
          </div>
          <div class="storage-browser-dialog-content" id="upload-dialog-content-${this.triggerId}">
          </div>
          <div class="storage-browser-dialog-footer">
            <button class="storage-browser-btn storage-browser-btn-secondary" id="upload-dialog-cancel-${this.triggerId}">${this.t("cancel")}</button>
            <button class="storage-browser-btn storage-browser-btn-primary" id="upload-dialog-confirm-${this.triggerId}">${this.t("upload")}</button>
          </div>
        </div>
      </div>

      <div id="delete-dialog-${this.triggerId}" class="storage-browser-delete-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title-${this.triggerId}" style="display: none;">
        <div class="storage-browser-overlay" aria-hidden="true"></div>
        <div class="storage-browser-dialog-container storage-browser-dialog-small">
          <div class="storage-browser-dialog-header">
            <h3 id="delete-dialog-title-${this.triggerId}">${this.t("deleteFile")}</h3>
          </div>
          <div class="storage-browser-dialog-content" id="delete-dialog-content-${this.triggerId}">
            <p>${this.t("deleteFileConfirm")}</p>
            <p class="storage-browser-delete-filename"></p>
          </div>
          <div class="storage-browser-dialog-footer">
            <button class="storage-browser-btn storage-browser-btn-secondary" id="delete-dialog-cancel-${this.triggerId}">${this.t("cancel")}</button>
            <button class="storage-browser-btn storage-browser-btn-danger" id="delete-dialog-confirm-${this.triggerId}">${this.t("delete")}</button>
          </div>
        </div>
      </div>

      <!-- Create Folder Dialog -->
      <div id="folder-dialog-${this.triggerId}" class="storage-browser-delete-dialog" role="dialog" aria-modal="true" aria-labelledby="folder-dialog-title-${this.triggerId}">
        <div class="storage-browser-overlay" aria-hidden="true"></div>
        <div class="storage-browser-dialog-container storage-browser-dialog-small">
          <div class="storage-browser-dialog-header">
            <h3 id="folder-dialog-title-${this.triggerId}">${this.t("createNewFolder")}</h3>
          </div>
          <div class="storage-browser-dialog-content" id="folder-dialog-content-${this.triggerId}">
            <p style="color: var(--storage-browser-text-normal);">${this.t("folderName")}:</p>
            <input type="text" id="folder-name-input-${this.triggerId}" class="storage-browser-upload-filename" placeholder="${this.t("folderName")}" aria-label="${this.t("folderName")}" />
          </div>
          <div class="storage-browser-dialog-footer">
            <button class="storage-browser-btn storage-browser-btn-secondary" id="folder-dialog-cancel-${this.triggerId}">${this.t("cancel")}</button>
            <button class="storage-browser-btn storage-browser-btn-primary" id="folder-dialog-confirm-${this.triggerId}">${this.t("create")}</button>
          </div>
        </div>
      </div>

      <!-- Rename Dialog -->
      <div id="rename-dialog-${this.triggerId}" class="storage-browser-delete-dialog" role="dialog" aria-modal="true" aria-labelledby="rename-dialog-title-${this.triggerId}">
        <div class="storage-browser-overlay" aria-hidden="true"></div>
        <div class="storage-browser-dialog-container storage-browser-dialog-small">
          <div class="storage-browser-dialog-header">
            <h3 id="rename-dialog-title-${this.triggerId}">${this.t("renameFile")}</h3>
          </div>
          <div class="storage-browser-dialog-content" id="rename-dialog-content-${this.triggerId}">
            <p style="color: var(--storage-browser-text-normal);">${this.t("newName")}:</p>
            <p class="storage-browser-delete-filename" id="rename-current-name-${this.triggerId}"></p>
            <input type="text" id="rename-input-${this.triggerId}" class="storage-browser-upload-filename" placeholder="${this.t("newName")}" aria-label="${this.t("newName")}" />
          </div>
          <div class="storage-browser-dialog-footer">
            <button class="storage-browser-btn storage-browser-btn-secondary" id="rename-cancel-btn-${this.triggerId}">${this.t("cancel")}</button>
            <button class="storage-browser-btn storage-browser-btn-primary" id="rename-confirm-btn-${this.triggerId}">${this.t("rename")}</button>
          </div>
        </div>
      </div>

      <!-- Preview Dialog -->
      <div id="preview-dialog-${this.triggerId}" class="storage-browser-delete-dialog" role="dialog" aria-modal="true" aria-labelledby="preview-dialog-title-${this.triggerId}" style="display: none;">
        <div class="storage-browser-overlay" aria-hidden="true"></div>
        <div class="storage-browser-dialog-container storage-browser-preview-dialog">
          <div class="storage-browser-dialog-header storage-browser-preview-header">
            <h3 id="preview-dialog-title-${this.triggerId}">${this.t("preview")}</h3>
            <div class="storage-browser-preview-actions">
              <a id="preview-download-btn-${this.triggerId}" class="storage-browser-preview-download" download aria-label="${this.t("download")}" title="${this.t("download")}">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
              <button class="storage-browser-preview-close" id="preview-close-btn-${this.triggerId}" aria-label="${this.t("close")}" title="${this.t("close")}">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div class="storage-browser-dialog-content storage-browser-preview-content" id="preview-content-${this.triggerId}">
            <div class="storage-browser-preview-loading" id="preview-loading-${this.triggerId}">
              <div class="storage-browser-spinner"></div>
              <p>${this.t("loadingFiles")}</p>
            </div>
          </div>
        </div>
      </div>
    `}async onloadTest(e){await this.testConnection()||(e.disabled=!0,e.setAttribute("aria-disabled","true"),e.setAttribute("title",this.t(this.connectionTestResponse.message)||this.connectionTestResponse.message),e.classList.add("disabled"),e.style.cursor="not-allowed")}attachEventListeners(){const e=this.$(`#${this.modalId}`),t=this.$$id(this.triggerId),s=this.targetInputId?this.$$id(this.targetInputId):void 0,i=this.$(`#${this.contentId}`),n=this.$(`#selected-${this.triggerId}`),l=this.$(`#select-btn-${this.triggerId}`),d=this.$(`[data-refresh="${this.triggerId}"]`),r=this.$(`[data-upload="${this.triggerId}"]`),a=this.$(`#upload-input-${this.triggerId}`);if(!e||!i||!n||!l||!t)return;this.onloadTest(t),t?.addEventListener("click",async()=>{if(e.classList.add("open"),await this.testConnection()){r&&(r.disabled=!1),d&&(d.disabled=!1);const c=this.$(`[data-create-folder="${this.triggerId}"]`);c&&(c.disabled=!1),this.loadFiles()}else{r&&(r.disabled=!0),d&&(d.disabled=!0);const c=this.$(`[data-create-folder="${this.triggerId}"]`);c&&(c.disabled=!0)}setTimeout(()=>{this.$(".storage-browser-close")?.focus()},100)});const o=g=>{g.key==="Escape"&&e.classList.contains("open")&&(e.classList.remove("open"),this.selectedFile=null,this.updateSelectedInfo(),t?.focus(),document.removeEventListener("keydown",o))};document.addEventListener("keydown",o),this.$all(`[data-close-modal="${this.modalId}"]`).forEach(g=>{g.addEventListener("click",()=>{e.classList.remove("open"),this.selectedFile=null,this.updateSelectedInfo()})}),this.$(".storage-browser-overlay")?.addEventListener("click",()=>{e.classList.remove("open"),this.selectedFile=null,this.updateSelectedInfo()}),d?.addEventListener("click",()=>this.loadFiles()),r?.addEventListener("click",()=>{a?.click()}),this.$(`[data-create-folder="${this.triggerId}"]`)?.addEventListener("click",()=>this.showCreateFolderDialog());const p=this.$(`#folder-dialog-${this.triggerId}`),f=this.$(`#folder-dialog-cancel-${this.triggerId}`),v=this.$(`#folder-dialog-confirm-${this.triggerId}`),u=this.$(`#folder-name-input-${this.triggerId}`);p&&f&&v&&u&&(f.addEventListener("click",()=>{p.style.display="none",u.value=""}),v.addEventListener("click",async()=>{const g=u.value.trim();g&&(await this.createFolder(g),p.style.display="none",u.value="")}),u.addEventListener("keydown",async g=>{if(g.key==="Enter"){const c=u.value.trim();c&&(await this.createFolder(c),p.style.display="none",u.value="")}else g.key==="Escape"&&(p.style.display="none",u.value="")})),a?.addEventListener("change",async g=>{const c=g.target.files;c&&c.length>0&&(this.pendingFiles=Array.from(c),this.showUploadDialog(),g.target.value="")}),i.addEventListener("dragover",g=>{g.preventDefault(),g.stopPropagation(),i.classList.add("storage-browser-drag-over")}),i.addEventListener("dragleave",g=>{g.preventDefault(),g.stopPropagation(),g.target===i&&i.classList.remove("storage-browser-drag-over")}),i.addEventListener("drop",async g=>{g.preventDefault(),g.stopPropagation(),i.classList.remove("storage-browser-drag-over");const c=g.dataTransfer?.files;c&&c.length>0&&(this.pendingFiles=Array.from(c),this.showUploadDialog())}),l?.addEventListener("click",async()=>{if(!this.selectedFile)return;let g="";this.returnType==="url"?g=(await(await fetch(this.apiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"publicUrl",key:this.selectedFile.key})})).json()).url:this.returnType==="identifier"?g=`storage-file://${this.selectedFile.key}`:g=this.selectedFile.key,s&&(s.value=g,s.dispatchEvent(new Event("change",{bubbles:!0}))),e.style.display="none",this.selectedFile=null,this.updateSelectedInfo(),this.resetEventListeners()})}async testConnection(){const e=this.$(`#${this.contentId}`);if(!e)return!1;e.innerHTML=`<div class="storage-browser-loading" role="status">${this.t("testingConnection")}</div>`;try{const t=await fetch(this.apiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"test"})}),s=await t.json();if(t.status===501&&s.error)return this.connectionEstablished=!1,e.innerHTML=`
                    <div class="storage-browser-error" role="alert">
                        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>${this.t(s.error)}</p>
                    </div>
                `,this.connectionTestResponse={status:t.status,message:s.error||"No error message provided"},!1;if(!t.ok)throw this.connectionTestResponse={status:t.status,message:s.error||"No error message provided"},new Error(s.error||"Connection test failed");return this.connectionEstablished=s.success===!0,this.connectionEstablished||(e.innerHTML=`
                    <div class="storage-browser-error" role="alert">
                        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>${this.t("failedConnection")}</p>
                        <p style="font-size: 0.875rem; opacity: 0.7;">${this.t("checkConfiguration")}</p>
                    </div>
                `),this.connectionEstablished}catch(t){return console.error("Storage connection test failed:",t),this.connectionEstablished=!1,this.connectionTestResponse={status:500,message:"Unknown error"},e.innerHTML=`
                <div class="storage-browser-error" role="alert">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>${this.t("failedConnection")}</p>
                    <p style="font-size: 0.875rem; opacity: 0.7;">${t instanceof Error?t.message:this.t("unknownError")}</p>
                </div>
            `,!1}}async loadFiles(){const e=this.$(`#${this.contentId}`);if(e){e.innerHTML=`<div class="storage-browser-loading">${this.t("loadingFiles")}</div>`;try{const i=(await(await fetch(this.apiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"list",prefix:this.currentPath})})).json()).files;this.updateBreadcrumb();const n=new Set,l=[];if(i.forEach(r=>{const o=r.key.substring(this.currentPath.length).split("/");if(o.length>1&&o[0])n.add(o[0]);else if(o[0]&&o[0]!==".folder"){if(this.fileTypes.length>0){const h=o[0].split(".").pop()?.toLowerCase(),p=this.getMimeType(h);if(!this.fileTypes.includes(p))return}l.push(r)}}),n.size===0&&l.length===0){e.innerHTML=`
          <div class="storage-browser-empty" role="status" aria-live="polite">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            <p>${this.t("noFilesHere")}</p>
          </div>
        `;return}let d=`<div class="storage-browser-grid" role="grid" aria-label="${this.t("filesAndFolders")}">`;this.filesOnly||n.forEach(r=>{d+=`
            <div class="storage-browser-item storage-browser-folder" data-folder="${r}" role="gridcell" tabindex="0" aria-label="${this.t("folderLabel").replace("{name}",r)}">
              <div class="storage-browser-file-actions">
                <button class="storage-browser-rename-btn" data-rename-folder="${r}" aria-label="${this.t("renameLabel").replace("{name}",r)}" title="${this.t("rename")}">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button class="storage-browser-delete-btn" data-delete-folder="${r}" aria-label="${this.t("deleteLabel").replace("{name}",r)}" title="${this.t("delete")}">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div class="storage-browser-icon" aria-hidden="true">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                </svg>
              </div>
              <div class="storage-browser-name">${r}</div>
            </div>
          `}),l.forEach(r=>{const a=r.key.split("/").pop(),o=this.formatFileName(a),h=a?.split(".").pop()?.toLowerCase(),p=this.formatBytes(r.size),f=this.isFilePreviewable(h);d+=`
          <div class="storage-browser-item storage-browser-file" data-file='${JSON.stringify(r)}' role="gridcell" tabindex="0" aria-label="${this.t("fileLabel").replace("{name}",o).replace("{size}",p)}">
            <div class="storage-browser-file-actions">
              ${f?`<button class="storage-browser-preview-btn" data-preview-file='${JSON.stringify(r)}' aria-label="${this.t("previewLabel").replace("{name}",o)}" title="${this.t("preview")}">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>`:""}
              <button class="storage-browser-rename-btn" data-rename-file='${JSON.stringify(r)}' aria-label="${this.t("renameLabel").replace("{name}",o)}" title="${this.t("rename")}">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button class="storage-browser-delete-btn" data-delete-file='${JSON.stringify(r)}' aria-label="${this.t("deleteLabel").replace("{name}",o)}" title="${this.t("delete")}">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <div class="storage-browser-icon" aria-hidden="true">
              ${this.getFileIcon(h)}
            </div>
            <div class="storage-browser-name">${o}</div>
            <div class="storage-browser-size">${p}</div>
          </div>
        `}),d+="</div>",e.innerHTML=d,e.querySelectorAll("[data-folder]").forEach(r=>{const a=o=>{if(o.target.closest("button"))return;const p=r.getAttribute("data-folder");p&&this.navigateToFolder(p)};r.addEventListener("click",a),r.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),a(o))})}),e.querySelectorAll("[data-file]").forEach(r=>{const a=()=>{e.querySelectorAll(".storage-browser-file").forEach(h=>{h.classList.remove("selected"),h.setAttribute("aria-selected","false")}),r.classList.add("selected"),r.setAttribute("aria-selected","true");const o=r.getAttribute("data-file");if(o){const h=JSON.parse(o);this.selectedFile=h,this.updateSelectedInfo()}};r.addEventListener("click",a),r.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),a())})}),e.querySelectorAll("[data-delete-file]").forEach(r=>{r.addEventListener("click",a=>{a.stopPropagation();const o=r.getAttribute("data-delete-file");if(o){const h=JSON.parse(o);this.showDeleteConfirmation(h)}})}),e.querySelectorAll("[data-rename-file]").forEach(r=>{r.addEventListener("click",a=>{a.stopPropagation();const o=r.getAttribute("data-rename-file");if(o){const h=JSON.parse(o);this.showRenameDialog(h)}})}),e.querySelectorAll("[data-rename-folder]").forEach(r=>{r.addEventListener("click",a=>{a.stopPropagation();const o=r.getAttribute("data-rename-folder");o&&this.showRenameFolderDialog(o)})}),e.querySelectorAll("[data-delete-folder]").forEach(r=>{r.addEventListener("click",a=>{a.stopPropagation();const o=r.getAttribute("data-delete-folder");o&&this.showDeleteFolderConfirmation(o)})}),e.querySelectorAll("[data-preview-file]").forEach(r=>{r.addEventListener("click",a=>{a.stopPropagation();const o=r.getAttribute("data-preview-file");if(o){const h=JSON.parse(o);this.showPreview(h)}})})}catch(t){const s=t instanceof Error?t.message:"Unknown error";e.innerHTML=`<div class="storage-browser-error" role="alert" aria-live="assertive">${this.t("failedToLoadFiles")}: ${s}</div>`}}}navigateToFolder(e){this.currentPath=`${this.currentPath}${e}/`,this.selectedFile=null,this.updateSelectedInfo(),this.loadFiles()}navigateToPath(e){this.currentPath=e,this.selectedFile=null,this.updateSelectedInfo(),this.loadFiles()}updateBreadcrumb(){const e=this.$(`#breadcrumb-${this.triggerId}`);if(!e)return;if(!this.currentPath){e.innerHTML=`
        <span class="storage-browser-crumb active">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          ${this.t("root")}
        </span>
      `;return}const t=this.currentPath.split("/").filter(n=>n);let s="";const i=[`
      <span class="storage-browser-crumb" data-path="">
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        ${this.t("root")}
      </span>
    `];t.forEach((n,l)=>{s+=`${n}/`;const d=l===t.length-1;i.push('<span class="storage-browser-separator">/</span>'),d?i.push(`<span class="storage-browser-crumb active">${n}</span>`):i.push(`<span class="storage-browser-crumb" data-path="${s}">${n}</span>`)}),e.innerHTML=i.join(""),e.querySelectorAll("[data-path]").forEach(n=>{n.addEventListener("click",()=>{const l=n.getAttribute("data-path");l!==null&&this.navigateToPath(l)})})}updateSelectedInfo(){const e=this.$(`#selected-${this.triggerId}`),t=this.$(`#select-btn-${this.triggerId}`);if(!(!e||!t))if(this.selectedFile){const s=this.selectedFile.key.split("/").pop();e.innerHTML=`${this.t("select")}: <strong>${s}</strong>`,t.disabled=!1}else e.textContent=this.t("noFileSelected"),t.disabled=!0}formatBytes(e){if(e===0)return"0 Bytes";const t=1024,s=["Bytes","KB","MB","GB"],i=Math.floor(Math.log(e)/Math.log(t));return`${Math.round(e/t**i*100)/100} ${s[i]}`}formatFileName(e){if(!e)return"";const t=/^\d{10,}-(.+)$/,s=e.match(t);return s?s[1]:e}getMimeType(e){return e&&{jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",gif:"image/gif",webp:"image/webp",svg:"image/svg+xml",mp4:"video/mp4",webm:"video/webm",mp3:"audio/mpeg",wav:"audio/wav",pdf:"application/pdf",zip:"application/zip"}[e]||"application/octet-stream"}getFileIcon(e){return e?["jpg","jpeg","png","gif","webp","svg","bmp","ico","tiff","tif","heic","heif","avif"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>':["mp4","webm","mov","avi","mkv","flv","wmv","m4v","mpg","mpeg","3gp","ogv"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>':["mp3","wav","ogg","flac","aac","m4a","wma","aiff","ape","opus"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>':["js","jsx","ts","tsx","py","java","c","cpp","cs","php","rb","go","rs","swift","kt","dart","scala","r","sh","bash","zsh","fish","ps1"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>':["html","xml","json","yaml","yml","toml","ini","cfg","conf","config","env"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>':["css","scss","sass","less","styl"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>':["pdf","doc","docx","txt","rtf","odt","tex","wpd","pages"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>':["xls","xlsx","csv","ods","numbers","tsv"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>':["ppt","pptx","odp","key"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path></svg>':["zip","rar","7z","tar","gz","bz2","xz","tgz","tbz2","zipx","iso"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>':["sql","db","sqlite","sqlite3","mdb","accdb"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>':["ttf","otf","woff","woff2","eot"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>':["exe","app","dmg","pkg","deb","rpm","apk","msi","bin"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>':["md","markdown","mdx"].includes(e)?'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>':this.getDefaultIcon():this.getDefaultIcon()}getDefaultIcon(){return'<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>'}showUploadDialog(){const e=this.$(`#upload-dialog-${this.triggerId}`),t=this.$(`#upload-dialog-content-${this.triggerId}`),s=this.$(`#upload-dialog-cancel-${this.triggerId}`),i=this.$(`#upload-dialog-confirm-${this.triggerId}`);if(!e||!t)return;let n='<div class="storage-browser-upload-files">';this.pendingFiles.forEach((r,a)=>{const h=`${Date.now()}-${r.name}`;n+=`
                <div class="storage-browser-upload-file-item">
                    <label for="upload-name-${this.triggerId}-${a}">
                        <strong>${this.t("original")}:</strong> ${r.name}
                        <span class="storage-browser-file-size">(${this.formatBytes(r.size)})</span>
                    </label>
                    <input 
                        type="text" 
                        id="upload-name-${this.triggerId}-${a}" 
                        class="storage-browser-filename-input" 
                        value="${h}"
                        data-file-index="${a}"
                        aria-label="${this.t("filenameForLabel").replace("{name}",r.name)}"
                    />
                </div>
            `}),n+="</div>",t.innerHTML=n,e.style.display="flex",setTimeout(()=>{const r=t.querySelector("input");r?.focus(),r?.select()},100);const l=()=>{e.style.display="none",this.pendingFiles=[]};s?.addEventListener("click",l,{once:!0}),e.querySelector(".storage-browser-overlay")?.addEventListener("click",l,{once:!0}),i?.addEventListener("click",async()=>{const r={};t.querySelectorAll(".storage-browser-filename-input").forEach(a=>{const o=Number.parseInt(a.dataset.fileIndex||"0",10);r[o]=a.value}),e.style.display="none",await this.uploadFilesWithCustomNames(r),this.pendingFiles=[]},{once:!0});const d=r=>{r.key==="Escape"&&e.style.display==="flex"&&(l(),document.removeEventListener("keydown",d))};document.addEventListener("keydown",d)}showDeleteFolderConfirmation(e){const t=this.$(`#delete-dialog-${this.triggerId}`),s=t?.querySelector(".storage-browser-delete-filename"),i=this.$(`#delete-dialog-cancel-${this.triggerId}`),n=this.$(`#delete-dialog-confirm-${this.triggerId}`);if(!t||!s)return;s.textContent=`${e}/ (${this.t("andAllItsContents")})`,t.style.display="flex",setTimeout(()=>i?.focus(),100);const l=()=>{t.style.display="none"};i?.addEventListener("click",l,{once:!0}),t.querySelector(".storage-browser-overlay")?.addEventListener("click",l,{once:!0}),n?.addEventListener("click",async()=>{t.style.display="none",await this.deleteFolder(e)},{once:!0});const d=r=>{r.key==="Escape"&&t.style.display==="flex"&&(l(),document.removeEventListener("keydown",d))};document.addEventListener("keydown",d)}showDeleteConfirmation(e){this.fileToDelete=e;const t=this.$(`#delete-dialog-${this.triggerId}`),s=t?.querySelector(".storage-browser-delete-filename"),i=this.$(`#delete-dialog-cancel-${this.triggerId}`),n=this.$(`#delete-dialog-confirm-${this.triggerId}`);if(!t||!s)return;const l=e.key.split("/").pop(),d=this.formatFileName(l);s.textContent=d,t.style.display="flex",setTimeout(()=>i?.focus(),100);const r=()=>{t.style.display="none",this.fileToDelete=null};i?.addEventListener("click",r,{once:!0}),t.querySelector(".storage-browser-overlay")?.addEventListener("click",r,{once:!0}),n?.addEventListener("click",async()=>{t.style.display="none",this.fileToDelete&&await this.deleteFile(this.fileToDelete),this.fileToDelete=null},{once:!0});const a=o=>{o.key==="Escape"&&t.style.display==="flex"&&(r(),document.removeEventListener("keydown",a))};document.addEventListener("keydown",a)}async deleteFile(e){const t=this.$(`#${this.contentId}`);if(t){t.innerHTML=`<div class="storage-browser-loading" role="status">${this.t("deletingFile")}</div>`;try{if(!(await fetch(this.apiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"delete",key:e.key})})).ok)throw new Error("Delete failed");await this.loadFiles()}catch(s){console.error("Delete error:",s),t.innerHTML=`
                <div class="storage-browser-error" role="alert">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>${this.t("failedToDeleteFile")}</p>
                    <p style="font-size: 0.875rem; opacity: 0.7;">${s instanceof Error?s.message:this.t("unknownError")}</p>
                </div>
            `,setTimeout(()=>this.loadFiles(),2e3)}}}async renameFolder(e,t){const s=this.$(`#${this.contentId}`);if(s){s.innerHTML=`
            <div class="storage-browser-loading" role="status" aria-live="polite">
                <div class="storage-browser-spinner" aria-hidden="true"></div>
                <p>${this.t("renamingFolder")}</p>
            </div>
        `;try{const i=t.replace(/[^a-zA-Z0-9-_]/g,"-"),n=`${this.currentPath+e}/`,l=`${this.currentPath+i}/`,d=await fetch(this.apiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"list",prefix:n})});if(!d.ok)throw new Error("Failed to list folder contents");const r=await d.json(),a=r.files||r.data?.files||[];for(const o of a){const h=o.key.substring(n.length),p=l+h,f=await fetch(this.apiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"rename",key:o.key,newKey:p})});if(!f.ok){const v=await f.json();console.error("Failed to rename file:",o.key,v)}}await this.loadFiles()}catch(i){console.error("Rename folder error:",i),s.innerHTML=`
                <div class="storage-browser-error" role="alert">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>${this.t("failedToRenameFolder")}</p>
                </div>
            `,setTimeout(()=>this.loadFiles(),2e3)}}}async deleteFolder(e){const t=this.$(`#${this.contentId}`);if(t){t.innerHTML=`
            <div class="storage-browser-loading" role="status" aria-live="polite">
                <div class="storage-browser-spinner" aria-hidden="true"></div>
                <p>${this.t("deletingFolder")}</p>
            </div>
        `;try{const s=`${this.currentPath+e}/`,i=await fetch(this.apiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"list",prefix:s})});if(!i.ok)throw new Error("Failed to list folder contents");const n=await i.json(),l=n.files||n.data?.files||[];for(const d of l){const r=await fetch(this.apiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"delete",key:d.key})});if(!r.ok){const a=await r.json();console.error("Failed to delete file:",d.key,a)}}await this.loadFiles()}catch(s){console.error("Delete folder error:",s),t.innerHTML=`
                <div class="storage-browser-error" role="alert">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>${this.t("failedToDeleteFolder")}</p>
                </div>
            `,setTimeout(()=>this.loadFiles(),2e3)}}}showCreateFolderDialog(){const e=this.$(`#folder-dialog-${this.triggerId}`),t=this.$(`#folder-name-input-${this.triggerId}`);e&&t&&(e.style.display="flex",t.value="",setTimeout(()=>t.focus(),100))}async createFolder(e){const t=this.$(`#${this.contentId}`);if(t){t.innerHTML=`<div class="storage-browser-loading" role="status">${this.t("creatingFolder")}</div>`;try{const s=e.replace(/[^a-zA-Z0-9-_]/g,"-"),i=`${this.currentPath}${s}/.folder`;if(!(await fetch(this.apiEndpoint,{method:"PUT",headers:{"Content-Type":"text/plain","x-storage-key":i},body:""})).ok)throw new Error("Create folder failed");await this.loadFiles()}catch(s){console.error("Create folder error:",s),t.innerHTML=`
                <div class="storage-browser-error" role="alert">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>${this.t("failedToCreateFolder")}</p>
                    <p style="font-size: 0.875rem; opacity: 0.7;">${s instanceof Error?s.message:this.t("unknownError")}</p>
                </div>
            `,setTimeout(()=>this.loadFiles(),2e3)}}}escapeHtml(e){return e.replace(/[&<>"']/g,t=>{switch(t){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#39;";default:return t}})}async uploadFilesWithCustomNames(e){if(this.isUploading)return;const t={valid:!0,invalidFiles:[]};this.isUploading=!0;const s=this.$(`#${this.contentId}`);if(!s)return;const i=this.pendingFiles.length;let n=0;s.innerHTML=`
            <div class="storage-browser-uploading" role="status" aria-live="polite">
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p>${this.t("uploadingFiles")}</p>
                <div class="storage-browser-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${i}" aria-valuenow="0" aria-label="${this.t("uploadProgressLabel")}">
                    <div class="storage-browser-progress-bar" style="width: 0%"></div>
                </div>
                <p class="storage-browser-progress-text" aria-live="polite">${this.t("uploadProgress").replace("{current}","0").replace("{total}",i.toString())}</p>
            </div>
        `;const l=s.querySelector(".storage-browser-progress-bar"),d=s.querySelector(".storage-browser-progress-text");try{if(this.pendingFiles.forEach((r,a)=>{const o=e[a];o&&!y.test(o)&&(t.valid=!1,t.invalidFiles.push(r.name))}),!t.valid)throw new m(t.invalidFiles);for(let r=0;r<this.pendingFiles.length;r++){const a=this.pendingFiles[r],o=e[r]||`${Date.now()}-${a.name}`;await this.uploadSingleFile(a,o),n++;const h=n/i*100;l&&(l.style.width=`${h}%`,l.parentElement?.setAttribute("aria-valuenow",n.toString())),d&&(d.textContent=this.t("uploadProgress").replace("{current}",n.toString()).replace("{total}",i.toString()))}await this.loadFiles()}catch(r){console.error("Upload error:",r);let a=this.t("failedToUploadFiles"),o;r instanceof Error&&(a=r.message,r instanceof m&&(o=this.escapeHtml(r.files.join(", ")))),s.innerHTML=`
                <div class="storage-browser-error" role="alert" aria-live="assertive">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>${this.t("failedToUploadFiles")}</p>
                    <p style="font-size: 0.875rem; opacity: 0.7;">${a}</p>
                    ${o?`<p style="font-size: 0.75rem; opacity: 0.5;">${o}</p>`:""}
                </div>
            `}finally{this.isUploading=!1}}async uploadSingleFile(e,t){const s=t||`${Date.now()}-${e.name}`,i=this.currentPath?`${this.currentPath}${s}`:s,n=await fetch(this.apiEndpoint,{method:"PUT",headers:{"Content-Type":e.type||"application/octet-stream","x-storage-key":i},body:e});if(!n.ok){const l=await n.json();throw new Error(l.error||"Upload failed")}}showRenameFolderDialog(e){const t=this.$(`#rename-dialog-${this.triggerId}`),s=this.$(`#rename-current-name-${this.triggerId}`),i=this.$(`#rename-input-${this.triggerId}`),n=this.$(`#rename-confirm-btn-${this.triggerId}`),l=this.$(`#rename-cancel-btn-${this.triggerId}`);if(!t||!s||!i||!n||!l)return;s.textContent=e,i.value=e,t.style.display="flex",setTimeout(()=>{i.focus(),i.select()},100);const d=l.cloneNode(!0),r=n.cloneNode(!0);l.replaceWith(d),n.replaceWith(r),d.addEventListener("click",()=>{t.style.display="none",i.value=""}),t.querySelector(".storage-browser-overlay")?.addEventListener("click",()=>{t.style.display="none",i.value=""},{once:!0}),i.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),r.click())},{once:!0}),r.addEventListener("click",async()=>{const a=i.value.trim();a&&(t.style.display="none",await this.renameFolder(e,a))})}showRenameDialog(e){this.fileToRename=e;const t=this.$(`#rename-dialog-${this.triggerId}`),s=this.$(`#rename-current-name-${this.triggerId}`),i=this.$(`#rename-input-${this.triggerId}`),n=this.$(`#rename-confirm-btn-${this.triggerId}`),l=this.$(`#rename-cancel-btn-${this.triggerId}`);if(!t||!s||!i||!n||!l)return;const d=e.key.split("/").pop()||"",r=d.replace(/^\d+-/,"");s.textContent=d,i.value=r,t.style.display="flex",setTimeout(()=>{i.focus(),i.select()},100);const a=l.cloneNode(!0),o=n.cloneNode(!0);l.replaceWith(a),n.replaceWith(o),a.addEventListener("click",()=>{t.style.display="none",this.fileToRename=null,i.value=""}),t.querySelector(".storage-browser-overlay")?.addEventListener("click",()=>{t.style.display="none",this.fileToRename=null,i.value=""},{once:!0}),i.addEventListener("keydown",h=>{h.key==="Enter"&&(h.preventDefault(),o.click())},{once:!0}),o.addEventListener("click",async()=>{const h=i.value.trim();h&&(t.style.display="none",await this.renameFile(h))})}async renameFile(e){if(!this.fileToRename)return;const t=this.$(`#${this.contentId}`);if(t){t.innerHTML=`
            <div class="storage-browser-loading" role="status" aria-live="polite">
                <div class="storage-browser-spinner" aria-hidden="true"></div>
                <p>${this.t("renamingFile")}</p>
            </div>
        `;try{if(!y.test(e))throw new m([e]);const s=this.fileToRename.key.split("/"),i=s.pop()||"",l=`${s.length>0?`${s.join("/")}/`:""}${Date.now()}-${e}`;console.log("Renaming file:",{oldKey:this.fileToRename.key,newKey:l,action:"rename"});const d=await fetch(this.apiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"rename",key:this.fileToRename.key,newKey:l})});if(!d.ok){const r=await d.json();throw new Error(r.error||"Rename failed")}await this.loadFiles()}catch(s){console.error("Rename error:",s);let i=this.t("unknownError"),n;s instanceof Error&&(i=s.message,s instanceof m&&(n=this.escapeHtml(s.files.join(", ")))),t.innerHTML=`
                <div class="storage-browser-error" role="alert">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>${this.t("failedToRenameFile")}</p>
                    <p style="font-size: 0.875rem; opacity: 0.7;">${i}</p>
					${n?`<p style="font-size: 0.75rem; opacity: 0.5;">${n}</p>`:""}
                </div>
            `,setTimeout(()=>this.loadFiles(),2e3)}finally{this.fileToRename=null}}}isFilePreviewable(e){return e?["jpg","jpeg","png","gif","webp","svg","bmp","ico","pdf","txt","md","json","xml","csv","html","css","js","ts","jsx","tsx","vue","astro","mp4","webm","ogg","mp3","wav","ogg","m4a"].includes(e.toLowerCase()):!1}async showPreview(e){const t=this.$(`#preview-dialog-${this.triggerId}`),s=this.$(`#preview-content-${this.triggerId}`),i=this.$(`#preview-loading-${this.triggerId}`),n=this.$(`#preview-close-btn-${this.triggerId}`),l=this.$(`#preview-download-btn-${this.triggerId}`),d=this.$(`#preview-dialog-title-${this.triggerId}`);if(!t||!s||!i||!n||!l||!d){console.error("Preview dialog elements not found");return}Array.from(s.children).forEach(p=>{p!==i&&s.removeChild(p)}),l.href="",l.removeAttribute("download"),t.style.display="flex",i.style.display="flex";const a=e.key.split("/").pop()||"File",o=a.split(".").pop()?.toLowerCase(),h=["jpg","jpeg","png","gif","webp","svg","bmp","ico"].includes(o||"");try{const p=await fetch(this.apiEndpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"publicUrl",key:e.key})});if(!p.ok)throw new Error("Failed to get file URL");const v=(await p.json()).url;if(!v)throw new Error("No URL returned from API");if(d.textContent=a,l.href=v,l.download=a,h){const c=document.createElement("img");c.className="storage-browser-preview-image",c.alt=a,c.onload=()=>{i.style.display="none"},c.onerror=()=>{i.style.display="none";const w=document.createElement("div");w.className="storage-browser-preview-error",w.textContent=this.t("failedToLoadImage"),s.appendChild(w)},c.src=v,s.appendChild(c)}else{const c=document.createElement("iframe");c.className="storage-browser-preview-iframe",c.sandbox.add("allow-same-origin","allow-scripts"),c.title=this.t("filePreview"),c.onload=()=>{i.style.display="none"},c.src=v,s.appendChild(c)}const u=()=>{t.style.display="none",Array.from(s.children).forEach(w=>{w!==i&&s.removeChild(w)}),l.href="",l.removeAttribute("download"),i.style.display="flex"};n.addEventListener("click",u,{once:!0}),t.querySelector(".storage-browser-overlay")?.addEventListener("click",u,{once:!0});const g=c=>{c.key==="Escape"&&(u(),document.removeEventListener("keydown",g))};document.addEventListener("keydown",g)}catch(p){console.error("Preview error:",p),i.style.display="none",s.innerHTML=`<div class="storage-browser-preview-error">${this.t("failedToPreviewFile")}: ${p instanceof Error?p.message:this.t("unknownError")}</div>`}}}customElements.get("storage-file-browser")||customElements.define("storage-file-browser",k);$.subscribe(b=>{const e=new CustomEvent("storage-browser:locale-change",{detail:{locale:b},bubbles:!0,composed:!0});window.dispatchEvent(e)});
