import { useEffect, useMemo, useRef, useState } from "react";
import { ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  ShaderMaterial,
  TextureLoader,
  Vector2,
  LinearToneMapping,
} from "three";
import clipSpaceVert from "../shaders/clip-space.vert";
import backgroundDistorsion from "../shaders/background-distorsion.frag";

/**
 * This component will take a shader and a list of images as textures for the shader.
 * It will apply the shader to the images and also rotate the images and animate the shader.
 * Also it will apply a postprocessing effect of black and white and film grain
 */

const QuadLayer = () => {
  const matRef = useRef<ShaderMaterial>(null!);
  const [textureA] = useLoader(TextureLoader, ["/imgs/img3.png"]);
  const size = useThree((state) => state.size);

  const uniforms = useMemo(
    () => ({
      u_texture: { value: textureA },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_time: {
        value: 0.0,
      },
    }),
    [textureA]
  );

  useFrame((state) => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      matRef.current.needsUpdate = true;
    }
  });
  useEffect(() => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_resolution.value.x = size.width * 2;
      matRef.current.uniforms.u_resolution.value.y = size.height * 2;
    }
  }, [size]);

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        fragmentShader={backgroundDistorsion}
        vertexShader={clipSpaceVert}
      />
    </ScreenQuad>
  );
};

const BackgroundShader = () => {
  return (
    <Canvas
      style={{ background: "#000000" }}
      gl={{
        powerPreference: "high-performance",
        toneMapping: LinearToneMapping,
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false,
      }}
    >
      <QuadLayer />
    </Canvas>
  );
};

export default BackgroundShader;
