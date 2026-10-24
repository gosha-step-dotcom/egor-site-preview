var st=Object.defineProperty;var it=(a,t,s)=>t in a?st(a,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[t]=s;var h=(a,t,s)=>it(a,typeof t!="symbol"?t+"":t,s);import{C as M,e as D,aa as ot,t as W,$ as nt,b as at,L as rt,c as lt,S as $,M as k,ab as L,a3 as ct,ac as ht,f as O,ad as ut,V as z,P as I,k as pt,G as dt,n as mt,a4 as vt,a9 as ft,a8 as yt,ae as E,i as H,h as U}from"./index.Dp8CmCTF.js";const S=(a,t,s)=>a<t?t:a>s?s:a,V=(a,t,s)=>{const i=S((s-a)/(t-a),0,1);return i*i*(3-2*i)},j=(a,t,s,i)=>a+(t-a)*(1-Math.exp(-s*i));function _t(a){let t=a>>>0;return()=>{t=t+1831565813>>>0;let s=t;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296}}const _=1/120;function Y(a,t,s,i){return{id:a,x:t,y:s,vx:0,vy:0,r:i,m:i*i*i,hx:t,hy:s,g:0,gT:0,k:0,kT:0,kx:1,ky:1,rz:0,wz:0,frozen:!1,ghost:!1,grounded:!1,bounce:1,tag:0}}class wt{constructor(){h(this,"bodies",[]);h(this,"bounds",{left:-10,right:10,floor:-1/0,ceil:1/0});h(this,"params",{gravity:{x:0,y:-26},springK:7,drag:.25,springDamp:1.7,restitution:.32,wallRestitution:.42,rollDrag:.55,pusherBounce:.5});h(this,"pusher",{on:!1,x:0,y:0,r:.7,vx:0,vy:0,strength:1});h(this,"onHit",null);h(this,"acc",0);h(this,"pcx",0);h(this,"pcy",0);h(this,"ppx",0);h(this,"ppy",0);h(this,"pHas",!1);h(this,"pvx",0);h(this,"pvy",0);h(this,"time",0);h(this,"hit",{a:null,b:null,kind:"wall",force:0,x:0,y:0,nx:0,ny:0})}add(t){return this.bodies.push(t),t}remove(t){const s=this.bodies.indexOf(t);s>=0&&this.bodies.splice(s,1)}setPusher(t,s,i,o){const n=this.pusher;if(!t){this.pHas=!1,n.on=!1;return}const r=1/Math.max(o,1/240);this.pHas?(this.pvx=this.pvx*.5+(s-this.pcx)*r*.5,this.pvy=this.pvy*.5+(i-this.pcy)*r*.5):(this.ppx=s,this.ppy=i,this.pvx=0,this.pvy=0),this.pcx=s,this.pcy=i,this.pHas=!0;const l=Math.hypot(this.pvx,this.pvy);l>24&&(this.pvx*=24/l,this.pvy*=24/l),n.on=!0}update(t){this.acc+=t;const s=Math.min(6,Math.floor(this.acc/_));this.acc-=s*_,this.acc>_&&(this.acc=0);const i=this.pusher;for(let o=1;o<=s;o++){const n=o/s;i.x=this.ppx+(this.pcx-this.ppx)*n,i.y=this.ppy+(this.pcy-this.ppy)*n,i.vx=this.pvx*i.strength,i.vy=this.pvy*i.strength,this.step()}(s>0||!i.on)&&(this.ppx=this.pcx,this.ppy=this.pcy)}kick(t,s,i,o=0){t.vx+=s,t.vy+=i,t.wz+=o}radial(t,s,i,o=.4){for(const n of this.bodies){if(n.frozen)continue;const r=n.x-t,l=n.y-s,c=Math.max(.3,Math.hypot(r,l)),e=i*Math.exp(-c*o);n.vx+=r/c*e,n.vy+=l/c*e}}pick(t,s,i=1){let o=null,n=1/0;for(const r of this.bodies){if(r.frozen)continue;const l=Math.hypot(r.x-t,r.y-s);l<r.r*i&&l<n&&(n=l,o=r)}return o}emit(t,s,i,o,n,r,l,c){if(!this.onHit)return;const e=this.hit;e.a=t,e.b=s,e.kind=i,e.force=o,e.x=n,e.y=r,e.nx=l,e.ny=c,this.onHit(e)}step(){const t=_,s=this.params,i=this.bounds,o=this.bodies,n=o.length;this.time+=t;const r=Math.min(1,7*t);for(let c=0;c<n;c++){const e=o[c];if(e.frozen)continue;e.g+=(e.gT-e.g)*r,e.k+=(e.kT-e.k)*r;let m=s.gravity.x*e.g,p=s.gravity.y*e.g;if(e.k>.001){const u=s.springK*e.k;m-=u*e.kx*(e.x-e.hx),p-=u*e.ky*(e.y-e.hy)}e.vx+=m*t,e.vy+=p*t;const f=Math.exp(-(s.drag+s.springDamp*e.k*(e.kx>0||e.ky>0?1:0))*t);e.vx*=f,e.vy*=f,e.grounded&&(e.vx*=Math.exp(-s.rollDrag*t)),e.x+=e.vx*t,e.y+=e.vy*t,e.grounded?e.wz+=(-e.vx/e.r-e.wz)*Math.min(1,14*t):e.wz*=Math.exp(-.5*t),e.rz+=e.wz*t,e.grounded=!1}const l=this.pusher;if(l.on)for(let c=0;c<n;c++){const e=o[c];if(e.frozen)continue;const m=e.x-l.x,p=e.y-l.y,f=e.r+l.r,u=m*m+p*p;if(u>=f*f)continue;const v=Math.sqrt(u);let g=1,w=0;v>1e-4&&(g=m/v,w=p/v),e.x=l.x+g*f,e.y=l.y+w*f;const y=(e.vx-l.vx)*g+(e.vy-l.vy)*w;if(y<0){const b=-(1.6+s.pusherBounce*.5)*y*Math.min(1,.72/Math.sqrt(e.r));e.vx+=g*b,e.vy+=w*b,e.wz+=-(l.vx*w-l.vy*g)*.15/e.r,this.emit(e,null,"pusher",-y,l.x+g*l.r,l.y+w*l.r,-g,-w)}}for(let c=0;c<n;c++){const e=o[c];if(!(e.frozen||e.ghost))for(let m=c+1;m<n;m++){const p=o[m];if(p.frozen||p.ghost)continue;const f=p.x-e.x,u=p.y-e.y,v=e.r+p.r;if(f*f+u*u>=v*v)continue;let g=Math.sqrt(f*f+u*u),w=1,y=0;g<1e-4?g=1e-4:(w=f/g,y=u/g);const b=v-g,P=e.m+p.m;e.x-=w*b*(p.m/P),e.y-=y*b*(p.m/P),p.x+=w*b*(e.m/P),p.y+=y*b*(e.m/P);const d=(p.vx-e.vx)*w+(p.vy-e.vy)*y;if(d<0){const A=-(1+(d<-.8?s.restitution*Math.min(e.bounce,p.bounce):0))*d/(1/e.m+1/p.m);e.vx-=A/e.m*w,e.vy-=A/e.m*y,p.vx+=A/p.m*w,p.vy+=A/p.m*y;const N=(p.vx-e.vx)*-y+(p.vy-e.vy)*w;e.wz+=N*.05/e.r,p.wz+=N*.05/p.r;const tt=e.x+w*e.r,et=e.y+y*e.r;this.emit(e,p,"ball",-d,tt,et,w,y)}}}for(let c=0;c<n;c++){const e=o[c];if(e.frozen)continue;const m=s.wallRestitution*e.bounce,p=i.left+e.r,f=i.right-e.r,u=i.floor+e.r,v=i.ceil-e.r;e.x>f?(e.x=f,e.vx>0&&(e.vx>.8&&this.emit(e,null,"wall",e.vx*.8,i.right,e.y,1,0),e.vx=-e.vx*(e.vx>.8?m:0))):e.x<p&&(e.x=p,e.vx<0&&(e.vx<-.8&&this.emit(e,null,"wall",-e.vx*.8,i.left,e.y,-1,0),e.vx=-e.vx*(e.vx<-.8?m:0))),e.y<u?(e.y=u,e.vy<0&&(e.vy<-.8&&this.emit(e,null,"floor",-e.vy*.8,e.x,i.floor,0,-1),e.vy=-e.vy*(e.vy<-1.2?Math.max(m,.4*e.bounce):0)),e.grounded=!0):e.y>v&&(e.y=v,e.vy>0&&(e.vy>.8&&this.emit(e,null,"wall",e.vy*.8,e.x,i.ceil,0,1),e.vy=-e.vy*(e.vy>.8?m:0))),e.y-u<.02&&Math.abs(e.vy)<.6&&(e.grounded=!0)}}}function gt(a){return{uTime:{value:0},uPull:{value:0},uWobble:{value:1},uRippleT:{value:99},uRippleAmp:{value:1},uSeed:{value:a},uGlow:{value:0},uPoint:{value:new z(0,0,1)},uRippleDir:{value:new z(0,0,1)}}}const J=`
uniform float uTime, uPull, uWobble, uRippleT, uRippleAmp, uSeed;
uniform vec3 uPoint, uRippleDir;
float bulgeAt(vec3 n){ return uPull * 0.24 * pow(max(dot(n, uPoint), 0.0), 4.0); }
float dispAt(vec3 n){
  float w = 0.012 * uWobble * sin(n.x*4.0 + uTime*1.3 + uSeed) * sin(n.y*5.0 + uTime*1.1 + uSeed*1.7) * sin(n.z*4.5 + uTime*0.9);
  float ang = acos(clamp(dot(n, uRippleDir), -1.0, 1.0));
  float front = ang - uRippleT * 1.7;
  float rip = uRippleAmp * 0.07 * cos(ang*7.0 - uRippleT*11.0) * exp(-front*front*5.0) * exp(-uRippleT*1.3);
  return w + bulgeAt(n) + rip;
}
vec3 deformPos(vec3 n){ return n * (1.0 + dispAt(n)); }
vec3 deformNormal(vec3 n){
  vec3 t1 = normalize(cross(n, abs(n.y) < 0.99 ? vec3(0.0,1.0,0.0) : vec3(1.0,0.0,0.0)));
  vec3 t2 = cross(n, t1);
  vec3 n1 = normalize(n + t1*0.01), n2 = normalize(n + t2*0.01);
  vec3 p0 = deformPos(n), p1 = deformPos(n1), p2 = deformPos(n2);
  vec3 nn = normalize(cross(p1 - p0, p2 - p0));
  return dot(nn, n) < 0.0 ? -nn : nn;
}
`,xt=`
${J}
varying vec3 vN;
varying vec3 vView;
varying float vBulge;
void main(){
#ifdef NO_DEFORM
  vec3 p = position;
  // «подушечное» смягчение плоских граней цифр: нормаль слегка расходится от центра
  vec3 nn = normalize(normal + vec3(position.xy * 0.85, 0.0) * abs(normal.z));
  vBulge = 0.0;
#else
  vec3 n = normalize(position);
  vec3 p = deformPos(n);
  vec3 nn = deformNormal(n);
  vBulge = bulgeAt(n) / 0.24;
#endif
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vN = normalize(normalMatrix * nn);
  vView = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}`,bt=`
uniform sampler2D uMatcap;
uniform vec3 uSssColor;
uniform float uSss;
uniform float uGlow;
uniform vec3 uGlowColor;
varying vec3 vN;
varying vec3 vView;
varying float vBulge;
void main(){
  vec3 v = normalize(vView);
  vec3 n = normalize(vN);
  vec3 x = normalize(vec3(v.z, 0.0, -v.x));
  vec3 y = cross(v, x);
  vec2 uv = vec2(dot(x, n), dot(y, n)) * 0.495 + 0.5;
  vec3 c = texture2D(uMatcap, uv).rgb;
  float nv = max(dot(n, v), 0.0);
  float fres = pow(1.0 - nv, 2.4);
  // «внутренний свет»: просвечивание на теневой стороне + кромка (wrap/fresnel)
  vec3 L = normalize(vec3(-0.42, 0.62, 0.66));
  float back = pow(clamp(-dot(n, L) * 0.5 + 0.5, 0.0, 1.0), 2.2);
  c += uSssColor * uSss * (0.30 * back + 0.30 * fres);
  // выпуклость к курсору слегка светится
  c += uGlowColor * vBulge * 0.10 * (0.4 + fres);
  c += uGlowColor * uGlow * (0.30 + 0.9 * fres);
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`,F=(a,t)=>a[0]*t[0]+a[1]*t[1]+a[2]*t[2],R=a=>{const t=Math.hypot(a[0],a[1],a[2])||1;return[a[0]/t,a[1]/t,a[2]/t]},X=(a,t)=>[a[1]*t[2]-a[2]*t[1],a[2]*t[0]-a[0]*t[2],a[0]*t[1]-a[1]*t[0]],x=(a,t,s)=>[Math.pow(a/255,2.2),Math.pow(t/255,2.2),Math.pow(s/255,2.2)];function C(a,t,s,i,o,n=[1,1,1]){const r=R(a),l=Math.abs(r[1])>.95?[0,0,1]:[0,1,0],c=R(X(l,r)),e=X(r,c);return{d:r,right:c,up:e,w:t,h:s,soft:i,gain:o,tint:n}}function Mt(a,t){const s=F(a,t.d);if(s<=.05)return 0;const i=F(a,t.right)/s,o=F(a,t.up)/s,n=1-V(t.w-t.soft,t.w+t.soft,Math.abs(i)),r=1-V(t.h-t.soft,t.h+t.soft,Math.abs(o));return n*r*t.gain}function Pt(a,t){const s=[0,0,1],i=Math.max(a[2],0),o=t.key,n=F(a,o),r=Math.min(1,Math.max(0,(n+t.wrap)/(1+t.wrap))),l=Math.pow(r,t.diffPow),c=[0,0,0];for(let d=0;d<3;d++)c[d]=t.shadow[d]+(t.albedo[d]-t.shadow[d])*l;const e=R([.55,-.7,.35]),m=V(.1,1,F(a,e));for(let d=0;d<3;d++)c[d]+=t.bounce[d]*m*t.bounceGain;const p=2*i,f=[p*a[0]-s[0],p*a[1]-s[1],p*a[2]-s[2]];let u=0;const v=[0,0,0];for(const d of t.rects){const G=Mt(f,d);u+=G,v[0]+=G*d.tint[0],v[1]+=G*d.tint[1],v[2]+=G*d.tint[2]}const g=Math.pow(1-i,5),w=t.envBase+t.envFres*(.04+.96*g)*4;if(u>0)for(let d=0;d<3;d++)c[d]+=v[d]*w;const y=R([o[0]+s[0],o[1]+s[1],o[2]+s[2]]),b=Math.pow(Math.max(F(a,y),0),t.specPow)*t.specGain;for(let d=0;d<3;d++)c[d]+=t.specTint[d]*b;const P=Math.pow(1-i,t.rimPow)*t.rimGain;for(let d=0;d<3;d++)c[d]+=t.rim[d]*P;for(let d=0;d<3;d++)c[d]*=t.exposure;return c}function Ct(a,t){const s=document.createElement("canvas");s.width=s.height=a;const i=s.getContext("2d");if(!i)throw new Error("2d context unavailable");const o=i.createImageData(a,a),n=1/2.2;for(let l=0;l<a;l++)for(let c=0;c<a;c++){const e=((c+.5)/a-.5)/.495,m=-((l+.5)/a-.5)/.495,p=e*e+m*m;let f;if(p<1)f=[e,m,Math.sqrt(1-p)];else{const g=Math.sqrt(p);f=[e/g,m/g,0]}const u=Pt(f,t),v=(l*a+c)*4;o.data[v]=Math.min(255,Math.pow(Math.max(u[0],0),n)*255),o.data[v+1]=Math.min(255,Math.pow(Math.max(u[1],0),n)*255),o.data[v+2]=Math.min(255,Math.pow(Math.max(u[2],0),n)*255),o.data[v+3]=255}i.putImageData(o,0,0);const r=new nt(s);return r.colorSpace=at,r.minFilter=rt,r.magFilter=lt,r.generateMipmaps=!0,r.needsUpdate=!0,r}const B=R([-.42,.62,.66]);function Gt(a){switch(a){case"signal":return{albedo:x(200,255,58),shadow:x(34,78,4),bounce:x(150,230,190),bounceGain:.22,wrap:.35,diffPow:1.15,key:B,specPow:140,specGain:2,specTint:[1,1,.9],envBase:0,envFres:.55,rects:[C([-.5,.65,.6],.5,.3,.16,1.15),C([.9,.1,.45],.1,.8,.07,.8)],rim:x(190,255,120),rimPow:3.2,rimGain:.35,exposure:1};case"chalk":return{albedo:x(232,233,228),shadow:x(104,108,118),bounce:x(180,190,200),bounceGain:.2,wrap:.75,diffPow:.95,key:B,specPow:14,specGain:.1,specTint:[1,1,1],envBase:0,envFres:.06,rects:[C([-.5,.65,.6],.6,.4,.3,.6)],rim:x(210,218,230),rimPow:3.5,rimGain:.12,exposure:.97};case"graphite":return{albedo:x(30,32,37),shadow:x(5,6,8),bounce:x(110,122,140),bounceGain:.1,wrap:.1,diffPow:1.5,key:B,specPow:420,specGain:4,specTint:[1,1,1],envBase:.06,envFres:.7,rects:[C([-.5,.62,.62],.55,.28,.05,2.6),C([.88,.05,.4],.07,.95,.04,2,[.8,.9,1]),C([0,-.85,.5],1.2,.18,.2,.55,[.7,.8,1]),C([.1,.4,-.9],1.2,.5,.2,1.4)],rim:x(150,165,190),rimPow:4.5,rimGain:.16,exposure:1};case"red":return{albedo:x(232,44,58),shadow:x(72,4,14),bounce:x(255,150,130),bounceGain:.2,wrap:.35,diffPow:1.15,key:B,specPow:160,specGain:2,specTint:[1,.96,.94],envBase:0,envFres:.5,rects:[C([-.5,.65,.6],.5,.3,.16,1.1),C([.9,.1,.45],.1,.8,.07,.7)],rim:x(255,120,110),rimPow:3.2,rimGain:.3,exposure:1};case"blue":return{albedo:x(46,96,255),shadow:x(6,14,82),bounce:x(140,185,255),bounceGain:.22,wrap:.35,diffPow:1.15,key:B,specPow:160,specGain:2,specTint:[.94,.97,1],envBase:0,envFres:.55,rects:[C([-.5,.65,.6],.5,.3,.16,1.1),C([.9,.1,.45],.1,.8,.07,.7)],rim:x(120,170,255),rimPow:3.2,rimGain:.32,exposure:1};case"frost":default:return{albedo:x(196,208,222),shadow:x(54,62,78),bounce:x(150,175,200),bounceGain:.25,wrap:.6,diffPow:1,key:B,specPow:40,specGain:.5,specTint:[1,1,1],envBase:0,envFres:.4,rects:[C([-.5,.65,.6],.55,.3,.2,.8)],rim:x(220,235,255),rimPow:2.8,rimGain:.35,exposure:1}}}function Tt(a,t){const s=new $,i=[],o=t?10396587:460810,n=new k(new W(10,32,16),new L({color:o,side:ct}));s.add(n),i.push(n.geometry,n.material);const r=(m,p,f,u,v=[1,1,1])=>{const g=new k(new I(m,p),new L({color:new M(v[0]*u,v[1]*u,v[2]*u),side:O}));g.position.set(f[0],f[1],f[2]),g.lookAt(0,0,0),s.add(g),i.push(g.geometry,g.material)};r(9,3.2,[-3,7.2,3.5],6),r(1.4,11,[-8.6,.4,2],4.5),r(.9,9,[8.6,1,-1],3.4,[.85,1,.45]),r(10,2.2,[0,-7.2,2.2],.55,[.7,.8,1]);const l=new k(new ht(3.6,3.95,96),new L({color:new M(3.2,3.2,3.2),side:O}));l.position.set(0,0,-8.5),l.lookAt(0,0,0),s.add(l),i.push(l.geometry,l.material);const c=new ut(a),e=c.fromScene(s,.02);c.dispose();for(const m of i)m.dispose();return e}const kt=1;class zt{constructor(t,s,i){h(this,"tex",new Map);h(this,"envRT",null);h(this,"created",[]);h(this,"glassLive",0);h(this,"size");this.renderer=t,this.opts=s,this.palette=i,this.size=s.quality==="low"?256:512}matcap(t){let s=this.tex.get(t);return s||(s=Ct(this.size,Gt(t)),this.tex.set(t,s)),s}get env(){return this.envRT||(this.envRT=Tt(this.renderer,!!this.opts.lightTheme)),this.envRT.texture}resolveKind(t){return t!=="glass"?t:this.opts.quality==="low"||this.opts.mobile||this.glassLive>=kt?"frost":t}create(t,s=0,i=!0){const o=this.resolveKind(t),n=gt(s);let r;if(o==="glass"){r=this.createGlass(n),this.glassLive++;const l=r.dispose;let c=!1;r.dispose=()=>{c||(c=!0,this.glassLive--),l()}}else r=this.createMatcap(o,n,i);return this.created.push(r),r}createMatcap(t,s,i){const o=new M(this.palette.signal),n=new D({uniforms:{...s,uMatcap:{value:this.matcap(t)},uSssColor:{value:new M(.62,1,.1)},uSss:{value:t==="signal"?1:t==="frost"?.15:0},uGlowColor:{value:o}},vertexShader:xt,fragmentShader:bt,defines:i?{}:{NO_DEFORM:""}});return{kind:t,material:n,u:s,setGlow:r=>{s.uGlow.value=r},dispose:()=>n.dispose()}}createGlass(t){const s=new ot({color:16777215,metalness:0,roughness:.04,transmission:1,thickness:1,ior:1.45,clearcoat:1,clearcoatRoughness:.03,envMap:this.env,envMapIntensity:this.opts.lightTheme?1.1:2,attenuationColor:new M(.82,.93,1),attenuationDistance:4,specularIntensity:1,emissive:new M(this.palette.signal),emissiveIntensity:0});return s.dispersion=.35,s.onBeforeCompile=i=>{Object.assign(i.uniforms,t),i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
${J}`).replace("#include <beginnormal_vertex>","vec3 objectNormal = deformNormal(normalize(position));").replace("#include <begin_vertex>","vec3 transformed = deformPos(normalize(position));")},s.customProgramCacheKey=()=>"ball-glass-deform",{kind:"glass",material:s,u:t,setGlow:i=>{t.uGlow.value=i,s.emissiveIntensity=i*.9},dispose:()=>s.dispose()}}dispose(){for(const t of this.created)t.dispose();this.created.length=0;for(const t of this.tex.values())t.dispose();this.tex.clear(),this.envRT&&(this.envRT.dispose(),this.envRT=null)}}function Bt(a){return a==="low"?new W(1,48,32):new W(1,96,64)}const T=16.4,K=25,q=-4.5,Z=-2.4;class Ft{constructor(t){h(this,"mesh");h(this,"geo",new I(2,2));h(this,"mat");h(this,"attr");h(this,"m",new mt);h(this,"q",new vt);h(this,"p",new z);h(this,"s",new z);h(this,"count");this.count=t,this.mat=new D({transparent:!0,depthWrite:!1,vertexShader:`
        attribute vec4 aColor;
        varying vec4 vC;
        varying vec2 vP;
        void main(){
          vP = position.xy;
          vC = aColor;
          vec4 p = vec4(position, 1.0);
          #ifdef USE_INSTANCING
            p = instanceMatrix * p;
          #endif
          gl_Position = projectionMatrix * modelViewMatrix * p;
        }`,fragmentShader:`
        varying vec4 vC;
        varying vec2 vP;
        void main(){
          float d = length(vP);
          float a = 1.0 - smoothstep(0.0, 1.0, d);
          a = pow(a, 1.7) * vC.a;
          gl_FragColor = vec4(vC.rgb, a);
          #include <colorspace_fragment>
        }`}),this.mesh=new ft(this.geo,this.mat,t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-5,this.attr=new yt(new Float32Array(t*4),4),this.attr.setUsage(E),this.geo.setAttribute("aColor",this.attr),this.mesh.instanceMatrix.setUsage(E);for(let s=0;s<t;s++)this.hide(s)}set(t,s,i,o,n,r,l,c){this.p.set(s,i,o),this.s.set(n,r,1),this.m.compose(this.p,this.q,this.s),this.mesh.setMatrixAt(t,this.m),this.attr.setXYZW(t,l.r,l.g,l.b,c)}hide(t){this.p.set(0,0,0),this.s.set(0,0,0),this.m.compose(this.p,this.q,this.s),this.mesh.setMatrixAt(t,this.m),this.attr.setW(t,0)}flush(){this.mesh.instanceMatrix.needsUpdate=!0,this.attr.needsUpdate=!0}dispose(){this.geo.dispose(),this.mat.dispose(),this.mesh.dispose()}}class St{constructor(){h(this,"mesh");h(this,"u",{uBg:{value:new M},uPool:{value:new M},uCenter:{value:new U},uRadius:{value:new U(8,5)},uGain:{value:1},uSpots:{value:[new H,new H,new H,new H]},uSpotColor:{value:new M(.42,.52,.7)}});h(this,"geo",new I(1,1));h(this,"mat");this.mat=new D({uniforms:this.u,vertexShader:`
        varying vec2 vXY;
        void main(){
          vec4 w = modelMatrix * vec4(position, 1.0);
          vXY = w.xy;
          gl_Position = projectionMatrix * viewMatrix * w;
        }`,fragmentShader:`
        uniform vec3 uBg, uPool;
        uniform vec2 uCenter, uRadius;
        uniform float uGain;
        uniform vec4 uSpots[4];
        uniform vec3 uSpotColor;
        varying vec2 vXY;
        void main(){
          vec2 q = (vXY - uCenter) / uRadius;
          float a = 1.0 - smoothstep(0.0, 1.0, length(q));
          a = a * a * uGain;
          vec3 col = mix(uBg, uPool, a);
          // подсветка «за стеклом»: видна только сквозь преломляющие шары
          for (int i = 0; i < 4; i++) {
            vec4 s = uSpots[i];
            float d = length(vXY - s.xy) / max(s.z, 0.001);
            float sp = 1.0 - smoothstep(0.0, 1.0, d);
            col += uSpotColor * s.w * sp * sp;
          }
          gl_FragColor = vec4(col, 1.0);
          #include <colorspace_fragment>
          // дизеринг (IGN), чтобы градиент фона не полосил
          float ign = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
          gl_FragColor.rgb += (ign - 0.5) / 255.0;
        }`,depthWrite:!0}),this.mesh=new k(this.geo,this.mat),this.mesh.position.z=q,this.mesh.frustumCulled=!1,this.mesh.renderOrder=-10}dispose(){this.geo.dispose(),this.mat.dispose()}}class Rt{constructor(){h(this,"mesh");h(this,"u",{uColor:{value:new M},uFade:{value:0}});h(this,"geo",new I(2,2));h(this,"mat");this.mat=new D({uniforms:this.u,transparent:!0,depthTest:!1,depthWrite:!1,vertexShader:`
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
        uniform vec3 uColor;
        uniform float uFade;
        varying vec2 vUv;
        void main(){
          float a = clamp(uFade * (0.5 + 0.9 * vUv.y), 0.0, 1.0);
          gl_FragColor = vec4(uColor, a);
          #include <colorspace_fragment>
        }`}),this.mesh=new k(this.geo,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1e3,this.mesh.visible=!1}set(t){this.u.uFade.value=t,this.mesh.visible=t>.002}dispose(){this.geo.dispose(),this.mat.dispose()}}const Q=[];class qt{constructor(t,s){h(this,"scene");h(this,"camera");h(this,"world",new wt);h(this,"group",new dt);h(this,"lib");h(this,"bg",new M);h(this,"wall",new St);h(this,"fade",new Rt);h(this,"blobs");h(this,"actors",[]);h(this,"halfW",1);h(this,"halfH",1);h(this,"onHit",null);h(this,"geo");h(this,"byBody",new Map);h(this,"lastSnd",0);h(this,"nextId",0);h(this,"tmpV",new z);h(this,"shadowTint",new M(0));h(this,"haloColor");h(this,"quality");h(this,"disposed",!1);h(this,"tp",{x:0,y:0});this.ctx=t,this.opts=s;const i=Q.pop();this.scene=i?i.scene:new $,this.camera=i?i.camera:new pt(K,1,.1,100),this.quality=t.quality,this.lib=new zt(t.renderer,{quality:t.quality,lightTheme:s.lightTheme,mobile:t.mobile},t.palette),this.geo=Bt(t.quality),this.haloColor=new M(t.palette.signal),this.scene.add(this.group),this.scene.add(this.wall.mesh),this.scene.add(this.fade.mesh),this.blobs=new Ft(s.capacity*3),this.group.add(this.blobs.mesh),this.camera.position.set(0,0,T),this.bg.copy(t.background),this.scene.background=this.bg,this.wall.u.uPool.value.set(s.pool??(s.lightTheme?"#F7F7F4":"#20242b")),this.wall.u.uGain.value=s.poolGain??1,this.world.onHit=o=>this.handleHit(o),this.fit(t),this.applyQuality()}fit(t){this.camera.aspect=t.aspect,this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.halfH=T*Math.tan(K*Math.PI/360),this.halfW=this.halfH*t.aspect;const s=(T-q)/T;this.wall.mesh.scale.set(this.halfW*2*s*1.7,this.halfH*2*s*1.7,1)}setPool(t,s,i,o){const n=(T-q)/T;this.wall.u.uCenter.value.set(t*n,s*n),this.wall.u.uRadius.value.set(i*n,o*n)}addBall(t,s,i,o,n=0){const r=!this.opts.rigid,l=this.lib.create(t,n+this.actors.length*1.37,r),c=new k(this.geo,l.material);c.frustumCulled=!1,this.group.add(c);const e=this.world.add(Y(this.nextId++,i,o,s)),m={body:e,mesh:c,bm:l,kind:t,deform:r,meshScale:s,glow:0,glowT:0,point:new z(0,0,1),shadow:t==="glass"||t==="frost"?.55:1,wobble:r?1:0};return this.actors.push(m),this.byBody.set(e,m),m}addCustom(t,s,i,o,n,r){const l=this.lib.create(s,0,!1),c=new k(t,l.material);c.frustumCulled=!1,this.group.add(c);const e=this.world.add(Y(this.nextId++,n,r,i)),m={body:e,mesh:c,bm:l,kind:s,deform:!1,meshScale:o,glow:0,glowT:0,point:new z(0,0,1),shadow:1,wobble:1};return this.actors.push(m),this.byBody.set(e,m),m}actorOf(t){return this.byBody.get(t)}applyQuality(){const t=this.ctx.quality;if(this.blobs.mesh.visible=t==="high"&&this.opts.shadowAlpha!==0,t!==this.quality){this.quality=t,this.lib.opts.quality=t;for(const s of this.actors)s.kind==="glass"&&(s.bm.dispose(),s.bm=this.lib.create("glass",s.bm.u.uSeed.value,s.deform),s.mesh.material=s.bm.material)}}toPhysics(t,s,i){const o=this.tmpV.set(t,s,.5).unproject(this.camera),n=this.camera.position,r=o.z-n.z;if(Math.abs(r)<1e-6)return!1;const l=-n.z/r;return i.x=n.x+(o.x-n.x)*l-this.group.position.x,i.y=n.y+(o.y-n.y)*l-this.group.position.y,!0}updatePointer(t,s,i=!0){const o=this.ctx.pointer;i&&s>.001&&(!o.touch&&o.inside||o.touch&&o.down)&&this.toPhysics(o.ndcX,o.ndcY,this.tp)?(this.world.pusher.strength=s,this.world.setPusher(!0,this.tp.x,this.tp.y,t)):this.world.setPusher(!1,0,0,t)}clickAt(t,s,i=1){if(!this.toPhysics(t,s,this.tp))return null;const{x:o,y:n}=this.tp,r=this.world.pick(o,n,1.08),l=i*(this.ctx.reduced?.4:1);if(r){let c=r.x-o,e=r.y-n,m=Math.hypot(c,e);m<r.r*.12&&(c=(Math.random()-.5)*.6,e=1,m=Math.hypot(c,e));const p=6.2/Math.sqrt(r.r+.4)*l;this.world.kick(r,c/m*p,e/m*p+2.4*l,c/m*2.2*l);const f=this.byBody.get(r);if(f&&f.deform){const u=f.bm.u;u.uRippleDir.value.set(-c/r.r,-e/r.r,.7).normalize(),u.uRippleT.value=0,u.uRippleAmp.value=1.25}this.playHit(9*l,r.r,o,n,"ball")}else this.world.radial(o,n,11*l),this.playHit(6*l,.9,o,n,"wall");return r}playHit(t,s,i,o,n){if(t<1.2)return;const r=performance.now();if(r-this.lastSnd<40)return;this.lastSnd=r;const l=this.ctx;l.sound.play("thud",{volume:S(.1+t*.05,.1,.85),rate:S(1.5-s*.55,.65,1.6)}),l.bus.dispatchEvent(new CustomEvent("ball-hit",{detail:{force:t,radius:s,x:i+this.group.position.x,y:o+this.group.position.y,kind:n}}))}handleHit(t){const s=this.byBody.get(t.a),i=t.b?this.byBody.get(t.b):void 0;if(t.force>2.4){const o=-S(t.force/9,.25,1.1);s&&s.deform&&this.ripple(s,t.nx,t.ny,o),i&&i.deform&&this.ripple(i,-t.nx,-t.ny,o)}this.playHit(t.force,t.b?Math.min(t.a.r,t.b.r):t.a.r,t.x,t.y,t.kind),this.onHit&&this.onHit(t,s,i)}ripple(t,s,i,o){const n=t.bm.u;n.uRippleDir.value.set(s,i,.25).normalize(),n.uRippleT.value=0,n.uRippleAmp.value=o}tick(t,s,i){const o=this.ctx;this.bg.copy(o.background),this.wall.u.uBg.value.copy(this.bg),this.fade.u.uColor.value.copy(this.bg),this.world.update(t),i?.offsetY!==void 0&&(this.group.position.y=i.offsetY),this.sync(t,s,i?.floor??null)}sync(t,s,i){const o=this.ctx,n=this.world.pusher,r=this.blobs.mesh.visible,l=(T-Z)/T,c=this.opts.shadowAlpha??(this.opts.lightTheme?.26:.6),e=(T-q)/T,m=this.wall.u.uSpots.value;let p=0;for(let f=0;f<this.actors.length;f++){const u=this.actors[f],v=u.body,g=u.mesh;g.position.set(v.x,v.y,0),g.scale.setScalar(u.meshScale);const w=u.bm.u;if(w.uTime.value=s,w.uWobble.value=o.reduced?0:u.wobble,u.deform){let y=0;if(n.on){const b=n.x-v.x,P=n.y-v.y,d=Math.hypot(b,P)||1e-4;if(y=S(1.7-d/v.r*.55,0,1)*(o.reduced?.4:1),y>.02){const G=1-Math.exp(-14*t);u.point.x+=(b/d-u.point.x)*G,u.point.y+=(P/d-u.point.y)*G,u.point.z+=(.55-u.point.z)*G,u.point.normalize(),w.uPoint.value.copy(u.point)}}w.uPull.value=j(w.uPull.value,y,y>w.uPull.value?12:7,t),w.uRippleT.value=Math.min(99,w.uRippleT.value+t)}if(u.glow=j(u.glow,u.glowT,9,t),u.bm.setGlow(u.glow),u.bm.kind==="glass"&&p<4&&!v.frozen&&!this.opts.lightTheme&&m[p++].set((v.x+this.group.position.x)*e,(v.y+this.group.position.y)*e,v.r*.85*e,.5),r){const y=f*3;if(v.frozen){this.blobs.hide(y),this.blobs.hide(y+1),this.blobs.hide(y+2);continue}const b=v.r,P=b*.75+.55;if(this.blobs.set(y,(v.x+P*.34)*l,(v.y-P*.46)*l,Z,b*1.45*l,b*1.45*l,this.shadowTint,c*u.shadow),i!==null){const d=Math.max(0,v.y-b-i),G=Math.exp(-d/(b*.9+.2))*c*1.25*u.shadow;this.blobs.set(y+1,v.x+b*.1,i+.02,-.15,b*(1.15+d*.08),b*.2,this.shadowTint,G)}else this.blobs.hide(y+1);u.glow>.01?this.blobs.set(y+2,v.x,v.y,-.5,b*2.1,b*2.1,this.haloColor,.55*u.glow):this.blobs.hide(y+2)}}for(;p<4;)m[p++].set(0,0,1,0);r&&this.blobs.flush()}dispose(){if(!this.disposed){this.disposed=!0;for(const t of this.actors)this.group.remove(t.mesh),t.deform===!1&&t.mesh.geometry.dispose(),t.bm.dispose();this.actors.length=0,this.byBody.clear(),this.world.bodies.length=0,this.world.onHit=null,this.onHit=null,this.geo.dispose(),this.blobs.dispose(),this.wall.dispose(),this.fade.dispose(),this.lib.dispose(),this.scene.clear(),this.scene.background=null,this.camera.position.set(0,0,T),this.camera.rotation.set(0,0,0),Q.push({scene:this.scene,camera:this.camera})}}}export{wt as B,T as C,K as F,zt as M,Y as a,qt as b,S as c,j as d,_t as e,Bt as m,V as s};
