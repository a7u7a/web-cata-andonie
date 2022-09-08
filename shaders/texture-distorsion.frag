// receives a texture and distorts it. used by ScreenQuad
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture;
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float xDisp = sin(u_time + uv.x * 15.0); 
  float yDisp = sin(u_time + uv.y * 15.0);
  vec2 disp = vec2(xDisp * 0.2, yDisp * 0.02 );
  vec4 color = texture2D(u_texture, uv + disp);
  gl_FragColor = color;
}