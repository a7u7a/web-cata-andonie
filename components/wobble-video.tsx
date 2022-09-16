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

// here we try to pass the video as a texture to the shader

interface QuadTestProps {
  videoPath: string;
  fragShader: string;
  isPlay: boolean;
}

const VideoLayer = ({ videoPath, fragShader, isPlay }: QuadTestProps) => {
  const matRef = useRef<ShaderMaterial>(null!);
  const quadRef = useRef<Mesh>(null!);

  const videoTexture = useVideoTexture(videoPath, {
    unsuspend: "canplay",
    muted: true,
    loop: true,
    start: true,
    crossOrigin: "Anonymous",
    playsinline: true,
  });

  // PatternControls(matRef);

  const size = useThree((state) => state.size);

  const uniforms = useMemo(() => {
    return {
      u_texture: { value: videoTexture },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_originScale: { value: 0.5 },
      u_posX: { value: 0.10 },
      u_posY: { value: 0.22 },
      u_progress: { value: 0.5 },
      u_scale: { value: 0.62 },
      u_time: { value: 0.0 },
      u_speed: { value: 0.38738 },
      u_stScale: { value: 0.25 },
      u_alpha0: { value: 1 },
      u_alpha1: { value: 1 },
      u_tyles_y: { value: 6 },
      u_tyles_x: { value: 8 },
    };
  }, [videoTexture]);

  useFrame((state) => {
    // console.log("state.camera", state.camera);
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });
  useEffect(() => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_resolution.value.x = size.width * 2;
      matRef.current.uniforms.u_resolution.value.y = size.height * 2;
    }
  }, [size]);

  useEffect(() => {
    console.log("tex", videoTexture);
  }, [videoTexture]);

  useEffect(() => {
    if (isPlay) {
      videoTexture.image.play();
    } else {
      videoTexture.image.pause();
    }
  }, [isPlay]);

  return (
    <ScreenQuad ref={quadRef}>
      <shaderMaterial
        transparent
        ref={matRef}
        uniforms={uniforms}
        fragmentShader={fragShader}
        vertexShader={clipSpaceVert}
      />
    </ScreenQuad>
  );
};

interface WobbleVideoProps {
  isPlay: boolean;
}

const WobbleVideo = ({ isPlay }: WobbleVideoProps) => {
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
      {/* layer0 */}
      <group position={[0, 0, 0]}>
        <VideoLayer
          isPlay={isPlay}
          fragShader={wobbleDistorsionL0}
          videoPath="/videos/pulsos.mp4"
        />
      </group>
      {/* layer1 */}
      <group position={[0, 0, 3]}>
        <VideoLayer
          isPlay={isPlay}
          fragShader={patternDistorsion}
          videoPath="/videos/vidrio.mp4"
        />
      </group>
    </Canvas>
  );
};
export default WobbleVideo;