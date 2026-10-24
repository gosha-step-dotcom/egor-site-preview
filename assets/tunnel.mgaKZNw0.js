var Dt=Object.defineProperty;var Bt=(o,t,e)=>t in o?Dt(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var B=(o,t,e)=>Bt(o,typeof t!="symbol"?t+"":t,e);import{$ as dt,b as ft,L as Vt,e as ae,C as R,h as be,P as pt,M as U,G as Te,u as Et,t as tt,ab as le,am as We,J as zt,W as Lt,c as ot,R as _t,H as Ot,a2 as Gt,S as Ut,k as Wt,n as Ve,K as It,Q as qt,V as Ee,a4 as at,a$ as Nt}from"./index.CCGCYvlb.js";import{S as ze}from"./SecondOrderDynamics.CBcACxsj.js";import{Z as mt,m as $t,F as Le,d as _e,T as jt,P as Zt,D as Ht,e as st,f as Kt,g as Yt,h as te,i as Xt,c as Jt,a as Qt,b as G,l as oe,j as Oe,s as W}from"./space.DMGo2fbs.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const we=3.4,ye=2.02,xe=.62,Ge="'Onest', system-ui, sans-serif",nt="'IBM Plex Mono', ui-monospace, monospace";function eo(o,t,e,s,i,n){o.beginPath(),o.moveTo(t+n,e),o.arcTo(t+s,e,t+s,e+i,n),o.arcTo(t+s,e+i,t,e+i,n),o.arcTo(t,e+i,t,e,n),o.arcTo(t,e,t+s,e,n),o.closePath()}function rt(o,t){const e=o.getContext("2d");if(!e)return;const s=o.width,i=o.height,n=76,f=t.led==="coral"?"#FF5A36":"#8FD8FF";e.clearRect(0,0,s,i),e.fillStyle=t.ink?"#0B0C0E":"#15171B",e.fillRect(0,0,s,i);const h=e.createLinearGradient(0,0,s,i);h.addColorStop(0,"rgba(255,255,255,0.07)"),h.addColorStop(.5,"rgba(255,255,255,0.0)"),h.addColorStop(1,"rgba(255,255,255,0.025)"),e.fillStyle=h,e.fillRect(0,0,s,i),e.fillStyle="rgba(255,255,255,0.05)";for(let M=36;M<i;M+=36)for(let k=s*.56;k<s-20;k+=36)e.fillRect(k,M,3,3);e.save(),e.font=`500 330px ${nt}`,e.textAlign="right",e.textBaseline="alphabetic",e.lineWidth=3,e.strokeStyle=f,e.globalAlpha=.22,e.strokeText(t.num,s-40,i-52),e.restore(),e.textBaseline="alphabetic",e.textAlign="left",e.fillStyle=f,e.beginPath(),e.arc(n+12,n+28,12,0,Math.PI*2),e.fill(),e.font=`500 46px ${nt}`;try{e.letterSpacing="4px"}catch{}e.fillText(`ЭТАП ${t.num}`,n+44,n+44);try{e.letterSpacing="0px"}catch{}const g=s-n*2;let d=92;for(e.fillStyle="#ECEDE8",e.font=`600 ${d}px ${Ge}`;e.measureText(t.title).width>g&&d>56;)d-=4,e.font=`600 ${d}px ${Ge}`;let w=n+44+52+d*.92;if(e.measureText(t.title).width>g){const M=t.title.split(" "),k=Math.ceil(M.length/2);e.fillText(M.slice(0,k).join(" "),n,w),w+=d*1.02,e.fillText(M.slice(k).join(" "),n,w)}else e.fillText(t.title,n,w);e.fillStyle="#9AA0AA",e.font=`400 48px ${Ge}`;const v=t.text.split(" ");let y="",T=w+78,P=0;for(const M of v){const k=y?`${y} ${M}`:M;e.measureText(k).width>g*.9&&y?(e.fillText(y,n,T),T+=58,P++,y=M):y=k}y&&P<3&&e.fillText(y,n,T),e.strokeStyle=f,e.globalAlpha=.35,e.lineWidth=3,eo(e,2,2,s-4,i-4,8),e.stroke(),e.globalAlpha=1}const to=`
varying vec2 vUv; varying vec3 vViewPos;
void main(){
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`,oo=`
precision highp float;
varying vec2 vUv; varying vec3 vViewPos;
uniform sampler2D uTex; uniform vec2 uCard; uniform vec2 uPlane; uniform float uRad;
uniform vec3 uLed; uniform vec3 uSignal; uniform float uActive; uniform float uTime; uniform float uSeed; uniform float uOpacity;
${mt}
float sdRound(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
void main(){
  vec2 q = (vUv - 0.5) * uPlane;
  float d = sdRound(q, uCard * 0.5, uRad);
  float mask = 1.0 - smoothstep(-0.01, 0.012, d);
  vec2 cuv = q / uCard + 0.5;
  vec3 base = texture2D(uTex, clamp(cuv, 0.0, 1.0)).rgb;
  vec3 led = mix(uLed, uSignal, uActive);
  float flick = 0.92 + 0.08 * sin(uTime * 6.0 + uSeed * 20.0) * sin(uTime * 2.1 + uSeed * 9.0);
  float I = (0.9 + 0.8 * uActive) * flick;
  float b = exp(-pow((d + 0.035) / 0.035, 2.0));
  float inner = smoothstep(-0.32, 0.0, d) * (1.0 - smoothstep(-0.02, 0.0, d)) * 0.30;
  float edgeFade = (1.0 - smoothstep(0.45, 1.0, abs(q.x) / (uPlane.x * 0.5))) * (1.0 - smoothstep(0.45, 1.0, abs(q.y) / (uPlane.y * 0.5)));
  float halo = exp(-max(d, 0.0) / (0.20 + 0.12 * uActive)) * (1.0 - mask) * edgeFade;
  vec3 rgb = base * mask + led * (b * I + inner * I) * mask + led * halo * (0.12 + 0.30 * uActive);
  float a = clamp(mask + halo * 0.3, 0.0, 1.0);
  float f = fogAmt(length(vViewPos), 0.75);
  rgb = mix(rgb, uFogColor * a, f);
  gl_FragColor = vec4(rgb * uOpacity, a * uOpacity);
}
`;function ao(o,t,e,s,i){const n=document.createElement("canvas");n.width=1024,n.height=Math.round(1024*ye/we),rt(n,o);const f=s.add(new dt(n));f.colorSpace=ft,f.anisotropy=Math.min(8,i),f.generateMipmaps=!0,f.minFilter=Vt;const h={value:0},g={value:1},d=s.add(new ae({vertexShader:to,fragmentShader:oo,transparent:!0,premultipliedAlpha:!0,depthWrite:!1,uniforms:{uTex:{value:f},uCard:{value:new be(we,ye)},uPlane:{value:new be(we+xe*2,ye+xe*2)},uRad:{value:.16},uLed:{value:new R(o.led==="coral"?"#FF5A36":"#8FD8FF")},uSignal:{value:new R("#C8FF3A")},uActive:h,uOpacity:g,uSeed:{value:t*.37+.1},uTime:e.uTime,uFogColor:e.uFogColor,uFogDensity:e.uFogDensity,uPortalS:e.uPortalS}})),w=s.add(new pt(we+xe*2,ye+xe*2)),v=new U(w,d);return v.renderOrder=10,{mesh:v,uniforms:{uActive:h,uOpacity:g},redraw(){rt(n,o),f.needsUpdate=!0}}}async function so(){if(!(typeof document>"u"||!document.fonts))try{await Promise.all([document.fonts.load("600 80px Onest","Дизайн и разработка"),document.fonts.load("700 80px Onest","бриф макет запуск"),document.fonts.load("400 48px Onest","Смотрю ваш сайт"),document.fonts.load("500 46px 'IBM Plex Mono'","ЭТАП 01")])}catch{}}const no=`
varying vec2 vUv; varying vec3 vViewPos; varying float vS;
uniform float uS;
void main(){
  vUv = uv; vS = uS;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`,ro=`
precision highp float;
varying vec2 vUv; varying vec3 vViewPos; varying float vS;
uniform sampler2D uTex; uniform vec3 uChalk; uniform vec3 uInk; uniform float uOpacity;
${mt}
void main(){
  vec4 t = texture2D(uTex, vUv);
  float m = zoneMix(vS);
  vec3 col = mix(uChalk, uInk, m);
  float d = length(vViewPos);
  float near = smoothstep(2.5, 15.0, d);
  float f = fogAmt(d, 0.8);
  float a = t.a * near * uOpacity * (1.0 - f);
  gl_FragColor = vec4(col * a, a);
}
`;function it(o,t){const e=o.getContext("2d");if(!e)return;e.clearRect(0,0,o.width,o.height);let s=420;for(e.font=`700 ${s}px 'Onest', system-ui, sans-serif`;e.measureText(t).width>o.width*.9&&s>80;)s-=10,e.font=`700 ${s}px 'Onest', system-ui, sans-serif`;e.textAlign="center",e.textBaseline="middle",e.lineJoin="round",e.fillStyle="rgba(255,255,255,0.10)",e.fillText(t,o.width/2,o.height*.54),e.lineWidth=5,e.strokeStyle="rgba(255,255,255,1)",e.strokeText(t,o.width/2,o.height*.54)}function Ue(o,t,e,s){const i=document.createElement("canvas");i.width=1536,i.height=576,it(i,o);const n=e.add(new dt(i));n.colorSpace=ft,n.anisotropy=4;const f=e.add(new ae({vertexShader:no,fragmentShader:ro,transparent:!0,premultipliedAlpha:!0,depthWrite:!1,uniforms:{uTex:{value:n},uS:{value:t},uChalk:{value:new R("#ECEDE8")},uInk:{value:new R("#0B0C0E")},uOpacity:{value:.9},uFogColor:s.uFogColor,uFogDensity:s.uFogDensity,uPortalS:s.uPortalS}})),h=e.add(new pt(12.5,12.5*(576/1536))),g=new U(h,f);return g.renderOrder=5,{mesh:g,s:t,redraw(){it(i,o),n.needsUpdate=!0}}}const io=`
varying vec3 vN; varying vec3 vViewPos;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vViewPos = mv.xyz;
  vN = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}
`,lo=`
precision highp float;
varying vec3 vN; varying vec3 vViewPos;
uniform sampler2D tRefr; uniform sampler2D uMatcap; uniform vec2 uRes; uniform vec3 uTint; uniform float uReady;
void main(){
  vec3 n = normalize(vN);
  vec3 v = normalize(-vViewPos);
  float ndv = clamp(dot(n, v), 0.0, 1.0);
  float fres = pow(1.0 - ndv, 3.0);
  vec2 suv = gl_FragCoord.xy / uRes;
  // преломление: сдвиг по нормали, у краёв сильнее; хроматика по каналам
  vec2 off = n.xy * (0.030 + 0.085 * (1.0 - ndv));
  vec3 refr;
  refr.r = texture2D(tRefr, suv + off * 1.00).r;
  refr.g = texture2D(tRefr, suv + off * 1.07).g;
  refr.b = texture2D(tRefr, suv + off * 1.14).b;
  refr = mix(vec3(0.85, 0.88, 0.9), refr, uReady);
  // лёгкое холодное поглощение, к краям плотнее
  refr *= mix(vec3(1.0), uTint, 0.35 + 0.65 * (1.0 - ndv));
  vec3 env = texture2D(uMatcap, n.xy * 0.5 + 0.5).rgb;
  vec3 col = mix(refr, env, clamp(0.10 + fres * 0.85, 0.0, 1.0));
  // чёткий блик
  vec3 L = normalize(vec3(-0.45, 0.65, 0.6));
  float sp = pow(max(dot(reflect(-L, n), v), 0.0), 90.0);
  col += vec3(1.0) * sp * 1.4;
  gl_FragColor = vec4(col, 1.0);
}
`;function co(o,t){const e=new Te,s=new Te;e.add(s);const i=o.add(new Et(.92,1.9,10,40)),n={tRefr:{value:null},uMatcap:{value:null},uRes:{value:new be(1,1)},uTint:{value:new R("#BFE6FF")},uReady:{value:0}};let f=null,h=null;const g=()=>{const F=o.add(new zt({color:14673130,roughness:.55,metalness:0,transparent:!0,opacity:.78,depthWrite:!1})),p=new U(i,F);return p.renderOrder=6,p};if(t){n.uMatcap.value=o.add($t());const F=o.add(new ae({vertexShader:io,fragmentShader:lo,uniforms:n}));f=new U(i,F),f.renderOrder=6,s.add(f)}else h=g(),s.add(h);const d=o.add(new tt(.42,40,24)),w=o.add(new le({color:new R("#C8FF3A").multiplyScalar(1.3),toneMapped:!1})),v=new U(d,w);s.add(v);const y=o.add(new We(.62,.012,8,96)),T=o.add(new le({color:new R("#8FD8FF").multiplyScalar(2),toneMapped:!1})),P=new U(y,T),M=new U(y,T);P.rotation.x=Math.PI/2.4,M.rotation.set(Math.PI/3,.9,0),s.add(P,M);const k=o.add(new tt(.045,12,8)),ue=o.add(new le({color:new R("#FF5A36").multiplyScalar(2.2),toneMapped:!1})),se=[];for(let F=0;F<4;F++){const p=new U(k,ue);se.push(p),s.add(p)}return s.rotation.z=.28,{group:e,get glass(){return f},setRefraction(F,p,x){n.tRefr.value=F,n.uRes.value.set(p,x),n.uReady.value=1},setMatte(){f&&(s.remove(f),f=null,h=g(),s.add(h))},update(F){s.rotation.y=F*.35,s.position.y=Math.sin(F*.8)*.12,P.rotation.z=F*.9,M.rotation.z=-F*.6,v.scale.setScalar(1+Math.sin(F*2.2)*.04);for(let p=0;p<se.length;p++){const x=F*(.9+p*.13)+p*Math.PI/2,S=.62+p%2*.12;se[p].position.set(Math.cos(x)*S,Math.sin(x*1.3)*.25,Math.sin(x)*S)}}}}const uo=`
precision highp float;
uniform sampler2D tScene; uniform sampler2D tPrev; uniform float uDecay; uniform float uZoom; uniform vec3 uBg;
varying vec2 vUv;
void main(){
  vec2 uv = (vUv - 0.5) / uZoom + 0.5;
  float ins = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
  vec3 prev = mix(uBg, texture2D(tPrev, uv).rgb, ins);
  vec3 trail = uBg + (prev - uBg) * uDecay;
  vec3 s = texture2D(tScene, vUv).rgb;
  // побеждает то, что сильнее отклоняется от фона (работает и на тёмном, и на светлом фоне)
  vec3 ds = s - uBg; vec3 dt = trail - uBg;
  float ms = dot(abs(ds), vec3(0.3333)); float mt = dot(abs(dt), vec3(0.3333));
  gl_FragColor = vec4(ms >= mt ? s : trail, 1.0);
}
`,fo=`
precision highp float;
uniform sampler2D tTex; varying vec2 vUv;
void main(){ gl_FragColor = vec4(texture2D(tTex, vUv).rgb, 1.0); }
`,po=`
precision highp float;
uniform sampler2D tA; uniform sampler2D tB; uniform float uMix; varying vec2 vUv;
void main(){ gl_FragColor = vec4(mix(texture2D(tA, vUv).rgb, texture2D(tB, vUv).rgb, uMix), 1.0); }
`;class mo{constructor(t){B(this,"sceneRT",null);B(this,"altRT",null);B(this,"refrRT",null);B(this,"hist",null);B(this,"w",0);B(this,"h",0);B(this,"fresh",!0);B(this,"fbPass");B(this,"copyPass");B(this,"mixPass");B(this,"size",new be);this.samples=t,this.fbPass=new Le(new ae({vertexShader:_e,fragmentShader:uo,depthTest:!1,depthWrite:!1,uniforms:{tScene:{value:null},tPrev:{value:null},uDecay:{value:.85},uZoom:{value:1.01},uBg:{value:new R}}})),this.copyPass=new Le(new ae({vertexShader:_e,fragmentShader:fo,depthTest:!1,depthWrite:!1,uniforms:{tTex:{value:null}}})),this.mixPass=new Le(new ae({vertexShader:_e,fragmentShader:po,depthTest:!1,depthWrite:!1,uniforms:{tA:{value:null},tB:{value:null},uMix:{value:0}}}))}rt(t,e,s,i){const n=new Lt(t,e,{type:Ot,format:_t,depthBuffer:s,samples:i,minFilter:ot,magFilter:ot});return n.texture.colorSpace=Gt,n}targetSize(t,e){return e?[e.width,e.height]:(t.getDrawingBufferSize(this.size),[this.size.x,this.size.y])}ensure(t,e,s,i){(t!==this.w||e!==this.h)&&(this.freeRTs(),this.w=t,this.h=e,this.fresh=!0),this.sceneRT||(this.sceneRT=this.rt(t,e,!0,this.samples)),s&&!this.hist&&(this.hist=[this.rt(t,e,!1,0),this.rt(t,e,!1,0)],this.fresh=!0),i&&!this.altRT&&(this.altRT=this.rt(t,e,!0,this.samples))}reset(){this.fresh=!0}renderFeedback(t,e,s,i,n,f){const h=t.getRenderTarget(),[g,d]=this.targetSize(t,h);this.ensure(g,d,!0,!1);const w=this.sceneRT,v=this.hist;t.setRenderTarget(w),t.render(e,s);const y=this.fbPass.material.uniforms;y.tScene.value=w.texture,y.tPrev.value=v[0].texture,y.uDecay.value=this.fresh?0:n,y.uZoom.value=f,y.uBg.value.copy(i),this.fbPass.render(t,v[1]),this.copyPass.material.uniforms.tTex.value=v[1].texture,this.copyPass.render(t,h),v.reverse(),this.fresh=!1,t.setRenderTarget(h)}renderMix(t,e,s,i){const n=t.getRenderTarget(),[f,h]=this.targetSize(t,n);this.ensure(f,h,!1,!0);const g=this.sceneRT,d=this.altRT;t.setRenderTarget(g),e(),t.setRenderTarget(d),s();const w=this.mixPass.material.uniforms;w.tA.value=g.texture,w.tB.value=d.texture,w.uMix.value=i,this.mixPass.render(t,n),t.setRenderTarget(n)}renderRefraction(t,e,s,i){const n=t.getRenderTarget(),[f,h]=this.targetSize(t,n),g=Math.max(2,Math.round(f/2)),d=Math.max(2,Math.round(h/2));(!this.refrRT||this.refrRT.width!==g||this.refrRT.height!==d)&&(this.refrRT?.dispose(),this.refrRT=this.rt(g,d,!0,0));const w=i.visible;return i.visible=!1,t.setRenderTarget(this.refrRT),t.render(e,s),i.visible=w,t.setRenderTarget(n),this.refrRT}currentSize(t){return this.targetSize(t,t.getRenderTarget())}freeRTs(){this.sceneRT?.dispose(),this.altRT?.dispose(),this.hist?.[0].dispose(),this.hist?.[1].dispose(),this.sceneRT=this.altRT=null,this.hist=null}dispose(){this.freeRTs(),this.refrRT?.dispose(),this.refrRT=null,this.fbPass.dispose(),this.copyPass.dispose(),this.mixPass.dispose()}}const ce=[{index:0,num:"01",kicker:"Этап 01",title:"Бесплатный разбор",text:"Смотрю ваш сайт с телефона и присылаю PDF",from:0,to:.2,zone:1,sticker:!0},{index:1,num:"02",kicker:"Этап 02",title:"Цена и срок",text:"Называю до старта, потом они не меняются",from:.2,to:.4,zone:1,sticker:!0},{index:2,num:"03",kicker:"Этап 03",title:"Дизайн и разработка",text:"Показываю промежуточную версию по ссылке",from:.4,to:.6,zone:2,sticker:!0},{index:3,num:"04",kicker:"Этап 04",title:"Запуск",text:"Проверяю на телефонах, передаю все доступы",from:.6,to:.8,zone:2,sticker:!0},{index:4,num:"05",kicker:"Этап 05 · Результат",title:"Сайт, с которого звонят",text:"Смотреть услуги и цены",from:.8,to:1.0001,zone:3,sticker:!1}],Fo={black:[0,.4],white:[.4,.8],space:[.8,1]},ho="tunnel-stage";function lt(o){for(const t of ce)if(o>=t.from&&o<t.to)return t.index;return o>=1?ce.length-1:0}const vo="#030406",ct=[{lx:-2.3,ly:1.15,roll:.14,yaw:.2,ink:!1,led:"coral"},{lx:2.35,ly:-1,roll:-.1,yaw:-.2,ink:!1,led:"coral"},{lx:-2.4,ly:-1.2,roll:-.09,yaw:.2,ink:!0,led:"ice"},{lx:2.35,ly:1.35,roll:.1,yaw:-.2,ink:!0,led:"coral"}],ut=[.1,.3,.5,.7],go=8.5;function Ro(o){const t=new Ht,e=o.renderer,s=o.mobile||o.quality==="low",i=o.quality==="high"&&!o.mobile,n=o.quality==="high"&&!o.mobile&&!o.reduced;let f=o.quality==="high",h=i;const g=o.mobile?.6:1,d=600*g,w=o.mobile?120:170,v=new jt(g,o.mobile?.85:1),y=new Zt({exitS:d,spaceRun:w,portalS:0,length:v.length},ut),T=y.sAt(.4),P=a=>y.sAt(G(a)),M=t.add(st("dark")),k=t.add(st("light")),ue=new R(o.palette.ink),se=new R(o.palette.paper),F=new R(vo),p={uTime:{value:0},uFogColor:{value:ue.clone()},uFogDensity:{value:.026},uPortalS:{value:T},uCoral:{value:new R(o.palette.coral)},uIce:{value:new R(o.palette.ice)},uMatD:{value:M},uMatL:{value:k}},x=new Ut;x.background=p.uFogColor.value;const S=new Wt(60,o.aspect,.15,2600),q=new Te;x.add(q);const Me=Kt({path:v,uniforms:p,exitS:d,portalS:T,slots:s?9:22,ds:1.6,ribEvery:18,railCount:s?4:6,seed:7});q.add(Me.group);const Ie=Yt(t,v,s?1100:3400,d,o.dpr,{uTime:p.uTime,uFogColor:p.uFogColor,uFogDensity:p.uFogDensity,uPortalS:p.uPortalS});q.add(Ie);{const a=v.frameAt(T,te()),r=t.add(new We(5,.16,10,96)),c=t.add(new le({color:new R("#ffffff").multiplyScalar(3.4),toneMapped:!1})),l=new U(r,c),u=t.add(new We(5.7,.05,8,96)),C=t.add(new le({color:new R(o.palette.ice).multiplyScalar(2.4),toneMapped:!1})),m=new U(u,C),b=new Te;b.add(l,m),b.position.copy(a.pos),b.quaternion.setFromRotationMatrix(new Ve().makeBasis(a.right,a.up,a.tan.clone().negate())),q.add(b)}const Fe=P(.595)+10,E=co(t,i);{const a=v.frameAt(Fe,te());E.group.position.copy(a.pos).addScaledVector(a.right,2).addScaledVector(a.up,-.15),E.group.scale.setScalar(1.45),q.add(E.group)}if(!i){x.add(new It(14674162,2106410,1.4));const a=new qt(16777215,1.8);a.position.set(-3,5,4),x.add(a)}const de={uTime:p.uTime,uFogColor:p.uFogColor,uFogDensity:p.uFogDensity,uPortalS:p.uPortalS},ht=e.capabilities.getMaxAnisotropy(),z=[];for(let a=0;a<4;a++){const r=ce[a],c=ct[a],l=ao({num:r.num,title:r.title,text:r.text,ink:c.ink,led:c.led},a,de,t,ht);z.push(l),q.add(l.mesh)}const qe=ut.map(a=>P(a)+go),Z={sx:1,sy:1,scale:1},fe=[Ue("бриф",P(.2)+18,t,de),Ue("макет",P(.45)+16,t,de),Ue("запуск",P(.75)+16,t,de)],H=te(),vt=new Ve;for(const a of fe)v.frameAt(a.s,H),a.mesh.position.copy(H.pos).addScaledVector(H.up,.35),a.mesh.quaternion.setFromRotationMatrix(vt.makeBasis(H.right,H.up,H.tan.clone().negate())),q.add(a.mesh);const Re=Xt(t,p.uFogColor);x.add(Re.mesh);const K=Jt(t,s?1600:3e3,1e3,o.dpr);x.add(K.points);const I=Qt({radius:140,detail:s?"low":"high"});t.add(I),x.add(I.group);const L=v.frameAt(d+w,te()),gt=o.mobile?215:225,St=o.mobile?165:158;I.group.position.copy(L.pos).addScaledVector(L.tan,gt).addScaledVector(L.up,-St).addScaledVector(L.right,6);const Ne=new Ee().addScaledVector(L.tan,.78).addScaledVector(L.right,-.3).addScaledVector(L.up,.58).normalize(),wt=L.pos.clone().addScaledVector(L.tan,120).addScaledVector(L.up,o.mobile?18:14),Y=new mo(i?4:0);t.add(Y);const pe=new ze(1.2,.9,0,0),yt=new ze(2,.8,0,0),xt=new ze(2,.8,0,0);let _=0,X=0,N=0,V=0,me=0,$=-1,j=!1,ne=!1,J=0,O=0,Q=0,ee=0;const Pe=[0,0,0,0],re=te(),A=te(),ke=new Ee,bt=new Ee,$e=new at,je=new at,Ze=new Nt,He=new Ve,D={scene:x,camera:S,bloom:{strength:1.1,threshold:.6},lut:"cold",motionBlur:0,trail:.6,update:Tt,resize:Ft,dispose:Rt,render:Mt},Ae=[{s:P(.07),p:.1,cards:[{i:0,d:8.5,mirror:!1},{i:1,d:15,mirror:!1}]},{s:Fe-13,p:.55,cards:[{i:2,d:9,mirror:!1},{i:3,d:19,mirror:!0}]},{s:d+w,p:1,cards:[]}];function Ke(){const a=o.aspect<1;Z.scale=a?1.2:o.aspect<1.4?1.05:1,Z.sx=a?.22:G(o.aspect/1.7,.6,1),Z.sy=a?1.25:1}function Ye(a,r,c,l=!1){const u=ct[a],C=l?-1:1,m=z[a];v.frameAt(r,A);const b=Math.sin(c*.9+a*1.7)*.07;m.mesh.position.copy(A.pos).addScaledVector(A.right,u.lx*Z.sx*C).addScaledVector(A.up,u.ly*Z.sy+b),He.makeBasis(A.right,A.up,bt.copy(A.tan).negate()),$e.setFromRotationMatrix(He),Ze.set(0,u.yaw*C*(o.aspect<1?.5:1),u.roll*C+Math.sin(c*.6+a)*.015),je.setFromEuler(Ze),m.mesh.quaternion.copy($e).multiply(je),m.mesh.scale.setScalar(Z.scale)}function Xe(a,r){const c=W(T-6,T+5,a),l=W(d-4,d+26,a);p.uFogColor.value.copy(ue).lerp(se,c).lerp(F,l),p.uFogDensity.value=oe(oe(.026,.0165,c),.004,l);const u=W(d-140,d-85,a);Re.uniforms.uSpace.value=u,K.uniforms.uSpace.value=u,Re.mesh.visible=u>.001,K.points.visible=u>.001,I.group.visible=u>.001,E.group.visible=Math.abs(a-Fe)<55,Me.cull(a)}function Ce(a,r){const c=W(T-6,T+5,a)*(1-W(d-14,d+8,a)),l=Math.exp(-(((a-T)/7)**2))*1+Math.exp(-(((a-d)/9)**2))*.6;D.bloom.strength=oe(1.1,.55,c)+l+r*.15,D.bloom.threshold=oe(.6,.5,c)}function Je(a,r,c,l,u){v.frameAt(a,re),S.position.copy(re.pos),v.frameAt(a+11,A),ke.copy(A.pos);const C=W(.8,1,r);if(C>0&&ke.lerp(wt,C),S.up.set(0,1,0),S.lookAt(ke),u){v.frameAt(a+3,A);const kt=A.tan.clone();v.frameAt(a+22,A);const At=A.tan.clone().sub(kt).dot(re.right),Ct=G(-At*7.5,-.28,.28)*G(V*1.4,0,1)+-V*0;me=Oe(me,Ct,4,l),S.position.addScaledVector(re.right,Math.sin(c*13)*.012*V),S.position.addScaledVector(re.up,Math.sin(c*17+1.3)*.012*V)}else me=0;S.rotateZ(me);let m=0,b=0;u&&(o.gyro.active&&o.mobile?(m=o.gyro.x,b=o.gyro.y):o.pointer.inside&&(m=o.pointer.ndcX,b=o.pointer.ndcY));const ie=2*Math.PI/180,Se=yt.update(l,G(m,-1,1)*ie),Pt=xt.update(l,G(b,-1,1)*ie);S.rotateY(-Se),S.rotateX(Pt)}function he(a,r){const c=Ae[a];for(let l=0;l<4;l++)z[l].mesh.visible=!1;for(const l of c.cards)z[l.i].mesh.visible=!0,Ye(l.i,c.s+l.d,r,l.mirror),z[l.i].uniforms.uActive.value=l.d<10?1:0;for(const l of fe)l.mesh.visible=!1;Xe(c.s,c.p),Je(c.s,c.p,0,1/60,!1)}function Qe(a,r){o.bus.dispatchEvent(new CustomEvent(ho,{detail:{index:a,progress:r}}))}function Tt(a,r,c){et=r,f=a.quality==="high",!f&&h&&(h=!1,E.setMatte()),Ie.material.uniforms.uPx.value=a.dpr;const l=a.anchor("tunnel"),u=l?a.sectionProgress(l):.5;if(X=l?G(a.pinnedProgress(l)):X,!(!l||u>1e-4&&u<.9999)){(j||!ne)&&(j=!1,pe.reset(X),_=X,V=0,J=0,D.motionBlur=0,a.reduced?ve():De(_,c,r),ne=!0),j=!1;return}!j&&!ne&&pe.reset(X),j=!0,ne=!0;const m=a.reduced?0:c;p.uTime.value=m,K.uniforms.uTime.value=m,K.uniforms.uPx.value=a.dpr,_=G(pe.update(r,X),0,1),a.reduced?ve():De(_,c,r);const b=lt(_);if($<0)$=b,Qe(b,_);else if(b!==$){const ie=b>$,Se=ie?ce[$+1].from:ce[$].from;(ie?_>=Se+.006:_<=Se-.006)&&($=b,Qe(b,_))}}function De(a,r,c,l){const u=y.sAt(a),C=c>0?Math.abs(u-N)/c:0;V=Oe(V,G(C/300,0,1),8,Math.max(c,1/120)),o&&N<T!=u<T&&N!==u&&j&&o.sound.play("whoosh",{volume:.5,rate:u>N?1:.8}),N<d!=u<d&&N!==u&&j&&o.sound.play("whoosh",{volume:.35,rate:.7}),N=u,Xe(u),Ce(u,V),S.fov=Be()+V*7,S.updateProjectionMatrix();for(let m=0;m<4;m++){z[m].mesh.visible=Math.abs(qe[m]-u)<90,z[m].mesh.visible&&Ye(m,qe[m],r);const b=lt(a)===m?1:0;Pe[m]=Oe(Pe[m],b,6,Math.max(c,1/120)),z[m].uniforms.uActive.value=Pe[m]}for(const m of fe)m.mesh.visible=Math.abs(m.s-u)<75;E.update(r),I.group.visible&&I.update(c,r,Ne),Je(u,a,r,c,!o.reduced),D.motionBlur=o.reduced||o.mobile?0:G(V*1.05),J=n?W(.32,.85,V):0,O=0}function ve(a){const r=_,c=W(.33,.47,r),l=W(.72,.88,r);l>0?(Q=1,ee=2,O=l):(Q=0,ee=1,O=c);const u=O<.5?Q:ee;he(u,0),Ce(Ae[Q].s,0);const C=D.bloom.strength,m=D.bloom.threshold;Ce(Ae[ee].s,0),D.bloom.strength=oe(C,D.bloom.strength,O),D.bloom.threshold=oe(m,D.bloom.threshold,O),D.motionBlur=0,J=0,S.fov=Be(),S.updateProjectionMatrix(),I.group.visible&&I.update(0,0,Ne),E.update(0)}function Be(){return o.aspect<1?60+(1-o.aspect)*30:60}function ge(a){const r=E.glass;if(!h||!r||!E.group.visible)return;const c=Y.renderRefraction(a,x,S,r),[l,u]=Y.currentSize(a);E.setRefraction(c.texture,l,u)}function Mt(a){const r=a.renderer;return a.reduced?O>.002&&O<.998?(Y.renderMix(r,()=>{he(Q,0),ge(r),r.render(x,S)},()=>{he(ee,0),ge(r),r.render(x,S)},O),he(O<.5?Q:ee,0),!0):(ge(r),!1):(ge(r),!n||!f||J<.02?(Y.reset(),!1):(Y.renderFeedback(r,x,S,p.uFogColor.value,Math.pow(.85*J,Math.max(.5,et*60)),1+.014*J),!0))}let et=1/60;function Ft(a){S.aspect=a.aspect,S.fov=Be(),S.updateProjectionMatrix(),K.uniforms.uPx.value=a.dpr,Ke(),a.reduced&&ne&&ve()}function Rt(){Me.dispose(),t.disposeAll(),x.background=null,x.clear(),z.length=0}return Ke(),so().then(()=>{for(const a of z)a.redraw();for(const a of fe)a.redraw()}),pe.reset(0),o.reduced?ve():De(0,0,1/60),D}export{ce as TUNNEL_STAGES,ho as TUNNEL_STAGE_EVENT,Fo as TUNNEL_ZONES,Ro as default,lt as tunnelStageAt};
