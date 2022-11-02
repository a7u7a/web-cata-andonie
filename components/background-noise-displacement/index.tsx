import { useEffect, useMemo, useRef, useState } from "react";
import { ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  ShaderMaterial,
  TextureLoader,
  Vector2,
  LinearToneMapping,
} from "three";
import {
  EffectComposer,
  DotScreen,
  Outline,
  BrightnessContrast,
  Noise,
  HueSaturation,
} from "@react-three/postprocessing";
import clipSpaceVert from "./clip-space.vert";
import distorsion from "./distorsion.frag";
import Controls from "./controls";

/**
 * This component will take a shader and a list of images as textures for the shader.
 * It will apply the shader to the images and also rotate the images and animate the shader.
 * Also it will apply a postprocessing effect of black and white and film grain
 */

interface BackgroundWobbleProps {
  progress: number;
  scale: number;
  src: string;
  imgAspect: number;
  imgScale: number;
  speed: number;
}

const QuadLayer = ({
  progress,
  scale,
  src,
  imgAspect,
  imgScale,
  speed,
}: BackgroundWobbleProps) => {
  const matRef = useRef<ShaderMaterial>(null!);
  const [textureA] = useLoader(TextureLoader, [src]);
  const [textureB] = useLoader(TextureLoader, ["/imgs/nebula.jpg"]);
  const size = useThree((state) => state.size);
  Controls(matRef);
  const uniforms = useMemo(
    () => ({
      u_texture: { value: textureA },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_texture1: { value: textureA },
      u_texture2: { value: textureB },
      u_progress: { value: 0 },
      u_w1: { value: 0.15 },
      u_w2: { value: 0.15 },
      u_w3: { value: 0.15 },
      u_v2: { value: 0.25 },
      u_v4: { value: 0.746 },
      u_v5: { value: 1.106 },
      u_time: {
        value: 0.0,
      },
      u_scale: {
        value: scale,
      },
      u_speed: {
        value: speed,
      },
    }),
    [textureA, textureB]
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
        fragmentShader={distorsion}
        vertexShader={clipSpaceVert}
      />
    </ScreenQuad>
  );
};

const BackgroundNoiseDisplacement = ({
  progress,
  scale,
  src,
  imgAspect,
  imgScale,
  speed,
}: BackgroundWobbleProps) => {
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
      <QuadLayer
        progress={progress}
        scale={scale}
        src={src}
        imgAspect={imgAspect}
        imgScale={imgScale}
        speed={speed}
      />
      <EffectComposer>
        {/* <DotScreen angle={1.0} scale={1.5} /> */}
        <Outline />
        <BrightnessContrast brightness={-0.0} />
        <HueSaturation saturation={-1} />
      </EffectComposer>
    </Canvas>
  );
};

export default BackgroundNoiseDisplacement;
