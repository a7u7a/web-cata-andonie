import { useEffect, useMemo, useRef, useState } from "react";
import {
  ScreenQuad,
  RenderTexture,
  useFBO,
  PerspectiveCamera,
  Box,
  TorusKnot,
  OrbitControls,
} from "@react-three/drei";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  createPortal,
} from "@react-three/fiber";
import {
  ShaderMaterial,
  TextureLoader,
  Vector2,
  LinearToneMapping,
  Scene,
  Camera,
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
import baseFragment from "./base.frag";
import halftoneShader from "./halftone.frag"
import Controls from "./controls";
// import Halftone from "./halftone";
import NoiseDistorsion from "./noise-distorsion";
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
  const size = useThree((state) => state.size);
  // Controls(matRef);
  const uniforms = useMemo(
    () => ({
      u_texture: { value: textureA },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_imgAspect: { value: imgAspect },
      u_time: { value: 0.0 },
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
        fragmentShader={baseFragment}
        vertexShader={clipSpaceVert}
      />
    </ScreenQuad>
  );
};

/**
 * This component will use a screenquad and a custom shader to display an image and move it around the screen
 */

// function SpinningThing() {
//   const mesh = useRef<THREE.Mesh>(null!);
//   useFrame(() => {
//     mesh.current.rotation.x =
//       mesh.current.rotation.y =
//       mesh.current.rotation.z +=
//         0.01;
//   });
//   return (
//     <TorusKnot ref={mesh} args={[1, 0.4, 100, 64]}>
//       <meshNormalMaterial />
//     </TorusKnot>
//   );
// }

/**
 * Then, this component will take the above scene and output it as a render texture.
 * This texture will be fed to our halftone shader
 * Then finally, we will use EffectsComposer to apply the noise displacement.
 */

const UseFBOScene = () => {
  const matRef = useRef<ShaderMaterial>(null!);
  const size = useThree((state) => state.size);

  useFrame((state) => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      matRef.current.needsUpdate = true;
      // here we update the texture we get from FBO
      matRef.current.uniforms.u_texture.value = target.texture;
    }
  });
  useEffect(() => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_resolution.value.x = size.width * 2;
      matRef.current.uniforms.u_resolution.value.y = size.height * 2;
    }
  }, [size]);

  // const cam = useRef<Camera>(null!);
  const scene = useMemo(() => {
    const scene = new Scene();
    // here we can tweak the scene settings
    // scene.background = new THREE.Color(color)
    return scene;
  }, []);
  const target = useFBO();
  useFrame((state) => {
    // cam.current.position.z =
    //   5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2;
    state.gl.setRenderTarget(target);
    // state.gl.render(scene, cam.current);
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  });

  const uniforms = useMemo(
    () => ({
      u_texture: { value: null },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_time: { value: 0.0 },
      shape: { value: 1 },
      radius: { value: 0.4 },
      rotateR: { value: (Math.PI / 12) * 1 },
      rotateG: { value: (Math.PI / 12) * 2 },
      rotateB: { value: (Math.PI / 12) * 3 },
      scatter: { value: 2.2 },
      width: { value: 130 },
      height: { value: 130 },
      blending: { value: 1 },
      blendingMode: { value: 1 },
      greyscale: { value: true },
      disable: { value: false },
    }),
    []
  );

  return (
    <>
      {/* <PerspectiveCamera ref={cam} position={[0, 0, 3]} /> */}
      {/* Put object into scene */}
      {/* {createPortal(<SpinningThing />, scene)} */}
      {createPortal(
        <QuadLayer
          progress={0.5}
          scale={0.8}
          src={"/shader-backgrounds/1.png"}
          imgAspect={1.77}
          imgScale={2.0}
          speed={-0.02}
        />,
        scene
      )}
      {/* <Box args={[3, 3, 3]}>
        <meshStandardMaterial map={target.texture} />
      </Box> */}
      <ScreenQuad>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          fragmentShader={halftoneShader}
          vertexShader={clipSpaceVert}
        />
      </ScreenQuad>
    </>
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
  const { noiseScale } = useControls({
    noiseScale: {
      value: 0.88,
      min: 0,
      max: 4,
      step: 0.001,
    },
  });
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
      <ambientLight intensity={1} />
      <OrbitControls />
      <UseFBOScene />
      <EffectComposer>
        {/* <DotScreen angle={1.0} scale={1.5} /> */}
        {/* <Outline /> */}
        <NoiseDistorsion u_scale={noiseScale} />
        {/* <Halftone
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
        /> */}
        <BrightnessContrast brightness={-0.3} contrast={0.5} />

        {/* <Bloom intensity={5} radius={2.1}/> */}
        {/* <HueSaturation saturation={-1} /> */}
      </EffectComposer>
      {/* <QuadLayer
        progress={progress}
        scale={scale}
        src={src}
        imgAspect={imgAspect}
        imgScale={imgScale}
        speed={speed}
      /> */}
    </Canvas>
  );
};

export default BackgroundNoiseDisplacement;
