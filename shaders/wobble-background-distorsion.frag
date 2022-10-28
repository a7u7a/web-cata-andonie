// receives a texture and distorts it. used by ScreenQuad
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_progress;
uniform float u_time;
uniform float u_scale;
uniform float u_speed;
uniform sampler2D u_texture;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

// Scale responsive to fit height
  float scale = 2.0;
  float canvasAspect = u_resolution.x / u_resolution.y;
  float videoAspect = 1.5229; // asumes 1280 x 720 texture resolution
  float scaleX = (scale * videoAspect) / canvasAspect;
  float scaleY = scale;
  st = ((st-0.5)/vec2(scaleX, scaleY)) +0.5;

  vec2 newST = st;
  vec2 centeredST = 1.0 * st;

  newST = st + centeredST * vec2(1.0);
  float newTime = u_time * u_speed;

  float progress = u_progress;
  vec2 p = 1.0 * st - vec2(1.0);
  
  p += u_progress * 4.1 * cos(u_scale * 8.7 * p.yx + newTime + vec2(2.2,3.4));
  // p += u_progress * 0.1 * cos(u_scale * 3.7 * p.yx + newTime * 2.6 + vec2(2.2,1.4));
  p += u_progress * 0.1 * sin(u_scale * 3.0 * p.yx + newTime + vec2(1.2,3.4));
  // p += u_progress * 0.1 * cos(u_scale * 7.7 * p.yx + newTime * 3.6 + vec2(10.2,3.4));

//   float xDisp = sin(u_time + st.x * 15.0); 
//   float yDisp = sin(u_time + st.y * 15.0);
//   vec2 disp = vec2(xDisp * 0.2, yDisp * 0.02 );


  newST.x = mix(st.x, length(p)/2.0, 0.1);
  newST.y = mix(st.y, length(p), 0.1);
  vec4 color = texture2D(u_texture, newST);
  // gl_FragColor = vec4(length(p)-1.,length(p)-1.,length(p)-1.,1.0);
  // gl_FragColor = vec4(newST.y,newST.x,newST.y,1.0);
  float a = abs((length(p)/2.0)-1.0);
  color = vec4(color.x, color.y, color.z, 1.0);
  gl_FragColor = color;   
}