// pass uvs in clip space coords. used by ScreenQuad
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}