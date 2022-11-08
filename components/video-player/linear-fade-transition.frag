/** 
  Receives two textures distorts them using tile distorsion
  Also creates a transition to blend between them
  Used on ScreenQuad along clip-space.vert shader
*/

// ToDo:
// add noise

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform float u_scroll;
uniform vec2 u_resolution;
uniform float u_progress;
uniform float u_scale;
uniform float u_time;
uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
varying vec2 vUv;
uniform float u_light;


mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle));
}

float sinu(float d,float amplitude, float frequence) {   
  float triangle = abs(mod(d * frequence,2.0)-1.);
  float y = amplitude*(triangle * triangle * (3.0 - 2.0 * triangle));
  return y;
}



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

  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  // displacement noise
  float u_p = 0.01;
  float u_w1 = 1.0;
  float u_w2 = 1.0;
  float u_w3 = 1.0;
  float u_v2 = 1.0;
  float u_v4 = 0.9;
  float u_v5 = 0.4;
  float u_speed = 0.4;
  float u_dis_scale = 0.88;
  float p = u_p;
  vec2 pos = vec2(st * u_dis_scale);
  float DF = 0.0;
  // Add a random position
  float a = 0.0;
  // vec2 vel = vec2(p*.1);
  vec2 vel = vec2(u_time * u_speed);
  DF += snoise(pos+vel)*u_v2+0.5;
  // Add a random position
  a = snoise(pos*vec2(cos(p*u_w1),sin(p*u_w2))*u_w3)*3.1415;
  vel = vec2(cos(a),sin(a));
  DF += snoise(pos+vel)*u_v4+u_v5;


  
  // Create fade sweep
  float progress = u_progress;
  vec2 sf = st;  
  sf = rotate2d(-0.192 * PI) * sf;
  float offX = 0.1;
  sf += vec2(offX,0.0);
  float wave = -0.5;
  float amp = 2.5;
  float freq = 0.2;
  wave += (sinu((sf.x*freq)+progress, amp, 1.0));

  // Scale responsive to fit height
  float scale = u_scale;
  float canvasAspect = u_resolution.x / u_resolution.y;
  float videoAspect = 1.77; // asumes 1280 x 720 texture resolution
  float scaleX = (scale * videoAspect) / canvasAspect;
  float scaleY = scale;
  st = ((st-1.0)/vec2(scaleX, scaleY)) + 0.5;


  // noise disp stuff
  vec2 newST = vec2(0.0,0.0);
  newST.x = mix(st.x, DF, 0.3);
  newST.y = mix(st.y, DF, 0.1);
  // clamp wave to 0,1
  float dispWave = clamp(wave, 0.0, 1.0);
  dispWave = pow(cos(PI*dispWave),2.0);
  newST = newST * (1.0-dispWave);

  // Sample textures
  vec2 disp = st+newST; 
  vec4 texture1 = texture2D(u_texture1, disp);
  vec4 texture2 = texture2D(u_texture2, disp);
  
  // Blend both textures. Adapted from: https://stackoverflow.com/questions/16984914/cross-fade-between-two-textures-on-a-sphere
  vec4 color = u_light * mix(texture1, texture2, smoothstep(-0.25, 0.25, wave));

  gl_FragColor = color;
}