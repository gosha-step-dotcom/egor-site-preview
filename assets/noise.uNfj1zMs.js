import{e as d,C as s,h as g}from"./index.BntQukh-.js";import{m as b,h as w,F as k,P as i,a as C,s as y,g as S}from"./util.Dv3hOkFe.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const T=`
precision highp float;
varying vec2 vUv; uniform float uT, uAspect; uniform vec2 uL; uniform vec3 uInk, uGraphite, uChalk, uCoral, uIce;
${w}
float height(vec2 p){
  vec2 q = vec2(fbm(p + vec2(0.0, uT * 0.05)), fbm(p + vec2(5.2, 1.3 - uT * 0.04)));
  float h = fbm(p + 1.6 * q);
  float ridge = 1.0 - abs(2.0 * fbm(p * 0.7 + 3.0 + q) - 1.0);
  return h * 0.8 + ridge * ridge * 0.55;
}
void main(){
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * 3.2;
  float e = 0.012;
  float h = height(p);
  float hx = height(p + vec2(e, 0.0)) - height(p - vec2(e, 0.0));
  float hy = height(p + vec2(0.0, e)) - height(p - vec2(0.0, e));
  vec3 n = normalize(vec3(-hx * 9.0, -hy * 9.0, 1.0));
  vec3 l = normalize(vec3(uL, 0.55));
  float dif = clamp(dot(n, l) * 0.5 + 0.5, 0.0, 1.0);
  float t = smoothstep(0.25, 1.05, h);
  vec3 base = mix(uGraphite, uChalk * 0.85, pow(t, 1.6));
  vec3 col = mix(uInk, base, 0.08 + 0.8 * pow(dif, 2.4));
  col = mix(col, uIce, smoothstep(0.35, 0.2, h) * 0.18);
  col = mix(col, uCoral, smoothstep(0.88, 1.02, h) * 0.85 * dif);
  float spec = pow(max(dot(reflect(-l, n), vec3(0.0, 0.0, 1.0)), 0.0), 24.0);
  col += spec * 0.12;
  float cont = smoothstep(0.03, 0.0, abs(fract(h * 14.0) - 0.5) - 0.465) * 0.06;
  col += cont;
  gl_FragColor = vec4(col, 1.0);
}`,F=(f,e)=>{const l=b(e.mobile?Math.round(e.width*.75):e.width,e.mobile?Math.round(e.height*.75):e.height),t=new d({vertexShader:k,fragmentShader:T,depthTest:!1,depthWrite:!1,uniforms:{uT:{value:0},uAspect:{value:e.width/e.height},uL:{value:new g(-.6,.5)},uInk:{value:new s(i.ink)},uGraphite:{value:new s("#2a2e35")},uChalk:{value:new s(i.chalk)},uCoral:{value:new s(i.coral)},uIce:{value:new s(i.ice)}}}),p=new C(t);let r=-.6,u=.5;return{texture:l.texture,update(a,o,h){let c,n;if(h.inside)c=(h.x-.5)*2.4,n=(.5-h.y)*2.4;else{const m=S(o,.3);c=(m.x-.5)*2,n=(.5-m.y)*2}const v=y(a,4);r+=(c-r)*v,u+=(n-u)*v,t.uniforms.uL.value.set(r,u),t.uniforms.uT.value=e.reduced?0:o,p.render(f,l)},resize(a,o){l.setSize(e.mobile?Math.round(a*.75):a,e.mobile?Math.round(o*.75):o),t.uniforms.uAspect.value=a/o},dispose(){l.dispose(),p.dispose(),t.dispose()}}};export{F as default};
