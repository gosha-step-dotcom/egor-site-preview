import{S as me,k as he,D as se,R as re,a1 as oe,F as H,e as A,V as R,Z as ge,A as xe,m as Me,q as ne}from"./index.Bm3SokeJ.js";import{l as $,d as we,m as ue,G as ie,V as _,F as N,r as ye,a as Se}from"./gl.CGG5j0N3.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const k=7,q=40,De=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uPos, uVel, uTarget;
uniform float uDt, uTime, uForce, uMouseOn, uAssemble;
uniform vec3 uMouse, uMouseV;
${ie}
void main(){
  vec3 p = texture2D(uPos, vUv).xyz;
  vec4 vv = texture2D(uVel, vUv);
  vec3 v = vv.xyz; float w = vv.w;
  vec3 t = texture2D(uTarget, vUv).xyz;
  // «пружина» к форме: после удара курсора ослабевает и возвращается за ~секунду
  float k = smoothstep(.0, .75, 1. - w) * uAssemble;
  vec3 acc = (t - p) * 16. * k;
  vec3 c = curl(p * .9 + vec3(uTime * .12, 0., uTime * .07));
  acc += c * (.9 + 5. * w);
  v += acc * uDt;
  v *= exp(-uDt * (2.2 + 4.5 * k));
  w = max(w - uDt * .85, 0.);
  if (uMouseOn > .5) {
    vec3 dm = vec3(p.xy - uMouse.xy, (p.z) * .5);
    float d2 = dot(dm, dm);
    float f = exp(-d2 / .55);
    if (f > .02) {
      v += normalize(dm + vec3(1e-4, 0., 0.)) * f * uForce * 26. * uDt + uMouseV * f * uDt * 6.;
      w = max(w, min(1., f * 3.));
    }
  }
  gl_FragColor = vec4(v, w);
}
`,Pe=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uPos, uVel;
uniform float uDt;
void main(){
  vec4 p = texture2D(uPos, vUv);
  gl_FragColor = vec4(p.xyz + texture2D(uVel, vUv).xyz * uDt, 1.);
}
`,be=`
attribute vec2 aRef;
uniform sampler2D uPos, uVel;
uniform float uSize, uDpr, uAlpha;
uniform vec3 uC1, uC2;
varying vec3 vC; varying float vA;
${ie}
void main(){
  vec3 p = texture2D(uPos, aRef).xyz;
  vec4 vv = texture2D(uVel, aRef);
  float sp = length(vv.xyz);
  float rnd = hash12(aRef * 71.3);
  float mixv = smoothstep(.15, 2.6, sp) ;
  vC = mix(uC1, uC2, mixv);
  vA = uAlpha * (.55 + .45 * rnd) * (1. + mixv * .6);
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = max(1., uSize * uDpr * (.7 + rnd * .6) * (${k}.0 / -mv.z) * (1. + mixv * .5));
}
`,Te=`
precision highp float;
varying vec3 vC; varying float vA;
void main(){
  float d = length(gl_PointCoord - .5) * 2.;
  float a = 1. - smoothstep(.2, 1., d);
  gl_FragColor = vec4(vC, a * vA);
}
`,Ce=(h,B,d)=>{const p=h.renderer,c=h.mobile||h.quality==="low"?128:Number(d.grid??256),S=c*c,o={text:String(d.text??"ЕГОР").toUpperCase().slice(0,8)||"ЕГОР",shape:String(d.shape??"word"),force:Number(d.force??1),size:Number(d.size??2.4),alpha:Number(d.alpha??1),assemble:Number(d.assemble??1)},V=new me;V.background=d.transparent?null:$(h.palette.ink);const D=new he(q,h.aspect,.1,50);D.position.set(0,0,k);const G=we(p),w=ue(c,c,{type:G,filter:H}),M=ue(c,c,{type:G,filter:H}),g=new Float32Array(S*4),P=new se(g,c,c,re,oe);P.minFilter=P.magFilter=H,P.needsUpdate=!0;const j=new A({vertexShader:_,fragmentShader:De,uniforms:{uPos:{value:null},uVel:{value:null},uTarget:{value:P},uDt:{value:.016},uTime:{value:0},uForce:{value:1},uMouseOn:{value:0},uAssemble:{value:1},uMouse:{value:new R},uMouseV:{value:new R}},depthTest:!1,depthWrite:!1}),F=new A({vertexShader:_,fragmentShader:Pe,uniforms:{uPos:{value:null},uVel:{value:null},uDt:{value:.016}},depthTest:!1,depthWrite:!1}),E=new N(j),Z=new N(F),le=(c>=256?.34:c>128?.44:.6)*(d.ink?1.5:1),I=ye(c),y=new A({vertexShader:be,fragmentShader:Te,uniforms:{uPos:{value:null},uVel:{value:null},uSize:{value:o.size},uDpr:{value:h.dpr},uAlpha:{value:c>128?.34:.6},uC1:{value:$(d.ink?"#14161b":h.palette.chalk)},uC2:{value:$(d.ink?"#2e60ff":h.palette.signal)}},transparent:!0,depthWrite:!1,depthTest:!1,blending:d.ink?ge:xe}),X=new Me(I,y);X.frustumCulled=!1,V.add(X);const f=Se(77);let z=[],Y=1;function C(t){const a=document.createElement("canvas"),e=220,s=a.getContext("2d");if(!s)return;const n=`700 ${e*.82}px Onest, "Helvetica Neue", Arial, sans-serif`;s.font=n;const r=Math.max(40,Math.ceil(s.measureText(t).width+e*.3));a.width=r,a.height=e,s.font=n,s.textBaseline="middle",s.textAlign="center",s.fillStyle="#fff",s.fillText(t,r/2,e*.54);const u=s.getImageData(0,0,r,e).data,i=[];for(let l=0;l<e;l++)for(let v=0;v<r;v++)u[(l*r+v)*4+3]>140&&i.push([(v-r/2)/e,-(l-e/2)/e]);z=i,Y=r/e}function ce(t){const a=2*Math.tan(ne.degToRad(q/2))*k;return{w:a*t,h:a}}function J(t){const a=ce(t);if(o.shape==="word"){z.length||C(o.text);const e=Math.min(a.w*.8/Y,a.h*.38),s=z.length;for(let n=0;n<S;n++){const r=z[s?Math.floor(f()*s):0]??[0,0];g[n*4]=(r[0]+(f()-.5)*.006)*e,g[n*4+1]=(r[1]+(f()-.5)*.006)*e,g[n*4+2]=(f()-.5)*.3*e,g[n*4+3]=1}}else{const e=Math.min(a.h*.3,a.w*.34);for(let s=0;s<S;s++){let n,r,u;if(o.shape==="sphere"){const i=f()*2-1,l=f()*6.2832,v=Math.sqrt(1-i*i),m=e*(.98+f()*.04);n=v*Math.cos(l)*m,r=i*m,u=v*Math.sin(l)*m}else{const i=f()*6.2832,l=f()*6.2832,v=e*.72,m=e*.3;n=(v+m*Math.cos(l))*Math.cos(i),u=(v+m*Math.cos(l))*Math.sin(i),r=m*Math.sin(l);const T=.9,te=Math.cos(T),ae=Math.sin(T),pe=r*te-u*ae,fe=r*ae+u*te;r=pe,u=fe}g[s*4]=n,g[s*4+1]=r,g[s*4+2]=u,g[s*4+3]=1}}P.needsUpdate=!0}function ve(){const t=new Float32Array(S*4);for(let i=0;i<S;i++){const l=f()*2-1,v=f()*6.2832,m=Math.sqrt(1-l*l),T=3+f()*5;t[i*4]=m*Math.cos(v)*T,t[i*4+1]=l*T*.6,t[i*4+2]=m*Math.sin(v)*T-2,t[i*4+3]=1}const a=new se(t,c,c,re,oe);a.needsUpdate=!0;const e=new A({vertexShader:_,fragmentShader:"precision highp float; varying vec2 vUv; uniform sampler2D t; void main(){ gl_FragColor = texture2D(t, vUv); }",uniforms:{t:{value:a}},depthTest:!1,depthWrite:!1}),s=new N(e),n=p.getRenderTarget();s.render(p,w.read),p.setRenderTarget(n),s.dispose(),a.dispose();const r=new A({vertexShader:_,fragmentShader:"precision highp float; void main(){ gl_FragColor = vec4(0.); }",depthTest:!1,depthWrite:!1}),u=new N(r);u.render(p,M.read),u.render(p,M.write),p.setRenderTarget(n),u.dispose()}let K=!1,O=!1,x=!0,L=h.aspect,U=new R;const Q=new R;let W=!1,ee=0,b=0;const de={name:"particles",bloom:{strength:.5,threshold:.8},activate(){O=!0,B.label("particles",`${S.toLocaleString("ru-RU")} частиц`)},deactivate(){O=!1},update(t,a){if(!O)return;Math.abs(t.aspect-L)>.001&&(L=t.aspect,x=!0,D.aspect=t.aspect,D.updateProjectionMatrix()),x&&(J(t.aspect),x=!1),b=Math.min(a,1/30),ee+=b*(t.reduced?.3:1);const e=t.pointer,s=Math.tan(ne.degToRad(q/2))*k,n=e.ndcX*s*t.aspect,r=e.ndcY*s;if(Q.set((n-U.x)/Math.max(b,1/120),(r-U.y)/Math.max(b,1/120),0).clampLength(0,20),U.set(n,r,0),W=e.inside&&!t.reduced,W){const u=Math.hypot(e.vx,e.vy);u>.6&&B.tick(t,Math.min(.28,u*.06),.8+Math.min(1,u*.15))}},render(t){K||(ve(),K=!0),x&&(J(t.aspect),x=!1);const a=p.getRenderTarget(),e=j.uniforms;e.uPos.value=w.read.texture,e.uVel.value=M.read.texture,e.uDt.value=b,e.uTime.value=ee,e.uForce.value=o.force,e.uMouseOn.value=W&&o.force>.001?1:0,e.uMouse.value.copy(U),e.uMouseV.value.copy(Q),e.uAssemble.value=o.assemble,E.render(p,M.write),M.swap(),F.uniforms.uPos.value=w.read.texture,F.uniforms.uVel.value=M.read.texture,F.uniforms.uDt.value=b,Z.render(p,w.write),w.swap(),y.uniforms.uPos.value=w.read.texture,y.uniforms.uVel.value=M.read.texture,y.uniforms.uSize.value=o.size,y.uniforms.uDpr.value=t.dpr,y.uniforms.uAlpha.value=le*o.alpha,p.setRenderTarget(a),p.render(V,D)},resize(t){D.aspect=t.aspect,D.updateProjectionMatrix(),L=t.aspect,x=!0},setParam(t,a){if(t==="text"){const e=String(a).toUpperCase().slice(0,8).trim();o.text=e||" ",C(o.text),x=!0}else t==="shape"?(o.shape=String(a),x=!0,o.shape==="word"&&!z.length&&C(o.text)):t==="force"?o.force=Number(a):t==="size"?o.size=Number(a):t==="alpha"?o.alpha=Math.max(0,Math.min(1,Number(a))):t==="assemble"&&(o.assemble=Math.max(0,Math.min(1,Number(a))))},dispose(){w.dispose(),M.dispose(),P.dispose(),I.dispose(),y.dispose(),E.dispose(),Z.dispose(),V.clear()}};return typeof document<"u"&&document.fonts&&document.fonts.load("700 100px Onest",o.text).then(()=>{C(o.text),x=!0}).catch(()=>{}),de};export{Ce as createParticles};
