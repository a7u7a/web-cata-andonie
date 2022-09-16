// receives a texture and distorts it. used by ScreenQuad
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform float u_progress;
uniform float u_originScale;
uniform float u_time;
uniform float u_scale;
uniform float u_speed;
uniform float u_stScale;
uniform sampler2D u_texture;
uniform float u_alpha1; 
varying vec2 vUv;
uniform float u_tyles_y;
uniform float u_tyles_x;
uniform float u_posX;
uniform float u_posY;

float parabola( float x, float k ){
  return pow( u_progress*x*(1.0-x), k );
}

// todo:
// make it so that sampled uv it never goes out of bounds
// add sublte zoom effect on each cell

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  float y = parabola(st.x,1.264);
  
  //vec3 color = vec3(0.0);
  vec2 offset = vec2(u_posX+y, u_posY);
  vec2 origin = st;
  //origin = ((origin/u_originScale)/vec2(u_scale));


  st.x *= u_tyles_x;
  st.y *= u_tyles_y;
  st = fract(st);

  //color = vec3(st,0.0);
  vec4 color = texture2D(u_texture, ((st*u_stScale) + ((offset)+(origin*u_originScale))));
  gl_FragColor = vec4(color.x,color.y,color.z, u_alpha1);


  // // vec2 uv = vUv;
  // vec2 newUV = uv;
  // vec2 centeredUV = 1.0 * uv;

  // newUV = uv + centeredUV * vec2(1.0);
  // float newTime = u_time * u_speed;

  // float progress = u_progress;
  // vec2 p = 1.0 * uv - vec2(1.0);
  
  // p += u_progress * 0.1 * cos(u_scale * 3.7 * p.yx + newTime * 1.8 + vec2(2.2,3.4));
  // p += u_progress * 0.1 * cos(u_scale * 3.7 * p.yx + newTime * 2.6 + vec2(2.2,1.4));
  // p += u_progress * 0.1 * sin(u_scale * 3.0 * p.yx + newTime + vec2(1.2,3.4));

  // // p += u_progress * 0.1 * cos(u_scale * 7.7 * p.yx + newTime * 3.6 + vec2(10.2,3.4));

  // //   float xDisp = sin(u_time + uv.x * 15.0); 
  // //   float yDisp = sin(u_time + uv.y * 15.0);
  // //   vec2 disp = vec2(xDisp * 0.2, yDisp * 0.02 );

  // newUV.x = mix(uv.x, length(p)/2.0, 0.1);
  // newUV.y = mix(uv.y, length(p), 0.1);
  // vec4 color = texture2D(u_texture, newUV);
  // // gl_FragColor = vec4(length(p)-1.,length(p)-1.,length(p)-1.,1.0);
  // // gl_FragColor = vec4(newUV.y,newUV.x,newUV.y,1.0);
  // float a = abs((length(p)/2.0)-1.0);
  // color = vec4(color.x, color.y, color.z, u_alpha1);
  // gl_FragColor = color;   
}