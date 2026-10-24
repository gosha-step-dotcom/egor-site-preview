var Et=Object.defineProperty;var Tt=(o,t,e)=>t in o?Et(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var I=(o,t,e)=>Tt(o,typeof t!="symbol"?t+"":t,e);import{V as O,C as q,t as st,e as J,A as bt,a3 as Ct,G as vt,M as et,$ as zt,b as At,L as _t,S as Lt,O as kt,P as It,o as Ut,a4 as Nt,f as Wt,a5 as St,a6 as Ot,n as Bt,a7 as Gt,B as ut,l as R,a8 as xt,a9 as Rt,m as Pt}from"./index.DOxehTdM.js";const Dt=`
float eh(vec3 p){
  p = fract(p * .1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}
float evn(vec3 x){
  vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  float a = mix(mix(eh(i), eh(i + vec3(1.,0.,0.)), f.x), mix(eh(i + vec3(0.,1.,0.)), eh(i + vec3(1.,1.,0.)), f.x), f.y);
  float b = mix(mix(eh(i + vec3(0.,0.,1.)), eh(i + vec3(1.,0.,1.)), f.x), mix(eh(i + vec3(0.,1.,1.)), eh(i + vec3(1.,1.,1.)), f.x), f.y);
  return mix(a, b, f.z);
}
float efbm(vec3 p){
  float a = .5, s = 0.;
  for (int i = 0; i < OCT; i++) { s += a * evn(p); p = p * 2.03 + vec3(1.7, 9.2, 3.1); a *= .5; }
  return s;
}
`,wt=`
varying vec3 vObj; varying vec3 vWN; varying vec3 vWP;
void main(){
  vObj = position;
  vWN = mat3(modelMatrix) * normal;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWP = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,jt=`
precision highp float;
varying vec3 vObj; varying vec3 vWN; varying vec3 vWP;
uniform vec3 uSun; uniform float uGlow; uniform vec3 uIce; uniform float uFade; uniform vec3 uBg;
${Dt}
void main(){
  vec3 n = normalize(vWN);
  vec3 v = normalize(cameraPosition - vWP);
  vec3 o = normalize(vObj);

  // материки: fbm с доменным искажением, чтобы береговая линия была рваной
  vec3 w = o * 2.0 + 0.45 * vec3(evn(o * 3.6 + 1.7), evn(o * 3.6 + 8.1), evn(o * 3.6 + 4.3));
  float h = efbm(w + 3.7);
  float land = smoothstep(0.515, 0.54, h);
  float elev = clamp((h - 0.53) / 0.22, 0.0, 1.0);
  float polar = smoothstep(0.80, 0.93, abs(o.y) + (h - 0.5) * 0.28);

  // ранг рельефа по производным высоты
  float slope = clamp(length(vec2(dFdx(h), dFdy(h))) * 90.0 * (1.0 + 0.0), 0.0, 1.0);

  vec3 deep = vec3(0.003, 0.008, 0.017);
  vec3 shallow = vec3(0.013, 0.034, 0.055);
  vec3 ocean = mix(deep, shallow, smoothstep(0.30, 0.52, h));
  vec3 lowland = vec3(0.040, 0.055, 0.048);
  vec3 midland = vec3(0.090, 0.108, 0.090);
  vec3 rock = vec3(0.19, 0.195, 0.19);
  vec3 ground = mix(lowland, midland, smoothstep(0.0, 0.5, elev));
  ground = mix(ground, rock, smoothstep(0.55, 1.0, elev) * 0.8);
  ground *= 0.82 + 0.35 * evn(o * 28.0);
  ground *= 1.0 - slope * 0.35;
  vec3 snow = vec3(0.46, 0.52, 0.58);
  vec3 surf = mix(ocean, ground, land);
  surf = mix(surf, snow, polar * (0.55 + 0.45 * land));

  float diff = dot(n, uSun);
  float day = smoothstep(-0.06, 0.30, diff);
  float lit = max(diff, 0.0);

  vec3 col = surf * (0.012 + pow(lit, 0.95) * 1.0);
  // холодный подсвет ночной стороны от атмосферы
  col += surf * vec3(0.012, 0.03, 0.06) * (1.0 - day) * 0.8;

  // блик на океане
  vec3 r = reflect(-uSun, n);
  float spec = pow(max(dot(r, v), 0.0), 70.0) * (1.0 - land) * (1.0 - polar) * day;
  col += mix(vec3(0.9, 0.95, 1.0), uIce, 0.35) * spec * 0.55;

  // огни городов: тёплые точки по шуму, только суша и ночь
  float night = 1.0 - smoothstep(-0.14, 0.10, diff);
  #ifdef CITIES
  float pop = smoothstep(0.52, 0.72, efbm(o * 8.0 + 11.0));
  float dots = smoothstep(0.74, 0.92, evn(o * 330.0)) * 0.8 + smoothstep(0.80, 0.95, evn(o * 700.0)) * 0.6;
  float city = dots * pop * land * (1.0 - polar) * night;
  col += vec3(1.0, 0.62, 0.26) * city * 1.8;
  col += vec3(1.0, 0.55, 0.2) * pop * land * night * 0.018;
  #endif

  // fresnel-кромка (Ice)
  float rim = pow(1.0 - max(dot(n, v), 0.0), 3.2);
  col += uIce * rim * uGlow * 0.55 * (0.12 + day);

  gl_FragColor = vec4(mix(col, uBg, uFade), 1.0);
}
`,qt=`
precision highp float;
varying vec3 vObj; varying vec3 vWN; varying vec3 vWP;
uniform vec3 uSun; uniform float uClouds; uniform float uTime; uniform float uFade;
${Dt}
void main(){
  vec3 n = normalize(vWN);
  vec3 o = normalize(vObj);
  vec3 q = o * 3.0 + vec3(uTime * 0.012, 0.0, uTime * 0.006);
  float c = efbm(q + 0.6 * vec3(evn(q * 1.7), evn(q * 1.7 + 4.0), 0.0));
  vec3 v = normalize(cameraPosition - vWP);
  float limb = smoothstep(0.02, 0.4, dot(n, v));
  float a = smoothstep(0.54, 0.80, c) * uClouds * limb;
  float diff = dot(n, uSun);
  float day = smoothstep(-0.18, 0.28, diff);
  vec3 col = vec3(0.66, 0.72, 0.80) * (0.010 + max(diff, 0.0) * 0.70);
  gl_FragColor = vec4(col, a * 0.7 * (0.10 + 0.90 * day) * (1.0 - uFade));
}
`,Ht=`
varying vec3 vN; varying vec3 vV; varying vec3 vWN;
void main(){
  vN = normalize(normalMatrix * normal);
  vV = normalize(-(modelViewMatrix * vec4(position, 1.0)).xyz);
  vWN = mat3(modelMatrix) * normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,$t=`
precision highp float;
varying vec3 vN; varying vec3 vV; varying vec3 vWN;
uniform vec3 uColor; uniform vec3 uSun; uniform float uGlow; uniform float uInner; uniform float uFade;
void main(){
  // BackSide: нормаль смотрит от камеры; у края диска -dot → 0, к центру диска растёт
  float ndv = -dot(normalize(vN), normalize(vV));
  float g = smoothstep(0.0, 1.0, ndv);
  // плотная кромка у поверхности планеты + мягкий длинный хвост
  float edge = pow(g, uInner);
  float tail = pow(g, 1.6) * 0.35;
  float sun = dot(normalize(vWN), uSun);
  float mask = 0.10 + 0.90 * smoothstep(-0.55, 0.45, sun);
  // закат: сильнее у терминатора
  float dusk = 1.0 + 0.9 * exp(-pow(sun / 0.28, 2.0));
  float a = (edge + tail) * mask * dusk * uGlow * (1.0 - uFade);
  gl_FragColor = vec4(uColor * a, clamp(a, 0.0, 1.0));
}
`;function re(o){const{radius:t,detail:e}=o,l=e==="high",n=l?[128,96]:[64,44],c={value:new O(.6,.25,.75).normalize()},s={value:1.5},i={value:.8},v={value:0},r={value:new q("#8FD8FF")},y={value:0},u={value:new q("#0B0C0E")},w={OCT:l?5:3},f=new st(t,n[0],n[1]),F=new st(t*1.011,Math.round(n[0]*.75),Math.round(n[1]*.75)),P=new st(t*1.16,64,48),z=new J({vertexShader:wt,fragmentShader:jt,defines:{...w,CITIES:1},uniforms:{uSun:c,uGlow:s,uIce:r,uFade:y,uBg:u}}),m=new J({vertexShader:wt,fragmentShader:qt,defines:w,uniforms:{uSun:c,uClouds:i,uTime:v,uFade:y},transparent:!0,depthWrite:!1}),p=new J({vertexShader:Ht,fragmentShader:$t,uniforms:{uColor:r,uSun:c,uGlow:s,uInner:{value:6},uFade:y},side:Ct,transparent:!0,depthWrite:!1,blending:bt}),b=new vt,a=new vt;a.rotation.z=.41;const M=new et(f,z),S=new et(F,m),C=new et(P,p);M.renderOrder=0,S.renderOrder=1,C.renderOrder=2,a.add(M,S,C),b.add(a);let g=0,A=0;return{group:b,uniforms:{glow:s,clouds:i},setGlow(K){s.value=K},setFade(K,ot){y.value=K,u.value.copy(ot)},update(K,ot,X){g+=K*.022,A+=K,v.value=A,c.value.copy(X).normalize(),M.rotation.y=g,S.rotation.y=g*1.32+.5},dispose(){f.dispose(),F.dispose(),P.dispose(),z.dispose(),m.dispose(),p.dispose(),b.removeFromParent()}}}const Q=(o,t=0,e=1)=>o<t?t:o>e?e:o,it=(o,t,e)=>o+(t-o)*e,Qt=(o,t,e)=>{const l=Q((e-o)/(t-o));return l*l*(3-2*l)},le=(o,t,e,l)=>o+(t-o)*(1-Math.exp(-e*l));function mt(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}class Zt{constructor(){I(this,"items",[])}add(t){return this.items.push(t),t}disposeAll(){for(const t of this.items)t.dispose();this.items.length=0}}class ve{constructor(t){I(this,"material");I(this,"scene",new Lt);I(this,"camera",new kt(-1,1,1,-1,0,1));I(this,"mesh");I(this,"geo");this.material=t,this.geo=new It(2,2),this.mesh=new et(this.geo,t),this.mesh.frustumCulled=!1,this.scene.add(this.mesh)}render(t,e){const l=t.autoClear;t.autoClear=!1,t.setRenderTarget(e),t.render(this.scene,this.camera),t.autoClear=l}dispose(){this.geo.dispose(),this.material.dispose()}}const ue=`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;function me(o){const e=document.createElement("canvas");e.width=e.height=128;const l=e.getContext("2d");if(!l)throw new Error("2d context");const n=l.createImageData(128,128),c=o==="dark",s=c?[.075,.082,.095]:[.8,.81,.82],i=c?[.62,.66,.74]:[1,1,.99],v=c?[.1,.14,.2]:[.62,.7,.8],r=c?[0,0,0]:[.4,.42,.47];for(let u=0;u<128;u++)for(let w=0;w<128;w++){const f=(w+.5)/128*2-1,F=1-(u+.5)/128*2,P=f*f+F*F,z=Math.sqrt(Math.max(0,1-P)),m=(u*128+w)*4,p=Math.max(0,f*-.42+F*.62+z*.66),b=Math.max(0,f*.7+F*-.25+z*.5),a=Math.max(0,-F),M=Math.pow(p,c?2.2:1.1),S=Math.pow(p,c?14:30)*(c?.7:.35),C=Math.pow(1-z,2.6);for(let g=0;g<3;g++){let A=s[g]*(c?.7:.95)+i[g]*M*(c?.55:.28)+v[g]*b*(c?.45:.2);A=A*(1-a*(c?.55:.35))+r[g]*a*.35,A+=i[g]*S,A+=C*(c?.1:-.1),n.data[m+g]=Math.round(Q(A)*255)}n.data[m+3]=255}l.putImageData(n,0,0);const y=new zt(e);return y.colorSpace=At,y.generateMipmaps=!0,y.minFilter=_t,y.needsUpdate=!0,y}const ct=`
uniform vec3 uFogColor;
uniform float uFogDensity;
uniform float uPortalS;
float zoneMix(float s){ return smoothstep(uPortalS - 2.5, uPortalS + 4.0, s); }
float fogAmt(float d, float k){ float x = d * uFogDensity * k; return 1.0 - exp(-x * x); }
`;function de(){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d");if(!e)throw new Error("2d context");const l=e.createImageData(128,128),n=(s,i,v)=>Qt(s,i,v);for(let s=0;s<128;s++)for(let i=0;i<128;i++){const v=(i+.5)/128*2-1,r=1-(s+.5)/128*2,y=v*v+r*r,u=Math.sqrt(Math.max(0,1-y));let w=.3+.25*r,f=.38+.25*r,F=.48+.28*r;const P=n(.62,.9,r)*n(.9,.2,Math.abs(v));w+=P*1.1,f+=P*1.1,F+=P*1.1;const z=n(.78,.95,-v)*n(.95,.35,Math.abs(r)),m=n(.78,.95,v)*n(.95,.35,Math.abs(r));w+=z*.95+m*.25,f+=z*.3+m*.62,F+=z*.22+m*.85;const p=Math.pow(Math.max(0,v*-.35+r*.5+u*.79),40);w+=p,f+=p,F+=p;const b=n(-.1,-.9,r)*.55;w*=1-b,f*=1-b,F*=1-b;const a=(s*128+i)*4;l.data[a]=Math.round(Q(w)*255),l.data[a+1]=Math.round(Q(f)*255),l.data[a+2]=Math.round(Q(F)*255),l.data[a+3]=255}e.putImageData(l,0,0);const c=new zt(t);return c.colorSpace=At,c.needsUpdate=!0,c}class fe{constructor(t,e){I(this,"curve");I(this,"length");I(this,"n");I(this,"P");I(this,"T");I(this,"R");I(this,"U");const l=[[0,0,0],[0,0,-40],[6,2,-100],[-5,-1.5,-170],[-14,4,-245],[-4,7,-320],[11,3,-395],[15,-4,-470],[4,-6,-545],[-5,-1.5,-615],[-3,1.5,-690],[1,.5,-770],[2,-1,-860],[2,-2,-960],[2,-3,-1100]];this.curve=new Ut(l.map(([u,w,f])=>new O(u*e,w*e,f*t)),!1,"centripetal"),this.curve.arcLengthDivisions=2400,this.length=this.curve.getLength(),this.n=Math.ceil(this.length)+2;const n=this.n;this.P=new Float32Array(n*3),this.T=new Float32Array(n*3),this.R=new Float32Array(n*3),this.U=new Float32Array(n*3);const c=new O,s=new O,i=new O,v=new O(0,1,0),r=new O(0,0,-1),y=new Nt;for(let u=0;u<n;u++){const w=Math.min(u,this.length);this.curve.getPointAt(w/this.length,c),this.curve.getTangentAt(w/this.length,s).normalize(),u>0&&(y.setFromUnitVectors(r,s),v.applyQuaternion(y)),i.crossVectors(s,v).normalize(),v.crossVectors(i,s).normalize(),r.copy(s),this.P.set([c.x,c.y,c.z],u*3),this.T.set([s.x,s.y,s.z],u*3),this.R.set([i.x,i.y,i.z],u*3),this.U.set([v.x,v.y,v.z],u*3)}}frameAt(t,e){const l=Q(t,0,this.n-1.001),n=Math.floor(l),c=l-n,s=n*3,i=s+3,v=(r,y)=>y.set(it(r[s],r[i],c),it(r[s+1],r[i+1],c),it(r[s+2],r[i+2],c));return v(this.P,e.pos),v(this.T,e.tan).normalize(),v(this.R,e.right),e.right.addScaledVector(e.tan,-e.right.dot(e.tan)).normalize(),e.up.crossVectors(e.right,e.tan).normalize(),t>this.length&&e.pos.addScaledVector(e.tan,t-this.length),e}}function Vt(){return{pos:new O,tan:new O,right:new O,up:new O}}class pe{constructor(t,e,l=.8){I(this,"ps");I(this,"ss");I(this,"N",800);I(this,"cruise");this.dims=t,this.zone3Start=l;const n=this.N;this.ps=new Float32Array(n+1),this.ss=new Float32Array(n+1);const c=.036,s=.74,i=new Float32Array(n+1);for(let r=0;r<=n;r++){const y=r/n*l;let u=1;for(const w of e){const f=(y-(w+.012))/c;u-=s*Math.exp(-f*f)}u=Math.max(u,.16),this.ps[r]=y,i[r]=r===0?0:i[r-1]+u*(l/n)}const v=i[n];for(let r=0;r<=n;r++)this.ss[r]=t.exitS*i[r]/v;this.cruise=t.exitS/v}sAt(t){const e=this.zone3Start;if(t<=e){const y=Q(t/e)*this.N,u=Math.min(this.N-1,Math.floor(y));return it(this.ss[u],this.ss[u+1],y-u)}const l=Q((t-e)/(1-e)),n=this.dims.spaceRun,c=this.cruise*(1-e)*1,s=l*l,i=s*l,v=i-2*s+l,r=-2*i+3*s;return this.dims.exitS+v*c+r*n}}const at=6.8,Mt=`
attribute vec4 aData;
varying vec3 vVN; varying vec3 vViewPos; varying vec4 vD; varying vec3 vLocalU; varying vec3 vHalf; varying vec3 vNL; varying float vS;
uniform float uEdge;
void main(){
  mat4 im = instanceMatrix;
  vec3 sc = vec3(length(im[0].xyz), length(im[1].xyz), length(im[2].xyz));
  vec4 wp = modelMatrix * im * vec4(position, 1.0);
  vec4 mv = viewMatrix * wp;
  vViewPos = mv.xyz;
  vec3 nw = normalize(mat3(modelMatrix) * mat3(im) * normal);
  vVN = normalize(mat3(viewMatrix) * nw);
  vNL = normal; vLocalU = position * sc; vHalf = 0.5 * sc; vD = aData;
  vS = aData.x + (uEdge > 0.5 ? position.z * sc.z : position.y * sc.y);
  gl_Position = projectionMatrix * mv;
}
`,Ft=`
precision highp float;
varying vec3 vVN; varying vec3 vViewPos; varying vec4 vD; varying vec3 vLocalU; varying vec3 vHalf; varying vec3 vNL; varying float vS;
uniform sampler2D uMatD; uniform sampler2D uMatL;
uniform vec3 uCoral; uniform vec3 uIce; uniform float uRibSpacing; uniform float uEdge;
${ct}
float hh(vec2 p){ p = fract(p * vec2(0.1031, 0.1030)); p += dot(p, p.yx + 33.33); return fract((p.x + p.y) * p.x); }
void main(){
  vec3 n = normalize(vVN);
  vec2 muv = n.xy * 0.5 + 0.5;
  vec3 mD = texture2D(uMatD, muv).rgb;
  vec3 mL = texture2D(uMatL, muv).rgb;
  float m = zoneMix(vS);
  float tone = vD.y;
  float lvl = vD.w; // 0..1 глубина (толщина) куска
  vec3 V = normalize(-vViewPos);
  vec3 an = abs(vNL);
  vec3 ledSide = mix(uCoral, uIce, smoothstep(-0.6, 0.6, n.x));
  float cellH = 0.5;
  float edge = 0.0;
  float line = 0.0;
  float dm = 1.0;
  if (uEdge > 0.5) {
    // деление грани на плитки: швы + разброс тона + редкие «окошки» LED
    vec2 fuv = an.x > 0.5 ? vLocalU.zy : (an.y > 0.5 ? vLocalU.xz : vLocalU.xy);
    vec2 cell = fuv / 0.62 + vD.z * 17.0;
    vec2 id = floor(cell);
    vec2 f = fract(cell);
    cellH = hh(id + vD.z * 31.0);
    float ln = min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y));
    line = 1.0 - smoothstep(0.0, 0.045, ln);
    tone *= 0.72 + 0.56 * cellH;
    vec3 dd = vHalf - abs(vLocalU) + an * 10.0;
    dm = min(min(dd.x, dd.y), dd.z);
    edge = 1.0 - smoothstep(0.0, 0.05, dm);
  }
  vec3 dark = mD * (0.32 + 0.5 * tone) * (0.55 + 0.7 * lvl);
  vec3 light = mL * (0.60 + 0.2 * tone) * (0.88 + 0.14 * lvl);
  // световые пятна вокруг LED-обручей на рёбрах (чередуются Coral / Ice)
  float sp = uRibSpacing;
  float q = (vS - 0.35) / sp;
  float k = floor(q + 0.5);
  float dist = (q - k) * sp;
  float pool = exp(-dist * dist / 22.0) * (1.0 - m);
  vec3 poolCol = mod(k, 2.0) < 0.5 ? uCoral : uIce;
  dark += poolCol * pool * (0.012 + 0.34 * dot(mD, vec3(0.333)) * (0.5 + tone));
  vec3 col = mix(dark, light, m);

  float fr = pow(1.0 - max(dot(n, V), 0.0), 4.0);
  col += ledSide * fr * mix(0.012, 0.0, m);

  if (uEdge > 0.5) {
    col = mix(col + edge * (vec3(0.05, 0.055, 0.065) + ledSide * 0.16), col * (1.0 - 0.30 * edge), m);
    float g = 1.0 - smoothstep(0.0, 0.016, abs(dm - 0.17));
    col *= 1.0 - g * 0.40 * (1.0 - 0.4 * m);
    col *= 1.0 - line * mix(0.35, 0.18, m);
    // окошки-огоньки на тёмной стороне
    float lamp = step(0.968, cellH) * (1.0 - m);
    vec2 fuv2 = an.x > 0.5 ? vLocalU.zy : (an.y > 0.5 ? vLocalU.xz : vLocalU.xy);
    vec2 ff = fract(fuv2 / 0.62 + vD.z * 17.0);
    float box = step(0.3, ff.x) * step(ff.x, 0.7) * step(0.35, ff.y) * step(ff.y, 0.65);
    col += lamp * box * mix(uCoral, uIce, step(0.5, hh(vec2(vD.z, cellH)))) * 1.6;
  }

  float d = length(vViewPos);
  col = mix(col, uFogColor, fogAmt(d, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`,Jt=`
attribute vec4 aData;   // s, длина, seed, —
attribute vec3 aCol;
varying vec3 vCol; varying vec4 vD; varying float vU; varying float vS; varying vec3 vViewPos;
void main(){
  vCol = aCol; vD = aData; vU = position.x + 0.5;
  vS = aData.x + position.x * aData.y;
  vec4 mv = viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`,Kt=`
precision highp float;
varying vec3 vCol; varying vec4 vD; varying float vU; varying float vS; varying vec3 vViewPos;
uniform float uTime;
${ct}
void main(){
  float ph = vS * 0.21 - uTime * 1.7 + vD.z * 6.2831;
  float pulse = pow(0.5 + 0.5 * sin(ph), 7.0);
  float endFade = smoothstep(0.0, 0.07, vU) * (1.0 - smoothstep(0.93, 1.0, vU));
  float m = zoneMix(vS);
  float inten = (0.55 + 2.6 * pulse) * mix(1.0, 0.8, m) * (0.55 + 0.45 * endFade);
  vec3 col = vCol * inten;
  float d = length(vViewPos);
  col = mix(col, uFogColor, fogAmt(d, 0.5));
  gl_FragColor = vec4(col, 1.0);
}
`,Xt=`
attribute float aS; attribute float aA;
varying float vS; varying float vA; varying vec3 vViewPos;
void main(){
  vS = aS; vA = aA;
  vec4 mv = viewMatrix * modelMatrix * vec4(position, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`,Yt=`
precision highp float;
varying float vS; varying float vA; varying vec3 vViewPos;
${ct}
void main(){
  float m = zoneMix(vS);
  vec3 dark = vec3(0.012, 0.014, 0.018);
  vec3 light = vec3(0.36, 0.375, 0.40);
  vec3 col = mix(dark, light, m);
  // поперечные швы и продольные линии
  float seam = 1.0 - smoothstep(0.0, 0.05, abs(fract(vS / 3.2) - 0.5) * 2.0 - 0.0);
  float ring = smoothstep(0.96, 1.0, fract(vS / 3.2));
  float lon = smoothstep(0.975, 1.0, fract(vA * 12.0));
  col += (ring + lon) * mix(vec3(0.012, 0.014, 0.018), vec3(-0.12), m);
  float d = length(vViewPos);
  col = mix(col, uFogColor, fogAmt(d, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;function he(o){const t=mt(o.seed??7),e=new Zt,l=new vt,n=o.uniforms,c={uMatD:n.uMatD,uMatL:n.uMatL,uCoral:n.uCoral,uIce:n.uIce,uFogColor:n.uFogColor,uFogDensity:n.uFogDensity,uPortalS:n.uPortalS},s=e.add(new J({vertexShader:Mt,fragmentShader:Ft,uniforms:{...c,uEdge:{value:1},uRibSpacing:{value:o.ribEvery*o.ds}}})),i=e.add(new J({vertexShader:Mt,fragmentShader:Ft,uniforms:{...c,uEdge:{value:0},uRibSpacing:{value:o.ribEvery*o.ds}}})),v=e.add(new J({vertexShader:Jt,fragmentShader:Kt,uniforms:{uTime:n.uTime,uFogColor:n.uFogColor,uFogDensity:n.uFogDensity,uPortalS:n.uPortalS}})),r=e.add(new J({vertexShader:Xt,fragmentShader:Yt,side:Wt,uniforms:{uFogColor:n.uFogColor,uFogDensity:n.uFogDensity,uPortalS:n.uPortalS}})),y=e.add(new St(1,1,1)),u=e.add(new Ot(1,1,1,8,1)),w=e.add(new St(1,1,1)),f=26,F=o.exitS+34,P=Math.ceil(F/o.ds),z=Math.ceil(P/f),m=Array.from({length:z},()=>({m:[],d:[]})),p=Array.from({length:z},()=>({m:[],d:[]})),b=Array.from({length:z},()=>({m:[],d:[],c:[]})),a=Vt(),M=new O,S=new O,C=new O,g=new O,A=new O,K=new q("#FF5A36"),ot=new q("#8FD8FF"),X=(x,h,d,D,U)=>{x.push(h.x,h.y,h.z,0,d.x,d.y,d.z,0,D.x,D.y,D.z,0,U.x,U.y,U.z,1)},dt=x=>Q((x-(o.exitS-38))/70),ft=x=>{const h=dt(x);return at*(1+4.8*h*h)};let Y=0;const pt=2*Math.PI/o.slots;for(let x=0;x<P;x++){const h=x*o.ds;if(h>F)break;const d=Math.min(z-1,Math.floor(x/f));o.path.frameAt(h,a);const D=x%o.ribEvery===0,U=dt(h),_=ft(h),H=1-.78*U,G=t()*Math.PI*2;for(let N=0;N<o.slots;N++){if(t()>H)continue;const W=G+(N+(t()-.5)*.35)*pt,B=Math.cos(W),L=Math.sin(W);S.copy(a.right).multiplyScalar(B).addScaledVector(a.up,L),C.copy(a.right).multiplyScalar(-L).addScaledVector(a.up,B);const V=h>o.portalS-2&&h<o.exitS-30;let E=t();V&&(E=E<.78?E*.667:E<.92?.52+(E-.78)*2:E<.95?.8+(E-.92)*2:.9);const k=t(),Z=pt*_*(V?.88+t()*.1:.62+t()*.44)*(D?1.05:1);if(D){const T=1.45+t()*.2,$=.9;M.copy(a.pos).addScaledVector(S,_-T/2),g.copy(S).multiplyScalar(T),A.copy(C).multiplyScalar(Z);const j=a.tan.clone().multiplyScalar($);X(m[d].m,g,A,j,M),m[d].d.push(h,k,t(),1),Y++;continue}if(E<.52){const T=V?.2+t()*t()*.55:.28+t()*.7,$=V?o.ds*(1.05+(t()<.3?.55:0)):o.ds*(.7+t()*1.7),j=V?0:(t()-.5)*o.ds*.6;M.copy(a.pos).addScaledVector(S,_-T/2).addScaledVector(a.tan,j),g.copy(S).multiplyScalar(T),A.copy(C).multiplyScalar(Z);const tt=a.tan.clone().multiplyScalar($);X(m[d].m,g,A,tt,M),m[d].d.push(h,k,t(),Q(T/1)),Y++}else if(E<.8){const T=.6+t()*t()*.95,$=o.ds*(.45+t()*.8),j=Z*(.55+t()*.5),tt=(t()-.5)*o.ds*.7,nt=(t()-.5)*(Z-j);M.copy(a.pos).addScaledVector(S,_-T/2).addScaledVector(a.tan,tt).addScaledVector(C,nt),g.copy(S).multiplyScalar(T),A.copy(C).multiplyScalar(j);const lt=a.tan.clone().multiplyScalar($);X(m[d].m,g,A,lt,M),m[d].d.push(h,k,t(),Q(T/1)),Y++}else if(E<.86){const T=.18+t()*.3,$=o.ds*(2.2+t()*3.2);M.copy(a.pos).addScaledVector(S,_-T/2-.1).addScaledVector(a.tan,(t()-.5)*o.ds),g.copy(S).multiplyScalar(T),A.copy(C).multiplyScalar(Z*1.18);const j=a.tan.clone().multiplyScalar($);X(m[d].m,g,A,j,M),m[d].d.push(h,k,t(),.35),Y++}else{const T=.07+t()*.22,$=3+t()*9,j=.35+t()*1.1;M.copy(a.pos).addScaledVector(S,_-j),g.copy(S).multiplyScalar(T),A.copy(a.tan).multiplyScalar($);const tt=C.clone().multiplyScalar(T);X(p[d].m,g,A,tt,M),p[d].d.push(h,k,t(),.6),Y++}}if(D&&U<.3){const N=Math.max(12,Math.round(o.slots*1.1)),W=at-2.05,B=x/o.ribEvery%2===0?K:ot;for(let L=0;L<N;L++){const V=(L+.5)/N*Math.PI*2+G,E=Math.cos(V),k=Math.sin(V);S.copy(a.right).multiplyScalar(E).addScaledVector(a.up,k),C.copy(a.right).multiplyScalar(-k).addScaledVector(a.up,E);const Z=2*Math.PI*W/N;M.copy(a.pos).addScaledVector(S,W).addScaledVector(a.tan,.35),g.copy(C).multiplyScalar(Z*.86),A.copy(S).multiplyScalar(.06);const T=a.tan.clone().multiplyScalar(.06);X(b[d].m,g,A,T,M),b[d].d.push(h,Z*.86,t(),0),b[d].c.push(B.r,B.g,B.b),Y++}}}const rt=7;for(let x=0;x<o.railCount;x++){const h=(x+.5)/o.railCount*Math.PI*2+.31,d=x%3===0?ot:K,D=at-2.1-x%2*.12;for(let U=t()*rt;U<F-40;U+=rt){const _=rt*(.55+t()*.3),H=U+_/2,G=Math.min(z-1,Math.floor(H/o.ds/f));o.path.frameAt(H,a);const N=h+Math.sin(H*.013+x)*.06;S.copy(a.right).multiplyScalar(Math.cos(N)).addScaledVector(a.up,Math.sin(N)),C.copy(a.right).multiplyScalar(-Math.sin(N)).addScaledVector(a.up,Math.cos(N)),M.copy(a.pos).addScaledVector(S,D);const W=a.tan.clone().multiplyScalar(_);g.copy(S).multiplyScalar(.075),A.copy(C).multiplyScalar(.12),X(b[G].m,W,g,A,M),b[G].d.push(H,_,t(),0),b[G].c.push(d.r,d.g,d.b),Y++}}const ht=[],gt=new Bt,yt=new Gt;for(let x=0;x<z;x++){const h=[],d=x*f*o.ds,D=Math.min(F,(x+1)*f*o.ds),U=(_,H,G,N)=>{const W=_.d.length/4;if(!W)return;const B=H.clone();B.setAttribute("aData",new xt(new Float32Array(_.d),4)),N&&B.setAttribute("aCol",new xt(new Float32Array(_.c),3));const L=new Rt(B,G,W);for(let V=0;V<W;V++)gt.fromArray(_.m,V*16),L.setMatrixAt(V,gt);L.instanceMatrix.needsUpdate=!0,o.path.frameAt((d+D)/2,a),yt.set(a.pos.clone(),(D-d)/2+at*5.5+10),L.boundingSphere=yt.clone(),L.frustumCulled=!0,l.add(L),h.push(L),e.add({dispose:()=>{B.dispose(),L.dispose()}})};U(m[x],y,s,!1),U(p[x],u,i,!1),U(b[x],w,v,!0),ht.push({objs:h,s0:d,s1:D})}{const h=Math.ceil(F/2.2)+1,d=30,D=new Float32Array(h*(d+1)*3),U=new Float32Array(h*(d+1)),_=new Float32Array(h*(d+1)),H=[];for(let W=0;W<h;W++){const B=Math.min(W*2.2,F);o.path.frameAt(B,a);const L=ft(B)+.12;for(let V=0;V<=d;V++){const E=V/d*Math.PI*2,k=W*(d+1)+V,Z=a.pos.x+(a.right.x*Math.cos(E)+a.up.x*Math.sin(E))*L,T=a.pos.y+(a.right.y*Math.cos(E)+a.up.y*Math.sin(E))*L,$=a.pos.z+(a.right.z*Math.cos(E)+a.up.z*Math.sin(E))*L;if(D[k*3]=Z,D[k*3+1]=T,D[k*3+2]=$,U[k]=B,_[k]=V/d,W<h-1&&V<d){const j=k,tt=k+1,nt=k+d+1,lt=k+d+2;H.push(j,nt,tt,tt,nt,lt)}}}const G=e.add(new ut);G.setAttribute("position",new R(D,3)),G.setAttribute("aS",new R(U,1)),G.setAttribute("aA",new R(_,1)),G.setIndex(H);const N=new et(G,r);N.frustumCulled=!1,l.add(N)}return{group:l,count:Y,cull(x){for(const h of ht){const d=h.s1>x-60&&h.s0<x+230;for(const D of h.objs)D.visible=d}},dispose(){e.disposeAll(),l.removeFromParent()}}}const te=`
attribute float aSize; attribute float aPhase; attribute vec3 aCol; attribute float aSpeed;
uniform float uTime; uniform float uPx; uniform float uSpace;
varying vec3 vCol; varying float vA;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float tw = 0.62 + 0.38 * sin(uTime * aSpeed + aPhase);
  gl_PointSize = max(1.0, aSize * uPx * (0.85 + 0.25 * tw));
  vCol = aCol * (0.8 + 0.7 * tw);
  vA = uSpace;
}
`,ee=`
precision highp float;
varying vec3 vCol; varying float vA;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c) * 2.0;
  float a = smoothstep(1.0, 0.0, r);
  a = a * a;
  gl_FragColor = vec4(vCol * a * vA, a * vA);
}
`;function ge(o,t,e,l,n=5,c){const s=mt(n),i=new Float32Array(t*3),v=new Float32Array(t),r=new Float32Array(t),y=new Float32Array(t),u=new Float32Array(t*3),w=[new q("#ECEDE8"),new q("#8FD8FF"),new q("#FFD9C7")];for(let m=0;m<t;m++){const p=e*(.9+s()*.2),b=s()*Math.PI*2;if(c!==void 0){const C=Math.cos(c)+(1-Math.cos(c))*s(),g=Math.sqrt(1-C*C);i[m*3]=Math.cos(b)*g*p,i[m*3+1]=Math.sin(b)*g*p,i[m*3+2]=-C*p}else{const C=s()*2-1,g=Math.sqrt(1-C*C);i[m*3]=g*Math.cos(b)*p,i[m*3+1]=C*p,i[m*3+2]=g*Math.sin(b)*p}const a=s();v[m]=a>.985?5+s()*2.5:a>.9?2.8+s()*1.2:1.7+s()*1.1,r[m]=s()*6.28,y[m]=.6+s()*2.6;const M=w[s()<.7?0:s()<.7?1:2],S=a>.985?2.6:.9+s()*.6;u[m*3]=M.r*S,u[m*3+1]=M.g*S,u[m*3+2]=M.b*S}const f=o.add(new ut);f.setAttribute("position",new R(i,3)),f.setAttribute("aSize",new R(v,1)),f.setAttribute("aPhase",new R(r,1)),f.setAttribute("aSpeed",new R(y,1)),f.setAttribute("aCol",new R(u,3));const F={uTime:{value:0},uPx:{value:l},uSpace:{value:1}},P=o.add(new J({vertexShader:te,fragmentShader:ee,uniforms:F,transparent:!0,depthWrite:!1,blending:bt})),z=new Pt(f,P);return z.frustumCulled=!1,z.renderOrder=-90,{points:z,uniforms:F}}const oe=`
varying vec3 vDir;
void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,ae=`
precision highp float;
varying vec3 vDir; uniform float uSpace; uniform vec3 uTint; uniform vec3 uBg;
float h3(vec3 p){ p = fract(p * .1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float n3(vec3 x){ vec3 i = floor(x), f = fract(x); f = f*f*(3.-2.*f);
  return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),f.x),f.y), f.z); }
void main(){
  vec3 base = vec3(0.0035, 0.0045, 0.007);
  float neb = n3(vDir * 2.2) * 0.6 + n3(vDir * 4.7 + 3.0) * 0.4;
  neb = smoothstep(0.45, 0.85, neb);
  vec3 col = base + uTint * neb * 0.018;
  gl_FragColor = vec4(mix(uBg, col, uSpace), 1.0);
}
`;function ye(o,t){const e=o.add(new st(1,24,16)),l={uSpace:{value:0}},n=o.add(new J({vertexShader:oe,fragmentShader:ae,uniforms:{...l,uTint:{value:new q("#8FD8FF")},uBg:t},side:Ct,depthWrite:!1,depthTest:!1})),c=new et(e,n);return c.scale.setScalar(1500),c.frustumCulled=!1,c.renderOrder=-100,{mesh:c,uniforms:n.uniforms}}const ne=`
attribute float aS; attribute float aPhase; attribute float aSize; attribute vec3 aCol; attribute vec3 aTan;
uniform float uTime; uniform float uPx;
varying vec3 vCol; varying float vS; varying float vW; varying vec3 vViewPos; varying float vSize;
void main(){
  float u = fract(uTime * (0.045 + 0.05 * aPhase) + aPhase * 7.0);
  vec3 p = position - aTan * (u - 0.5) * 26.0;
  p += vec3(sin(uTime * 0.4 + aPhase * 30.0), cos(uTime * 0.33 + aPhase * 20.0), sin(uTime * 0.27 + aPhase * 11.0)) * 0.18;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(aSize * uPx * 28.0 / max(-mv.z, 0.5), 1.0, 22.0);
  vCol = aCol; vS = aS; vW = sin(u * 3.14159);
}
`,se=`
precision highp float;
varying vec3 vCol; varying float vS; varying float vW; varying vec3 vViewPos;
${ct}
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c) * 2.0;
  float a = smoothstep(1.0, 0.1, r);
  float m = zoneMix(vS);
  float d = length(vViewPos);
  float near = smoothstep(1.2, 5.0, d);
  float fog = 1.0 - fogAmt(d, 0.9);
  vec3 col = mix(vCol * 1.7, vec3(0.30, 0.34, 0.42), m);
  float al = a * vW * near * fog * mix(0.9, 0.45, m);
  gl_FragColor = vec4(col * al, al);
}
`;function Se(o,t,e,l,n,c){const s=mt(11),i=Vt(),v=new Float32Array(e*3),r=new Float32Array(e),y=new Float32Array(e),u=new Float32Array(e),w=new Float32Array(e*3),f=new Float32Array(e*3),F=[new q("#ECEDE8"),new q("#8FD8FF"),new q("#FF5A36"),new q("#ECEDE8")];for(let p=0;p<e;p++){const b=s()*l;t.frameAt(b,i);const a=s()*Math.PI*2,M=Math.sqrt(s())*(at-2.6);v[p*3]=i.pos.x+(i.right.x*Math.cos(a)+i.up.x*Math.sin(a))*M,v[p*3+1]=i.pos.y+(i.right.y*Math.cos(a)+i.up.y*Math.sin(a))*M,v[p*3+2]=i.pos.z+(i.right.z*Math.cos(a)+i.up.z*Math.sin(a))*M,f[p*3]=i.tan.x,f[p*3+1]=i.tan.y,f[p*3+2]=i.tan.z,r[p]=b,y[p]=s(),u[p]=.5+s()*s()*1.8;const S=F[Math.floor(s()*F.length)];w[p*3]=S.r,w[p*3+1]=S.g,w[p*3+2]=S.b}const P=o.add(new ut);P.setAttribute("position",new R(v,3)),P.setAttribute("aS",new R(r,1)),P.setAttribute("aPhase",new R(y,1)),P.setAttribute("aSize",new R(u,1)),P.setAttribute("aCol",new R(w,3)),P.setAttribute("aTan",new R(f,3));const z=o.add(new J({vertexShader:ne,fragmentShader:se,uniforms:{uTime:c.uTime,uPx:{value:n},uFogColor:c.uFogColor,uFogDensity:c.uFogDensity,uPortalS:c.uPortalS},transparent:!0,premultipliedAlpha:!0,depthWrite:!1})),m=new Pt(P,z);return m.frustumCulled=!1,m.renderOrder=4,m}export{Zt as D,ve as F,pe as P,fe as T,ct as Z,re as a,Q as b,ge as c,ue as d,me as e,he as f,Se as g,Vt as h,ye as i,le as j,it as l,de as m,Qt as s};
