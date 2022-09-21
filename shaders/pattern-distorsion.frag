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
uniform float u_x1;
uniform float u_x2;
uniform float u_lens;

float parabola( float x, float k ){
  return pow( 0.8*x*(1.0-x), k );
}

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*2.834),
                         _radius+(_radius*0.186),
                         dot(dist,dist)*4.0);
}

float circle2(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
		return 1.-smoothstep(_radius-(_radius*1.474),
                        _radius+(_radius*0.786),
                        dot(dist,dist)*4.0);
}


float circleAlpha(in vec2 _st, in float _radius, in float prog){
  float p1 = mix(0.370,3.0 , prog); 
  float p2 = mix(-0.5, 1.5, prog);
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.132),
                        _radius+(_radius*p2),
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
  vec2 offset = vec2(u_posX*y, u_posY*x);
  // vec2 offset = vec2(u_mouseX*y, u_mouseY*x);

  // tiling
  st.x *= u_tyles_x;
  st.y *= u_tyles_y;
  st = fract(st);
  float alphaTest = circleAlpha(st, .9, u_progress);

  // idea: create a transition
  // progress u_x1 from 0 to 0.15 (increase refraction)
  // progress u_lens from 100 to 10 (increase lens effect)

  // float refraction = mix(0.0,0.15, u_progress);
  float refraction = 0.0;
  // float lensDistorsion = mix(200.0, 10.0, u_progress);
  float lensDistorsion = 200.0;

  // scale
  // st = (st - 0.5)*0.5;
  // vec2 lens = (vec2(circle(st, 1.9) / u_lens)); 
  vec2 lens = (vec2(circle(st, 1.9) / lensDistorsion)); 

  // increase intensity of lens effect on center of screen
  // lens =  lens +vec3(circle2(origin, 2.0));
  // invert
  // lens = 1.0 - lens;
  // scale centered
  float s = 0.5;
  st = (st-s)*refraction; 

  // works but too tripy
  // float y2 = parabola(st.x,1.264);
  // float x2 = parabola(st.y,1.264);
  // vec2 off2 = vec2(x2,y2);
  // st = st +off2;


  vec4 color = texture2D(u_texture, ((st - (((origin-u_stScale)*u_st2Scale)))-offset)+lens);
  gl_FragColor = vec4(color.x,color.y,color.z, alphaTest);

  // gl_FragColor = vec4(lens, u_alpha1);




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