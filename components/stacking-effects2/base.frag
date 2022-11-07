#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_imgAspect;
varying vec2 vUv;

/* Shows a texture, scales it move it around */
void main() {
  // todo: make it move the image around
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // Make image responsive to fit height
    // float scale = 2.0;
    // float canvasAspect = u_resolution.x / u_resolution.y;
    // float videoAspect = u_imgAspect;
    // float scaleX = (scale * videoAspect) / canvasAspect;
    // float scaleY = scale;
    // st = ((((st)-1.0)/vec2(scaleX, scaleY))) + 0.5;
    st = st + (u_time*0.01);

    gl_FragColor = texture2D( u_texture, st ); 
  }