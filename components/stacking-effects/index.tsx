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
  Bloom,
  DotScreen,
  Outline,
  BrightnessContrast,
  Noise,
  HueSaturation,
} from "@react-three/postprocessing";
import clipSpaceVert from "./clip-space.vert";
import distorsion from "./distorsion.frag";
import Controls from "./controls";
import Halftone from "./halftone";
import { useControls } from "leva";

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
      u_p: { value: 0.0 },
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
      u_imgAspect: {
        value: imgAspect,
      },
      u_imgScale: {
        value: imgScale,
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
  const { height } = useControls({
    height: {
      value: 130,
      min: 0,
      max: 200,
      step: 0.1,
    },
  });
  const { width } = useControls({
    width: {
      value: 130,
      min: 0,
      max: 200,
      step: 0.1,
    },
  });
  const { shape } = useControls({
    shape: {
      value: 1,
      min: 0,
      max: 4,
      step: 1,
    },
  });
  const { radius } = useControls({
    radius: {
      value: 0.7,
      min: 0.1,
      max: 4,
      step: 0.1,
    },
  });
  const { rotateR } = useControls({
    rotateR: {
      value: 12,
      min: 1,
      max: 30,
      step: 0.1,
    },
  });
  const { rotateG } = useControls({
    rotateG: {
      value: 12,
      min: 1,
      max: 30,
      step: 0.1,
    },
  });
  const { rotateB } = useControls({
    rotateB: {
      value: 12,
      min: 1,
      max: 30,
      step: 0.1,
    },
  });
  const { scatter } = useControls({
    scatter: {
      value: 0,
      min: 0,
      max: 5,
      step: 0.1,
    },
  });

  const { disable } = useControls({ disable: false });
  const { greyscale } = useControls({ greyscale: false });
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
        {/* <Outline /> */}
        <BrightnessContrast brightness={-0.3} contrast={0.5} />
        <Halftone
          shape={shape}
          radius={radius}
          width={width}
          height={height}
          disable={disable}
          rotateR={(Math.PI / rotateR) * 1}
          rotateG={(Math.PI / rotateG) * 2}
          rotateB={(Math.PI / rotateB) * 3}
          greyscale={greyscale}
          scatter={scatter}
        />
        {/* <Bloom intensity={5} radius={2.1}/> */}
        {/* <HueSaturation saturation={-1} /> */}
      </EffectComposer>
    </Canvas>
  );
};

export default BackgroundNoiseDisplacement;
