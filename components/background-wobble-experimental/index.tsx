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
  const size = useThree((state) => state.size);
  Controls(matRef);
  const uniforms = useMemo(
    () => ({
      u_texture: { value: textureA },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_time: {
        value: 0.0,
      },
      u_progress: {
        value: progress,
      },
      u_scale: {
        value: scale,
      },
      u_speed: {
        value: speed,
      },
      u_imgAspect: {
        value: imgAspect,
      },
      u_imgScale: {
        value: imgScale,
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
        fragmentShader={distorsion}
        vertexShader={clipSpaceVert}
      />
    </ScreenQuad>
  );
};

const BackgroundWobbleExperimental = ({
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
        <BrightnessContrast brightness={-0.4} />
        <HueSaturation saturation={-1} />
      </EffectComposer>
    </Canvas>
  );
};

export default BackgroundWobbleExperimental;
