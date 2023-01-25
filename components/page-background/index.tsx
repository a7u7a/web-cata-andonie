import { useEffect, useMemo, useRef, useState } from "react";
import { ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";
import {
  EffectComposer,
  BrightnessContrast,
} from "@react-three/postprocessing";
import clipSpaceVert from "./clip-space.vert";
import baseFragment from "./base.frag";
import Controls from "./controls";
// import NoiseDistorsion from "./noise-distorsion";
import { useControls } from "leva";
import { linearMap, getRandomArbitrary } from "../../lib/utils";
import useMediaQuery from "../../lib/media";

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
  const isSm = useMediaQuery("(max-width: 640px)");
  const matRef = useRef<ShaderMaterial>(null!);
  const [texture] = useLoader(TextureLoader, [src]);
  const size = useThree((state) => state.size);
  // Controls(matRef);
  const uniforms = useMemo(
    () => ({
      u_texture: { value: texture },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_imgAspect: { value: imgAspect },
      u_imgScale: { value: 2.24 },
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
      u_v4: { value: 20.03 },
      // u_v5: { value: 0.4 },
      u_v5: { value: 0 },
      u_v6: { value: 0.33 },
      u_v7: { value: 0.42 },
      u_mouse_x: { value: 0 },
      u_mouse_y: { value: 0 },
    }),
    [texture]
  );

  // mouse coords
  // const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  // useEffect(() => {
  //   const handleWindowMouseMove = (event: Event) => {
  //     setGlobalCoords({
  //       // @ts-ignore
  //       x: event.screenX,
  //       // @ts-ignore
  //       y: event.screenY,
  //     });
  //   };
  //   window.addEventListener("mousemove", handleWindowMouseMove);

  //   return () => {
  //     window.removeEventListener("mousemove", handleWindowMouseMove);
  //   };
  // }, []);

  // useEffect(() => {
  //   // console.log("globalCoords", globalCoords);
  //   if (matRef.current.uniforms) {
  //     matRef.current.uniforms.u_mouse_x.value = globalCoords.x;
  //     matRef.current.uniforms.u_mouse_y.value = globalCoords.y;
  //     // matRef.current.needsUpdate = true;
  //   }
  // }, [globalCoords]);

  useEffect(() => {
    // do not update scroll on mobile
    // runs really sluggish even on high end iphone
    if (matRef.current.uniforms && !isSm) {
      const pre = linearMap(scroll, 0, 4000, -1, 1);
      if (pre < 1) {
        // this parabola gives it start and end transition to scroll
        const parabola = Math.pow(Math.cos((Math.PI * pre) / 2.0), 2.5);
        const value = linearMap(parabola, -1, 1, 6.02, -1.2);
        matRef.current.uniforms.u_v2.value = value;
      }
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
