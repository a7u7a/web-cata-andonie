import { Uniform } from 'three'
import { BlendFunction, Effect, EffectAttribute } from 'postprocessing'
import { wrapEffect } from './util.tsx'
import { EffectComposer } from '@react-three/postprocessing'
import { useControls, useCreateStore } from 'leva'
import { useEffect } from 'react'
// import halftoneVertex from "./halftone-shader.vert";
// import halftoneFragment from "./halftone-shader.frag";

const vertexShader = `
varying vec2 vUV;
void mainSupport(const in vec2 uv) {
  vUV = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

const NoiseDisplacementShader = {
  fragmentShader: `
  
  #ifdef GL_ES
precision mediump float;
#endif


uniform float u_p;
uniform float u_w1;
uniform float u_w2;
uniform float u_w3;
uniform float u_v2;
uniform float u_v4;
uniform float u_v5;
uniform float u_progress;
//uniform float u_time;
uniform float u_speed;
uniform float u_scale;
//uniform float u_imgScale;
//uniform float u_imgAspect;
//uniform sampler2D u_texture1;
//uniform sampler2D u_texture2;
varying vec2 vUV;
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

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

  float p = u_p;
  vec2 st = gl_FragCoord.xy/resolution.xy;
  vec2 pos = vec2(st * u_scale);
  
  float DF = 0.0;
  
  // Add a random position
  float a = 0.0;
  vec2 vel = vec2(time * u_speed);
  DF += snoise(pos+vel)*u_v2+0.5;
  
  // Add a random position
  a = snoise(pos*vec2(cos(p*u_w1),sin(p*u_w2))*u_w3)*3.1415;
  vel = vec2(cos(a),sin(a));
  DF += snoise(pos+vel)*u_v4+u_v5;

  vec2 newST = vec2(0.0,0.0);
  newST.x = mix(st.x, DF, 0.1);
  newST.y = mix(st.y, DF, 0.1);
  vec4 color = texture2D(inputBuffer, newST);
  outputColor = vec4(color);
}
`
}

export class NoiseDisplacementEffect extends Effect {
  constructor({
    blendFunction = BlendFunction.Normal,
    u_p = 0.01,
    u_w1 = 1.0,
    u_w2 = 1.0,
    u_w3 = 1.0,
    u_v2 = 1.0,
    u_v4 = 0.9,
    u_v5 = 0.4,
    u_progress = 0,
    u_speed = 0.01,
    u_scale = 0.88
  } = {}) {
    super('NoiseDisplacementEffect', NoiseDisplacementShader.fragmentShader, {
      vertexShader,
      blendFunction,
      attributes: EffectAttribute.CONVOLUTION,
      uniforms: new Map([
        ['u_p', new Uniform(u_p)],
        ['u_w1', new Uniform(u_w1)],
        ['u_w2', new Uniform(u_w2)],
        ['u_w3', new Uniform(u_w3)],
        ['u_v2', new Uniform(u_v2)],
        ['u_v4', new Uniform(u_v4)],
        ['u_v5', new Uniform(u_v5)],
        ['u_progress', new Uniform(u_progress)],
        ['u_speed', new Uniform(u_speed)],
        ['u_scale', new Uniform(u_scale)]
      ])
    })
  }
}

const NoiseDisplacement = wrapEffect(NoiseDisplacementEffect)

  export default NoiseDisplacement