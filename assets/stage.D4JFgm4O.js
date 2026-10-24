var ot=Object.defineProperty;var it=(l,t,s)=>t in l?ot(l,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):l[t]=s;var h=(l,t,s)=>it(l,typeof t!="symbol"?t+"":t,s);import{C as M,e as q,ac as nt,t as W,$ as at,b as rt,L as lt,c as ct,S as $,M as z,a1 as L,a5 as ht,ad as ut,f as O,ae as pt,V as k,P as I,k as dt,G as mt,n as vt,a6 as ft,ab as yt,aa as gt,af as U,i as H,h as j}from"./index.BntQukh-.js";const B=(l,t,s)=>l<t?t:l>s?s:l,V=(l,t,s)=>{const o=B((s-l)/(t-l),0,1);return o*o*(3-2*o)},Y=(l,t,s,o)=>l+(t-l)*(1-Math.exp(-s*o));function _t(l){let t=l>>>0;return()=>{t=t+1831565813>>>0;let s=t;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296}}const R=1/120;function E(l,t,s,o){return{id:l,x:t,y:s,vx:0,vy:0,r:o,m:o*o*o,hx:t,hy:s,g:0,gT:0,k:0,kT:0,kx:1,ky:1,rz:0,wz:0,frozen:!1,ghost:!1,grounded:!1,bounce:1,tag:0}}class J{constructor(){h(this,"bodies",[]);h(this,"bounds",{left:-10,right:10,floor:-1/0,ceil:1/0});h(this,"params",{gravity:{x:0,y:-26},springK:7,drag:.25,springDamp:1.7,restitution:.32,wallRestitution:.42,rollDrag:.55,pusherBounce:.5});h(this,"pusher",{on:!1,x:0,y:0,r:.7,vx:0,vy:0,strength:1});h(this,"onHit",null);h(this,"acc",0);h(this,"pcx",0);h(this,"pcy",0);h(this,"ppx",0);h(this,"ppy",0);h(this,"pHas",!1);h(this,"pvx",0);h(this,"pvy",0);h(this,"time",0);h(this,"hit",{a:null,b:null,kind:"wall",force:0,x:0,y:0,nx:0,ny:0})}add(t){return this.bodies.push(t),t}remove(t){const s=this.bodies.indexOf(t);s>=0&&this.bodies.splice(s,1)}setPusher(t,s,o,i){const r=this.pusher;if(!t){this.pHas=!1,r.on=!1;return}const n=1/Math.max(i,1/240);this.pHas?(this.pvx=this.pvx*.5+(s-this.pcx)*n*.5,this.pvy=this.pvy*.5+(o-this.pcy)*n*.5):(this.ppx=s,this.ppy=o,this.pvx=0,this.pvy=0),this.pcx=s,this.pcy=o,this.pHas=!0;const a=Math.hypot(this.pvx,this.pvy);a>24&&(this.pvx*=24/a,this.pvy*=24/a),r.on=!0}update(t){this.acc+=t;const s=Math.min(6,Math.floor(this.acc/R));this.acc-=s*R,this.acc>R&&(this.acc=0);const o=this.pusher;for(let i=1;i<=s;i++){const r=i/s;o.x=this.ppx+(this.pcx-this.ppx)*r,o.y=this.ppy+(this.pcy-this.ppy)*r,o.vx=this.pvx*o.strength,o.vy=this.pvy*o.strength,this.step()}(s>0||!o.on)&&(this.ppx=this.pcx,this.ppy=this.pcy)}kick(t,s,o,i=0){t.vx+=s,t.vy+=o,t.wz+=i}radial(t,s,o,i=.4){for(const r of this.bodies){if(r.frozen)continue;const n=r.x-t,a=r.y-s,c=Math.max(.3,Math.hypot(n,a)),e=o*Math.exp(-c*i);r.vx+=n/c*e,r.vy+=a/c*e}}pick(t,s,o=1){let i=null,r=1/0;for(const n of this.bodies){if(n.frozen)continue;const a=Math.hypot(n.x-t,n.y-s);a<n.r*o&&a<r&&(r=a,i=n)}return i}emit(t,s,o,i,r,n,a,c){if(!this.onHit)return;const e=this.hit;e.a=t,e.b=s,e.kind=o,e.force=i,e.x=r,e.y=n,e.nx=a,e.ny=c,this.onHit(e)}step(){const t=R,s=this.params,o=this.bounds,i=this.bodies,r=i.length;this.time+=t;const n=Math.min(1,7*t);for(let c=0;c<r;c++){const e=i[c];if(e.frozen)continue;e.g+=(e.gT-e.g)*n,e.k+=(e.kT-e.k)*n;let v=s.gravity.x*e.g,p=s.gravity.y*e.g;if(e.k>.001){const u=s.springK*e.k;v-=u*e.kx*(e.x-e.hx),p-=u*e.ky*(e.y-e.hy)}e.vx+=v*t,e.vy+=p*t;const f=Math.exp(-(s.drag+s.springDamp*e.k*(e.kx>0||e.ky>0?1:0))*t);e.vx*=f,e.vy*=f,e.grounded&&(e.vx*=Math.exp(-s.rollDrag*t)),e.x+=e.vx*t,e.y+=e.vy*t,e.grounded?e.wz+=(-e.vx/e.r-e.wz)*Math.min(1,14*t):e.wz*=Math.exp(-.5*t),e.rz+=e.wz*t,e.grounded=!1}const a=this.pusher;if(a.on)for(let c=0;c<r;c++){const e=i[c];if(e.frozen)continue;const v=e.x-a.x,p=e.y-a.y,f=e.r+a.r,u=v*v+p*p;if(u>=f*f)continue;const m=Math.sqrt(u);let g=1,y=0;m>1e-4&&(g=v/m,y=p/m),e.x=a.x+g*f,e.y=a.y+y*f;const w=(e.vx-a.vx)*g+(e.vy-a.vy)*y;if(w<0){const x=-(1.6+s.pusherBounce*.5)*w*Math.min(1,.72/Math.sqrt(e.r));e.vx+=g*x,e.vy+=y*x,e.wz+=-(a.vx*y-a.vy*g)*.15/e.r,this.emit(e,null,"pusher",-w,a.x+g*a.r,a.y+y*a.r,-g,-y)}}for(let c=0;c<r;c++){const e=i[c];if(!(e.frozen||e.ghost))for(let v=c+1;v<r;v++){const p=i[v];if(p.frozen||p.ghost)continue;const f=p.x-e.x,u=p.y-e.y,m=e.r+p.r;if(f*f+u*u>=m*m)continue;let g=Math.sqrt(f*f+u*u),y=1,w=0;g<1e-4?g=1e-4:(y=f/g,w=u/g);const x=m-g,P=e.m+p.m;e.x-=y*x*(p.m/P),e.y-=w*x*(p.m/P),p.x+=y*x*(e.m/P),p.y+=w*x*(e.m/P);const d=(p.vx-e.vx)*y+(p.vy-e.vy)*w;if(d<0){const A=-(1+(d<-.8?s.restitution*Math.min(e.bounce,p.bounce):0))*d/(1/e.m+1/p.m);e.vx-=A/e.m*y,e.vy-=A/e.m*w,p.vx+=A/p.m*y,p.vy+=A/p.m*w;const N=(p.vx-e.vx)*-w+(p.vy-e.vy)*y;e.wz+=N*.05/e.r,p.wz+=N*.05/p.r;const et=e.x+y*e.r,st=e.y+w*e.r;this.emit(e,p,"ball",-d,et,st,y,w)}}}for(let c=0;c<r;c++){const e=i[c];if(e.frozen)continue;const v=s.wallRestitution*e.bounce,p=o.left+e.r,f=o.right-e.r,u=o.floor+e.r,m=o.ceil-e.r;e.x>f?(e.x=f,e.vx>0&&(e.vx>.8&&this.emit(e,null,"wall",e.vx*.8,o.right,e.y,1,0),e.vx=-e.vx*(e.vx>.8?v:0))):e.x<p&&(e.x=p,e.vx<0&&(e.vx<-.8&&this.emit(e,null,"wall",-e.vx*.8,o.left,e.y,-1,0),e.vx=-e.vx*(e.vx<-.8?v:0))),e.y<u?(e.y=u,e.vy<0&&(e.vy<-.8&&this.emit(e,null,"floor",-e.vy*.8,e.x,o.floor,0,-1),e.vy=-e.vy*(e.vy<-1.2?Math.max(v,.4*e.bounce):0)),e.grounded=!0):e.y>m&&(e.y=m,e.vy>0&&(e.vy>.8&&this.emit(e,null,"wall",e.vy*.8,e.x,o.ceil,0,1),e.vy=-e.vy*(e.vy>.8?v:0))),e.y-u<.02&&Math.abs(e.vy)<.6&&(e.grounded=!0)}}}function Dt(l,t,s,o=5){const i=new J;i.bounds={...t},i.params.drag=.9,i.params.rollDrag=3,i.params.restitution=.1,i.params.wallRestitution=.15,l.forEach((n,a)=>{const c=E(a,s[a].x,s[a].y,n);c.gT=1,c.g=1,i.add(c)});const r=Math.floor(o/R);for(let n=0;n<r;n++)i.update(R);for(let n=0;n<40;n++)for(let a=0;a<i.bodies.length;a++){for(let e=a+1;e<i.bodies.length;e++){const v=i.bodies[a],p=i.bodies[e],f=p.x-v.x,u=p.y-v.y,m=Math.hypot(f,u)||1e-4,g=v.r+p.r+.01;if(m<g){const y=(g-m)*.5/m;v.x-=f*y,v.y-=u*y,p.x+=f*y,p.y+=u*y}}const c=i.bodies[a];c.x=B(c.x,t.left+c.r,t.right-c.r),c.y=Math.max(c.y,t.floor+c.r)}return i.bodies.map(n=>({x:n.x,y:n.y}))}function wt(l){return{uTime:{value:0},uPull:{value:0},uWobble:{value:1},uRippleT:{value:99},uRippleAmp:{value:1},uSeed:{value:l},uGlow:{value:0},uPoint:{value:new k(0,0,1)},uRippleDir:{value:new k(0,0,1)}}}const tt=`
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
${tt}
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
}`,S=(l,t)=>l[0]*t[0]+l[1]*t[1]+l[2]*t[2],F=l=>{const t=Math.hypot(l[0],l[1],l[2])||1;return[l[0]/t,l[1]/t,l[2]/t]},X=(l,t)=>[l[1]*t[2]-l[2]*t[1],l[2]*t[0]-l[0]*t[2],l[0]*t[1]-l[1]*t[0]],b=(l,t,s)=>[Math.pow(l/255,2.2),Math.pow(t/255,2.2),Math.pow(s/255,2.2)];function G(l,t,s,o,i,r=[1,1,1]){const n=F(l),a=Math.abs(n[1])>.95?[0,0,1]:[0,1,0],c=F(X(a,n)),e=X(n,c);return{d:n,right:c,up:e,w:t,h:s,soft:o,gain:i,tint:r}}function Mt(l,t){const s=S(l,t.d);if(s<=.05)return 0;const o=S(l,t.right)/s,i=S(l,t.up)/s,r=1-V(t.w-t.soft,t.w+t.soft,Math.abs(o)),n=1-V(t.h-t.soft,t.h+t.soft,Math.abs(i));return r*n*t.gain}function Pt(l,t){const s=[0,0,1],o=Math.max(l[2],0),i=t.key,r=S(l,i),n=Math.min(1,Math.max(0,(r+t.wrap)/(1+t.wrap))),a=Math.pow(n,t.diffPow),c=[0,0,0];for(let d=0;d<3;d++)c[d]=t.shadow[d]+(t.albedo[d]-t.shadow[d])*a;const e=F([.55,-.7,.35]),v=V(.1,1,S(l,e));for(let d=0;d<3;d++)c[d]+=t.bounce[d]*v*t.bounceGain;const p=2*o,f=[p*l[0]-s[0],p*l[1]-s[1],p*l[2]-s[2]];let u=0;const m=[0,0,0];for(const d of t.rects){const C=Mt(f,d);u+=C,m[0]+=C*d.tint[0],m[1]+=C*d.tint[1],m[2]+=C*d.tint[2]}const g=Math.pow(1-o,5),y=t.envBase+t.envFres*(.04+.96*g)*4;if(u>0)for(let d=0;d<3;d++)c[d]+=m[d]*y;const w=F([i[0]+s[0],i[1]+s[1],i[2]+s[2]]),x=Math.pow(Math.max(S(l,w),0),t.specPow)*t.specGain;for(let d=0;d<3;d++)c[d]+=t.specTint[d]*x;const P=Math.pow(1-o,t.rimPow)*t.rimGain;for(let d=0;d<3;d++)c[d]+=t.rim[d]*P;for(let d=0;d<3;d++)c[d]*=t.exposure;return c}function Ct(l,t){const s=document.createElement("canvas");s.width=s.height=l;const o=s.getContext("2d");if(!o)throw new Error("2d context unavailable");const i=o.createImageData(l,l),r=1/2.2;for(let a=0;a<l;a++)for(let c=0;c<l;c++){const e=((c+.5)/l-.5)/.495,v=-((a+.5)/l-.5)/.495,p=e*e+v*v;let f;if(p<1)f=[e,v,Math.sqrt(1-p)];else{const g=Math.sqrt(p);f=[e/g,v/g,0]}const u=Pt(f,t),m=(a*l+c)*4;i.data[m]=Math.min(255,Math.pow(Math.max(u[0],0),r)*255),i.data[m+1]=Math.min(255,Math.pow(Math.max(u[1],0),r)*255),i.data[m+2]=Math.min(255,Math.pow(Math.max(u[2],0),r)*255),i.data[m+3]=255}o.putImageData(i,0,0);const n=new at(s);return n.colorSpace=rt,n.minFilter=lt,n.magFilter=ct,n.generateMipmaps=!0,n.needsUpdate=!0,n}const _=F([-.42,.62,.66]);function Tt(l){switch(l){case"signal":return{albedo:b(200,255,58),shadow:b(34,78,4),bounce:b(150,230,190),bounceGain:.22,wrap:.35,diffPow:1.15,key:_,specPow:140,specGain:2,specTint:[1,1,.9],envBase:0,envFres:.55,rects:[G([-.5,.65,.6],.5,.3,.16,1.15),G([.9,.1,.45],.1,.8,.07,.8)],rim:b(190,255,120),rimPow:3.2,rimGain:.35,exposure:1};case"chalk":return{albedo:b(232,233,228),shadow:b(104,108,118),bounce:b(180,190,200),bounceGain:.2,wrap:.75,diffPow:.95,key:_,specPow:14,specGain:.1,specTint:[1,1,1],envBase:0,envFres:.06,rects:[G([-.5,.65,.6],.6,.4,.3,.6)],rim:b(210,218,230),rimPow:3.5,rimGain:.12,exposure:.97};case"graphite":return{albedo:b(30,32,37),shadow:b(5,6,8),bounce:b(110,122,140),bounceGain:.1,wrap:.1,diffPow:1.5,key:_,specPow:420,specGain:4,specTint:[1,1,1],envBase:.06,envFres:.7,rects:[G([-.5,.62,.62],.55,.28,.05,2.6),G([.88,.05,.4],.07,.95,.04,2,[.8,.9,1]),G([0,-.85,.5],1.2,.18,.2,.55,[.7,.8,1]),G([.1,.4,-.9],1.2,.5,.2,1.4)],rim:b(150,165,190),rimPow:4.5,rimGain:.16,exposure:1};case"frost":default:return{albedo:b(196,208,222),shadow:b(54,62,78),bounce:b(150,175,200),bounceGain:.25,wrap:.6,diffPow:1,key:_,specPow:40,specGain:.5,specTint:[1,1,1],envBase:0,envFres:.4,rects:[G([-.5,.65,.6],.55,.3,.2,.8)],rim:b(220,235,255),rimPow:2.8,rimGain:.35,exposure:1}}}function Gt(l,t){const s=new $,o=[],i=t?10396587:460810,r=new z(new W(10,32,16),new L({color:i,side:ht}));s.add(r),o.push(r.geometry,r.material);const n=(v,p,f,u,m=[1,1,1])=>{const g=new z(new I(v,p),new L({color:new M(m[0]*u,m[1]*u,m[2]*u),side:O}));g.position.set(f[0],f[1],f[2]),g.lookAt(0,0,0),s.add(g),o.push(g.geometry,g.material)};n(9,3.2,[-3,7.2,3.5],6),n(1.4,11,[-8.6,.4,2],4.5),n(.9,9,[8.6,1,-1],3.4,[.85,1,.45]),n(10,2.2,[0,-7.2,2.2],.55,[.7,.8,1]);const a=new z(new ut(3.6,3.95,96),new L({color:new M(3.2,3.2,3.2),side:O}));a.position.set(0,0,-8.5),a.lookAt(0,0,0),s.add(a),o.push(a.geometry,a.material);const c=new pt(l),e=c.fromScene(s,.02);c.dispose();for(const v of o)v.dispose();return e}const zt=1;class kt{constructor(t,s,o){h(this,"tex",new Map);h(this,"envRT",null);h(this,"created",[]);h(this,"glassLive",0);h(this,"size");this.renderer=t,this.opts=s,this.palette=o,this.size=s.quality==="low"?256:512}matcap(t){let s=this.tex.get(t);return s||(s=Ct(this.size,Tt(t)),this.tex.set(t,s)),s}get env(){return this.envRT||(this.envRT=Gt(this.renderer,!!this.opts.lightTheme)),this.envRT.texture}resolveKind(t){return t!=="glass"?t:this.opts.quality==="low"||this.opts.mobile||this.glassLive>=zt?"frost":t}create(t,s=0,o=!0){const i=this.resolveKind(t),r=wt(s);let n;if(i==="glass"){n=this.createGlass(r),this.glassLive++;const a=n.dispose;let c=!1;n.dispose=()=>{c||(c=!0,this.glassLive--),a()}}else n=this.createMatcap(i,r,o);return this.created.push(n),n}createMatcap(t,s,o){const i=new M(this.palette.signal),r=new q({uniforms:{...s,uMatcap:{value:this.matcap(t)},uSssColor:{value:new M(.62,1,.1)},uSss:{value:t==="signal"?1:t==="frost"?.15:0},uGlowColor:{value:i}},vertexShader:xt,fragmentShader:bt,defines:o?{}:{NO_DEFORM:""}});return{kind:t,material:r,u:s,setGlow:n=>{s.uGlow.value=n},dispose:()=>r.dispose()}}createGlass(t){const s=new nt({color:16777215,metalness:0,roughness:.04,transmission:1,thickness:1,ior:1.45,clearcoat:1,clearcoatRoughness:.03,envMap:this.env,envMapIntensity:this.opts.lightTheme?1.1:2,attenuationColor:new M(.82,.93,1),attenuationDistance:4,specularIntensity:1,emissive:new M(this.palette.signal),emissiveIntensity:0});return s.dispersion=.35,s.onBeforeCompile=o=>{Object.assign(o.uniforms,t),o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
${tt}`).replace("#include <beginnormal_vertex>","vec3 objectNormal = deformNormal(normalize(position));").replace("#include <begin_vertex>","vec3 transformed = deformPos(normalize(position));")},s.customProgramCacheKey=()=>"ball-glass-deform",{kind:"glass",material:s,u:t,setGlow:o=>{t.uGlow.value=o,s.emissiveIntensity=o*.9},dispose:()=>s.dispose()}}dispose(){for(const t of this.created)t.dispose();this.created.length=0;for(const t of this.tex.values())t.dispose();this.tex.clear(),this.envRT&&(this.envRT.dispose(),this.envRT=null)}}function Bt(l){return l==="low"?new W(1,48,32):new W(1,96,64)}const T=16.4,K=25,D=-4.5,Z=-2.4;class Rt{constructor(t){h(this,"mesh");h(this,"geo",new I(2,2));h(this,"mat");h(this,"attr");h(this,"m",new vt);h(this,"q",new ft);h(this,"p",new k);h(this,"s",new k);h(this,"count");this.count=t,this.mat=new q({transparent:!0,depthWrite:!1,vertexShader:`
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
        }`}),this.mesh=new yt(this.geo,this.mat,t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-5,this.attr=new gt(new Float32Array(t*4),4),this.attr.setUsage(U),this.geo.setAttribute("aColor",this.attr),this.mesh.instanceMatrix.setUsage(U);for(let s=0;s<t;s++)this.hide(s)}set(t,s,o,i,r,n,a,c){this.p.set(s,o,i),this.s.set(r,n,1),this.m.compose(this.p,this.q,this.s),this.mesh.setMatrixAt(t,this.m),this.attr.setXYZW(t,a.r,a.g,a.b,c)}hide(t){this.p.set(0,0,0),this.s.set(0,0,0),this.m.compose(this.p,this.q,this.s),this.mesh.setMatrixAt(t,this.m),this.attr.setW(t,0)}flush(){this.mesh.instanceMatrix.needsUpdate=!0,this.attr.needsUpdate=!0}dispose(){this.geo.dispose(),this.mat.dispose(),this.mesh.dispose()}}class St{constructor(){h(this,"mesh");h(this,"u",{uBg:{value:new M},uPool:{value:new M},uCenter:{value:new j},uRadius:{value:new j(8,5)},uGain:{value:1},uSpots:{value:[new H,new H,new H,new H]},uSpotColor:{value:new M(.42,.52,.7)}});h(this,"geo",new I(1,1));h(this,"mat");this.mat=new q({uniforms:this.u,vertexShader:`
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
        }`,depthWrite:!0}),this.mesh=new z(this.geo,this.mat),this.mesh.position.z=D,this.mesh.frustumCulled=!1,this.mesh.renderOrder=-10}dispose(){this.geo.dispose(),this.mat.dispose()}}class Ft{constructor(){h(this,"mesh");h(this,"u",{uColor:{value:new M},uFade:{value:0}});h(this,"geo",new I(2,2));h(this,"mat");this.mat=new q({uniforms:this.u,transparent:!0,depthTest:!1,depthWrite:!1,vertexShader:`
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`
        uniform vec3 uColor;
        uniform float uFade;
        varying vec2 vUv;
        void main(){
          float a = clamp(uFade * (0.5 + 0.9 * vUv.y), 0.0, 1.0);
          gl_FragColor = vec4(uColor, a);
          #include <colorspace_fragment>
        }`}),this.mesh=new z(this.geo,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1e3,this.mesh.visible=!1}set(t){this.u.uFade.value=t,this.mesh.visible=t>.002}dispose(){this.geo.dispose(),this.mat.dispose()}}const Q=[];class qt{constructor(t,s){h(this,"scene");h(this,"camera");h(this,"world",new J);h(this,"group",new mt);h(this,"lib");h(this,"bg",new M);h(this,"wall",new St);h(this,"fade",new Ft);h(this,"blobs");h(this,"actors",[]);h(this,"halfW",1);h(this,"halfH",1);h(this,"onHit",null);h(this,"geo");h(this,"byBody",new Map);h(this,"lastSnd",0);h(this,"nextId",0);h(this,"tmpV",new k);h(this,"shadowTint",new M(0));h(this,"haloColor");h(this,"quality");h(this,"disposed",!1);h(this,"tp",{x:0,y:0});this.ctx=t,this.opts=s;const o=Q.pop();this.scene=o?o.scene:new $,this.camera=o?o.camera:new dt(K,1,.1,100),this.quality=t.quality,this.lib=new kt(t.renderer,{quality:t.quality,lightTheme:s.lightTheme,mobile:t.mobile},t.palette),this.geo=Bt(t.quality),this.haloColor=new M(t.palette.signal),this.scene.add(this.group),this.scene.add(this.wall.mesh),this.scene.add(this.fade.mesh),this.blobs=new Rt(s.capacity*3),this.group.add(this.blobs.mesh),this.camera.position.set(0,0,T),this.bg.copy(t.background),this.scene.background=this.bg,this.wall.u.uPool.value.set(s.pool??(s.lightTheme?"#F7F7F4":"#20242b")),this.wall.u.uGain.value=s.poolGain??1,this.world.onHit=i=>this.handleHit(i),this.fit(t),this.applyQuality()}fit(t){this.camera.aspect=t.aspect,this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.halfH=T*Math.tan(K*Math.PI/360),this.halfW=this.halfH*t.aspect;const s=(T-D)/T;this.wall.mesh.scale.set(this.halfW*2*s*1.7,this.halfH*2*s*1.7,1)}setPool(t,s,o,i){const r=(T-D)/T;this.wall.u.uCenter.value.set(t*r,s*r),this.wall.u.uRadius.value.set(o*r,i*r)}addBall(t,s,o,i,r=0){const n=this.lib.create(t,r+this.actors.length*1.37,!0),a=new z(this.geo,n.material);a.frustumCulled=!1,this.group.add(a);const c=this.world.add(E(this.nextId++,o,i,s)),e={body:c,mesh:a,bm:n,kind:t,deform:!0,meshScale:s,glow:0,glowT:0,point:new k(0,0,1),shadow:t==="glass"||t==="frost"?.55:1,wobble:1};return this.actors.push(e),this.byBody.set(c,e),e}addCustom(t,s,o,i,r,n){const a=this.lib.create(s,0,!1),c=new z(t,a.material);c.frustumCulled=!1,this.group.add(c);const e=this.world.add(E(this.nextId++,r,n,o)),v={body:e,mesh:c,bm:a,kind:s,deform:!1,meshScale:i,glow:0,glowT:0,point:new k(0,0,1),shadow:1,wobble:1};return this.actors.push(v),this.byBody.set(e,v),v}actorOf(t){return this.byBody.get(t)}applyQuality(){const t=this.ctx.quality;if(this.blobs.mesh.visible=t==="high"&&this.opts.shadowAlpha!==0,t!==this.quality){this.quality=t,this.lib.opts.quality=t;for(const s of this.actors)s.kind==="glass"&&(s.bm.dispose(),s.bm=this.lib.create("glass",s.bm.u.uSeed.value,s.deform),s.mesh.material=s.bm.material)}}toPhysics(t,s,o){const i=this.tmpV.set(t,s,.5).unproject(this.camera),r=this.camera.position,n=i.z-r.z;if(Math.abs(n)<1e-6)return!1;const a=-r.z/n;return o.x=r.x+(i.x-r.x)*a-this.group.position.x,o.y=r.y+(i.y-r.y)*a-this.group.position.y,!0}updatePointer(t,s,o=!0){const i=this.ctx.pointer;o&&s>.001&&(!i.touch&&i.inside||i.touch&&i.down)&&this.toPhysics(i.ndcX,i.ndcY,this.tp)?(this.world.pusher.strength=s,this.world.setPusher(!0,this.tp.x,this.tp.y,t)):this.world.setPusher(!1,0,0,t)}clickAt(t,s,o=1){if(!this.toPhysics(t,s,this.tp))return null;const{x:i,y:r}=this.tp,n=this.world.pick(i,r,1.08),a=o*(this.ctx.reduced?.4:1);if(n){let c=n.x-i,e=n.y-r,v=Math.hypot(c,e);v<n.r*.12&&(c=(Math.random()-.5)*.6,e=1,v=Math.hypot(c,e));const p=6.2/Math.sqrt(n.r+.4)*a;this.world.kick(n,c/v*p,e/v*p+2.4*a,c/v*2.2*a);const f=this.byBody.get(n);if(f&&f.deform){const u=f.bm.u;u.uRippleDir.value.set(-c/n.r,-e/n.r,.7).normalize(),u.uRippleT.value=0,u.uRippleAmp.value=1.25}this.playHit(9*a,n.r,i,r,"ball")}else this.world.radial(i,r,11*a),this.playHit(6*a,.9,i,r,"wall");return n}playHit(t,s,o,i,r){if(t<1.2)return;const n=performance.now();if(n-this.lastSnd<40)return;this.lastSnd=n;const a=this.ctx;a.sound.play("thud",{volume:B(.1+t*.05,.1,.85),rate:B(1.5-s*.55,.65,1.6)}),a.bus.dispatchEvent(new CustomEvent("ball-hit",{detail:{force:t,radius:s,x:o+this.group.position.x,y:i+this.group.position.y,kind:r}}))}handleHit(t){const s=this.byBody.get(t.a),o=t.b?this.byBody.get(t.b):void 0;if(t.force>2.4){const i=-B(t.force/9,.25,1.1);s&&s.deform&&this.ripple(s,t.nx,t.ny,i),o&&o.deform&&this.ripple(o,-t.nx,-t.ny,i)}this.playHit(t.force,t.b?Math.min(t.a.r,t.b.r):t.a.r,t.x,t.y,t.kind),this.onHit&&this.onHit(t,s,o)}ripple(t,s,o,i){const r=t.bm.u;r.uRippleDir.value.set(s,o,.25).normalize(),r.uRippleT.value=0,r.uRippleAmp.value=i}tick(t,s,o){const i=this.ctx;this.bg.copy(i.background),this.wall.u.uBg.value.copy(this.bg),this.fade.u.uColor.value.copy(this.bg),this.world.update(t),o?.offsetY!==void 0&&(this.group.position.y=o.offsetY),this.sync(t,s,o?.floor??null)}sync(t,s,o){const i=this.ctx,r=this.world.pusher,n=this.blobs.mesh.visible,a=(T-Z)/T,c=this.opts.shadowAlpha??(this.opts.lightTheme?.26:.6),e=(T-D)/T,v=this.wall.u.uSpots.value;let p=0;for(let f=0;f<this.actors.length;f++){const u=this.actors[f],m=u.body,g=u.mesh;g.position.set(m.x,m.y,0),g.scale.setScalar(u.meshScale);const y=u.bm.u;if(y.uTime.value=s,y.uWobble.value=i.reduced?0:u.wobble,u.deform){let w=0;if(r.on){const x=r.x-m.x,P=r.y-m.y,d=Math.hypot(x,P)||1e-4;if(w=B(1.7-d/m.r*.55,0,1)*(i.reduced?.4:1),w>.02){const C=1-Math.exp(-14*t);u.point.x+=(x/d-u.point.x)*C,u.point.y+=(P/d-u.point.y)*C,u.point.z+=(.55-u.point.z)*C,u.point.normalize(),y.uPoint.value.copy(u.point)}}y.uPull.value=Y(y.uPull.value,w,w>y.uPull.value?12:7,t),y.uRippleT.value=Math.min(99,y.uRippleT.value+t)}if(u.glow=Y(u.glow,u.glowT,9,t),u.bm.setGlow(u.glow),u.bm.kind==="glass"&&p<4&&!m.frozen&&!this.opts.lightTheme&&v[p++].set((m.x+this.group.position.x)*e,(m.y+this.group.position.y)*e,m.r*.85*e,.5),n){const w=f*3;if(m.frozen){this.blobs.hide(w),this.blobs.hide(w+1),this.blobs.hide(w+2);continue}const x=m.r,P=x*.75+.55;if(this.blobs.set(w,(m.x+P*.34)*a,(m.y-P*.46)*a,Z,x*1.45*a,x*1.45*a,this.shadowTint,c*u.shadow),o!==null){const d=Math.max(0,m.y-x-o),C=Math.exp(-d/(x*.9+.2))*c*1.25*u.shadow;this.blobs.set(w+1,m.x+x*.1,o+.02,-.15,x*(1.15+d*.08),x*.2,this.shadowTint,C)}else this.blobs.hide(w+1);u.glow>.01?this.blobs.set(w+2,m.x,m.y,-.5,x*2.1,x*2.1,this.haloColor,.55*u.glow):this.blobs.hide(w+2)}}for(;p<4;)v[p++].set(0,0,1,0);n&&this.blobs.flush()}dispose(){if(!this.disposed){this.disposed=!0;for(const t of this.actors)this.group.remove(t.mesh),t.deform===!1&&t.mesh.geometry.dispose(),t.bm.dispose();this.actors.length=0,this.byBody.clear(),this.world.bodies.length=0,this.world.onHit=null,this.onHit=null,this.geo.dispose(),this.blobs.dispose(),this.wall.dispose(),this.fade.dispose(),this.lib.dispose(),this.scene.clear(),this.scene.background=null,this.camera.position.set(0,0,T),this.camera.rotation.set(0,0,0),Q.push({scene:this.scene,camera:this.camera})}}}export{J as B,T as C,K as F,kt as M,E as a,qt as b,B as c,Y as d,V as e,_t as f,Bt as m,Dt as s};
