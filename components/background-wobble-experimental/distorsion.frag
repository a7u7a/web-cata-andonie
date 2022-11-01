// receives a texture and distorts it. used by ScreenQuad
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_p1;
uniform float u_p2;
uniform float u_p3;
uniform float u_time;
uniform float u_scale;
uniform float u_speed;
uniform float u_imgAspect; 
uniform float u_imgScale;
uniform sampler2D u_texture;
 
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float newTime = u_time * u_speed;

  // Scale responsive to fit height
  float scale = u_imgScale;
  float canvasAspect = u_resolution.x / u_resolution.y;
  float imgAspect = u_imgAspect; // asumes 1280 x 720 texture resolution
  float scaleX = (scale * imgAspect) / canvasAspect;
  float scaleY = scale;
  st = ((st - 0.5)/vec2(scaleX, scaleY)) + 0.5;

  // vec2 p = st;
  // p +=  cos(u_progress);
  // p +=  tan(u_progress/2.0);

  // p += u_progress * 9.1 * cos(u_scale * 8.7 * p.yx + (newTime*2.0) + vec2(-1.2,3.4));
  // p += u_progress * 4.1 * cos(u_scale * 8.7 * p.yx + newTime + vec2(2.2,3.4));
  // p += u_progress * .3 * cos(u_scale * 5.7 * p.yx + newTime * 2.6 + vec2(2.2,1.4));
  // p += u_progress * 3.1 * sin(u_scale * 3.0 * p.yx + newTime + vec2(1.2,3.4));
  // p += u_progress * 0.1 * cos(u_scale * 7.7 * p.yx + newTime * 3.6 + vec2(10.2,3.4));
  // 
  //   float xDisp = sin(u_time + st.x * 15.0); 
  //   float yDisp = sin(u_time + st.y * 15.0);
  //   vec2 disp = vec2(xDisp * 0.2, yDisp * 0.02 );

  // float r = -0.687328364064339;
  // float pct = distance(st,vec2(0.4))/r + distance(st,vec2(d)/r);

  // point
  vec2 p = vec2(u_p1, u_p2);
  // distance from st to point
  float d = distance(st, p);
  float ss = smoothstep(0.6,0.1,d);
  // get vector from st to point
  vec2 v =  (st*ss);
  vec4 color = texture2D(u_texture, v);

  // cirle
  // float pct = distance(st,vec2(0.5))*u_p3;
  // float left = smoothstep(u_p1,u_p2,pct);
  // vec2 newST = vec2(0.0,0.0);
  // newST.x = mix(st.x, pct, 0.1);
  // newST.y = mix(st.y, pct, 0.1);
  // vec4 color = texture2D(u_texture, newST);

  color = vec4(color.x, color.y, color.z, 1.0);
  gl_FragColor = color;   
}