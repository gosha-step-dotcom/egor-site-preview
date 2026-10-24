import{e as d}from"./index.C5EjOHXg.js";import{m as f,F as h,a as g}from"./util.Cq9zSHbh.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const A=`
precision highp float;
varying vec2 vUv; uniform sampler2D uImg; uniform float uAspect, uTA, uG, uT;
float sdRound(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
vec3 cov(vec2 uv, float z){ vec2 s = vec2(1.0); if (uAspect > uTA) s.y = uTA / uAspect; else s.x = uAspect / uTA; return texture2D(uImg, clamp((uv - 0.5) * s / z + 0.5, 0.001, 0.999)).rgb; }
void main(){
  float inset = mix(0.16, 0.0, uG);
  vec2 hs = vec2(0.5 - inset * 0.75, 0.5 - inset);
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
  vec2 b = hs * vec2(uAspect, 1.0);
  float r = mix(0.075, 0.0, uG);
  float d = sdRound(p, b, r);
  float a = smoothstep(0.004, -0.004, d);
  vec3 bg = cov(vUv, 1.3) * 0.2 + vec3(0.01, 0.011, 0.013);
  vec3 vid = cov(vUv, 1.0 + 0.12 * uT + 0.1 * (1.0 - uG));
  float ed = smoothstep(0.02, 0.0, abs(d)) * 0.25 * (1.0 - uG);
  vec3 col = mix(bg, vid, a) + vec3(ed);
  gl_FragColor = vec4(col, 1.0);
}`,S=(n,e)=>{const a=f(e.width,e.height);let i=4/3;const c=e.loadTexture(e.media("cover-tunnel-loop.jpg"),s=>{const u=s.image;i=u.width/u.height,t.uniforms.uTA.value=i}),t=new d({vertexShader:h,fragmentShader:A,depthTest:!1,depthWrite:!1,uniforms:{uImg:{value:c},uAspect:{value:e.width/e.height},uTA:{value:i},uG:{value:0},uT:{value:0}}}),l=new g(t);let r=0;return{texture:a.texture,update(s,u,m){e.reduced||(r+=s*(m.inside?1.5:1));const o=r%7/7,v=o<.15?0:o<.45?(o-.15)/.3:o<.6?1:o<.9?1-(o-.6)/.3:0,p=v*v*(3-2*v);t.uniforms.uG.value=p,t.uniforms.uT.value=r%7/7,l.render(n,a)},resize(s,u){a.setSize(s,u),t.uniforms.uAspect.value=s/u},dispose(){a.dispose(),l.dispose(),t.dispose(),c.dispose()}}};export{S as default};
