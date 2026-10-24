import{e as G,h as S,a2 as Y,C as f,W as j,c as z,R as J,y as K,H as Q,a3 as Z}from"./index.BntQukh-.js";import{m as ee,F as H,P as C,a as O,g as ae}from"./util.Dv3hOkFe.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const q=4,I=`
#define VSCALE 4.0
vec2 decodeV(vec2 e){
#ifdef BYTE_ENC
  vec2 v = (e - 0.5) * 2.0; return v * step(0.006, length(v));
#else
  return e;
#endif
}
vec2 encodeV(vec2 v){
  v = clamp(v, -1.0, 1.0);
#ifdef BYTE_ENC
  return v * 0.5 + 0.5;
#else
  return v;
#endif
}`,te=`
uniform sampler2D uPrev; uniform float uDt, uDecay, uCurl, uTime, uAspect, uRadius, uSplat, uPhase;
uniform vec2 uP0, uP1, uVel, uTexel; varying vec2 vUv;
${I}
float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
vec2 curlNoise(vec2 p){ float e = 0.05; float dx = vnoise(p+vec2(e,0.))-vnoise(p-vec2(e,0.)); float dy = vnoise(p+vec2(0.,e))-vnoise(p-vec2(0.,e)); return vec2(dy,-dx)/(2.*e); }
void main(){
  vec2 v0 = decodeV(texture2D(uPrev, vUv).xy);
  vec2 bp = vUv - v0 * VSCALE * uDt;
  vec4 s = texture2D(uPrev, bp);
  vec4 sn = (texture2D(uPrev, bp+vec2(uTexel.x,0.)) + texture2D(uPrev, bp-vec2(uTexel.x,0.)) + texture2D(uPrev, bp+vec2(0.,uTexel.y)) + texture2D(uPrev, bp-vec2(0.,uTexel.y))) * 0.25;
  s = mix(s, sn, 0.3);
  vec2 v = decodeV(s.xy); float d = s.z; float ph = s.w;
  float cb = 1.0;
#ifdef BYTE_ENC
  cb = 5.0;
#endif
  float mask = smoothstep(0.0, 0.1, d);
  vec2 q = vUv * vec2(uAspect, 1.0) * 3.5 + vec2(uTime*0.08, -uTime*0.05);
  v += curlNoise(q) * uCurl * cb * 0.2 * uDt * mask;
  float k = uDt * 60.0;
  v *= pow(uDecay, k * 1.2);
  d *= pow(uDecay, k * 0.45);
#ifdef BYTE_ENC
  d = max(d - 0.003 * k, 0.0);
#else
  d = max(d - 0.0004 * k, 0.0);
#endif
  vec2 pa = (vUv - uP0) * vec2(uAspect, 1.0);
  vec2 ba = (uP1 - uP0) * vec2(uAspect, 1.0);
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.0000001), 0.0, 1.0);
  vec2 dd = pa - ba * h;
  float m = exp(-dot(dd, dd) / (uRadius * uRadius)) * uSplat;
  v += uVel * 0.3 * m;
  d = clamp(d + m * 0.6, 0.0, 1.0);
  ph = mix(ph, uPhase, clamp(m * 2.0, 0.0, 1.0));
  gl_FragColor = vec4(encodeV(v), d, ph);
}`,se=`
uniform sampler2D uState; uniform vec3 uBg, uAccent, uMid, uWarm; varying vec2 vUv;
${I}
void main(){
  vec4 s = texture2D(uState, vUv);
  vec2 v = decodeV(s.xy); float d = s.z;
  float speed = length(v) * VSCALE;
  float t = clamp(s.w, 0.0, 1.0);
  vec3 c = mix(uAccent, uMid, smoothstep(0.15, 0.45, t));
  c = mix(c, uWarm, smoothstep(0.5, 0.9, t));
  float a = smoothstep(0.0, 0.6, d);
  vec3 smoke = mix(uBg, c * (0.4 + 0.6 * a) + c * min(speed, 1.0) * 0.12, a);
  gl_FragColor = vec4(smoke, 1.0);
}`,ne=(t,x)=>{const b=!(t.capabilities.isWebGL2&&(t.extensions.has("EXT_color_buffer_float")||t.extensions.has("EXT_color_buffer_half_float")));let p=x.width,m=x.height;const y=ee(p,m),A=b?{BYTE_ENC:""}:{},w=new G({defines:A,vertexShader:H,fragmentShader:te,depthTest:!1,depthWrite:!1,blending:Y,uniforms:{uPrev:{value:null},uDt:{value:.016},uDecay:{value:.972},uCurl:{value:1},uTime:{value:0},uAspect:{value:p/m},uRadius:{value:.045},uSplat:{value:0},uPhase:{value:0},uP0:{value:new S},uP1:{value:new S},uVel:{value:new S},uTexel:{value:new S(.01,.01)}}}),M=new G({defines:A,vertexShader:H,fragmentShader:se,depthTest:!1,depthWrite:!1,blending:Y,uniforms:{uState:{value:null},uBg:{value:new f(C.ink)},uAccent:{value:new f(C.ice)},uMid:{value:new f(C.chalk)},uWarm:{value:new f(C.coral)}}}),V=new O(w),B=new O(M);let a,l;const g=()=>new j(Math.max(48,Math.round(p/4)),Math.max(48,Math.round(m/4)),{type:b?K:Q,format:J,minFilter:z,magFilter:z,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1}),P=u=>{const e=new f;t.getClearColor(e);const n=t.getClearAlpha(),o=b?.5:0;t.setClearColor(new f().setRGB(o,o,0,Z),0),t.setRenderTarget(u),t.clear(!0,!1,!1),t.setClearColor(e,n)};a=g(),l=g(),P(a),P(l);let T=!1,k=0,R=0,F=0,c=0,i=0,W=-10,L=0;const X=(u,e,n)=>{let o=0,r=0,v=0;if(n.inside)o=n.x,r=1-n.y,v=1,W=e;else if(x.reduced)v=0;else if(e-W>.4){const d=ae(e);o=d.x,r=1-d.y,v=2}(v===0||v!==k)&&(T=!1),k=v;let D=o,E=r,N=0;if(v!==0&&T){D=R,E=F;const d=o-D,_=r-E,U=1/Math.max(u,.004);c=c*.4+d*U/q*.6,i=i*.4+_*U/q*.6;let h=Math.hypot(c,i);h>1&&(c/=h,i/=h,h=1),N=d*d+_*_>1e-10?Math.min(1,h*4):0}else c=0,i=0;v!==0&&(T=!0,R=o,F=r);const s=w.uniforms;s.uPrev.value=a.texture,s.uDt.value=u,s.uTime.value=e,s.uAspect.value=p/m,s.uSplat.value=N,s.uRadius.value=.045,s.uPhase.value=Math.max(0,Math.min(1,Math.hypot(c,i)*2.2+.15*Math.sin(e*.8))),s.uP0.value.set(D,E),s.uP1.value.set(o,r),s.uVel.value.set(c,i),s.uTexel.value.set(1/a.width,1/a.height),V.render(t,l);const $=a;a=l,l=$};return{texture:y.texture,update(u,e,n){L=e,(!x.reduced||L<1)&&X(Math.min(u,1/30),e,n),M.uniforms.uState.value=a.texture,B.render(t,y)},resize(u,e){p=u,m=e,y.setSize(u,e),a.dispose(),l.dispose(),a=g(),l=g(),P(a),P(l),T=!1},dispose(){y.dispose(),a.dispose(),l.dispose(),V.dispose(),B.dispose(),w.dispose(),M.dispose()}}};export{ne as default};
