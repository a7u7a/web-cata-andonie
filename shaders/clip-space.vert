// pass uvs in clip space coords. used by ScreenQuad
void main() {
  gl_Position = vec4(position, 1.0);
}