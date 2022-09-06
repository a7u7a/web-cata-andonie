import { ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { ShaderMaterial } from "three";

// Basic example showing a simple time based shader

const vert = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const frag = `
uniform float u_time;
uniform vec2 resolution;
vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);
void main() {
  vec3 color = vec3(0.0);
  float pct = abs(sin(u_time));
  color = mix(colorA, colorB, pct);
  gl_FragColor = vec4(color,1.0);
  #include <tonemapping_fragment>
  #include <encodings_fragment>
}
`;

const QuadTest = () => {
  const matRef = useRef<ShaderMaterial>(null!);
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
    }),
    []
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

const ShaderBasicSample = () => {
  return (
    <Canvas>
      <QuadTest />
    </Canvas>
  );
};
export default ShaderBasicSample;
