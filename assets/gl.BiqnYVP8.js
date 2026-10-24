var h=Object.defineProperty;var u=(e,a,t)=>a in e?h(e,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[a]=t;var r=(e,a,t)=>u(e,typeof a!="symbol"?a+"":a,t);import{B as f,l as i,M as x,S as y,O as d,a1 as m,H as g,C as p,W as w,R as z,a2 as A}from"./index.DNh1aBPv.js";class T{constructor(a){r(this,"scene",new y);r(this,"camera",new d(-1,1,1,-1,0,1));r(this,"mesh");r(this,"geo");this.material=a,this.geo=new f,this.geo.setAttribute("position",new i(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),this.geo.setAttribute("uv",new i(new Float32Array([0,0,2,0,0,2]),2)),this.mesh=new x(this.geo,a),this.mesh.frustumCulled=!1,this.scene.add(this.mesh)}render(a,t){a.setRenderTarget(t),a.render(this.scene,this.camera)}dispose(){this.geo.dispose(),this.material.dispose()}}const R=`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;function b(e){return e.extensions.has("EXT_color_buffer_float")?m:g}function B(e,a,t){const o=()=>new w(e,a,{type:t.type,format:z,minFilter:t.filter,magFilter:t.filter,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1}),s={read:o(),write:o(),swap(){const n=s.read;s.read=s.write,s.write=n},dispose(){s.read.dispose(),s.write.dispose()}};return s}function G(e,a,t=0,o=0,s=0,n=0){const c=new p;e.getClearColor(c);const l=e.getClearAlpha(),v=e.getRenderTarget();e.setClearColor(new p().setRGB(t,o,s,A),n),e.setRenderTarget(a),e.clear(!0,!1,!1),e.setRenderTarget(v),e.setClearColor(c,l)}function S(e){let a=e>>>0;return()=>{a=a+1831565813>>>0;let t=a;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const L=e=>new p(e),M=`
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float hash13(vec3 p3){ p3 = fract(p3 * .1031); p3 += dot(p3, p3.zyx + 31.32); return fract((p3.x + p3.y) * p3.z); }
vec3 hash32(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973)); p3 += dot(p3, p3.yxz + 33.33); return fract((p3.xxy + p3.yzz) * p3.zyx); }
vec3 hash33(vec3 p3){ p3 = fract(p3 * vec3(.1031, .1030, .0973)); p3 += dot(p3, p3.yxz + 33.33); return fract((p3.xxy + p3.yxx) * p3.zyx); }
float vnoise(vec3 p){
  vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash13(i), hash13(i + vec3(1,0,0)), f.x), mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x), mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm3(vec3 p){ float a = .5, s = 0.; for (int i = 0; i < 4; i++){ s += a * vnoise(p); p = p * 2.03 + 11.7; a *= .5; } return s / .9375; }
/* бездивергентное поле (curl) от трёх сдвинутых шумов */
vec3 curl(vec3 p){
  const float e = .35;
  vec3 dx = vec3(e, 0., 0.), dy = vec3(0., e, 0.), dz = vec3(0., 0., e);
  float x0 = vnoise(p + dy + 7.1) - vnoise(p - dy + 7.1) - (vnoise(p + dz + 3.3) - vnoise(p - dz + 3.3));
  float y0 = vnoise(p + dz + 3.3) - vnoise(p - dz + 3.3) - (vnoise(p + dx + 9.7) - vnoise(p - dx + 9.7));
  float z0 = vnoise(p + dx + 9.7) - vnoise(p - dx + 9.7) - (vnoise(p + dy + 7.1) - vnoise(p - dy + 7.1));
  return vec3(x0, y0, z0) / (2. * e);
}
`;function _(e){const a=e*e,t=new f,o=new Float32Array(a*2);for(let s=0;s<a;s++)o[s*2]=(s%e+.5)/e,o[s*2+1]=(Math.floor(s/e)+.5)/e;return t.setAttribute("position",new i(new Float32Array(a*3),3)),t.setAttribute("aRef",new i(o,2)),t}export{T as F,M as G,R as V,S as a,G as c,b as d,L as l,B as m,_ as r};
