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
uniform float u_st2Scale;
uniform sampler2D u_texture;
uniform float u_alpha1; 
varying vec2 vUv;
uniform float u_tyles_y;
uniform float u_tyles_x;
uniform float u_posX;
uniform float u_posY;
uniform float u_mouseX;
uniform float u_mouseY;

float parabola( float x, float k ){
  return pow( u_progress*x*(1.0-x), k );
}

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*2.834),
                         _radius+(_radius*0.386),
                         dot(dist,dist)*4.0);
}

// todo:
// respect footage propotions and scale acording to canvas resolution

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  float t = u_time * 0.5;
  vec2 origin = st;

 // get parabola
  float y = parabola(st.x,1.264)*u_originScale;
  float x = parabola(st.y,1.264)*u_originScale;
  
  // apply parabola to mouse/slider pos
  vec2 offset = vec2(u_mouseX*y, u_mouseY*x);

  // tiling
  st.x *= u_tyles_x;
  st.y *= u_tyles_y;
  st = fract(st);

  // scale
  float s = 0.5;
  st = (st+u_st2Scale)*u_stScale; 

  // works but too tripy
  // float y2 = parabola(st.x,1.264);
  // float x2 = parabola(st.y,1.264);
  // vec2 off2 = vec2(x2,y2);
  // st = st +off2;

  // zoom lens effect, add to total
  vec2 lens = (vec2(circle(st, 0.9)) / 3.0); 


  // find out why the tiles get stretched!

  vec4 color = texture2D(u_texture, ((st - (origin-u_stScale)*u_st2Scale))-offset);
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