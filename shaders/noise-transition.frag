

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_w1;
uniform float u_w2;
uniform float u_w3;
uniform float u_v2;
uniform float u_v3;
uniform float u_v4;
uniform float u_v5;
uniform float u_v6;
uniform float u_v7;
uniform float u_progress;
uniform float u_fadeProgress;
uniform float u_time;
uniform float u_scale;
uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
varying vec2 vUv;
uniform float u_light;

// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
// 

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+10.0)*x);
}

float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float linearMap(in float val, in float fromA, in float fromB, in float toA, in float toB ){
    float x = (((val - fromA) * (toB - toA)) / (fromB - fromA) + toA); 
    return clamp(fromA,toB, x);
}

void main() {

  // float p = u_time;
  float p = u_progress;
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  // st.x *= u_resolution.x/u_resolution.y;

  // Scale responsive to fit height
  float scale = 2.0;
  float canvasAspect = u_resolution.x / u_resolution.y;
  float videoAspect = 1.77; // asumes 1280 x 720
  float scaleX = (scale * videoAspect) / canvasAspect;
  float scaleY = scale;
  st = ((st-1.0)/vec2(scaleX, scaleY)) + 0.5;

  vec2 pos = vec2(st * u_scale);
  
  float DF = 0.0;
  
  // Add a random position
  float a = 0.0;
  vec2 vel = vec2(p*.1);
  DF += snoise(pos+vel)*u_v2+u_time;
  
  // Add a random position
  a = snoise(pos*vec2(cos(p*u_w1),sin(p*u_w2))*u_w3)*3.1415;
  vel = vec2(cos(a),sin(a));
  DF += snoise(pos+vel)*u_v4+u_v5;

  // Sample textures
  vec2 disp = st; 
  vec4 texture1 = texture2D(u_texture1, disp);
  vec4 texture2 = texture2D(u_texture2, disp);
  
  float t1 = linearMap(p,0.1, 1.0, 0.0, 1.0);
  float t2 = linearMap(p,0.0, 0.9, 0.0, 1.0);

  // Blend both textures. Adapted from: https://stackoverflow.com/questions/16984914/cross-fade-between-two-textures-on-a-sphere
  vec4 color = mix(texture1, texture2, smoothstep(t1, t2, fract(DF)));
  gl_FragColor = vec4(color);
}