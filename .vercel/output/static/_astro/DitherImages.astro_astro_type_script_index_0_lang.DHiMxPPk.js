const D=`
	attribute vec2 a_position;
	attribute vec2 a_texCoord;
	varying vec2 v_texCoord;
	void main() {
		gl_Position = vec4(a_position, 0.0, 1.0);
		v_texCoord = a_texCoord;
	}
`,P=`
	precision mediump float;
	varying vec2 v_texCoord;
	uniform sampler2D u_image;
	uniform vec2 u_resolution;
	uniform float u_ditherSize;
	uniform float u_strength;
	uniform float u_dotScale;
	uniform float u_roughness;

	// Pseudo-random hash function
	float hash(vec2 p) {
		vec3 p3 = fract(vec3(p.xyx) * 0.1031);
		p3 += dot(p3, p3.yzx + 33.33);
		return fract((p3.x + p3.y) * p3.z);
	}

	vec2 hash2(vec2 p) {
		return vec2(hash(p), hash(p + vec2(127.1, 311.7)));
	}

	void main() {
		vec4 color = texture2D(u_image, v_texCoord);

		vec2 pixelPos = v_texCoord * u_resolution;
		vec2 cellPos = pixelPos / u_ditherSize;
		vec2 cellIndex = floor(cellPos);
		vec2 cellCenter = (cellIndex + 0.5) * u_ditherSize;

		// Add roughness: offset cell center and vary radius
		vec2 noise = hash2(cellIndex) * 2.0 - 1.0;
		vec2 offsetCenter = cellCenter + noise * u_ditherSize * u_roughness * 0.3;
		float radiusNoise = hash(cellIndex + vec2(42.0, 17.0)) * 2.0 - 1.0;

		vec2 cellCenterUV = offsetCenter / u_resolution;
		float cellGray = dot(texture2D(u_image, clamp(cellCenterUV, 0.0, 1.0)).rgb, vec3(0.299, 0.587, 0.114));

		float dist = length(pixelPos - offsetCenter);

		// Cap max radius to half cell size to prevent squares
		float maxRadius = u_ditherSize * 0.5 * u_dotScale;
		// Vary radius based on roughness
		float radiusVariation = 1.0 + radiusNoise * u_roughness * 0.25;
		float radius = maxRadius * (1.0 - cellGray) * radiusVariation;

		// Anti-aliased circle edge
		float edge = 1.0;
		float halftone = 1.0 - smoothstep(radius - edge, radius + edge, dist);

		float dot = 1.0 - halftone;
		vec3 halftoneBW = vec3(dot);
		vec3 finalColor = mix(color.rgb, halftoneBW, u_strength);
		float alpha = mix(color.a, halftone, u_strength);
		gl_FragColor = vec4(finalColor, alpha);
	}
`,w={size:3,animationSpeed:1,dotScale:1.35,roughness:.35},T=new WeakMap;let f=null;const y=150;function A(t,o,s){const r=t.createShader(o);return r?(t.shaderSource(r,s),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error("Shader compile error:",t.getShaderInfoLog(r)),t.deleteShader(r),null)):null}function U(t,o,s){const r=t.createProgram();return r?(t.attachShader(r,o),t.attachShader(r,s),t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS)?r:(console.error("Program link error:",t.getProgramInfoLog(r)),t.deleteProgram(r),null)):null}function I(t){const o={...w},s=window.getComputedStyle(t),r=document.createElement("div");r.className="dither-container",r.style.margin=s.margin,t.style.margin="0",t.parentNode?.insertBefore(r,t),r.appendChild(t);const a=document.createElement("canvas");a.className="dither-canvas",r.appendChild(a);const u=()=>{const c=window.devicePixelRatio||1,d=t.clientWidth||t.naturalWidth||t.width,n=t.clientHeight||t.naturalHeight||t.height;a.width=d*c,a.height=n*c,a.style.width=`${d}px`,a.style.height=`${n}px`;const e=a.getContext("webgl",{preserveDrawingBuffer:!0,antialias:!0,premultipliedAlpha:!1,alpha:!0});if(!e)return;e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.clearColor(0,0,0,0);const l=A(e,e.VERTEX_SHADER,D),m=A(e,e.FRAGMENT_SHADER,P);if(!l||!m)return;const i=U(e,l,m);if(!i)return;e.useProgram(i);const S=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,S),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);const g=e.getAttribLocation(i,"a_position");e.enableVertexAttribArray(g),e.vertexAttribPointer(g,2,e.FLOAT,!1,0,0);const x=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,x),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,1,1,1,0,0,0,0,1,1,1,0]),e.STATIC_DRAW);const v=e.getAttribLocation(i,"a_texCoord");e.enableVertexAttribArray(v),e.vertexAttribPointer(v,2,e.FLOAT,!1,0,0);const L=e.createTexture();e.bindTexture(e.TEXTURE_2D,L),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t);const h=e.getUniformLocation(i,"u_resolution");e.uniform2f(h,d*c,n*c),e.uniform1f(e.getUniformLocation(i,"u_ditherSize"),o.size*c),e.uniform1f(e.getUniformLocation(i,"u_dotScale"),o.dotScale),e.uniform1f(e.getUniformLocation(i,"u_roughness"),o.roughness);const _=e.getUniformLocation(i,"u_strength");if(!_||!h)return;e.viewport(0,0,a.width,a.height);const C={gl:e,program:i,strengthLocation:_,resolutionLocation:h,currentStrength:1,targetStrength:1,animationId:null,config:o,img:t,canvas:a};if(T.set(a,C),e.uniform1f(_,1),e.drawArrays(e.TRIANGLES,0,6),r.classList.add("dither-ready"),"ontouchstart"in window||navigator.maxTouchPoints>0){let p=!1;r.addEventListener("touchend",E=>{E.preventDefault(),p=!0,r.classList.toggle("show-original")}),r.addEventListener("click",E=>{if(p){p=!1,E.preventDefault();return}r.classList.toggle("show-original")})}};t.complete&&t.naturalWidth>0?u():t.addEventListener("load",u,{once:!0})}function R(){document.querySelectorAll("img[data-dither]").forEach(t=>{t.dataset.ditherInit||(t.dataset.ditherInit="true",I(t))})}function B(t){const{gl:o,img:s,canvas:r,resolutionLocation:a,strengthLocation:u,currentStrength:c,config:d}=t,n=window.devicePixelRatio||1,e=s.clientWidth,l=s.clientHeight;r.width=e*n,r.height=l*n,r.style.width=`${e}px`,r.style.height=`${l}px`,o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,s),o.uniform2f(a,e*n,l*n),o.uniform1f(o.getUniformLocation(t.program,"u_ditherSize"),d.size*n),o.viewport(0,0,e*n,l*n),o.uniform1f(u,c),o.drawArrays(o.TRIANGLES,0,6)}function N(){f&&window.clearTimeout(f),f=window.setTimeout(()=>{document.querySelectorAll(".dither-canvas").forEach(t=>{const o=T.get(t);o&&B(o)}),f=null},y)}R();document.addEventListener("astro:page-load",R);window.addEventListener("resize",N);
