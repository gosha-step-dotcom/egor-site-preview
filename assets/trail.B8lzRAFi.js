import{e as I,h as P,c as w,H as z,$ as N,b as V,q as H}from"./index.Bm3SokeJ.js";import{l as f,G as W,V as E,F as R,m as _,c as B}from"./gl.CGG5j0N3.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const $=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uPrev;
uniform float uDt, uTime, uAspect, uRadius, uSplat, uPhase, uDecay;
uniform vec2 uP0, uP1, uVel, uTexel;
${W}
void main(){
  vec4 s0 = texture2D(uPrev, vUv);
  vec2 v0 = s0.xy;
  vec2 bp = vUv - v0 * uDt * vec2(1. / uAspect, 1.) * 3.2;
  vec4 s = texture2D(uPrev, bp);
  vec4 sn = (texture2D(uPrev, bp + vec2(uTexel.x, 0.)) + texture2D(uPrev, bp - vec2(uTexel.x, 0.)) +
             texture2D(uPrev, bp + vec2(0., uTexel.y)) + texture2D(uPrev, bp - vec2(0., uTexel.y))) * .25;
  s = mix(s, sn, .35);
  vec2 v = s.xy; float d = s.z; float ph = s.w;
  float mask = smoothstep(0., .08, d);
  vec3 cp = vec3(vUv * vec2(uAspect, 1.) * 4., uTime * .08);
  vec3 cu = curl(cp);
  v += cu.xy * .25 * uDt * mask * 4.;
  float k = uDt * 60.;
  v *= pow(uDecay, k * 1.1);
  d *= pow(uDecay, k * .5);
  d = max(d - .0004 * k, 0.);
  vec2 pa = (vUv - uP0) * vec2(uAspect, 1.);
  vec2 ba = (uP1 - uP0) * vec2(uAspect, 1.);
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-7), 0., 1.);
  vec2 dd = pa - ba * h;
  float m = exp(-dot(dd, dd) / (uRadius * uRadius)) * uSplat;
  v += uVel * .55 * m;
  d = clamp(d + m * .55, 0., 1.4);
  ph = mix(ph, uPhase, clamp(m * 2., 0., 1.));
  gl_FragColor = vec4(clamp(v, vec2(-1.), vec2(1.)), d, ph);
}
`,G=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uState, uImage;
uniform vec2 uTexel;
uniform float uAspect, uStrength;
uniform vec3 uColor, uColor2;
void main(){
  vec4 s = texture2D(uState, vUv);
  vec2 e = uTexel * 1.5;
  float dx = texture2D(uState, vUv + vec2(e.x, 0.)).z - texture2D(uState, vUv - vec2(e.x, 0.)).z;
  float dy = texture2D(uState, vUv + vec2(0., e.y)).z - texture2D(uState, vUv - vec2(0., e.y)).z;
  vec2 grad = vec2(dx, dy);
  float d = s.z;
  vec2 duv = (s.xy * .15 + grad * .36) * uStrength * vec2(1. / uAspect, 1.);
  vec3 img;
  img.r = texture2D(uImage, vUv - duv * 1.00).r;
  img.g = texture2D(uImage, vUv - duv * 1.12).g;
  img.b = texture2D(uImage, vUv - duv * 1.26).b;
  vec3 col = img;
  float sp = length(s.xy);
  vec3 ink = mix(uColor, uColor2, smoothstep(.1, .6, s.w));
  float body = smoothstep(.02, .55, d);
  col = mix(col, col * .55 + ink * .35, body * .45);
  col += ink * (body * .22 + smoothstep(.0, .9, d) * .1);
  float edge = length(grad) * 9.;
  col += ink * clamp(edge, 0., 1.) * 1.1 * uStrength;
  col += vec3(1.) * pow(clamp(edge, 0., 1.), 2.2) * .35;
  gl_FragColor = vec4(col, 1.);
}
`;function q(a,u,p){const d=document.createElement("canvas");d.width=a,d.height=u;const e=d.getContext("2d"),s=Math.min(a,u);e.fillStyle="#0B0C0E",e.fillRect(0,0,a,u);const h=(o,g,x,v,M)=>{const y=e.createRadialGradient(o,g,0,o,g,x);y.addColorStop(0,v+Math.round(M*255).toString(16).padStart(2,"0")),y.addColorStop(1,v+"00"),e.fillStyle=y,e.fillRect(0,0,a,u)};h(a*.22,u*.3,s*.9,p.ice,.28),h(a*.82,u*.72,s*.95,p.signal,.22),h(a*.6,u*.12,s*.6,p.coral,.16),e.strokeStyle="rgba(236,237,232,0.07)",e.lineWidth=1;const c=s/12;for(let o=0;o<=a;o+=c)e.beginPath(),e.moveTo(o,0),e.lineTo(o,u),e.stroke();for(let o=0;o<=u;o+=c)e.beginPath(),e.moveTo(0,o),e.lineTo(a,o),e.stroke();e.lineWidth=Math.max(1.5,s/380);for(let o=0;o<6;o++)e.strokeStyle=`rgba(236,237,232,${.5-o*.07})`,e.beginPath(),e.arc(a*.5,u*.5,s*(.16+o*.075),0,6.2832),e.stroke();e.fillStyle=p.signal,e.beginPath(),e.arc(a*.5+s*.52,u*.5-s*.2,s*.045,0,6.2832),e.fill(),e.fillStyle=p.coral,e.beginPath(),e.arc(a*.5-s*.58,u*.5+s*.22,s*.03,0,6.2832),e.fill(),e.strokeStyle=p.ice,e.beginPath(),e.arc(a*.18,u*.8,s*.1,0,6.2832),e.stroke();const m=Math.min(a*.36,s*.62);return e.font=`700 ${m}px Onest, "Helvetica Neue", Arial, sans-serif`,e.textAlign="center",e.textBaseline="middle",e.fillStyle="#ECEDE8",e.fillText("LAB",a/2,u*.52),e.lineWidth=Math.max(2,s/260),e.strokeStyle="#0B0C0E",e.strokeText("LAB",a/2,u*.52),e.fillStyle="#ECEDE8",e.fillText("LAB",a/2,u*.52),e.fillStyle="rgba(236,237,232,0.55)",e.font=`500 ${Math.max(11,s/60)}px "IBM Plex Mono", ui-monospace, monospace`,e.textAlign="left",e.fillText("ЛАБОРАТОРИЯ · 04 · СЛЕД",a*.05,u*.07),e.textAlign="right",e.fillText("ВЕДИТЕ МЫШЬЮ",a*.95,u*.95),d}const Q=(a,u,p)=>{const d=a.renderer,e={signal:[f(a.palette.signal),f("#F2FF9A")],coral:[f(a.palette.coral),f("#FFC2A8")],ice:[f(a.palette.ice),f("#E3F6FF")],chalk:[f(a.palette.chalk),f("#FFFFFF")]},s={color:String(p.color??"signal"),strength:Number(p.strength??1),brush:Number(p.brush??1)},h=a.palette;let c=null,m=null,o=!1,g=!0;const x=new I({vertexShader:E,fragmentShader:$,uniforms:{uPrev:{value:null},uDt:{value:.016},uTime:{value:0},uAspect:{value:a.aspect},uRadius:{value:.05},uSplat:{value:0},uPhase:{value:0},uDecay:{value:.982},uDecay2:{value:0},uP0:{value:new P},uP1:{value:new P},uVel:{value:new P},uTexel:{value:new P(1,1)}},depthTest:!1,depthWrite:!1}),v=new I({vertexShader:E,fragmentShader:G,uniforms:{uState:{value:null},uImage:{value:null},uTexel:{value:new P(1,1)},uAspect:{value:a.aspect},uStrength:{value:1},uColor:{value:e.signal[0].clone()},uColor2:{value:e.signal[1].clone()}},depthTest:!1,depthWrite:!1}),M=new R(x),y=new R(v);function A(){const l=e[s.color]??e.signal;v.uniforms.uColor.value.copy(l[0]),v.uniforms.uColor2.value.copy(l[1])}function D(l){m?.dispose(),c?.dispose();const i=l.mobile?5:4,n=Math.max(48,Math.round(l.width/i)),r=Math.max(48,Math.round(l.height/i));m=_(n,r,{type:z,filter:w}),B(d,m.read),B(d,m.write),x.uniforms.uTexel.value.set(1/n,1/r),v.uniforms.uTexel.value.set(1/n,1/r);const S=Math.min(2048,Math.round(l.width*Math.min(l.dpr,1.5))),b=Math.min(2048,Math.round(l.height*Math.min(l.dpr,1.5)));c=new N(q(S,b,{ink:h.ink,signal:h.signal,coral:h.coral,ice:h.ice})),c.colorSpace=V,c.minFilter=w,c.generateMipmaps=!1,c.needsUpdate=!0,v.uniforms.uImage.value=c,x.uniforms.uAspect.value=l.aspect,v.uniforms.uAspect.value=l.aspect,g=!1}const t={px:.5,py:.5,has:!1,vx:0,vy:0,lastIn:0,splat:0,cx:.5,cy:.5,phase:0,speed:0};let F=.016,C=0;const L={name:"trail",bloom:{strength:.5,threshold:.75},activate(l){o=!0,g&&D(l),u.label("trail","жидкий след")},deactivate(){o=!1,t.has=!1},update(l,i,n){if(!o)return;F=Math.min(i,1/30),C=n;const r=l.pointer;let S=r.x,b=1-r.y,T=0;if(r.inside?(T=1,t.lastIn=n):(l.reduced||n-t.lastIn>2)&&(S=.5+.32*Math.sin(n*1.1),b=.5+.26*Math.sin(n*1.7+1),T=2),T===0){t.has=!1,t.splat=0;return}if(t.has){const U=1/Math.max(F,.008333333333333333);t.vx=t.vx*.4+(S-t.cx)*l.aspect*U*.6/4,t.vy=t.vy*.4+(b-t.cy)*U*.6/4;const k=Math.hypot(t.vx,t.vy);k>1&&(t.vx/=k,t.vy/=k),t.speed=Math.min(1,Math.hypot(t.vx,t.vy)),t.splat=Math.min(1,t.speed*4)}else t.vx=t.vy=0,t.splat=0;t.px=t.cx,t.py=t.cy,t.cx=S,t.cy=b,t.has=!0,t.phase=H.clamp(t.speed*2.4+.1*Math.sin(n),0,1),T===1&&t.speed>.18&&u.tick(l,Math.min(.26,t.speed*.3),.75+t.speed*.9)},render(l){(g||!m)&&D(l);const i=m,n=d.getRenderTarget(),r=x.uniforms;r.uPrev.value=i.read.texture,r.uDt.value=F,r.uTime.value=C,r.uRadius.value=.052*s.brush*(l.pointer.down?1.6:1),r.uSplat.value=t.splat,r.uPhase.value=t.phase,r.uP0.value.set(t.px,t.py),r.uP1.value.set(t.cx,t.cy),r.uVel.value.set(t.vx,t.vy),M.render(d,i.write),i.swap(),v.uniforms.uState.value=i.read.texture,v.uniforms.uStrength.value=s.strength,y.render(d,n)},resize(l){D(l)},setParam(l,i){l==="color"?(s.color=String(i),A()):l==="strength"?s.strength=Number(i):l==="brush"&&(s.brush=Number(i))},dispose(){m?.dispose(),c?.dispose(),M.dispose(),y.dispose()}};return A(),L};export{Q as createTrail};
