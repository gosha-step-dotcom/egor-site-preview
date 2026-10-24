import{S as fe,k as me,D as se,R as re,a0 as oe,F as H,e as V,V as R,A as he,m as ge,q as ne}from"./index.B3mmuuVA.js";import{l as $,d as xe,m as ue,G as ie,V as _,F as O,r as Me,a as we}from"./gl.B0zpTh7a.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const k=7,q=40,ye=`
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
`,Se=`
precision highp float;
varying vec2 vUv;
uniform sampler2D uPos, uVel;
uniform float uDt;
void main(){
  vec4 p = texture2D(uPos, vUv);
  gl_FragColor = vec4(p.xyz + texture2D(uVel, vUv).xyz * uDt, 1.);
}
`,De=`
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
`,Pe=`
precision highp float;
varying vec3 vC; varying float vA;
void main(){
  float d = length(gl_PointCoord - .5) * 2.;
  float a = 1. - smoothstep(.2, 1., d);
  gl_FragColor = vec4(vC, a * vA);
}
`,Ae=(m,G,F)=>{const v=m.renderer,d=m.mobile||m.quality==="low"?128:256,w=d*d,n={text:String(F.text??"ЕГОР").toUpperCase().slice(0,8)||"ЕГОР",shape:String(F.shape??"word"),force:Number(F.force??1),size:Number(F.size??2.4)},A=new fe;A.background=$(m.palette.ink);const y=new me(q,m.aspect,.1,50);y.position.set(0,0,k);const j=xe(v),M=ue(d,d,{type:j,filter:H}),x=ue(d,d,{type:j,filter:H}),h=new Float32Array(w*4),S=new se(h,d,d,re,oe);S.minFilter=S.magFilter=H,S.needsUpdate=!0;const B=new V({vertexShader:_,fragmentShader:ye,uniforms:{uPos:{value:null},uVel:{value:null},uTarget:{value:S},uDt:{value:.016},uTime:{value:0},uForce:{value:1},uMouseOn:{value:0},uAssemble:{value:1},uMouse:{value:new R},uMouseV:{value:new R}},depthTest:!1,depthWrite:!1}),C=new V({vertexShader:_,fragmentShader:Se,uniforms:{uPos:{value:null},uVel:{value:null},uDt:{value:.016}},depthTest:!1,depthWrite:!1}),E=new O(B),I=new O(C),X=Me(d),D=new V({vertexShader:De,fragmentShader:Pe,uniforms:{uPos:{value:null},uVel:{value:null},uSize:{value:n.size},uDpr:{value:m.dpr},uAlpha:{value:d>128?.34:.6},uC1:{value:$(m.palette.chalk)},uC2:{value:$(m.palette.signal)}},transparent:!0,depthWrite:!1,depthTest:!1,blending:he}),Y=new ge(X,D);Y.frustumCulled=!1,A.add(Y);const p=we(77);let z=[],Z=1;function b(t){const s=document.createElement("canvas"),e=220,a=s.getContext("2d");if(!a)return;const o=`700 ${e*.82}px Onest, "Helvetica Neue", Arial, sans-serif`;a.font=o;const r=Math.max(40,Math.ceil(a.measureText(t).width+e*.3));s.width=r,s.height=e,a.font=o,a.textBaseline="middle",a.textAlign="center",a.fillStyle="#fff",a.fillText(t,r/2,e*.54);const u=a.getImageData(0,0,r,e).data,i=[];for(let l=0;l<e;l++)for(let c=0;c<r;c++)u[(l*r+c)*4+3]>140&&i.push([(c-r/2)/e,-(l-e/2)/e]);z=i,Z=r/e}function le(t){const s=2*Math.tan(ne.degToRad(q/2))*k;return{w:s*t,h:s}}function J(t){const s=le(t);if(n.shape==="word"){z.length||b(n.text);const e=Math.min(s.w*.8/Z,s.h*.38),a=z.length;for(let o=0;o<w;o++){const r=z[a?Math.floor(p()*a):0]??[0,0];h[o*4]=(r[0]+(p()-.5)*.006)*e,h[o*4+1]=(r[1]+(p()-.5)*.006)*e,h[o*4+2]=(p()-.5)*.3*e,h[o*4+3]=1}}else{const e=Math.min(s.h*.3,s.w*.34);for(let a=0;a<w;a++){let o,r,u;if(n.shape==="sphere"){const i=p()*2-1,l=p()*6.2832,c=Math.sqrt(1-i*i),f=e*(.98+p()*.04);o=c*Math.cos(l)*f,r=i*f,u=c*Math.sin(l)*f}else{const i=p()*6.2832,l=p()*6.2832,c=e*.72,f=e*.3;o=(c+f*Math.cos(l))*Math.cos(i),u=(c+f*Math.cos(l))*Math.sin(i),r=f*Math.sin(l);const T=.9,te=Math.cos(T),ae=Math.sin(T),de=r*te-u*ae,pe=r*ae+u*te;r=de,u=pe}h[a*4]=o,h[a*4+1]=r,h[a*4+2]=u,h[a*4+3]=1}}S.needsUpdate=!0}function ce(){const t=new Float32Array(w*4);for(let i=0;i<w;i++){const l=p()*2-1,c=p()*6.2832,f=Math.sqrt(1-l*l),T=3+p()*5;t[i*4]=f*Math.cos(c)*T,t[i*4+1]=l*T*.6,t[i*4+2]=f*Math.sin(c)*T-2,t[i*4+3]=1}const s=new se(t,d,d,re,oe);s.needsUpdate=!0;const e=new V({vertexShader:_,fragmentShader:"precision highp float; varying vec2 vUv; uniform sampler2D t; void main(){ gl_FragColor = texture2D(t, vUv); }",uniforms:{t:{value:s}},depthTest:!1,depthWrite:!1}),a=new O(e),o=v.getRenderTarget();a.render(v,M.read),v.setRenderTarget(o),a.dispose(),s.dispose();const r=new V({vertexShader:_,fragmentShader:"precision highp float; void main(){ gl_FragColor = vec4(0.); }",depthTest:!1,depthWrite:!1}),u=new O(r);u.render(v,x.read),u.render(v,x.write),v.setRenderTarget(o),u.dispose()}let K=!1,L=!1,g=!0,N=m.aspect,U=new R;const Q=new R;let W=!1,ee=0,P=0;const ve={name:"particles",bloom:{strength:.5,threshold:.8},activate(){L=!0,G.label("particles",`${w.toLocaleString("ru-RU")} частиц`)},deactivate(){L=!1},update(t,s){if(!L)return;Math.abs(t.aspect-N)>.001&&(N=t.aspect,g=!0,y.aspect=t.aspect,y.updateProjectionMatrix()),g&&(J(t.aspect),g=!1),P=Math.min(s,1/30),ee+=P*(t.reduced?.3:1);const e=t.pointer,a=Math.tan(ne.degToRad(q/2))*k,o=e.ndcX*a*t.aspect,r=e.ndcY*a;if(Q.set((o-U.x)/Math.max(P,1/120),(r-U.y)/Math.max(P,1/120),0).clampLength(0,20),U.set(o,r,0),W=e.inside&&!t.reduced,W){const u=Math.hypot(e.vx,e.vy);u>.6&&G.tick(t,Math.min(.28,u*.06),.8+Math.min(1,u*.15))}},render(t){K||(ce(),K=!0),g&&(J(t.aspect),g=!1);const s=v.getRenderTarget(),e=B.uniforms;e.uPos.value=M.read.texture,e.uVel.value=x.read.texture,e.uDt.value=P,e.uTime.value=ee,e.uForce.value=n.force,e.uMouseOn.value=W&&n.force>.001?1:0,e.uMouse.value.copy(U),e.uMouseV.value.copy(Q),E.render(v,x.write),x.swap(),C.uniforms.uPos.value=M.read.texture,C.uniforms.uVel.value=x.read.texture,C.uniforms.uDt.value=P,I.render(v,M.write),M.swap(),D.uniforms.uPos.value=M.read.texture,D.uniforms.uVel.value=x.read.texture,D.uniforms.uSize.value=n.size,D.uniforms.uDpr.value=t.dpr,v.setRenderTarget(s),v.render(A,y)},resize(t){y.aspect=t.aspect,y.updateProjectionMatrix(),N=t.aspect,g=!0},setParam(t,s){if(t==="text"){const e=String(s).toUpperCase().slice(0,8).trim();n.text=e||" ",b(n.text),g=!0}else t==="shape"?(n.shape=String(s),g=!0,n.shape==="word"&&!z.length&&b(n.text)):t==="force"?n.force=Number(s):t==="size"&&(n.size=Number(s))},dispose(){M.dispose(),x.dispose(),S.dispose(),X.dispose(),D.dispose(),E.dispose(),I.dispose(),A.clear()}};return typeof document<"u"&&document.fonts&&document.fonts.load("700 100px Onest",n.text).then(()=>{b(n.text),g=!0}).catch(()=>{}),ve};export{Ae as createParticles};
