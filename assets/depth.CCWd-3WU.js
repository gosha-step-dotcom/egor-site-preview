import{e as g,N as A,h as S}from"./index.B4h9O72B.js";import{m as x,F as T,a as F,s as w,g as y}from"./util.BPWedFvn.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const D=`
precision highp float;
varying vec2 vUv; uniform sampler2D uImg, uDepth; uniform vec2 uMouse; uniform float uStr, uFocus, uAspect, uTexAspect, uBlur;
vec3 f(vec2 t){ return texture2D(uImg, clamp(t, 0.001, 0.999)).rgb; }
void main(){
  vec2 s = vec2(1.0);
  if (uAspect > uTexAspect) s.y = uTexAspect / uAspect; else s.x = uAspect / uTexAspect;
  vec2 uv = (vUv - 0.5) * s * (1.0 - uStr * 2.2) + 0.5;
  vec2 uv2 = uv; float d = 0.5;
  for (int i = 0; i < 3; i++) { d = texture2D(uDepth, clamp(uv2, 0.001, 0.999)).r; uv2 = uv - (d - 0.5) * uMouse * uStr; }
  float r = abs(d - uFocus) * uBlur;
  vec3 c = f(uv2) * 2.0; float w = 2.0;
  for (int i = 0; i < 8; i++) { float a = float(i) * 0.785398 + 0.3; c += f(uv2 + vec2(cos(a) / uAspect, sin(a)) * r * s); w += 1.0; }
  gl_FragColor = vec4(c / w, 1.0);
}`,k=(h,e)=>{const o=x(e.width,e.height);let a=16/9;const n=e.loadTexture(e.media("depth-hero.jpg"),t=>{const s=t.image;a=s.width/s.height,u.uniforms.uTexAspect.value=a}),r=e.loadTexture(e.media("depth-hero-depth.png"));r.colorSpace=A;const u=new g({vertexShader:T,fragmentShader:D,depthTest:!1,depthWrite:!1,uniforms:{uImg:{value:n},uDepth:{value:r},uMouse:{value:new S},uStr:{value:.03},uFocus:{value:.6},uAspect:{value:e.width/e.height},uTexAspect:{value:a},uBlur:{value:.016}}}),d=new F(u);let i=0,p=0;return{texture:o.texture,update(t,s,c){let l,v;if(c.inside)l=c.x*2-1,v=1-c.y*2;else{const f=y(s,.45);l=(f.x*2-1)*.9,v=(1-f.y*2)*.6}const m=w(t,5);i+=(l-i)*m,p+=(v-p)*m,u.uniforms.uMouse.value.set(i,p),u.uniforms.uFocus.value=e.reduced?.6:.45+.2*Math.sin(s*.7),d.render(h,o)},resize(t,s){o.setSize(t,s),u.uniforms.uAspect.value=t/s},dispose(){o.dispose(),d.dispose(),u.dispose(),n.dispose(),r.dispose()}}};export{k as default};
