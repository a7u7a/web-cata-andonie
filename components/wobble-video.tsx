import { ScreenQuad, OrbitControls, Plane } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { ShaderMaterial, TextureLoader, Vector2, Mesh, Vector3 } from "three";
import clipSpaceVert from "../shaders/clip-space.vert";
import baseVert from "../shaders/base.vert";
import textureDistorsionFrag from "../shaders/texture-distorsion.frag";
import wobbleDistorsion from "../shaders/wobble-distorsion.frag";
import wobbleDistorsionL0 from "../shaders/wobble-distorsion-L0.frag";
import wobbleDistorsionL1 from "../shaders/wobble-distorsion-L1.frag";
import patternDistorsion from "../shaders/pattern-distorsion.frag";
import { useControls } from "leva";
import PatternControls from "./controls/pattern-controls";
import { MutableRefObject } from "react";
import { useVideoTexture } from "./my-useVideTexture";
import { useSpring, animated } from "@react-spring/three";

// here we try to pass the video as a texture to the shader

interface QuadTestProps {
  videoPath: string;
  fragShader: string;
  isPlay: boolean;
  clicked: boolean;
}

const VideoLayer = ({
  videoPath,
  fragShader,
  isPlay,
  clicked,
}: QuadTestProps) => {
  
  const { progress } = useSpring({
    progress: clicked ? 0 : 1,
    config: { duration: 2500 },
  });

  useFrame(({ mouse }) => {
    matRef.current.uniforms.u_mouseX.value = -mouse.x;
    matRef.current.uniforms.u_mouseY.value = -mouse.y;
  });

  const matRef = useRef<ShaderMaterial>(null!);
  const quadRef = useRef<Mesh>(null!);

  const vPath1 = "/videos/vidrio_noaudio.mp4";
  const vPath2 = "/videos/agua.mp4";

  const videoTexture1 = useVideoTexture(vPath1, {
    unsuspend: "canplaythrough",
    muted: true,
    loop: true,
    start: true,
    crossOrigin: "Anonymous",
    playsinline: true,
  });

  const videoTexture2 = useVideoTexture(vPath2, {
    unsuspend: "canplaythrough",
    muted: true,
    loop: true,
    start: true,
    crossOrigin: "Anonymous",
    playsinline: true,
  });

  const [imgTexture] = useLoader(TextureLoader, ["imgs/grid.jpg"]);

  // PatternControls(matRef);

  const size = useThree((state) => state.size);

  const uniforms = useMemo(() => {
    return {
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_texture1: { value: videoTexture1 },
      u_texture2: { value: videoTexture2 },
      u_mouseX: { value: 0 },
      u_mouseY: { value: 0 },
      u_posX: { value: 0.0 },
      u_posY: { value: 0.0 },
      u_progress: { value: 0 },
      u_time: { value: 0.0 },
      u_tyles_y: { value: 15 },
      u_tyles_x: { value: 25 },
      u_light: { value: 1 },
    };
  }, [videoTexture1, videoTexture2]);

  useFrame((state) => {
    // console.log("state.camera", state.camera);
    if (matRef.current.uniforms) {
      const t = state.clock.elapsedTime - 4.0;
      matRef.current.uniforms.u_time.value = t;
    }
  });

  // useEffect(() => {
  //   if (matRef.current.uniforms) {
  //     matRef.current.uniforms.u_mouseX.value.x = mouseX;
  //     matRef.current.uniforms.u_mouseY.value.y = mouseY;
  //   }
  // }, [mouseX, mouseY]);

  useEffect(() => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_resolution.value.x = size.width * 2;
      matRef.current.uniforms.u_resolution.value.y = size.height * 2;
    }
  }, [size]);

  // useEffect(() => {
  //   console.log("tex", videoTexture);
  // }, [videoTexture]);

  useEffect(() => {
    console.log("progress", progress);
  }, [progress]);

  useEffect(() => {
    if (isPlay) {
      videoTexture1.image.play();
      videoTexture2.image.play();
    } else {
      videoTexture1.image.pause();
      videoTexture2.image.pause();
    }
  }, [isPlay]);

  return (
    <ScreenQuad ref={quadRef}>
      {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
      <animated.shaderMaterial
        transparent
        ref={matRef}
        uniforms={uniforms}
        uniforms-u_progress-value={progress}
        fragmentShader={fragShader}
        vertexShader={clipSpaceVert}
      />
    </ScreenQuad>
  );
};

interface WobbleVideoProps {
  isPlay: boolean;
  clicked: boolean;
}

const WobbleVideo = ({ isPlay, clicked }: WobbleVideoProps) => {
  return (
    <Canvas
      style={{ background: "#000000" }}
      gl={{
        powerPreference: "high-performance",
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false,
      }}
    >
      <group position={[0, 0, 3]}>
        <VideoLayer
          isPlay={isPlay}
          clicked={clicked}
          fragShader={patternDistorsion}
          videoPath="/videos/vidrio_noaudio.mp4"
        />
      </group>
    </Canvas>
  );
};
export default WobbleVideo;
