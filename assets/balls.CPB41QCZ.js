import{S as ae,O as oe,e as W,h as re,M as L,P as Y,t as ne,$ as se,b as ie,q}from"./index.D-mcs5gf.js";import{a as le}from"./gl.C9m9OMWq.js";import"./lifecycle.DvHggCvj.js";import"./sound.DMzxW5BL.js";const E=40;function $(x,M,P,w={}){const h=document.createElement("canvas");h.width=h.height=256;const a=h.getContext("2d");a.fillStyle=M,a.fillRect(0,0,256,256);const l=a.createRadialGradient(256*.36,256*.3,256*.02,256*.5,256*.52,256*.62);if(l.addColorStop(0,P),l.addColorStop(.28,x),l.addColorStop(1,M),a.fillStyle=l,a.beginPath(),a.arc(256/2,256/2,256/2,0,6.2832),a.fill(),w.streak){a.save(),a.beginPath(),a.arc(256/2,256/2,256/2-1,0,6.2832),a.clip();const f=a.createLinearGradient(0,0,256,256);f.addColorStop(.18,"rgba(255,255,255,0)"),f.addColorStop(.28,"rgba(255,255,255,0.55)"),f.addColorStop(.36,"rgba(255,255,255,0)"),a.fillStyle=f,a.fillRect(0,0,256,256),a.restore()}if(w.gloss){const f=a.createRadialGradient(87.04,69.12,0,87.04,69.12,25.6);f.addColorStop(0,`rgba(255,255,255,${w.gloss})`),f.addColorStop(1,"rgba(255,255,255,0)"),a.fillStyle=f,a.fillRect(0,0,256,256)}if(w.rim){const f=a.createRadialGradient(128,128,97.28,128,128,128);f.addColorStop(0,"rgba(0,0,0,0)"),f.addColorStop(1,w.rim),a.fillStyle=f,a.beginPath(),a.arc(256/2,256/2,256/2,0,6.2832),a.fill()}const c=new se(h);return c.colorSpace=ie,c.needsUpdate=!0,c}const ce=`
varying vec3 vN; varying vec3 vV;
void main(){
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`,ve=`
precision highp float;
varying vec3 vN; varying vec3 vV;
uniform sampler2D uMatcap; uniform float uGlass; uniform float uAmbient;
void main(){
  vec3 n = normalize(vN);
  vec3 c = texture2D(uMatcap, n.xy * .5 + .5).rgb;
  // matcap в sRGB → линейное рабочее пространство
  c = pow(c, vec3(2.2));
  float fres = pow(1. - clamp(n.z, 0., 1.), 2.2);
  float a = 1.;
  if (uGlass > .5) {
    a = clamp(.2 + fres * .8, 0., 1.);
    c = c * (.18 + fres * 1.3) + vec3(.45, .72, .9) * (.05 + fres * .75);
    // блик
    float spec = pow(max(dot(reflect(-vV, n), normalize(vec3(-.4, .6, .7))), 0.), 60.);
    c += vec3(spec) * 1.4; a = max(a, spec);
  }
  gl_FragColor = vec4(c * uAmbient, a);
}
`,fe=`
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
void main(){
  vec2 uv = vUv;
  float vign = 1. - dot(uv - .5, uv - .5) * 1.1;
  vec3 col = mix(vec3(.0060, .0068, .0082), vec3(.0022, .0024, .0030), uv.y) * vign;
  vec2 g = uv * uRes / 64.;
  vec2 f = abs(fract(g - .5) - .5) / (fwidth(g) * 1.0);
  float line = 1. - min(min(f.x, f.y), 1.);
  col += vec3(.0085, .0095, .0120) * line * vign;
  // пол
  float floorGlow = exp(-uv.y * 22.);
  col += vec3(.012, .013, .016) * floorGlow;
  gl_FragColor = vec4(col, 1.);
}
`,me=`
precision highp float; varying vec2 vUv;
void main(){ float d = length(vUv - .5) * 2.; gl_FragColor = vec4(0., 0., 0., (1. - smoothstep(0., 1., d)) * .55); }
`,de="varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }",xe=(x,M,P)=>{const w=x.renderer,p={material:String(P.material??"lime"),gravity:P.gravity!==!1},h=le(5),a=new ae;let l=x.width,c=x.height;const f=new oe(0,l,c,0,-1e3,1e3);f.position.z=100;const k=new W({vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.999, 1.); }",fragmentShader:fe,uniforms:{uRes:{value:new re(l,c)}},depthTest:!1,depthWrite:!1}),B=new L(new Y(2,2),k);B.frustumCulled=!1,B.renderOrder=-10,a.add(B);const U={chalk:$("#E9EAE4","#7d7e7a","#ffffff",{gloss:.25}),lime:$("#C8FF3A","#4a6a0a","#f6ffd0",{gloss:.9}),graphite:$("#2a2e35","#050608","#8B919B",{gloss:.8,streak:!0,rim:"rgba(200,210,230,0.28)"}),glass:$("#aab8c4","#101820","#ffffff",{gloss:.6,rim:"rgba(255,255,255,0.35)"})},H={};Object.keys(U).forEach(t=>{H[t]=new W({vertexShader:ce,fragmentShader:ve,uniforms:{uMatcap:{value:U[t]},uGlass:{value:t==="glass"?1:0},uAmbient:{value:1}},transparent:t==="glass",depthWrite:t!=="glass"})});const D=new ne(1,48,32),T=new Y(1,1),X=new W({vertexShader:de,fragmentShader:me,transparent:!0,depthWrite:!1}),v=[];let _=!1,G=0,I=0;const z=()=>Math.max(Math.min(l,c),360),Z=()=>(.034+h()*.05)*z()*(x.mobile?1.1:1);function J(t,o,n,r,m,e=Z()){v.length>=E&&K(v[0]);const d=new L(D,H[m]);d.scale.setScalar(e),d.renderOrder=m==="glass"?3:1;const s=new L(T,X);s.renderOrder=0,a.add(s),a.add(d);const i={x:t,y:o,vx:n,vy:r,r:e,m:e*e,mat:m,mesh:d,shadow:s,age:0};return v.push(i),N(i),i}function K(t){a.remove(t.mesh),a.remove(t.shadow);const o=v.indexOf(t);o>=0&&v.splice(o,1)}function N(t){t.mesh.position.set(t.x,t.y,0);const o=Math.max(0,t.y-t.r)/(t.r*5),n=Math.max(0,1-o);t.shadow.position.set(t.x,t.r*.12,-5),t.shadow.scale.set(t.r*2.6*(.7+.3*n),t.r*.55,1),t.shadow.visible=n>.02}function Q(){for(;v.length;)K(v[0])}function ee(){["lime","chalk","graphite","glass","lime","graphite","chalk","glass","lime"].forEach((o,n)=>J(l*(.15+.7*(n*.37%1)),c*(.55+.4*(n*.23%1)),(h()-.5)*300,0,o))}function R(t,o,n){const r=performance.now();r-I<90||(I=r,t.sound.play(n>z()*.06?"thud":"tick",{volume:Math.min(1,o/1400)*.9,rate:q.clamp(1.5-n/(z()*.08),.6,1.6)}))}function te(t,o){const n=p.gravity?-z()*2.4:0,r=p.gravity?.5:.96,m=p.gravity?.12:0;for(const e of v)e.vy+=n*o,e.vx*=1-m*o,e.vy*=1-m*o,e.x+=e.vx*o,e.y+=e.vy*o,e.x<e.r?(e.x=e.r,e.vx<-60&&R(t,-e.vx,e.r),e.vx=-e.vx*r):e.x>l-e.r&&(e.x=l-e.r,e.vx>60&&R(t,e.vx,e.r),e.vx=-e.vx*r),e.y<e.r?(e.y=e.r,e.vy<-80&&R(t,-e.vy,e.r),e.vy=Math.abs(e.vy)>40?-e.vy*r:0,e.vx*=1-Math.min(1,1.6*o)):e.y>c-e.r&&(e.y=c-e.r,e.vy>60&&R(t,e.vy,e.r),e.vy=-e.vy*r);for(let e=0;e<v.length;e++)for(let d=e+1;d<v.length;d++){const s=v[e],i=v[d],F=i.x-s.x,y=i.y-s.y,b=s.r+i.r,C=F*F+y*y;if(C>=b*b||C===0)continue;const S=Math.sqrt(C),u=F/S,g=y/S,V=b-S,A=s.m+i.m;s.x-=u*V*(i.m/A),s.y-=g*V*(i.m/A),i.x+=u*V*(s.m/A),i.y+=g*V*(s.m/A);const O=(i.vx-s.vx)*u+(i.vy-s.vy)*g;if(O<0){const j=-(1+(p.gravity?.55:.95))*O/(1/s.m+1/i.m);s.vx-=j*u/s.m,s.vy-=j*g/s.m,i.vx+=j*u/i.m,i.vy+=j*g/i.m,-O>90&&R(t,-O,Math.max(s.r,i.r))}}}return{name:"balls",bloom:{strength:.35,threshold:.85},activate(t){_=!0,v.length||ee(),M.label("balls",`${v.length} из ${E} шаров`)},deactivate(){_=!1},update(t,o){if(!_)return;const n=t.pointer;if(n.inside&&!t.reduced){const e=n.x*l,d=(1-n.y)*c,s=n.vx*l,i=-n.vy*c;if(Math.hypot(s,i)>40)for(const y of v){const b=y.x-e,C=y.y-d,S=Math.hypot(b,C),u=y.r+34;if(S<u&&S>.001){const g=1-S/u;y.vx+=b/S*g*700*o*6+s*g*.06,y.vy+=C/S*g*700*o*6+i*g*.06}}}G+=Math.min(o,1/30);const r=1/180;let m=0;for(;G>=r&&m<8;)te(t,r),G-=r,m++;G>r&&(G=0);for(const e of v)e.age+=o,N(e)},render(){w.render(a,f)},resize(t){const o=t.width/l,n=t.height/c;l=t.width,c=t.height,f.right=l,f.top=c,f.updateProjectionMatrix(),k.uniforms.uRes.value.set(l,c);for(const r of v)r.x*=o,r.y*=n,r.x=q.clamp(r.x,r.r,l-r.r),r.y=q.clamp(r.y,r.r,c-r.r),N(r)},setParam(t,o){if(t==="material")p.material=String(o);else if(t==="gravity"){if(p.gravity=!!o,p.gravity)for(const n of v)n.vy-=1}else t==="clear"&&(Q(),M.label("balls",`0 из ${E} шаров`))},click(t){if(!_)return;const o=x,n=t.x*l,r=(1-t.y)*c,m=o.pointer.vx*l*.35+(h()-.5)*260,e=-o.pointer.vy*c*.35+(h()-.5)*120;J(n,r,m,e,p.material),M.label("balls",`${v.length} из ${E} шаров`),o.sound.play("click",{volume:.5,rate:1.2})},dispose(){Q(),D.dispose(),T.dispose(),X.dispose(),k.dispose(),B.geometry.dispose(),Object.keys(U).forEach(t=>{U[t].dispose(),H[t].dispose()}),a.clear()}}};export{xe as createBalls};
