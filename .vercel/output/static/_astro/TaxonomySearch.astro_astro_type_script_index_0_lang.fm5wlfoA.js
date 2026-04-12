import{p as l,F as g}from"./fuse.BSf9DMqt.js";import{$ as v,b as x,e as L}from"./client.BCzGrtn1.js";import"./preload-helper.BlTxHScW.js";const u="@studiocms/dashboard:content-sidebar",k=v(u,x[u]);k.subscribe(e=>{L("taxonomy-search",e["input-placeholder-search"])});const h=(e,t=document)=>t.querySelector(e),o=h("#taxonomy-search-form"),T=o.dataset.treeRenderElId,b=o.dataset.searchOutputElId,p=h(`#${T}`),w=h(`#${b}`);function $(e){switch(e.type){case"category":return`<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="leaf-icon default"> <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /> </svg> 
            
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" fill="currentColor" class="leaf-icon active"><path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" /></svg>`;case"tag":return`<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="leaf-icon default"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>

                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="currentColor" class="leaf-icon active"><path fill-rule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clip-rule="evenodd" /></svg>`;default:return""}}async function E(e){const t=await fetch(e.dataset.searchlist,{method:"GET",headers:{"Content-Type":"application/json"}});return t.ok?await t.json():(console.error("Failed to fetch search list"),[])}function d(e){const t=new URL(window.location.href);t.searchParams.delete("search"),window.history.pushState({},"",t),e.innerHTML="",p.style.display="flex",e.style.display="none"}const A=(e,t)=>{const s=w,r=encodeURIComponent(t),a=e.type==="category"?s?.dataset.baseCategoryLink:s?.dataset.baseTagLink,n=l.sanitize(e.name,{ALLOWED_TAGS:[],ALLOWED_ATTR:[]}),i=`search-node-${e.type}-${e.id}`;return`
        <taxonomy-tree-leaf
            data-node-id="${i}"
            data-taxonomy-id="${e.id}"
            data-taxonomy-type="${e.type}"
            data-search-term="${r}"
            data-depth="0"
            data-href="${a}"
            data-create-category-link="${s?.dataset.baseCategoryLink}"
            class="tree-leaf"
            role="treeitem"
            tabindex="0"
        >
            ${$(e)}
            <span class="tree-leaf-label">${n}</span>
        </taxonomy-tree-leaf>
        <div
            id="${i}-context-menu"
            class="context-menu"
            role="menu"
        >
            <button class="context-menu-item" role="menuitem" data-action="edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="leaf-icon default"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>
                <span><t-taxonomy-tree-leaf key=${e.type==="category"?"edit-category":"edit-tag"}> ${e.type==="category"?"Edit Category":"Edit Tag"} </t-taxonomy-tree-leaf></span>
            </button>
        </div>
        `};async function c(e,t){const r=new FormData(e).get("taxonomy-search"),a=l.sanitize(r.trim());if(!a||a.length<2){d(t);return}const n=new URL(window.location.href);n.searchParams.set("search",a),window.history.pushState({},"",n);const i=await E(t),f=new g(i,{keys:["name","slug"],threshold:.3,isCaseSensitive:!1}).search(a),y=l.sanitize(f.map(({item:m})=>A(m,a)).join(""),{ALLOWED_TAGS:["div","span","svg","path","taxonomy-tree-leaf","t-file-tree-renderer","button"],ALLOWED_ATTR:["class","data-node-id","data-taxonomy-id","data-taxonomy-type","data-depth","data-href","data-create-category-link","role","tabindex","fill","viewBox","stroke-width","stroke","d","height","width","id","data-action","data-edit-id","data-folder-id","key"]});t.innerHTML=y,p.style.display="none",t.style.display="flex"}async function C(){const e=o.querySelector('input[name="taxonomy-search"]'),t=w,r=new URL(window.location.href).searchParams.get("search")||"";if(r.length>=2){const n=e;n.value=r,await c(o,t)}o.addEventListener("submit",async n=>{n.preventDefault(),await c(o,t)});let a;e.addEventListener("input",()=>{if(e.value.length<2){d(t);return}clearTimeout(a),a=setTimeout(async()=>await c(o,t),500)}),e.addEventListener("search",()=>d(t))}C();
