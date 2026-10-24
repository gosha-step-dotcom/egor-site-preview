import{e as T,ab as F,S as w,O as I,M as C,P as b}from"./index.D-mcs5gf.js";import{m as U,F as E,a as P,f as R}from"./util.CJTyD9F7.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const B=`
precision highp float;
varying vec2 vUv; uniform sampler2D uImg; uniform float uAspect, uTA, uIdx, uF, uMx;
vec3 grade(vec3 c, int m){
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  if (m == 1) { // холод
    c = mix(vec3(l), c, 0.9);
    c = mix(c, c * vec3(0.78, 0.95, 1.18), 0.9);
    c += (1.0 - l) * vec3(0.0, 0.025, 0.06);
    c = (c - 0.5) * 1.1 + 0.5;
  } else if (m == 2) { // пыль
    c = mix(vec3(l), c, 0.72);
    c = c * vec3(1.12, 0.98, 0.8) + vec3(0.05, 0.035, 0.02);
    c = mix(c, vec3(0.12, 0.09, 0.07) + c * 0.9, 0.25);
  }
  return clamp(c, 0.0, 1.0);
}
void main(){
  vec2 s = vec2(1.0); if (uAspect > uTA) s.y = uTA / uAspect; else s.x = uAspect / uTA;
  vec3 c = texture2D(uImg, clamp((vUv - 0.5) * s * 0.96 + 0.5, 0.001, 0.999)).rgb;
  int a = int(mod(uIdx, 3.0)), b = int(mod(uIdx + 1.0, 3.0));
  float edge = uF * 1.3 - 0.15 + sin(vUv.y * 6.0 + uIdx) * 0.015;
  float m = smoothstep(edge + 0.003, edge - 0.003, vUv.x);
  vec3 col = mix(grade(c, a), grade(c, b), m);
  col += vec3(1.0) * exp(-abs(vUv.x - edge) * 200.0) * 0.25 * step(0.001, uF) * step(uF, 0.999);
  gl_FragColor = vec4(col, 1.0);
}`,D=["Нейтраль","Холод","Пыль"],N=(u,s)=>{const c=U(s.width,s.height);let r=4/3;const d=s.loadTexture(s.media("lab-balls.jpg"),t=>{const e=t.image;r=e.width/e.height,o.uniforms.uTA.value=r}),o=new T({vertexShader:E,fragmentShader:B,depthTest:!1,depthWrite:!1,uniforms:{uImg:{value:d},uAspect:{value:s.width/s.height},uTA:{value:r},uIdx:{value:0},uF:{value:0},uMx:{value:0}}}),p=new P(o),l=R(256,64),v=new F({map:l.texture,transparent:!0,depthTest:!1}),f=new w,M=new I(-1,1,1,-1,0,1),a=new C(new b(1,.25),v);f.add(a);let g=-1;const A=t=>{if(t===g)return;g=t;const e=l.ctx;e.clearRect(0,0,256,64),e.fillStyle="rgba(11,12,14,0.75)",e.fillRect(0,12,196,40),e.fillStyle="#ECEDE8",e.font='500 22px "IBM Plex Mono", ui-monospace, monospace',e.textBaseline="middle",e.fillText(D[t].toUpperCase(),14,33),l.texture.needsUpdate=!0},h=(t,e)=>{a.scale.set(256/t*2*.85,64/e*2*.85,1),a.position.set(-1+a.scale.x*.5*1+.04,-1+a.scale.y*.5+.05,0),a.geometry.dispose(),a.geometry=new b(1,1)};h(s.width,s.height);let n=0;return{texture:c.texture,update(t,e,S){s.reduced||(n+=t*(S.inside?1.6:1)/2.6);const i=Math.floor(n),x=n-i,m=Math.min(1,x/.4),y=m*m*(3-2*m);o.uniforms.uIdx.value=i,o.uniforms.uF.value=y,A((x<.45,(i+1)%3)),p.render(u,c),u.autoClear=!1,u.render(f,M)},resize(t,e){c.setSize(t,e),o.uniforms.uAspect.value=t/e,h(t,e)},dispose(){c.dispose(),p.dispose(),o.dispose(),d.dispose(),l.texture.dispose(),v.dispose(),a.geometry.dispose()}}};export{N as default};
