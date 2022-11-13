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
uniform float u_w1;
uniform float u_w2;
uniform float u_w3;
uniform float u_time;
uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
varying vec2 vUv;
uniform float u_light;
uniform float u_scale;

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle));
}

float sinu(float d,float amplitude, float frequence) {   
  float triangle = abs(mod(d * frequence,2.0)-1.);
  float y = amplitude*(triangle * triangle * (3.0 - 2.0 * triangle));
  return y;
}

//  Function from Iñigo Quiles
//  www.iquilezles.org/www/articles/functions/functions.htm
float parabola( float x, float k ){
  return pow( 0.4*x*(1.0-x), k );
}

void main() {

  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  
  // Create fade sweep
  float progress = u_progress;
  vec2 sf = st;  
  sf = rotate2d(-0.192 * PI) * sf;
  float offX = 0.1;
  sf += vec2(offX,0.0);
  float wave = -0.5;
  float amp = 2.0;
  float freq = 0.2;
  wave += (sinu((sf.x*freq)+progress, amp, 1.0));

  // Scale responsive to fit height
  float scale = u_scale;
  float canvasAspect = u_resolution.x / u_resolution.y;
  float videoAspect = 1.77; // asumes 1280 x 720 texture resolution
  float scaleX = (scale * videoAspect) / canvasAspect;
  float scaleY = scale;
  st = ((st-1.0)/vec2(scaleX, scaleY)) + 0.5;

  // Create scroll distorsion
  float parabolaScale = -3.40;
  float parabolaK = 1.264;
  float y = parabola(st.x,parabolaK) * parabolaScale;
  float x = parabola(st.y,parabolaK) * parabolaScale;
  vec2 scrollDistorsion = vec2(0.0, u_scroll*x);

  // Sample textures
  vec2 disp = st-scrollDistorsion; 
  vec4 texture1 = texture2D(u_texture1, disp);
  vec4 texture2 = texture2D(u_texture2, disp);
  
  // Blend both textures. Adapted from: https://stackoverflow.com/questions/16984914/cross-fade-between-two-textures-on-a-sphere
  vec4 color = u_light * mix(texture1, texture2, smoothstep(-0.25, 0.25, wave));

  gl_FragColor = color;
}