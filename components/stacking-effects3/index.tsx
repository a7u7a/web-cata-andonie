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
  BrightnessContrast,
} from "@react-three/postprocessing";
import clipSpaceVert from "./clip-space.vert";
import baseFragment from "./base.frag";
import Controls from "./controls";
// import NoiseDistorsion from "./noise-distorsion";
import { useControls } from "leva";

interface BackgroundWobbleProps {
  progress: number;
  scale: number;
  src: string;
  imgAspect: number;
  imgScale: number;
  speed: number;
}

const QuadLayer = ({ src, imgAspect }: BackgroundWobbleProps) => {
  console.log("PageBackground render");
  const matRef = useRef<ShaderMaterial>(null!);
  const [textureA] = useLoader(TextureLoader, [src]);
  const size = useThree((state) => state.size);
  Controls(matRef);
  const uniforms = useMemo(
    () => ({
      u_texture: { value: textureA },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_imgAspect: { value: imgAspect },
      u_imgScale: { value: 2.5 },
      u_time: { value: 0.0 },
      u_progress: { value: 0.0 },
      u_speed: { value: 0.01 },
      u_scale: { value: 0.88 },
      u_p: { value: 0.01 },
      u_w1: { value: 1.0 },
      u_w2: { value: 1.0 },
      u_w3: { value: 1.0 },
      u_v2: { value: 1.0 },
      u_v4: { value: 0.9 },
      u_v5: { value: 0.4 },
      u_v6: { value: 0.4 },
      u_v7: { value: 0.4 },
    }),
    [textureA]
  );

  useFrame((state) => {
    // console.log("time", state.clock.elapsedTime);
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
        fragmentShader={baseFragment}
        vertexShader={clipSpaceVert}
      />
    </ScreenQuad>
  );
};

const PageBackground = ({
  progress,
  scale,
  src,
  imgAspect,
  imgScale,
  speed,
}: BackgroundWobbleProps) => {
  // const { noiseScale } = useControls({
  //   noiseScale: {
  //     value: 0.88,
  //     min: 0,
  //     max: 4,
  //     step: 0.001,
  //   },
  // });
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
        progress={0.5}
        scale={0.8}
        src={src}
        imgAspect={1.77}
        imgScale={2.0}
        speed={-0.02}
      />
      <EffectComposer>
        {/* <NoiseDistorsion u_scale={0.88} /> */}
        <BrightnessContrast brightness={-0.2} contrast={0.5} />
      </EffectComposer>
    </Canvas>
  );
};

export default PageBackground;
