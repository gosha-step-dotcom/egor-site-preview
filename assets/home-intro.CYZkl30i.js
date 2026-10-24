var tt=Object.defineProperty;var et=(e,t,o)=>t in e?tt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var R=(e,t,o)=>et(e,typeof t!="symbol"?t+"":t,o);import{P as at,c as H,N as ot,b as st,h as nt,e as rt,M as it,S as ut,C as ct,k as lt,G as ht,V as pt,W as dt,B as mt,l as I,Y as vt,m as ft,q as gt}from"./index.BLxSPH_n.js";import{createParticles as Mt}from"./particles.BCTkJ1CP.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";import"./gl.C9tqncd5.js";const wt=`
uniform sampler2D uDepth;
uniform float uStrength;
uniform float uFar;
varying vec2 vUv;
varying float vD;
void main(){
  vUv = uv;
  float d = texture2D(uDepth, uv).r;
  vD = d;
  vec3 p = position;
  // 0 — далеко (уходит на uFar вглубь), 1 — близко (выдвигается вперёд)
  p.z += mix(-uFar, uStrength, d);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`,yt=`
precision highp float;
uniform sampler2D uMap;
uniform float uOpacity;
uniform float uDim;
uniform vec2 uFeather;
uniform float uRound;
uniform float uAspect;
varying vec2 vUv;
varying float vD;
float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y);
}
void main(){
  vec3 c = texture2D(uMap, vUv).rgb;
  // чуть приглушаем середину кадра — белые частицы имени читаются поверх светлого снега
  vec2 q = vUv - 0.5;
  float center = 1.0 - smoothstep(0.0, 0.45, length(q * vec2(1.4, 2.2)));
  c *= 1.0 - uDim * center;
  // края растворяются в фоне (по x и y отдельно)
  float fx = smoothstep(0.0, uFeather.x, vUv.x) * smoothstep(0.0, uFeather.x, 1.0 - vUv.x);
  float fy = smoothstep(0.0, uFeather.y, vUv.y) * smoothstep(0.0, uFeather.y * 0.6, 1.0 - vUv.y);
  // издалека — не прямоугольник, а неровный «остров» с рваным мягким краем (не похоже на макет)
  vec2 e = (vUv - 0.5) * 2.0 * vec2(1.0, 1.0 / max(0.5, min(2.0, 1.0 / uAspect)));
  float n = vn(vUv * 5.0) * 0.6 + vn(vUv * 13.0) * 0.4;
  float isl = 1.0 - smoothstep(0.45, 0.98, length(e) + (n - 0.5) * 0.35);
  float a = fx * fy * mix(1.0, isl, uRound) * uOpacity;
  gl_FragColor = vec4(c, a);
  #include <colorspace_fragment>
}
`;class Dt{constructor(t){R(this,"mesh");R(this,"u");R(this,"geo");R(this,"mat");const o=t.width/t.aspect,r=t.segments,f=Math.max(8,Math.round(t.segments/t.aspect));this.geo=new at(t.width,o,r,f),t.depth.minFilter=H,t.depth.magFilter=H,t.depth.generateMipmaps=!1,t.depth.colorSpace=ot,t.photo.colorSpace=st,this.u={uMap:{value:t.photo},uDepth:{value:t.depth},uStrength:{value:t.width*.12},uFar:{value:t.width*.35},uOpacity:{value:1},uDim:{value:0},uFeather:{value:new nt(.08,.12)},uRound:{value:0},uAspect:{value:t.aspect}},this.mat=new rt({vertexShader:wt,fragmentShader:yt,uniforms:this.u,transparent:!0,depthWrite:!1}),this.mesh=new it(this.geo,this.mat),this.mesh.frustumCulled=!1}dispose(){this.geo.dispose(),this.mat.dispose(),this.u.uMap.value.dispose(),this.u.uDepth.value.dispose()}}const St="ЕГОР",Ft="./media/home/intro.jpg",Rt="./media/home/intro-depth.png",Pt=e=>Math.max(0,Math.min(1,e)),y=(e,t,o)=>{const r=Pt((o-e)/(t-e));return r*r*(3-2*r)},v=(e,t,o)=>e+(t-e)*o,_=(e,t,o,r)=>e+(t-e)*(1-Math.exp(-o*r)),Y=[0,1.4],j=[.35,1.2],L=[.9,1.5],K=[1.4,2.4],X=[2.05,2.5],U=16,z=40;function Tt(e){const t=new Float32Array(e*3),o=new Float32Array(e*3);let r=5;const f=()=>(r=r*16807%2147483647)/2147483647;for(let s=0;s<e;s++){const c=f()*2-1,i=f()*Math.PI*2,g=Math.sqrt(1-c*c),d=60+f()*60;t[s*3]=g*Math.cos(i)*d,t[s*3+1]=c*d,t[s*3+2]=-Math.abs(g*Math.sin(i)*d)-10;const T=.45+f()*.55;o[s*3]=o[s*3+1]=T,o[s*3+2]=Math.min(1,T*1.1)}const D=new mt;D.setAttribute("position",new I(t,3)),D.setAttribute("color",new I(o,3));const P=new vt({size:1.5,sizeAttenuation:!1,vertexColors:!0,transparent:!0,depthWrite:!1});return new ft(D,P)}async function zt(e){const t=e.renderer,o=e.mobile||e.quality==="low",[r,f]=await Promise.all([e.loader.texture(Ft),e.loader.texture(Rt)]),D=r.image,P=D.width/Math.max(1,D.height),s=new ut;s.background=new ct(e.palette.ink);const c=new lt(z,e.aspect,.05,400),i=new Dt({photo:r,depth:f,aspect:P,width:U,segments:o?220:360}),g=new ht;g.add(i.mesh),s.add(g);const d=Tt(o?1200:2400);s.add(d);const T=d.material,J=i.u.uStrength.value,C=i.u.uFar.value,b=new pt(0,0,-C*.35);let O=6;function W(a){c.aspect=a.aspect,c.fov=z,c.updateProjectionMatrix();const n=Math.tan(gt.degToRad(z/2)),m=U/P,l=.8,M=U*l/(2*n*a.aspect),u=m*l/(2*n);O=Math.max(i.u.uStrength.value+1.2,Math.min(M,u)-C);const w=U*1.02/(2*n*a.aspect),h=m*1.02/(2*n);E=Math.max(O+9,Math.max(w,h)-C*.3)}let E=20,N=0;const p=Mt(e,{state(){},label(){},tick(a,n,m){const l=performance.now();l-N<125||(N=l,a.sound.play("tick",{volume:n,rate:m}))}},{text:St,shape:"word",force:e.mobile?1.3:1.1,size:2.6,grid:192,transparent:!0,ink:!0});p.activate(e),W(e);{const a=t.getRenderTarget(),n=new dt(4,4);t.setRenderTarget(n);try{t.compile(s,c),p.update(e,0,0),p.render(e,0)}catch{}t.setRenderTarget(a),n.dispose()}let x=0,F=0,S=0;function Q(a){const n=a.anchor("intro");return n?Math.max(0,-n.getBoundingClientRect().top/Math.max(1,a.height)):0}return{scene:s,camera:c,bloom:{strength:.18,threshold:.97},lut:null,trail:0,motionBlur:0,update(a,n,m){const l=Math.min(n,.03333333333333333),M=Q(a),u=y(Y[0],Y[1],M),w=y(K[0],K[1],M);p.setParam("assemble",1-y(j[0],j[1],M)),p.setParam("alpha",1-y(L[0],L[1],M)),p.update(a,l,m);const h=a.pointer,B=!a.reduced&&(h.touch&&h.down||!h.touch&&h.inside);let G=B?h.ndcX:0,V=B?h.ndcY:0;a.mobile&&a.gyro.active&&!a.reduced&&!h.down&&(G=a.gyro.x,V=-a.gyro.y*.5),h.down&&!a.reduced?S+=h.vx*l*2.4:S=_(S,0,.8,l),S=Math.max(-.7,Math.min(.7,S));const Z=a.reduced?0:Math.sin(m*.3)*v(.025,.16,u),$=a.reduced?0:Math.sin(m*.23+1.3)*v(.01,.06,u);x=_(x,G*v(.11,.42,u)+S+Z,3,l),F=_(F,V*v(.05,.2,u)+$,3,l);const A=v(O,E,u);c.position.set(b.x+Math.sin(x)*Math.cos(F)*A,b.y+Math.sin(F)*A,b.z+Math.cos(x)*Math.cos(F)*A),c.lookAt(b),i.u.uStrength.value=J*v(1,2.1,u),i.u.uRound.value=y(.15,.8,u),i.u.uDim.value=0,i.u.uFeather.value.set(v(.06,.16,u),v(.1,.2,u)),i.u.uOpacity.value=1-y(.4,1,w),g.position.y=-w*w*14,g.rotation.x=-w*.35,g.visible=w<.999,T.opacity=(1-y(X[0],X[1],M))*v(.35,1,u);const k=a.anchor("intro"),q=u<.45?"light":"dark";k&&k.dataset.headerTone!==q&&(k.dataset.headerTone=q),d.rotation.z=m*.003},render(a){t.render(s,c);const n=t.autoClear;return t.autoClear=!1,p.render(a,performance.now()/1e3),t.autoClear=n,!0},resize(a){W(a),p.resize(a)},dispose(){p.deactivate(),p.dispose(),i.dispose(),d.material.dispose(),d.geometry.dispose(),s.clear()}}}export{Rt as INTRO_DEPTH,Ft as INTRO_PHOTO,St as INTRO_WORD,zt as default};
