const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/fluid.DNyyxGiF.js","assets/index.BLxSPH_n.js","assets/lifecycle.DvHggCvj.js","assets/sound.DMzxW5BL.js","assets/util.cpoNYKWA.js","assets/balls.Um0AY9Rk.js","assets/depth.Dweb1m4x.js","assets/tunnel-loop.k0Nn2uSq.js","assets/particles.CX5fsV91.js","assets/glass.DLkvljUa.js","assets/earth.CTSNm-uw.js","assets/ripple.DldbnB81.js","assets/text.BqFv9Mgd.js","assets/transition.CyPk6pNJ.js","assets/noise.Cu3cMdkj.js","assets/instancing.Cnj0d5Es.js","assets/matcap.DiKRxWJ5.js","assets/bloom.pDIP8XtG.js","assets/lut.50vEJQvu.js","assets/counter.D6m8j-Ze.js","assets/line.WAySpI9h.js","assets/grow-video.CbPE7oN2.js"])))=>i.map(i=>d[i]);
var Ie=Object.defineProperty;var Fe=(h,t,s)=>t in h?Ie(h,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):h[t]=s;var i=(h,t,s)=>Fe(h,typeof t!="symbol"?t+"":t,s);import{_,S as Be,O as Ue,P as He,D as qe,C as We,T as xe,a as Ge,r as j,b as N,N as Ne,L as Ze,c as Z,d as je,e as Ke,f as Je,V as he,h as L,M as Xe,i as ee,j as Ye}from"./index.BLxSPH_n.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const Qe=`
uniform float uBend;
varying vec2 vUv;
void main() {
  vUv = uv; // ось y камеры направлена вниз: uv.y = 0 у верхнего края
  vec3 p = position;
  float bow = 1.0 - pow(2.0 * uv.x - 1.0, 2.0);
  p.y += uBend * bow;
  p.x *= 1.0 - abs(uBend) * 0.06 * bow;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`,$e=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform sampler2D uDepthTex;
uniform vec2 uSize;
uniform float uRadius;
uniform float uTexAspect;
uniform float uReveal;
uniform float uZoom;
uniform float uMargin;
uniform float uShift;
uniform float uHover;
uniform vec2 uMouse;
uniform float uRipple;
uniform float uTime;
uniform vec4 uClicks[3];
uniform float uDepthStr;
uniform vec2 uDepthMouse;
uniform float uDof;
uniform float uFocus;
uniform float uGray;
uniform float uVel;
uniform vec3 uMotion;
uniform float uOpacity;
uniform float uDim;

float sdRound(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
vec3 fetch(vec2 t) {
  t = clamp(t, 0.0008, 0.9992);
  return texture2D(uTex, vec2(t.x, 1.0 - t.y)).rgb;
}

void main() {
  float pa = uSize.x / uSize.y;
  // --- форма: скруглённый прямоугольник, SDF в пикселях
  vec2 p = (vUv - 0.5) * uSize;
  vec2 hb = uSize * 0.5;
  float r = min(uRadius, min(hb.x, hb.y));
  float d = sdRound(p, hb, r);
  float a = clamp(0.5 - d, 0.0, 1.0);
  if (uReveal < 0.9999) {
    a *= clamp((vUv.y - (1.0 - uReveal)) * uSize.y + 0.5, 0.0, 1.0);
  }
  if (a <= 0.001 || uOpacity <= 0.001) discard;

  // --- cover-вписывание
  vec2 cs = pa > uTexAspect ? vec2(1.0, uTexAspect / pa) : vec2(pa / uTexAspect, 1.0);
  vec2 k = cs / uZoom;
  vec2 uv = (vUv - 0.5) * k + 0.5;
  uv.y += uShift * uMargin * cs.y / (1.0 + 2.0 * uMargin);

  // --- рябь
  vec2 dm = (vUv - uMouse) * vec2(pa, 1.0);
  float rl = length(dm);
  vec2 off = dm / max(rl, 0.0001) * sin(rl * 30.0 - uTime * 6.0) * exp(-rl * 5.0) * uHover * uRipple * 0.02;
  for (int i = 0; i < 3; i++) {
    vec4 ck = uClicks[i];
    if (ck.w > 0.0) {
      vec2 dc = (vUv - ck.xy) * vec2(pa, 1.0);
      float rc = length(dc);
      float front = ck.z * 0.7;
      float q = (rc - front) * 7.0;
      float env = exp(-q * q) * exp(-ck.z * 1.4) * ck.w;
      off += dc / max(rc, 0.0001) * sin((rc - front) * 38.0) * env * uRipple * 0.05;
    }
  }
  uv += (off / vec2(pa, 1.0)) * k;

  // --- объём по карте глубины
  float dpt = 0.5;
#ifdef USE_DEPTH
  vec2 base = uv;
  vec2 uv2 = base;
  for (int i = 0; i < 3; i++) {
    dpt = texture2D(uDepthTex, vec2(clamp(uv2.x, 0.001, 0.999), 1.0 - clamp(uv2.y, 0.001, 0.999))).r;
    uv2 = base - (dpt - 0.5) * uDepthMouse * uDepthStr;
  }
  uv = uv2;
#endif

  // --- выборка: motion blur / DOF / одиночная + хроматика
  vec2 mdir = (uMotion.xy + (vUv - 0.5) * uMotion.z) * k;
  vec3 col;
  float ml = length(mdir);
  float blurR = 0.0;
#ifdef USE_DEPTH
  if (uDof > 0.5) blurR = abs(dpt - uFocus) * 0.024;
#endif
  if (ml > 0.0006) {
    col = vec3(0.0);
    float wsum = 0.0;
    float jit = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
    for (int i = 0; i < 10; i++) {
      float t = (float(i) + jit) / 10.0 - 0.5;
      float w = 1.0 - abs(t) * 0.9;
      col += fetch(uv + mdir * t) * w;
      wsum += w;
    }
    col /= wsum;
  } else if (blurR > 0.0006) {
    vec2 br = vec2(1.0 / pa, 1.0) * blurR * k;
    col = fetch(uv) * 2.0;
    float wsum = 2.0;
    for (int i = 0; i < 8; i++) {
      float ang = float(i) * 0.7853982 + 0.3;
      col += fetch(uv + vec2(cos(ang), sin(ang)) * br);
      wsum += 1.0;
    }
    col /= wsum;
  } else {
    float ca = abs(uVel) * 0.0045;
    if (ca > 0.0003) {
      vec2 cv = vec2(0.0, ca) * cs.y;
      col = vec3(fetch(uv + cv).r, fetch(uv).g, fetch(uv - cv).b);
    } else {
      col = fetch(uv);
    }
  }

  // --- ч/б → цвет при наведении
  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(col, vec3(lum), uGray * (1.0 - uHover));
  col += vec3(0.06) * exp(-dot(dm, dm) * 7.0) * uHover * step(0.0001, uRipple);
  col *= 1.0 - uDim;

  gl_FragColor = vec4(col, a * uOpacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,et={fluid:()=>_(()=>import("./fluid.DNyyxGiF.js"),__vite__mapDeps([0,1,2,3,4])),balls:()=>_(()=>import("./balls.Um0AY9Rk.js"),__vite__mapDeps([5,1,2,3,4])),depth:()=>_(()=>import("./depth.Dweb1m4x.js"),__vite__mapDeps([6,1,2,3,4])),"tunnel-loop":()=>_(()=>import("./tunnel-loop.k0Nn2uSq.js"),__vite__mapDeps([7,1,2,3,4])),particles:()=>_(()=>import("./particles.CX5fsV91.js"),__vite__mapDeps([8,1,2,3,4])),glass:()=>_(()=>import("./glass.DLkvljUa.js"),__vite__mapDeps([9,1,2,3,4])),earth:()=>_(()=>import("./earth.CTSNm-uw.js"),__vite__mapDeps([10,1,2,3,4])),ripple:()=>_(()=>import("./ripple.DldbnB81.js"),__vite__mapDeps([11,1,2,3,4])),text:()=>_(()=>import("./text.BqFv9Mgd.js"),__vite__mapDeps([12,4,1,2,3])),transition:()=>_(()=>import("./transition.CyPk6pNJ.js"),__vite__mapDeps([13,1,2,3,4])),noise:()=>_(()=>import("./noise.Cu3cMdkj.js"),__vite__mapDeps([14,1,2,3,4])),instancing:()=>_(()=>import("./instancing.Cnj0d5Es.js"),__vite__mapDeps([15,1,2,3,4])),matcap:()=>_(()=>import("./matcap.DiKRxWJ5.js"),__vite__mapDeps([16,1,2,3,4])),bloom:()=>_(()=>import("./bloom.pDIP8XtG.js"),__vite__mapDeps([17,1,2,3,4])),lut:()=>_(()=>import("./lut.50vEJQvu.js"),__vite__mapDeps([18,1,2,3,4])),counter:()=>_(()=>import("./counter.D6m8j-Ze.js"),__vite__mapDeps([19,4,1,2,3])),line:()=>_(()=>import("./line.WAySpI9h.js"),__vite__mapDeps([20,4,1,2,3])),"grow-video":()=>_(()=>import("./grow-video.CbPE7oN2.js"),__vite__mapDeps([21,1,2,3,4]))};async function tt(h){const t=et[h];return t?(await t()).default:null}const ot=h=>j("./media/"+h),g=(h,t,s)=>Math.min(s,Math.max(t,h)),A=(h,t,s)=>h+(t-h)*s,G=h=>h<.5?4*h*h*h:1-Math.pow(-2*h+2,3)/2,fe=h=>h>=1?1:1-Math.pow(2,-10*h);class it{constructor(t){i(this,"map",new Map);i(this,"loader",new xe);this.maxAniso=t}acquire(t,s,u){const b=(s?"s:":"l:")+t;let l=this.map.get(b);if(!l){const d={tex:new Ge,refs:0,loaded:!1,cbs:[]};l=d,this.map.set(b,d),this.loader.load(j(t),F=>{d.tex.image=F.image,d.tex.colorSpace=s?N:Ne,d.tex.anisotropy=s?Math.min(4,this.maxAniso):1,d.tex.generateMipmaps=s,d.tex.minFilter=s?Ze:Z,d.tex.magFilter=Z,d.tex.wrapS=d.tex.wrapT=je,d.tex.needsUpdate=!0,d.loaded=!0,d.cbs.splice(0).forEach(z=>z(d.tex))},void 0,()=>{d.cbs.length=0})}return l.refs++,u&&(l.loaded?u(l.tex):l.cbs.push(u)),l.tex}release(t){for(const[s,u]of this.map)if(u.tex===t){u.refs--,u.refs<=0&&(u.tex.dispose(),this.map.delete(s));return}}disposeAll(){this.map.forEach(t=>t.tex.dispose()),this.map.clear()}}let st=0;class me{constructor(t,s,u,b){i(this,"id",++st);i(this,"mesh");i(this,"mat");i(this,"rect",{x:0,y:0,w:0,h:0});i(this,"visible",!1);i(this,"ready",!1);i(this,"hover",0);i(this,"hoverTarget",0);i(this,"mouse",new L(.5,.5));i(this,"mouseT",new L(.5,.5));i(this,"zoomV",0);i(this,"zoom",0);i(this,"dm",new L);i(this,"bend",0);i(this,"vel",0);i(this,"revealT",-1);i(this,"revealDone",!1);i(this,"revealP",0);i(this,"dofT",-1);i(this,"clicks",[new ee(0,0,9,0),new ee(0,0,9,0),new ee(0,0,9,0)]);i(this,"ci",0);i(this,"tex",null);i(this,"depthTex",null);i(this,"texAspect",1);i(this,"video",null);i(this,"videoOwned",!1);i(this,"videoTex",null);i(this,"demo",null);i(this,"demoLoading",!1);i(this,"demoAcc",0);i(this,"demoSize",{w:0,h:0});i(this,"opacity",1);i(this,"radius");i(this,"forceVisible",!1);i(this,"rectProvider",null);i(this,"prevCenter",new L);i(this,"prevSize",new L);i(this,"motion",new he);i(this,"extraBend",0);i(this,"dimExtra",0);i(this,"disposed",!1);i(this,"hasPrev",!1);i(this,"imgEl",null);i(this,"previewRadius",null);i(this,"demoMade",!1);i(this,"baseTex",null);i(this,"baseAspect",1);i(this,"hiddenT",0);i(this,"imgTexKey","");i(this,"depthLoaded",!1);i(this,"demoFactory",null);this.el=t,this.opts=s,this.host=b,this.radius=s.radius??28;const l=!!s.depth;this.mat=new Ke({defines:l?{USE_DEPTH:""}:{},uniforms:{uTex:{value:b.placeholder},uDepthTex:{value:b.placeholder},uSize:{value:new L(1,1)},uRadius:{value:this.radius},uTexAspect:{value:1},uReveal:{value:1},uZoom:{value:1},uMargin:{value:0},uShift:{value:0},uHover:{value:0},uMouse:{value:new L(.5,.5)},uRipple:{value:s.ripple?1:0},uTime:{value:0},uClicks:{value:this.clicks},uDepthStr:{value:0},uDepthMouse:{value:new L},uDof:{value:s.dof&&l?1:0},uFocus:{value:.3},uGray:{value:s.gray?1:0},uBend:{value:0},uVel:{value:0},uMotion:{value:new he},uOpacity:{value:1},uDim:{value:0}},vertexShader:Qe,fragmentShader:$e,transparent:!0,depthTest:!1,depthWrite:!1,side:Je}),this.mesh=new Xe(u,this.mat),this.mesh.frustumCulled=!1,this.mesh.visible=!1,this.mesh.renderOrder=this.id,b.scene.add(this.mesh),this.load()}setBaseTexture(t,s){this.tex=t,this.baseTex=t,this.baseAspect=s,this.texAspect=s,this.mat.uniforms.uTex.value=t,this.mat.uniforms.uTexAspect.value=s,this.markReady()}markReady(){this.ready||(this.ready=!0,this.el.classList.add("is-gl"))}load(){const{opts:t,host:s}=this;let u=null;if(t.video&&(typeof t.video=="string"?(u=document.createElement("video"),u.src=j(t.video),u.crossOrigin="anonymous",this.videoOwned=!0):u=t.video),u&&!t.demo){u.muted=!0,u.loop=!0,u.playsInline=!0,u.setAttribute("playsinline",""),u.preload="auto",this.video=u;const l=new Ye(u);l.colorSpace=N,l.minFilter=Z,l.generateMipmaps=!1,this.videoTex=l;const d=()=>{this.disposed||this.setBaseTexture(l,u.videoWidth&&u.videoHeight?u.videoWidth/u.videoHeight:16/9)};u.readyState>=1&&u.videoWidth?d():u.addEventListener("loadedmetadata",d,{once:!0})}let b=t.image;if(!b){const l=this.el.querySelector("img");l&&(this.imgEl=l,b=l.currentSrc||l.src)}b&&!this.videoTex&&(s.cache.acquire(b,!0,l=>{if(this.disposed)return;const d=l.image;this.setBaseTexture(l,d&&d.width&&d.height?d.width/d.height:1)}),this.imgTexKey=b),t.depth&&(this.depthTex=s.cache.acquire(t.depth,!1,l=>{this.disposed||(this.mat.uniforms.uDepthTex.value=l,this.depthLoaded=!0)})),t.demo&&(this.demoLoading=!0,tt(t.demo).then(l=>{this.demoLoading=!1,this.demoFactory=l}).catch(()=>{this.demoLoading=!1}))}dispose(){if(this.disposed)return;this.disposed=!0;const{host:t}=this;t.scene.remove(this.mesh),this.mat.dispose(),this.demo&&this.demo.dispose(),this.baseTex&&this.imgTexKey&&!this.videoTex&&t.cache.release(this.baseTex),this.depthTex&&t.cache.release(this.depthTex),this.video&&(this.video.pause(),this.videoOwned&&(this.video.removeAttribute("src"),this.video.load())),this.videoTex&&this.videoTex.dispose(),this.el.classList.remove("is-gl")}}let q=null;function ct(h){const{renderer:t,reduced:s,mobile:u}=h,b=new Be;let l=window.innerWidth,d=window.innerHeight,F=Math.min(window.devicePixelRatio||1,u?1.5:2);const z=new Ue(0,l,0,d,-1e3,1e3),te=u?16:32,K=new He(1,1,te,te),J=new qe(new Uint8Array([40,40,44,255]),1,1);J.needsUpdate=!0;const oe=new it(t.capabilities.getMaxAnisotropy()),ie={scene:b,cache:oe,placeholder:J},E=[],C=new WeakMap;let p=null,R=1,se=0,k=null;const pe=(e,r)=>({width:e,height:r,dpr:F,reduced:s,mobile:u,media:ot,loadTexture:(v,x)=>{const c=new xe().load(j(v),f=>{f.colorSpace=N,f.needsUpdate=!0,x?.(f)});return c.colorSpace=N,c.minFilter=Z,c.generateMipmaps=!1,c}});function we(e,r){let v=Math.max(32,e*F),x=Math.max(32,r*F);const c=Math.max(v,x),f=u?640:900;return c>f&&(v*=f/c,x*=f/c),{w:Math.round(v),h:Math.round(x)}}const re=e=>{if(p)return;const r=e.clientX,v=e.clientY;for(let x=E.length-1;x>=0;x--){const c=E[x];if(!c.visible||!c.ready||!c.opts.ripple)continue;const f=c.rect;if(r>=f.x&&r<=f.x+f.w&&v>=f.y&&v<=f.y+f.h){c.clicks[c.ci].set((r-f.x)/f.w,(v-f.y)/f.h,0,1),c.ci=(c.ci+1)%3;break}}};window.addEventListener("pointerdown",re,{passive:!0,capture:!0});function ae(e){const r=e.getAttribute("data-plane");if(!r)return{};try{return JSON.parse(r)}catch{return{}}}function X(e,r){const v=C.get(e);v&&W(v);const x=new me(e,r,K,ie);return E.push(x),C.set(e,x),()=>W(x)}function W(e){const r=E.indexOf(e);r>=0&&E.splice(r,1),C.get(e.el)===e&&C.delete(e.el),p&&p.plane===e&&(p.resolve?.(),p=null,R=1),k===e&&(k=null),e.dispose()}function ye(e){e.querySelectorAll("[data-plane]").forEach(r=>{C.has(r)||X(r,ae(r))})}function ne(){p&&(p.resolve?.(),p=null),R=1,[...E].forEach(W),k=null}function ge(e){let r=C.get(e);return r||(X(e,ae(e)),r=C.get(e)),r}function Te(e){if(p&&p.dir===1)return Promise.resolve();const r=ge(e),v=e.getBoundingClientRect(),x={x:v.left,y:v.top,w:v.width,h:v.height};return new Promise(c=>{p={plane:r,t:s?1:0,dir:1,dur:s?.01:1.1,resolve:c,base:x},r.forceVisible=!0,r.mesh.renderOrder=1e4})}function _e(){if(!p)return Promise.resolve();const e=p;return e.dir=-1,e.dur=s?.01:1,e.resolve?.(),new Promise(r=>{e.resolve=r})}function be(e,r){let v=0;const x=new me(e,{image:r,radius:28},K,ie);return x.el.classList.remove("is-gl"),x.forceVisible=!0,x.mesh.renderOrder=9e3,x.rectProvider=()=>{const c=e.getBoundingClientRect(),f=Math.min(c.height,72),M={x:c.left,y:c.bottom-f,w:c.width,h:f},D=G(g(v,0,1));return{x:A(M.x,0,D),y:A(M.y,0,D),w:A(M.w,l,D),h:A(M.h,d,D)}},x.previewRadius=()=>A(28,0,G(g(v,0,1))),E.push(x),{setProgress(c){v=c},dispose(){W(x)}}}function Me(e,r){se++;const v=Math.min(e,1/20),x=h.getScroll(),c=h.getPointer();let f=c.x,M=c.y;Math.abs(f)<=1.5&&Math.abs(M)<=1.5&&(f*=l,M*=d),c.inside;const D=s?0:g(x.velocity/40,-1,1);for(const o of E){if(o.rectProvider){const w=o.rectProvider();w&&(o.rect=w);continue}if(!o.el.isConnected){o.visible=!1;continue}if(p&&p.plane===o)continue;const m=o.el.getBoundingClientRect();o.rect.x=m.left,o.rect.y=m.top,o.rect.w=m.width,o.rect.h=m.height}if(p){const o=p;o.t=g(o.t+v/o.dur*o.dir,0,1);const m=o.plane,w=m.el.isConnected?m.el.getBoundingClientRect():null,S=w&&o.dir===-1?{x:w.left,y:w.top,w:w.width,h:w.height}:o.base,I=G(o.t);if(m.rect={x:A(S.x,0,I),y:A(S.y,0,I),w:A(S.w,l,I),h:A(S.h,d,I)},m.extraBend=Math.sin(Math.PI*o.t)*(o.dir===1?1:-1)*(s?0:1.2),R=g(R+(o.dir===1?-v/.3:v/.3),0,1),o.t>=1&&o.dir===1&&o.resolve){const U=o.resolve;o.resolve=null,U()}if(o.t<=0&&o.dir===-1){m.forceVisible=!1,m.extraBend=0,m.mesh.renderOrder=m.id;const U=o.resolve;p=null,R=Math.min(R,.999),U?.()}}else R<1&&(R=g(R+v/.3,0,1));const B=200;for(const o of E){const m=o.rect,w=m.w>1&&m.h>1&&m.x<l+B&&m.x+m.w>-B&&m.y<d+B&&m.y+m.h>-B;o.visible=w&&o.el.isConnected||o.forceVisible||o.rectProvider!==null&&w}let n=null;if(!p&&c.inside)for(let o=E.length-1;o>=0;o--){const m=E[o];if(!m.visible||!m.ready||m.rectProvider)continue;const w=m.rect;if(f>=w.x&&f<=w.x+w.w&&M>=w.y&&M<=w.y+w.h){n=m;break}}if(n!==k){if(n&&!s&&n.opts.ripple){const o=n.rect;n.mouse.set((f-o.x)/o.w,(M-o.y)/o.h),n.mouseT.copy(n.mouse),n.clicks[n.ci].set(n.mouse.x,n.mouse.y,0,.45),n.ci=(n.ci+1)%3}k=n}let a=0;for(const o of E)o.visible&&o.demo&&a++;const P=h.getGyro?h.getGyro():null;for(const o of E)Ee(o,v,r,D,f,M,c.inside,P,a)}function Ee(e,r,v,x,c,f,M,D,B){const n=e.mat.uniforms,a=e.rect,P=p&&p.plane===e,o=e.visible&&e.ready&&!e.disposed;if(e.mesh.visible=o,e.video)if(e.visible&&e.video.paused){const T=e.video.play();T&&T.catch(()=>{})}else!e.visible&&!e.video.paused&&e.video.pause();if(e.demo&&(e.hiddenT=e.visible?0:e.hiddenT+r,e.hiddenT>8&&(e.demo.dispose(),e.demo=null,e.demoMade=!1,e.hiddenT=0,e.baseTex?(e.tex=e.baseTex,e.texAspect=e.baseAspect,n.uTex.value=e.baseTex,n.uTexAspect.value=e.baseAspect):(e.ready=!1,e.el.classList.remove("is-gl")))),e.opts.demo&&e.visible){const T=P?{w:l,h:d}:{w:e.el.clientWidth||a.w,h:e.el.clientHeight||a.h},y=we(P?Math.min(l,900):T.w,P?Math.min(d,900):T.h);if(!e.demo&&e.demoFactory&&!e.demoMade){e.demoMade=!0;try{e.demo=e.demoFactory(t,pe(y.w,y.h)),e.demoSize=y,e.tex=e.demo.texture,e.texAspect=y.w/y.h,n.uTex.value=e.demo.texture,n.uTexAspect.value=e.texAspect,e.ready=!0,e.el.classList.add("is-gl")}catch(V){console.warn("[planes] demo failed",e.opts.demo,V),e.demo=null}}if(e.demo&&((Math.abs(y.w-e.demoSize.w)>e.demoSize.w*.08||Math.abs(y.h-e.demoSize.h)>e.demoSize.h*.08)&&(e.demoSize=y,e.demo.resize(y.w,y.h),e.texAspect=y.w/y.h,n.uTexAspect.value=e.texAspect),e.demoAcc+=r,!(B>4&&(se+e.id&1)===1))){const O=k===e||P&&M,H={x:g((c-a.x)/Math.max(1,a.w),-.5,1.5),y:g((f-a.y)/Math.max(1,a.h),-.5,1.5),inside:!!O},$=t.getRenderTarget(),Oe=t.autoClear,Le=t.getClearColor(Pe).clone(),Ce=t.getClearAlpha();try{e.demo.update(Math.min(e.demoAcc,1/20),v,H)}catch(ke){console.warn("[planes] demo update",ke)}t.setRenderTarget($),t.autoClear=Oe,t.setClearColor(Le,Ce),e.demoAcc=0}}if(!o)return;e.mesh.position.set(a.x+a.w/2,a.y+a.h/2,0),e.mesh.scale.set(a.w,a.h,1),n.uSize.value.set(a.w,a.h),n.uTime.value=v;let m=e.radius;if(e.previewRadius?m=e.previewRadius():P&&p&&(m=A(e.radius,0,G(p.t))),n.uRadius.value=m,e.opts.reveal&&!s&&!e.revealDone){e.revealT<0&&(e.revealT=0),e.revealT+=r;const T=g(e.revealT/1.2,0,1);e.revealP=fe(T),T>=1&&(e.revealDone=!0),e.dofT<0&&(e.dofT=0)}else e.revealP=1,e.revealDone=!0,e.dofT<0&&(e.dofT=0);n.uReveal.value=e.revealP;const w=e.opts.reveal&&!s?A(1.15,1,e.revealP):1,S=k===e;e.hover+=((S?1:0)-e.hover)*(1-Math.exp(-r*(S?9:5))),S&&e.mouseT.set(g((c-a.x)/a.w,0,1),g((f-a.y)/a.h,0,1));const I=1-Math.exp(-r*16);e.mouse.x+=(e.mouseT.x-e.mouse.x)*I,e.mouse.y+=(e.mouseT.y-e.mouse.y)*I,n.uHover.value=e.hover,n.uMouse.value.copy(e.mouse);const U=(e.opts.hoverZoom??1.06)-1,Re=S?U:0;e.zoomV+=((Re-e.zoom)*140-e.zoomV*15)*r,e.zoom+=e.zoomV*r,n.uRipple.value=e.opts.ripple&&!s?1:0;for(const T of e.clicks)T.w>0&&(T.z+=r,T.z>3&&(T.w=0));const Q=e.opts.parallax,le=Q!==void 0&&Q<1?(1-Q)*.8:0;n.uMargin.value=s?0:le;const Se=a.y+a.h/2;n.uShift.value=s||P?0:g((Se-d/2)/(d/2+a.h/2),-1,1);let ce=1;if(e.opts.depth&&e.depthLoaded){const T=e.opts.depthStrength??.02;n.uDepthStr.value=T*(s?.3:1),ce=1+T*2.2;let y,V;D&&D.active?(y=D.x,V=D.y):M&&(S||P)?(y=g((c-(a.x+a.w/2))/(a.w/2),-1,1),V=g((f-(a.y+a.h/2))/(a.h/2),-1,1)):M?(y=g((c-(a.x+a.w/2))/(a.w/2),-1,1)*.6,V=g((f-(a.y+a.h/2))/(a.h/2),-1,1)*.6):(y=s?0:Math.sin(v*.5)*.45,V=s?0:Math.cos(v*.37)*.25);const O=1-Math.exp(-r*5);if(e.dm.x+=(y-e.dm.x)*O,e.dm.y+=(V-e.dm.y)*O,n.uDepthMouse.value.copy(e.dm),e.opts.dof){e.dofT+=r;const H=fe(g(e.dofT/1.5,0,1));n.uFocus.value=A(.28,.62,s?1:H)}}n.uZoom.value=(1+e.zoom)*w*ce*(1+2*(s?0:le)),e.vel+=(x-e.vel)*(1-Math.exp(-r*10));const Ve=e.opts.bend??.08,ze=e.rectProvider?0:e.vel*Ve+e.extraBend*.06;n.uBend.value=ze,n.uVel.value=e.vel;const ue=a.x+a.w/2,de=a.y+a.h/2;if(e.hasPrev){const T=g((ue-e.prevCenter.x)/Math.max(1,a.w),-.5,.5),y=g((de-e.prevCenter.y)/Math.max(1,a.h),-.5,.5),V=g((a.w-e.prevSize.x)/Math.max(1,a.w),-.3,.3),O=P?4.5:0,H=-T*O,$=-y*O+(P||s?0:e.vel*.05);e.motion.x+=(H-e.motion.x)*.5,e.motion.y+=($-e.motion.y)*.5,e.motion.z+=(-V*O*.6-e.motion.z)*.5}e.prevCenter.set(ue,de),e.prevSize.set(a.w,a.h),e.hasPrev=!0,n.uMotion.value.copy(e.motion);let ve=1;p&&!P&&(ve=R),n.uOpacity.value=ve}const Pe=new We;function Ae(e,r,v){l=e,d=r,F=Math.min(v,u?1.5:2),z.left=0,z.right=e,z.top=0,z.bottom=r,z.updateProjectionMatrix()}function De(){window.removeEventListener("pointerdown",re,!0),ne(),K.dispose(),J.dispose(),oe.disposeAll(),q===Y&&(q=null)}const Y={overlayScene:b,overlayCamera:z,update:Me,resize:Ae,dispose:De,add:X,scanDom:ye,clear:ne,expand:Te,collapse:_e,addPreview:be,get visibleCount(){let e=0;for(const r of E)r.visible&&e++;return e}};return q=Y,Y}function ut(h,t){return q?q.addPreview(h,t.image):{setProgress(){},dispose(){}}}export{ut as createNextPagePreview,ct as default};
