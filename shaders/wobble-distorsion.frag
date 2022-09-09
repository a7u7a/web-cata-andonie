// receives a texture and distorts it. used by ScreenQuad
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_progress;
uniform float u_time;
uniform float u_scale;
uniform float u_speed;
uniform float u_size;
uniform sampler2D u_texture;
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 newUV = uv;
  vec2 centeredUV = 1.0 * uv;

  newUV = uv + centeredUV * vec2(1.0);
  float newTime = u_time * u_speed;

  float progress = u_progress;
  vec2 p = 1.0 * uv - vec2(1.0);
  
  p += u_progress * 0.1 * cos(u_scale * 3.7 * p.yx + newTime * 1.8 + vec2(2.2,3.4));
  p += u_progress * 0.1 * cos(u_scale * 5.7 * p.yx + newTime * 2.6 + vec2(4.2,1.4));
  p += u_progress * 0.4 * cos(u_scale * 3.0 * p.yx + newTime + vec2(1.2,3.4));
  p += u_progress * 0.1 * cos(u_scale * 7.7 * p.yx + newTime * 3.6 + vec2(10.2,3.4));

//   float xDisp = sin(u_time + uv.x * 15.0); 
//   float yDisp = sin(u_time + uv.y * 15.0);
//   vec2 disp = vec2(xDisp * 0.2, yDisp * 0.02 );


  newUV.x = mix(uv.x, length(p),progress);
  newUV.y = mix(uv.y, 0.0, progress);
  vec4 color = texture2D(u_texture, newUV);
  // gl_FragColor = vec4(length(p)-1.,length(p)-1.,length(p)-1.,1.0);
  // gl_FragColor = vec4(newUV.y,newUV.x,newUV.y,1.0);
  gl_FragColor = color;   
}