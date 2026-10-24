import{e as g,C as o,h as w}from"./index.DOxehTdM.js";import{m as C,F as k,P as a,a as x,s as y,g as z}from"./util.CMXIlSnt.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const I=`
precision highp float;
varying vec2 vUv; uniform float uT, uAspect; uniform vec2 uC; uniform vec3 uChalk, uCoral, uIce, uInk, uGraphite;
vec3 stripes(vec2 p){
  float x = p.x * 3.2 + uT * 0.12 + p.y * 0.35;
  float id = floor(x); float f = fract(x);
  float w = 0.35 + 0.12 * mod(id * 7.0, 5.0);
  float m = step(f, w);
  float sel = mod(id, 6.0);
  vec3 c = sel < 1.0 ? uChalk : sel < 2.0 ? uInk : sel < 3.0 ? uCoral : sel < 4.0 ? uInk : sel < 5.0 ? uIce : uGraphite;
  if (mod(id, 6.0) == 1.0 || mod(id, 6.0) == 3.0) c = uChalk * 0.9;
  return mix(uInk, c, m);
}
void main(){
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
  vec2 q = p - uC;
  float R = 0.3;
  float d = length(q);
  vec3 col = stripes(p);
  if (d < R) {
    float r = d / R;
    float z = sqrt(max(1.0 - r * r, 0.0));
    vec3 n = vec3(q / R, z);
    // увеличение + преломление
    vec2 off = n.xy * (1.0 - z) * 0.42 + n.xy * 0.18;
    vec2 pr = p - q * 0.52;
    float disp = 0.035 * (1.0 - z * 0.6);
    vec3 refr = vec3(stripes(pr - off * (1.0 - disp)).r, stripes(pr - off).g, stripes(pr - off * (1.0 + disp)).b);
    float fres = pow(1.0 - z, 3.0);
    vec3 l1 = normalize(vec3(-0.5, 0.7, 0.6)); vec3 l2 = normalize(vec3(0.6, -0.3, 0.5));
    float s1 = pow(max(dot(reflect(-l1, n), vec3(0, 0, 1)), 0.0), 60.0);
    float s2 = pow(max(dot(reflect(-l2, n), vec3(0, 0, 1)), 0.0), 40.0);
    col = refr * (0.88 - 0.1 * r) + fres * (uIce * 0.55 + 0.15) + s1 * 1.2 + s2 * 0.5;
    float edge = smoothstep(R, R - 0.006, d);
    col = mix(stripes(p), col, edge);
  }
  gl_FragColor = vec4(col, 1.0);
}`,A=(h,e)=>{const r=C(e.width,e.height),s=new g({vertexShader:k,fragmentShader:I,depthTest:!1,depthWrite:!1,uniforms:{uT:{value:0},uAspect:{value:e.width/e.height},uC:{value:new w},uChalk:{value:new o(a.chalk)},uCoral:{value:new o(a.coral)},uIce:{value:new o(a.ice)},uInk:{value:new o(a.ink)},uGraphite:{value:new o(a.graphite)}}}),v=new x(s);let u=0,c=0,l=e.width/e.height;return{texture:r.texture,update(i,t,f){let p,n;if(f.inside)p=(f.x-.5)*l*.7,n=(.5-f.y)*.7;else{const m=z(t,.35);p=(m.x-.5)*l*.5,n=(.5-m.y)*.3}const d=y(i,4);u+=(p-u)*d,c+=(n-c)*d,s.uniforms.uC.value.set(u,c),s.uniforms.uT.value=e.reduced?0:t,v.render(h,r)},resize(i,t){r.setSize(i,t),l=i/t,s.uniforms.uAspect.value=l},dispose(){r.dispose(),v.dispose(),s.dispose()}}};export{A as default};
