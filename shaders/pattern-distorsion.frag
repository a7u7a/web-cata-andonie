// receives a texture and distorts it. used by ScreenQuad
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_progress;
uniform float u_time;
uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
varying vec2 vUv;
uniform float u_tyles_y;
uniform float u_tyles_x;
uniform float u_posX;
uniform float u_posY;
uniform float u_mouseX;
uniform float u_mouseY;
uniform float u_light;

// todo:
// respect footage propotions and scale acording to canvas resolution
// dim image to allow type to be readable
// make the tiles be squared relative to canvas dimensions
// how to transition from one videotexture to the next
// fix lens distorsion progress

//  Function from Iñigo Quiles
//  www.iquilezles.org/www/articles/functions/functions.htm
float parabola( float x, float k ){
  return pow( 0.4*x*(1.0-x), k );
}


// Function by @patriciogv - 2015
// http://patriciogonzalezvivo.com
float circle(in vec2 _st, in float _radius){
  vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*2.834),
                       _radius+(_radius*0.186),
                       dot(dist,dist)*4.0);
}

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle));
}

float linearMap(in float val, in float fromA, in float fromB, in float toA, in float toB ){
  float x = (((val - fromA) * (toB - toA)) / (fromB - fromA) + toA); 
  return clamp(toA,toB, x);
}

// make progress into a regular
float progressCurve(in float x ){
  return 1.0-pow(cos(PI*x),2.0);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  float t = u_time * 0.2;
  // float progress = u_progress;
  float progress = progressCurve(t);
  // Keep a copy of the original uvs
  vec2 origin = st;

  // Get parabola
  float parabolaScale = -3.40;
  float y = parabola(st.x,1.264) * parabolaScale;
  float x = parabola(st.y,1.264) * parabolaScale;
  // Apply parabola to mouse/slider pos
  // vec2 offset = vec2(u_posX*y, u_posY*x); // using leva controls
  vec2 mouseOffset = vec2(u_mouseX*y, u_mouseY*x);

  // Tile the screen
  st.x *= u_tyles_x;
  st.y *= u_tyles_y;
  st = fract(st);

  // The idea is that fadeout happens after refraction effect using progress

  // Compute fade effect
  float fadeProgress = linearMap(progress,0.6, 1.0, -1.5, 1.5);
  vec2 sf = st;
	// Move space from the center to the vec2(0.0)
  sf -= vec2(0.5);
  // Rotate the space
  sf = rotate2d( -0.184*PI ) * sf;
  // Move it back to the original place
  sf += vec2(0.5);
  float fadeScale = 0.8;
  float fadePct = (sin(sf.x)+-fadeProgress)*fadeScale;

  // Compute lens pattern effect

  float refractionProgress = linearMap(progress,0.0, 0.75, 0.0, 1.0);
  float refraction = mix(0.0,0.15, refractionProgress);
  float lensDistorsion = mix(200.0, 10.0, refractionProgress);
  // Scale effect
  vec2 lensEffect = (vec2(circle(st, 1.9) / lensDistorsion)); 
  // Refraction effect is achieved by scaling the tile from the tile's center point
  float s = 0.5;
  st = (st-s)*refraction; 

  // tweak position and scale
  float dispOffset = -0.08;
  float dispScale = -0.85;

  // sample textures
  vec2 disp = ((st - (((origin-dispOffset)*dispScale)))-mouseOffset)+lensEffect;
  vec4 texture1 = texture2D(u_texture1, disp);
  vec4 texture2 = texture2D(u_texture2, disp);
  
  // blend both textures
  // reference: https://stackoverflow.com/questions/16984914/cross-fade-between-two-textures-on-a-sphere
  vec4 color = u_light * mix(texture1, texture2, smoothstep(-0.25, 0.25, fadePct));
  
  gl_FragColor = color;
}