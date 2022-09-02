import { ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { ShaderMaterial, TextureLoader } from "three";

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const frag = `
varying vec2 vUv;
uniform float u_time;
uniform sampler2D u_texture;
void main() {
  vec4 color = texture2D(u_texture, vUv);
  gl_FragColor = color;
}
`;

const QuadTest = () => {
  const matRef = useRef<ShaderMaterial>(null!);
  const [textureA] = useLoader(TextureLoader, ["/imgs/disp.jpeg"]);
  const uniforms = useMemo(
    () => ({
      u_texture: { type: "t", value: textureA },
      u_time: {
        value: 0.0,
      },
    }),
    [textureA]
  );

  useFrame((state) => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        fragmentShader={frag}
        vertexShader={vert}
      />
    </ScreenQuad>
  );
};

const ThreeTest4 = () => {
  return (
    <Canvas>
      <QuadTest />
    </Canvas>
  );
};
export default ThreeTest4;
