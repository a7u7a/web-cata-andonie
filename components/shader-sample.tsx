import { ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { ShaderMaterial } from "three";
import baseVertex from "../shaders/base-vertex.glsl";
import colorCycle from "../shaders/color-cycle.glsl"
// Basic example showing a simple time based shader

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
        fragmentShader={colorCycle}
        vertexShader={baseVertex}
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
