import { useEffect, useMemo, useRef, useState } from "react";
import { ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";
import {
  EffectComposer,
  BrightnessContrast,
} from "@react-three/postprocessing";
import clipSpaceVert from "./clip-space.vert";
import baseFragment from "./base_2.frag";
import Controls from "./controls";
// import NoiseDistorsion from "./noise-distorsion";
import { useControls } from "leva";
import { linearMap, getRandomArbitrary } from "../../lib/utils";

interface BackgroundWobbleProps {
  progress: number;
  scale: number;
  src: string;
  imgAspect: number;
  imgScale: number;
  speed: number;
  brightness?: number;
  scroll: number;
}

const QuadLayer = ({ src, imgAspect, scroll }: BackgroundWobbleProps) => {
  const matRef = useRef<ShaderMaterial>(null!);
  const [textureA] = useLoader(TextureLoader, [src]);
  const size = useThree((state) => state.size);
  // Controls(matRef);
  const uniforms = useMemo(
    () => ({
      u_texture: { value: textureA },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_imgAspect: { value: imgAspect },
      u_imgScale: { value: 1.24 },
      u_time: { value: 0.0 },
      // random progress value gets added to time to make noise more random
      u_progress: { value: getRandomArbitrary(0.0, 10.0) },
      u_speed: { value: 0.053 },
      u_scale: { value: getRandomArbitrary(0.2, 0.6) },
      u_p: { value: 0.01 },
      u_w1: { value: 1.0 },
      u_w2: { value: 1.0 },
      u_w3: { value: 1.0 },
      u_v2: { value: 1.0 },
      u_v4: { value: 2.03 },
      // u_v5: { value: 0.4 },
      u_v5: { value: 0 },
      u_v6: { value: 0.33 },
      u_v7: { value: 0.42 },
    }),
    [textureA]
  );

  useEffect(() => {
    if (matRef.current.uniforms) {
      const test = linearMap(scroll, 0, 2000, -0.2, 8.02);
      matRef.current.uniforms.u_v2.value = test;
      // matRef.current.needsUpdate = true;
    }
  }, [scroll]);

  useFrame((state) => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      // matRef.current.needsUpdate = true;
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
  brightness = 0,
  scroll,
}: BackgroundWobbleProps) => {
  return (
    <Canvas
      style={{ background: "#000000" }}
      gl={{
        powerPreference: "high-performance",
        // toneMapping: LinearToneMapping,
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
        scroll={scroll}
      />
      <EffectComposer>
        {/* <NoiseDistorsion u_scale={0.88} /> */}
        <BrightnessContrast brightness={brightness} contrast={0.5} />
      </EffectComposer>
    </Canvas>
  );
};

export default PageBackground;
