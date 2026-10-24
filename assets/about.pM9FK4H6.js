import{S as gt,k as wt,C as R,V as v,i as yt,P as St,e as z,M as me,G as Ve,B as Mt,l as xt,A as Ee,m as je,n as be,h as Qe,o as $e,p as bt,U as Pt,W as Ye,c as E,R as He,H as Oe,q as b,I as Tt,s as Ct,t as Lt,u as zt,v as Ft,E as Dt,w as Rt,x as Bt,y as At,z as Wt,F as _t}from"./index.DFTFD3o2.js";import{G as j,V as Pe,F as Te,m as Gt,d as kt,r as It,a as Ut}from"./gl.DDirUlj2.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const he=new v(8.5,11.5,-7.5),Je=new v(.3,0,-1.3),Z=Je.clone().sub(he).normalize(),qt=Je.distanceTo(he),Nt=.35,Vt=2.3,Et=64;function Xe(n,a){const s=Math.hypot(n,a),t=b.smoothstep(s,2.2,7);return(.34*Math.sin(n*.31+1.3)*Math.cos(a*.26+.4)+.16*Math.sin(n*.83+2.1)*Math.sin(a*.71)+.06*Math.sin(n*2.1+a*1.7))*t}function et(n,a,s,t){let l=n*374761393+a*668265263+s*2147483647+t*1274126177|0;return l=Math.imul(l^l>>>13,1274126177),l^=l>>>16,(l>>>0)/4294967296}function Ze(n,a,s,t=0){const l=Math.floor(n),r=Math.floor(a),g=Math.floor(s);let d=n-l,f=a-r,i=s-g;d=d*d*(3-2*d),f=f*f*(3-2*f),i=i*i*(3-2*i);const p=(w,M,x)=>w+(M-w)*x,c=(w,M,x)=>et(l+w,r+M,g+x,t);return p(p(p(c(0,0,0),c(1,0,0),d),p(c(0,1,0),c(1,1,0),d),f),p(p(c(0,0,1),c(1,0,1),d),p(c(0,1,1),c(1,1,1),d),f),i)}function de(n,a,s,t,l){const r=Math.floor(n),g=Math.floor(a),d=Math.floor(s);let f=n-r,i=a-g,p=s-d;f=f*f*f*(f*(f*6-15)+10),i=i*i*i*(i*(i*6-15)+10),p=p*p*p*(p*(p*6-15)+10);const c=x=>(x%t+t)%t,w=(x,y,I)=>x+(y-x)*I,M=(x,y,I)=>et(c(r+x),c(g+y),c(d+I),l);return w(w(w(M(0,0,0),M(1,0,0),f),w(M(0,1,0),M(1,1,0),f),i),w(w(M(0,0,1),M(1,0,1),f),w(M(0,1,1),M(1,1,1),f),i),p)}function jt(){const n=Et,a=new Uint8Array(n*n*n);let s=0;for(let l=0;l<n;l++)for(let r=0;r<n;r++)for(let g=0;g<n;g++){const d=g/n,f=r/n,i=l/n,p=de(d*4,f*4,i*4,4,1)*.5+de(d*8,f*8,i*8,8,2)*.28+de(d*16,f*16,i*16,16,3)*.14+de(d*32,f*32,i*32,32,4)*.08;a[s++]=Math.max(0,Math.min(255,Math.round(p*255)))}const t=new Rt(a,n,n,n);return t.format=Bt,t.type=At,t.minFilter=E,t.magFilter=E,t.wrapS=t.wrapT=t.wrapR=Wt,t.unpackAlignment=1,t.generateMipmaps=!1,t.needsUpdate=!0,t}const $=`
uniform vec3 uS; uniform vec3 uD; uniform float uL; uniform float uR0; uniform float uR1;
uniform vec4 uSph[12];
float beamMask(vec3 p){
  float s = dot(p - uS, uD);
  float a = s / uL;
  vec3 q = p - uS - uD * s;
  float R = mix(uR0, uR1, clamp(a, 0., 1.25));
  float r = length(q) / R;
  return (1. - smoothstep(.5, 1., r)) * smoothstep(0., .05, a);
}
float shadowSph(vec3 p){
  vec3 toS = uS - p; float dist = length(toS); vec3 d = toS / dist;
  float sh = 1.;
  for (int i = 0; i < 12; i++){
    vec4 sp = uSph[i];
    if (sp.w < .001) continue;
    vec3 c = sp.xyz - p;
    float t = dot(c, d);
    if (t > .02 && t < dist) { float dd = length(c - d * t); sh *= smoothstep(sp.w * .72, sp.w * 1.2, dd); }
  }
  return sh;
}
`,Ce=`
uniform vec3 uLightPos; uniform vec3 uLightCol; uniform float uLightI; uniform vec3 uBeamCol; uniform float uGain;
vec3 shade(vec3 p, vec3 n, vec3 v, vec3 albedo, float rim, float shadow){
  vec3 L = -uD;
  float bm = beamMask(p);
  float ndl = max(dot(n, L), 0.);
  vec3 col = albedo * uBeamCol * (ndl * bm * shadow * 3.0 * uGain);
  col += albedo * vec3(.032, .042, .060) * (.55 + .45 * n.y);
  col += albedo * uBeamCol * bm * .12 * (.5 + .5 * n.y) * shadow;
  vec3 dl = uLightPos - p; float d = length(dl); dl /= d;
  float att = 1. / (1. + d * d * .24);
  col += albedo * uLightCol * max(dot(n, dl), 0.) * att * uLightI * 2.6;
  float fr = pow(1. - max(dot(n, v), 0.), 3.);
  col += uBeamCol * fr * rim * (.05 + bm) * max(dot(n, L) * .7 + .3, 0.) * shadow * uGain * 1.4;
  col += uLightCol * fr * rim * att * uLightI * 1.6;
  col += vec3(.05, .075, .11) * fr * min(rim, 1.3) * .9;
  return col;
}
`,pe=`
varying vec3 vW; varying vec3 vN; varying vec3 vL;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz; vN = normalize(mat3(modelMatrix) * normal); vL = position;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,Ke=`
precision highp float;
varying vec3 vW; varying vec3 vN; varying vec3 vL;
uniform vec3 uCam; uniform vec3 uAlbedo; uniform float uRim; uniform float uFlat;
${j}
${$}
${Ce}
void main(){
  vec3 v = normalize(uCam - vW);
  vec3 nf = normalize(cross(dFdx(vW), dFdy(vW)));
  if (dot(nf, v) < 0.) nf = -nf;
  vec3 n = normalize(mix(normalize(vN), nf, uFlat));
  float g = fbm3(vW * 2.2) ;
  float strata = .5 + .5 * sin(vW.y * 9. + g * 5.);
  vec3 alb = uAlbedo * (.55 + .9 * g) * (.85 + .3 * strata);
  vec3 col = shade(vW, n, v, alb, uRim, 1.);
  gl_FragColor = vec4(col, 1.);
}
`,$t=`
precision highp float;
varying vec3 vW; varying vec3 vN; varying vec3 vL;
uniform vec3 uCam;
${j}
${$}
${Ce}
void main(){
  vec3 v = normalize(uCam - vW);
  vec3 n = normalize(vN);
  float g = fbm3(vec3(vW.x, 0., vW.z) * .6) ;
  float sp = vnoise(vec3(vW.x, 0., vW.z) * 9.);
  vec3 alb = vec3(.110, .116, .128) * (.55 + 1.1 * g) * (.8 + .4 * sp);
  float sh = shadowSph(vW + vec3(0., .02, 0.));
  vec3 col = shade(vW, n, v, alb, .0, sh);
  gl_FragColor = vec4(col, 1.);
}
`,Yt=`
precision highp float;
varying vec3 vW; varying vec3 vN; varying vec3 vL;
uniform vec3 uCam;
${j}
${$}
${Ce}
void main(){
  vec3 v = normalize(uCam - vW);
  vec3 n = normalize(vN);
  vec3 col = shade(vW, n, v, vec3(.022, .023, .026), 3.2, 1.);
  gl_FragColor = vec4(col, 1.);
}
`,Ht=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uPos;
uniform float uDt, uTime, uSpeed, uMode, uReset, uLightI;
uniform vec3 uLightPos, uLightVel, uB1, uB2;
${j}
${$}
vec3 spawn(vec2 seed){
  vec3 h = hash32(seed * 91.7 + fract(uTime) * 17.3);
  vec3 h2 = hash32(seed * 3.1 + fract(uTime * 1.7) * 5.1);
  if (uMode > .5) return vec3((h.x - .5) * 21., (h.y - .5) * 11.5, (h.z - .72) * 9.);
  if (h2.z < .1) return vec3((h.x - .5) * 24., .2 + h.y * 5., (h.z - .55) * 16.);
  float a = mix(.16, 1.02, pow(h.x, .8));
  float R = mix(uR0, uR1, a) * 1.08;
  float ang = h.y * 6.2832; float rad = sqrt(h.z) * R;
  return uS + uD * (a * uL) + (uB1 * cos(ang) + uB2 * sin(ang)) * rad;
}
void main(){
  vec4 P = texture2D(uPos, vUv);
  float rate = .035 + .05 * hash12(vUv * 53.1);
  if (uReset > .5) {
    P.xyz = spawn(vUv); P.w = hash12(vUv * 7.7 + 1.3);
  } else {
    P.w += uDt * rate * uSpeed;
    if (P.w >= 1. || (uMode < .5 && P.y < .01)) { P.xyz = spawn(vUv + P.xy); P.w = 0.; }
    vec3 v = curl(P.xyz * .3 + vec3(0., uTime * .03, 0.)) * .6;
    v.y += .03;
    if (uMode < .5) {
      float s = dot(P.xyz - uS, uD); vec3 q = P.xyz - uS - uD * s;
      float R = mix(uR0, uR1, clamp(s / uL, 0., 1.1)); float rr = length(q) / R;
      v -= normalize(q + 1e-4) * smoothstep(.7, 1.5, rr) * .45;
    }
    vec3 dd = P.xyz - uLightPos; float r2 = dot(dd, dd); float f = exp(-r2 / 2.4);
    v += dd / (sqrt(r2) + .05) * f * 6. * uLightI + uLightVel * f * .5;
    P.xyz += v * uDt * uSpeed;
  }
  gl_FragColor = P;
}
`,Ot=`
attribute vec2 aRef;
uniform sampler2D uPos;
uniform float uDpr, uSize, uTime, uMode, uAlpha, uLightI;
uniform vec3 uLightPos, uLightCol, uBeamCol;
varying float vA; varying vec3 vTint;
${j}
${$}
void main(){
  vec4 P = texture2D(uPos, aRef);
  float rnd = hash12(aRef * 91.7);
  float fade = smoothstep(0., .07, P.w) * (1. - smoothstep(.86, 1., P.w));
  float inBeam = mix(beamMask(P.xyz), .42, uMode);
  float lit = mix(.05, 1., inBeam);
  vec3 dl = uLightPos - P.xyz;
  float cur = uLightI * exp(-dot(dl, dl) * .32);
  float tw = .6 + .4 * sin(uTime * (.7 + rnd * 2.2) + rnd * 40.);
  vA = fade * (lit * tw + cur * 1.4) * uAlpha * (.4 + rnd);
  vTint = mix(uBeamCol, uLightCol, clamp(cur * 1.5, 0., 1.));
  vec4 mv = viewMatrix * vec4(P.xyz, 1.);
  gl_Position = projectionMatrix * mv;
  float size = uSize * (.5 + rnd * 1.1) * (1. + cur * .5);
  gl_PointSize = clamp(size * uDpr * 9. / max(-mv.z, .6), 1., 16. * uDpr);
}
`,Xt=`
precision highp float;
varying float vA; varying vec3 vTint;
void main(){
  float d = length(gl_PointCoord - .5) * 2.;
  float a = 1. - smoothstep(0., 1., d); a *= a;
  gl_FragColor = vec4(vTint, a * vA);
}
`,Zt=`
uniform float uSizePx;
void main(){
  vec4 mv = viewMatrix * vec4(position, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSizePx;
}
`,Kt=`
precision highp float;
uniform vec3 uCol; uniform float uI;
void main(){
  float d = length(gl_PointCoord - .5) * 2.;
  float a = exp(-d * d * 7.) * .9 + exp(-d * 3.) * .25;
  a *= 1. - smoothstep(.85, 1., d);
  gl_FragColor = vec4(uCol, a * uI);
}
`,Qt=`
precision highp float;
precision highp sampler3D;
varying vec2 vUv;
uniform sampler2D tDepth; uniform sampler3D tNoise;
uniform mat4 uInvProj; uniform mat4 uCamWorld; uniform vec3 uCam;
uniform float uTime, uFar, uSteps, uBeamSteps, uBase, uHaze, uFall, uGain, uBeamI, uLightI;
uniform vec3 uBeamCol, uLightPos, uLightCol, uB1, uB2;
${j}
${$}
float hg(float c, float g){ return (1. - g * g) / pow(1. + g * g - 2. * g * c, 1.5); }
/* плотность: ровная дымка + стелющийся туман у земли */
float dens(vec3 p, out float n, out float gf){
  vec3 q = p * vec3(.16, .24, .16) + vec3(uTime * .018, 0., uTime * .011);
  n = texture(tNoise, q).r;
  float n2 = texture(tNoise, q * 2.3 + vec3(.37, uTime * .02, .11)).r;
  float g = uBase * exp(-max(p.y, 0.) * uFall) * (.08 + 2.2 * smoothstep(.3, .74, n * .75 + n2 * .35));
  g *= mix(.12, 1., smoothstep(1.5, 8., length(p - uCam)));
  gf = g / (g + uHaze);
  return uHaze + g;
}
void main(){
  float dep = texture2D(tDepth, vUv).x;
  vec4 vp = uInvProj * vec4(vUv * 2. - 1., 1., 1.); vp /= vp.w;
  vec3 rd = normalize((uCamWorld * vec4(vp.xyz, 0.)).xyz);
  float len = uFar;
  if (dep < .99999) { vec4 s = uInvProj * vec4(vUv * 2. - 1., dep * 2. - 1., 1.); s /= s.w; len = min(length(s.xyz), uFar); }
  float jit = fract(hash12(gl_FragCoord.xy + fract(uTime) * 91.7));

  /* хорда луча внутри цилиндра, охватывающего конус света */
  float Rm = uR1 * 1.08;
  vec3 o = uCam - uS;
  float od = dot(o, uD), rdD = dot(rd, uD);
  vec3 oP = o - uD * od, dP = rd - uD * rdD;
  float A = dot(dP, dP), Bh = dot(oP, dP), C = dot(oP, oP) - Rm * Rm;
  float disc = Bh * Bh - A * C;
  float t0 = 0., t1 = -1.;
  if (disc > 0. && A > 1e-6) { float sq = sqrt(disc); t0 = (-Bh - sq) / A; t1 = (-Bh + sq) / A; }
  if (abs(rdD) > 1e-5) {
    float ta = (.02 * uL - od) / rdD, tb = (1.2 * uL - od) / rdD;
    t0 = max(t0, min(ta, tb)); t1 = min(t1, max(ta, tb));
  } else if (od < .02 * uL || od > 1.2 * uL) t1 = -1.;
  t0 = max(t0, 0.); t1 = min(t1, len);

  /* 1) фоновый туман и тёплая точка курсора: неравномерные шаги, плотнее у камеры */
  vec3 acc = vec3(0.); float T = 1.;
  float Tt0 = 1.; bool seen = false;
  float pw = 1.7;
  for (int i = 0; i < 40; i++){
    if (float(i) >= uSteps) break;
    float u0 = (float(i) + jit) / uSteps, u1 = (float(i) + 1.) / uSteps;
    float t = len * pow(u0, pw);
    float ds = len * (pow(u1, pw) - pow(max(float(i), 0.) / uSteps, pw));
    if (!seen && t >= t0) { Tt0 = T; seen = true; }
    vec3 p = uCam + rd * t;
    float n, gf;
    float sigma = dens(p, n, gf);
    vec3 L = vec3(.011, .016, .027) * (.7 + n * .8) + gf * vec3(.030, .040, .058) * (.5 + n);
    vec3 dl = uLightPos - p;
    L += uLightCol * uLightI * (1. / (1. + dot(dl, dl) * 2.4)) * .5;
    float dT = exp(-sigma * ds);
    acc += T * (1. - dT) * L;
    T *= dT;
  }
  if (!seen) Tt0 = T;

  /* 2) объёмный луч: плотная выборка только внутри хорды */
  if (t1 > t0) {
    float dsb = (t1 - t0) / uBeamSteps;
    float ph = .55 + .6 * hg(dot(uD, -rd), .52);
    float Tb = Tt0;
    for (int i = 0; i < 48; i++){
      if (float(i) >= uBeamSteps) break;
      float t = t0 + (float(i) + jit) * dsb;
      vec3 p = uCam + rd * t;
      float bm = beamMask(p);
      float n, gf;
      float sigma = dens(p, n, gf);
      if (bm > .002) {
        float s = dot(p - uS, uD); vec3 qv = p - uS - uD * s;
        vec3 u = normalize(qv + 1e-5);
        float phi = atan(dot(u, uB2), dot(u, uB1));
        float streak = texture(tNoise, vec3(phi * .4775, s / uL * 2.4, uTime * .012)).r;
        float shw = shadowSph(p);
        vec3 Lb = uBeamCol * bm * shw * ph * (.35 + 1.3 * streak) * uBeamI * uGain * (.6 + .8 * n);
        acc += Tb * (1. - exp(-sigma * dsb)) * Lb;
      }
      Tb *= exp(-sigma * dsb);
    }
  }
  gl_FragColor = vec4(acc, T);
}
`,Jt=`
precision highp float;
varying vec2 vUv;
uniform sampler2D tScene; uniform sampler2D tFog;
uniform float uWhite, uFlash; uniform vec3 uChalk; uniform vec2 uFogTexel;
void main(){
  vec2 px = uFogTexel * 1.3;
  vec4 f = texture2D(tFog, vUv) * .4 + (texture2D(tFog, vUv + vec2(px.x, px.y)) + texture2D(tFog, vUv + vec2(-px.x, px.y)) + texture2D(tFog, vUv + vec2(px.x, -px.y)) + texture2D(tFog, vUv + vec2(-px.x, -px.y))) * .15;
  vec3 sc = texture2D(tScene, vUv).rgb;
  vec3 col = sc * f.a + f.rgb;
  float c = length(vUv - .5);
  col += uFlash * vec3(1., .93, .8) * (1.4 - c * 1.2);
  col = mix(col, uChalk, uWhite);
  gl_FragColor = vec4(col, 1.);
}
`;function eo(n){const a=new Tt(1,2),s=a.attributes.position,t=new v;for(let l=0;l<s.count;l++){t.fromBufferAttribute(s,l).normalize();const r=Ze(t.x*1.6+n*7,t.y*1.6,t.z*1.6,n)-.5,g=Ze(t.x*4.1+n,t.y*4.1,t.z*4.1,n+9)-.5,d=1+r*.85+g*.22;t.multiplyScalar(d),t.y<-.2&&(t.y=-.2+(t.y+.2)*.4),s.setXYZ(l,t.x,t.y,t.z)}return a.computeVertexNormals(),a}function to(){const r=new Ft;r.moveTo(0,0),r.lineTo(1,0),r.lineTo(1,.27),r.lineTo(.27,.27),r.lineTo(.27,.565),r.lineTo(.8,.565),r.lineTo(.8,.565+.27),r.lineTo(.27,.565+.27),r.lineTo(.27,1.4-.27),r.lineTo(1,1.4-.27),r.lineTo(1,1.4),r.lineTo(0,1.4),r.closePath();const g=new Dt(r,{depth:.42,bevelEnabled:!0,bevelThickness:.05,bevelSize:.045,bevelSegments:2,curveSegments:2});return g.center(),g}function oo(){const n=[[0,0],[.33,0],[.32,.12],[.28,.5],[.2,.95],[.19,1.2],[.25,1.4],[.2,1.5],[.085,1.56],[.075,1.66],[0,1.66]].map(([l,r])=>new Qe(l,r)),a=new Ct(n,36);a.scale(1,1,.62);const s=[a],t=new Lt(.15,24,18);t.scale(.92,1.08,1),t.translate(0,1.78,.015),s.push(t);for(const l of[-1,1]){const r=new zt(.048,.62,4,10);r.rotateZ(l*.08),r.translate(l*.285,1,.02),s.push(r)}return s}function io(n){const a=n.renderer,s=new gt,t=new wt(42,n.aspect,.1,90),l=new R(n.palette.ink),r=new R(n.palette.chalk);s.background=l;const g=new v().crossVectors(Z,new v(0,1,0)).normalize(),d=new v().crossVectors(Z,g).normalize(),f=Array.from({length:12},()=>new yt(0,0,0,0)),i={uS:{value:he.clone()},uD:{value:Z.clone()},uL:{value:qt},uR0:{value:Nt},uR1:{value:Vt},uB1:{value:g},uB2:{value:d},uSph:{value:f},uCam:{value:new v},uLightPos:{value:new v(-2,1,3)},uLightCol:{value:new R("#FFB067")},uLightI:{value:.7},uBeamCol:{value:new R(1,.9,.7)},uGain:{value:1},uTime:{value:0}},p=[],c=e=>(p.push(e),e),w=c(new St(100,100,200,200));w.rotateX(-Math.PI/2);{const e=w.attributes.position;for(let o=0;o<e.count;o++)e.setY(o,Xe(e.getX(o),e.getZ(o)));w.computeVertexNormals()}const M=c(new z({vertexShader:pe,fragmentShader:$t,uniforms:{...i}})),x=new me(w,M);x.frustumCulled=!1,s.add(x);const y=Ut(2024),I=Array.from({length:7},(e,o)=>c(eo(o+1))),K=[],ge=new Ve;s.add(ge);const Le=(e,o,u,m=1,h=.3)=>{const D=I[Math.floor(y()*I.length)],S=y(),V=new R().setRGB(.2+S*.05,.2,.205-S*.02).multiplyScalar(m),ie=c(new z({vertexShader:pe,fragmentShader:Ke,uniforms:{...i,uAlbedo:{value:V},uRim:{value:1},uFlat:{value:1}}})),C=new me(D,ie),G=Xe(e,o)-u*h;C.position.set(e,G,o),C.scale.set(u*(.85+y()*.5),u*(.55+y()*.5),u*(.85+y()*.5)),C.rotation.set((y()-.5)*.4,y()*6.283,(y()-.5)*.4),ge.add(C),K.push({x:e,y:G+u*.35,z:o,r:u})};[[-5.5,-3.5,1.9],[6.2,-5.5,2.6],[-9.5,-8,3.4],[11,-2.5,2.2],[3.2,-9.5,2],[-3.2,-6.2,1.1],[-14,2,2.8],[15,6,3.1],[.8,-14,3.6],[-7.5,4.8,1.2],[5.4,2.4,.85],[-2.9,1.1,.5],[1.9,1.5,.38],[-2,3.6,.42],[-1,3,.3]].forEach(([e,o,u])=>Le(e,o,u,1,.28));let tt=0;for(;K.length<34&&tt++<500;){const e=y()*6.283,o=3.2+Math.pow(y(),.8)*24,u=Math.cos(e)*o,m=Math.sin(e)*o;Math.abs(u)<1.6&&m>-.5||K.some(h=>Math.hypot(h.x-u,h.z-m)<h.r+.8)||Le(u,m,.22+Math.pow(y(),2.2)*1.6,.8+y()*.5)}const ze=[{x:0,y:.45,z:0,r:.44},{x:0,y:.95,z:0,r:.31},{x:0,y:1.4,z:0,r:.21},{x:0,y:1.8,z:0,r:.17}],we=e=>{const o=new v(e.x,e.y,e.z).sub(he),u=o.dot(Z);return o.sub(Z.clone().multiplyScalar(u)).length()};K.filter(e=>e.r>.45&&we(e)<e.r+3.4).sort((e,o)=>we(e)-e.r-(we(o)-o.r)).slice(0,8).forEach(e=>ze.push({x:e.x,y:e.y,z:e.z,r:e.r*.8})),ze.slice(0,12).forEach((e,o)=>f[o].set(e.x,e.y,e.z,e.r));const ot=oo().map(c),at=c(new z({vertexShader:pe,fragmentShader:Yt,uniforms:{...i}})),Q=new Ve;ot.forEach(e=>Q.add(new me(e,at))),Q.rotation.z=.015,s.add(Q);const nt=c(to()),rt=c(new z({vertexShader:pe,fragmentShader:Ke,uniforms:{...i,uAlbedo:{value:new R(.62,.61,.57)},uRim:{value:1.6},uFlat:{value:1}}})),Y=new me(nt,rt);Y.scale.setScalar(1.5),Y.position.set(-2.15,.62,2.35),Y.rotation.set(-1,.42,.16),s.add(Y);let H=0,U=null,J=null,T=null,B=null;const A=c(new z({vertexShader:Pe,fragmentShader:Ht,uniforms:{...i,uPos:{value:null},uDt:{value:.016},uSpeed:{value:1},uMode:{value:0},uReset:{value:1},uLightVel:{value:new v}},depthTest:!1,depthWrite:!1})),Fe=new Te(A);let ee=!0,De=n.quality;function ye(e){B&&s.remove(B),J?.dispose(),T?.dispose(),U?.dispose();const o=e.mobile?72:144;H=e.quality==="low"?Math.max(36,Math.round(o/2)):o,U=Gt(H,H,{type:kt(a),filter:_t}),J=It(H),T=new z({vertexShader:Ot,fragmentShader:Xt,uniforms:{...i,uPos:{value:U.read.texture},uDpr:{value:e.dpr},uSize:{value:2.3},uMode:{value:0},uAlpha:{value:H>100?.9:1.4}},transparent:!0,depthWrite:!1,blending:Ee}),B=new je(J,T),B.frustumCulled=!1,B.renderOrder=5,s.add(B),ee=!0}const Re=c(new Mt);Re.setAttribute("position",new xt(new Float32Array([0,0,0]),3));const Se=c(new z({vertexShader:Zt,fragmentShader:Kt,uniforms:{uSizePx:{value:90},uCol:{value:new R(1,.62,.3)},uI:{value:.8}},transparent:!0,depthWrite:!1,blending:Ee})),te=new je(Re,Se);te.frustumCulled=!1,te.renderOrder=6,s.add(te);const st=c(jt());let L=null,W=null;const F=c(new z({vertexShader:Pe,fragmentShader:Qt,uniforms:{...i,tDepth:{value:null},tNoise:{value:st},uInvProj:{value:new be},uCamWorld:{value:new be},uFar:{value:46},uSteps:{value:24},uBeamSteps:{value:28},uBase:{value:.42},uHaze:{value:.016},uFall:{value:1.3},uBeamI:{value:1}},depthTest:!1,depthWrite:!1})),Be=new Te(F),q=c(new z({vertexShader:Pe,fragmentShader:Jt,uniforms:{tScene:{value:null},tFog:{value:null},uWhite:{value:0},uFlash:{value:0},uChalk:{value:r},uFogTexel:{value:new Qe(1,1)}},depthTest:!1,depthWrite:!1})),Ae=new Te(q);function oe(e){L?.dispose(),W?.dispose();const o=Math.max(2,Math.round(e.width*e.dpr)),u=Math.max(2,Math.round(e.height*e.dpr)),m=new bt(o,u);m.type=Pt,L=new Ye(o,u,{type:Oe,format:He,depthBuffer:!0,depthTexture:m,minFilter:E,magFilter:E,generateMipmaps:!1,samples:e.quality==="low"||e.mobile?0:4});const h=e.quality==="low"?.25:e.mobile?.3:.42;W=new Ye(Math.max(2,Math.round(o*h)),Math.max(2,Math.round(u*h)),{type:Oe,format:He,depthBuffer:!1,minFilter:E,magFilter:E,generateMipmaps:!1}),F.uniforms.tDepth.value=L.depthTexture,q.uniforms.tScene.value=L.texture,q.uniforms.tFog.value=W.texture,q.uniforms.uFogTexel.value.set(1/W.width,1/W.height),F.uniforms.uSteps.value=e.quality==="low"?12:e.mobile?16:24,F.uniforms.uBeamSteps.value=e.quality==="low"?14:e.mobile?18:28}const We=[{p:new v(.3,2.4,11),t:new v(.6,1.95,0)},{p:new v(.3,1.9,8.4),t:new v(.2,1.7,0)},{p:new v(.7,1.15,4.4),t:new v(0,1.35,0)},{p:new v(1.15,1.05,2.1),t:new v(.6,1.8,-1.2)},{p:new v(1.15,1.35,-.9),t:new v(4.2,6.8,-4.6)}],ut=new $e(We.map(e=>e.p),!1,"catmullrom",.4),it=new $e(We.map(e=>e.t),!1,"catmullrom",.4),ae=new v,N=new v,_e=new v,Ge=new be;let _="hero",ke=0,Me=0,P=0,ne=0,re=0;const se=new v(-2,1,3),O=new v(-2,1,3),xe=new v;let X=.6,Ie=0;const lt=new v;function Ue(e){return e>=1.2?42:b.clamp(2*Math.atan(Math.tan(b.degToRad(21))*1.45/e)*57.2958,42,78)}function ct(e){const o=e.anchor("hero");if(!o)return{visible:!0,t:0,present:!1};const u=o.getBoundingClientRect(),m=e.height,h=u.bottom>0&&u.top<m,D=Math.max(u.height-m,m*.9);return{visible:h,t:b.clamp(-u.top/D,0,1),present:!0}}const ue={scene:s,camera:t,bloom:{strength:.8,threshold:.7},lut:"dust",trail:.6,motionBlur:0,update(e,o,u){o=Math.min(o,1/30),Ie=u,e.quality!==De&&(De=e.quality,ye(e),oe(e));const m=ct(e),h=e.anchor("dust");let D=!1;if(h){const k=h.getBoundingClientRect();D=k.bottom>0&&k.top<e.height}if(m.visible&&m.t<.9995?_="hero":D?_="dust":_=m.visible?"hero":"light",Me=m.t,P+=(Me-P)*(1-Math.exp(-o*12)),e.reduced&&(P=Me),_==="light")return;const S=_==="dust"?1:0;S!==ke&&(ke=S,ee=!0);const V=e.aspect,ie=Ue(V);if((Math.abs(t.fov-ie)>.01||Math.abs(t.aspect-V)>1e-4)&&(t.fov=ie,t.aspect=V,t.updateProjectionMatrix()),S===1)t.position.set(0,0,10),t.lookAt(0,0,0);else{const k=e.reduced?0:b.smootherstep(P,0,1),qe=Math.min(.999,k);ut.getPoint(qe,ae),it.getPoint(qe,N);const fe=e.reduced?0:1-b.smoothstep(P,.35,.8),dt=e.pointer.inside?e.pointer.ndcX:e.gyro.active?e.gyro.x:0,pt=e.pointer.inside?e.pointer.ndcY:e.gyro.active?-e.gyro.y:0;ne+=(dt-ne)*(1-Math.exp(-o*2.5)),re+=(pt-re)*(1-Math.exp(-o*2.5));const ht=e.reduced?0:Math.sin(u*.31)*.05,Ne=b.clamp((1.1-V)*1.4,0,.9)*(1-b.smoothstep(P,.2,.7));t.position.set(ae.x-Ne*1.3+ne*.55*fe,ae.y+re*.28*fe+ht,ae.z),Ge.lookAt(t.position,N.set(N.x-Ne*1.3+ne*.2*fe,N.y+re*.1*fe,N.z),t.up),t.quaternion.setFromRotationMatrix(Ge)}t.updateMatrixWorld(),i.uCam.value.copy(t.position);let C=.55,G,le;if(e.pointer.inside&&!e.pointer.touch)G=e.pointer.ndcX,le=e.pointer.ndcY,C=1;else if(e.gyro.active||e.pointer.touch)G=e.gyro.active?e.gyro.x:e.pointer.ndcX,le=e.gyro.active?-e.gyro.y*.8:e.pointer.ndcY,C=1;else{const k=u*.35;G=-.38+Math.sin(k)*.22,le=-.28+Math.sin(k*1.3+1)*.12,C=.6}S===1&&(C*=.8),_e.set(G,le,.5).unproject(t).sub(t.position).normalize();const vt=S===1?10:b.clamp(t.position.distanceTo(N.set(0,1.2,0))*.92,2.2,13);se.copy(t.position).addScaledVector(_e,vt),S===0&&(se.y=Math.max(se.y,.85));const ft=lt.copy(O),mt=1-Math.exp(-o*7);O.lerp(se,mt),xe.copy(O).sub(ft).divideScalar(Math.max(o,.001)),xe.clampLength(0,12),X+=(C-X)*(1-Math.exp(-o*4)),i.uLightPos.value.copy(O),i.uLightI.value=X,i.uTime.value=u;const ce=b.smoothstep(P,.55,.95);i.uGain.value=1+ce*1.6,F.uniforms.uBeamI.value=1+ce*2.2,q.uniforms.uWhite.value=b.smoothstep(P,.82,.995),q.uniforms.uFlash.value=ce*.5*(1-b.smoothstep(P,.9,1)),ue.bloom={strength:.8+ce*.5,threshold:.7},ue.lut=P>.9?"neutral":"dust",te.position.copy(O),Se.uniforms.uSizePx.value=(S===1?150:110)*e.dpr*(.8+.2*X),Se.uniforms.uI.value=(.35+.65*X)*(1-b.smoothstep(P,.7,.9));const ve=S===0;x.visible=ve,ge.visible=ve,Q.visible=ve,Y.visible=ve,T&&(T.uniforms.uMode.value=S,T.uniforms.uDpr.value=e.dpr),A.uniforms.uMode.value=S,A.uniforms.uSpeed.value=e.reduced?.25:S===1?.55:1,A.uniforms.uDt.value=o,A.uniforms.uLightVel.value.copy(xe)},render(e){const o=a.getRenderTarget(),u=new R;a.getClearColor(u);const m=a.getClearAlpha();if(_==="light")return a.setRenderTarget(o),a.setClearColor(r,1),a.clear(!0,!0,!1),a.setClearColor(u,m),!0;U||ye(e),L||oe(e);const h=U;if(A.uniforms.uPos.value=h.read.texture,A.uniforms.uReset.value=ee?1:0,ee=!1,Fe.render(a,h.write),h.swap(),T.uniforms.uPos.value=h.read.texture,_==="dust")return a.setRenderTarget(o),a.setClearColor(l,1),a.clear(!0,!0,!1),a.autoClear=!1,a.render(s,t),a.autoClear=!0,a.setClearColor(u,m),!0;const D=L,S=W;return a.setRenderTarget(D),a.setClearColor(l,1),a.clear(!0,!0,!0),a.render(s,t),F.uniforms.uInvProj.value.copy(t.projectionMatrixInverse),F.uniforms.uCamWorld.value.copy(t.matrixWorld),F.uniforms.uTime.value=Ie,Be.render(a,S),a.setRenderTarget(o),Ae.render(a,o),a.setClearColor(u,m),!0},resize(e){t.aspect=e.aspect,t.fov=Ue(e.aspect),t.updateProjectionMatrix(),T&&(T.uniforms.uDpr.value=e.dpr),L&&oe(e)},dispose(){s.remove(B),J?.dispose(),T?.dispose(),U?.dispose(),Fe.dispose(),Be.dispose(),Ae.dispose(),L?.depthTexture?.dispose(),L?.dispose(),W?.dispose(),p.forEach(e=>e.dispose()),s.clear()}};return ue.resize(n),ye(n),oe(n),ue}export{io as default};
