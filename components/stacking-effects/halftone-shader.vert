varying vec2 vUV;
void mainSupport(const in vec2 uv) {
  vUV = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}