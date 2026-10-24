import{e as f,h}from"./index.CWeaRfLf.js";import{m as g,F as A,a as B}from"./util.zrTjtzos.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const T=`
precision highp float;
varying vec2 vUv; uniform sampler2D uA, uB; uniform float uAspect, uTA, uTB, uP, uBend; uniform vec2 uM;
vec3 cov(sampler2D t, float ta, vec2 uv){ vec2 s = vec2(1.0); if (uAspect > ta) s.y = ta / uAspect; else s.x = uAspect / ta; return texture2D(t, clamp((uv - 0.5) * s + 0.5, 0.001, 0.999)).rgb; }
void main(){
  // шторка идёт слева направо с выгнутым краем: кромка = pos + изгиб по высоте + влияние курсора
  float y = vUv.y;
  float pos = mix(-0.25, 1.25, uP);
  float curve = sin(y * 3.14159) * uBend * 0.22 + sin(y * 9.0 + uP * 6.0) * 0.012 * uBend;
  float edge = pos + curve - (uM.y > -1.0 ? exp(-pow((y - uM.y) * 4.0, 2.0)) * 0.08 * (1.0 - abs(uP - 0.5) * 2.0) : 0.0);
  float m = smoothstep(edge + 0.004, edge - 0.004, vUv.x);
  vec3 a = cov(uA, uTA, vUv); vec3 b = cov(uB, uTB, vUv + vec2(0.02 * (1.0 - m), 0.0));
  vec3 c = mix(a, b, m);
  c *= 1.0 - 0.5 * exp(-abs(vUv.x - edge) * 14.0) * (1.0 - m);
  c += vec3(0.9) * exp(-abs(vUv.x - edge) * 220.0) * 0.35;
  gl_FragColor = vec4(c, 1.0);
}`,M=(m,s)=>{const o=g(s.width,s.height),n={a:4/3,b:4/3},l=s.loadTexture(s.media("cover-balls.jpg"),u=>{const a=u.image;t.uniforms.uTA.value=a.width/a.height}),p=s.loadTexture(s.media("cover-tunnel-loop.jpg"),u=>{const a=u.image;t.uniforms.uTB.value=a.width/a.height}),t=new f({vertexShader:A,fragmentShader:T,depthTest:!1,depthWrite:!1,uniforms:{uA:{value:l},uB:{value:p},uAspect:{value:s.width/s.height},uTA:{value:n.a},uTB:{value:n.b},uP:{value:0},uBend:{value:1},uM:{value:new h(.5,-2)}}}),c=new B(t);let e=0,r=1,i=0;return{texture:o.texture,update(u,a,v){i>0?i-=u:s.reduced||(e+=r*u/1.9,e>=1?(e=1,r=-1,i=1):e<=0&&(e=0,r=1,i=1));const d=e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2;t.uniforms.uP.value=d,t.uniforms.uBend.value=Math.sin(d*Math.PI)*1+.25,t.uniforms.uM.value.set(v.x,v.inside?1-v.y:-2),c.render(m,o)},resize(u,a){o.setSize(u,a),t.uniforms.uAspect.value=u/a},dispose(){o.dispose(),c.dispose(),t.dispose(),l.dispose(),p.dispose()}}};export{M as default};
