import{e as w,i as y,h as D}from"./index.DNh1aBPv.js";import{m as M,F as z,a as S,s as A}from"./util.Sf8P5ymE.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const F=`
precision highp float;
varying vec2 vUv; uniform sampler2D uImg; uniform float uAspect, uTexAspect, uT, uHover; uniform vec2 uMouse; uniform vec4 uDrops[4];
void main(){
  vec2 s = vec2(1.0); if (uAspect > uTexAspect) s.y = uTexAspect / uAspect; else s.x = uAspect / uTexAspect;
  vec2 off = vec2(0.0);
  vec2 dm = (vUv - uMouse) * vec2(uAspect, 1.0); float r = length(dm);
  off += dm / max(r, 1e-4) * sin(r * 34.0 - uT * 6.0) * exp(-r * 5.5) * uHover * 0.016;
  for (int i = 0; i < 4; i++) {
    vec4 dr = uDrops[i];
    if (dr.w > 0.0) { vec2 dc = (vUv - dr.xy) * vec2(uAspect, 1.0); float rc = length(dc); float front = dr.z * 0.6; float q = (rc - front) * 7.0;
      off += dc / max(rc, 1e-4) * sin((rc - front) * 40.0) * exp(-q * q) * exp(-dr.z * 1.3) * dr.w * 0.05; }
  }
  vec2 uv = (vUv - 0.5) * s * 0.94 + 0.5 + off * s / vec2(uAspect, 1.0);
  vec3 c = texture2D(uImg, clamp(uv, 0.001, 0.999)).rgb;
  c += vec3(0.05) * exp(-dot(dm, dm) * 8.0) * uHover;
  gl_FragColor = vec4(c, 1.0);
}`,q=(T,u)=>{const a=M(u.width,u.height);let v=4/3;const c=u.loadTexture(u.media("lab-balls.jpg"),r=>{const s=r.image;v=s.width/s.height,t.uniforms.uTexAspect.value=v}),d=[0,1,2,3].map(()=>new y(0,0,9,0)),t=new w({vertexShader:z,fragmentShader:F,depthTest:!1,depthWrite:!1,uniforms:{uImg:{value:c},uAspect:{value:u.width/u.height},uTexAspect:{value:v},uT:{value:0},uHover:{value:0},uMouse:{value:new D(.5,.5)},uDrops:{value:d}}}),m=new S(t);let p=0,i=.5,n=.5,l=!1,f=0,h=.6,g=0;const x=(r,s,e)=>{d[f].set(r,1-s,0,e),f=(f+1)%4};return{texture:a.texture,update(r,s,e){if(e.inside&&!l&&(i=e.x,n=1-e.y,x(e.x,e.y,.5)),l=e.inside,p+=((e.inside?1:0)-p)*A(r,e.inside?9:5),e.inside){const o=A(r,16);i+=(e.x-i)*o,n+=(1-e.y-n)*o,s-g>.5&&!u.reduced&&(g=s)}!e.inside&&!u.reduced&&s>h&&(h=s+2.2,x(.25+Math.random()*.5,.25+Math.random()*.5,.9)),d.forEach(o=>{o.w>0&&(o.z+=r,o.z>3&&(o.w=0))}),t.uniforms.uMouse.value.set(i,n),t.uniforms.uHover.value=u.reduced?0:p,t.uniforms.uT.value=s,m.render(T,a)},resize(r,s){a.setSize(r,s),t.uniforms.uAspect.value=r/s},dispose(){a.dispose(),m.dispose(),t.dispose(),c.dispose()}}};export{q as default};
