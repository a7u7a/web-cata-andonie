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
  useFrame(({ mouse }) => {
    // console.log("mouse.x", mouse.x);
    // console.log("mouse.y", mouse.y*10);
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

  PatternControls(matRef);

  const size = useThree((state) => state.size);

  const uniforms = useMemo(() => {
    return {
      u_texture1: { value: videoTexture1 },
      u_texture2: { value: videoTexture2 },
      u_mouseX: { value: 0 },
      u_mouseY: { value: 0 },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_posX: { value: 0.1 },
      u_posY: { value: 0.22 },
      u_progress: { value: 0.88 },
      u_time: { value: 0.0 },
      u_tyles_y: { value: 6 },
      u_tyles_x: { value: 8 },
      u_light:{value:0},
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
      {/* <group position={[0, 0, 0]}>
        <VideoLayer
          isPlay={isPlay}
          fragShader={wobbleDistorsionL0}
          videoPath="/videos/pulsos.mp4"
        />
      </group> */}
      {/* layer1 */}
      <group position={[0, 0, 3]}>
        <VideoLayer
          isPlay={isPlay}
          fragShader={patternDistorsion}
          videoPath="/videos/vidrio_noaudio.mp4"
        />
      </group>
    </Canvas>
  );
};
export default WobbleVideo;
