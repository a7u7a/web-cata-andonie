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
  BrightnessContrast,
  HueSaturation,
} from "@react-three/postprocessing";
import clipSpaceVert from "../shaders/clip-space.vert";
import wobbleBackgroundDistorsion from "../shaders/wobble-background-distorsion.frag";
import BackgroundControls from "./controls/background-controls";

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
}

const QuadLayer = ({
  progress,
  scale,
  src,
  imgAspect,
  imgScale,
}: BackgroundWobbleProps) => {
  const matRef = useRef<ShaderMaterial>(null!);
  const [textureA] = useLoader(TextureLoader, [src]);
  const size = useThree((state) => state.size);
  // BackgroundControls(matRef);
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
        value: 0.05,
      },
      u_imgAspect: {
        value: imgAspect,
      },
      u_imgScale:{
        value: imgScale,
      }
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
        fragmentShader={wobbleBackgroundDistorsion}
        vertexShader={clipSpaceVert}
      />
    </ScreenQuad>
  );
};

const BackgroundWobble = ({
  progress,
  scale,
  src,
  imgAspect,
  imgScale,
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
      />
      <EffectComposer>
        {/* <DotScreen angle={1.0} scale={0.7} /> */}
        <BrightnessContrast brightness={-0.3} />
        <HueSaturation saturation={-1} />
      </EffectComposer>
    </Canvas>
  );
};

export default BackgroundWobble;
