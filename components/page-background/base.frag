#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_imgAspect;
varying vec2 vUv;

uniform float u_p;
uniform float u_w1;
uniform float u_w2;
uniform float u_w3;
uniform float u_v2;
uniform float u_v4;
uniform float u_v5;
uniform float u_v6;
uniform float u_v7;
uniform float u_progress;
uniform float u_speed;
uniform float u_scale;
uniform float u_mouse_x;
uniform float u_mouse_y;
uniform float u_imgScale;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

void main() {

  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  float time = u_time * u_speed;
  
  // Add noise to coordinate system
  st += noise(st+(time+u_progress))*10.0; // Animate the coordinate space

  // Move coordinate system around in circles
  float theta = radians(mix(0.0, 360.0, time));
  // Apply circle 
  // st = vec2(st.x+(cos(theta)*0.9), st.y+(sin(theta)*0.1));
  float mouseScale = 0.0005;
  st = vec2(st.x + (cos(theta)*0.9) + (u_mouse_x * mouseScale), st.y + (sin(theta)*0.1) + (u_mouse_y * mouseScale));

  // Make image responsive to fit height
  float scale = u_imgScale;
  float canvasAspect = u_resolution.x / u_resolution.y;
  float videoAspect = u_imgAspect;
  float scaleX = (scale * videoAspect) / canvasAspect;
  float scaleY = scale;
  st = ((((st)-1.0)/vec2(scaleX, scaleY))) + 0.5;

  vec2 newST = vec2(0.0,0.0);
  newST.x = mix(st.x, u_v2, u_v6);
  newST.y = mix(st.y, u_v2, u_v7);
  vec4 color = texture2D(u_texture, newST);
  gl_FragColor = vec4(color);
}