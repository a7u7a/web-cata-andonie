import { ScreenQuad, OrbitControls, Plane } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { ShaderMaterial, TextureLoader, Vector2, Mesh, Vector3 } from "three";
import clipSpaceVert from "../shaders/clip-space.vert";
import patternDistorsion from "../shaders/pattern-distorsion.frag";
import { useVideoTexture } from "./my-useVideTexture";
import { useSpring, animated, config } from "@react-spring/three";
import PatternControls from "./controls/pattern-controls";

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
  useFrame(({ mouse }) => {
    matRef.current.uniforms.u_mouseX.value = -mouse.x;
    matRef.current.uniforms.u_mouseY.value = -mouse.y;
  });

  const matRef = useRef<ShaderMaterial>(null!);
  const quadRef = useRef<Mesh>(null!);

  const vPath1 = "/videos/sagrada.mp4";
  const vPath2 = "/videos/pasillo.mp4";
  const vPath3 = "/videos/sagrada.mp4";

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

  videoTexture2.dispose()

  const [imgTexture] = useLoader(TextureLoader, ["imgs/orb.jpg"]);

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
      u_fadeProgress: { value: 0 },
      u_time: { value: 0.0 },
      u_tyles_y: { value: 15 },
      u_tyles_x: { value: 25 },
      u_light: { value: .9 },
    };
  }, [videoTexture1, videoTexture2]);

  useFrame((state) => {
    if (matRef.current.uniforms) {
      const t = state.clock.elapsedTime;
      matRef.current.uniforms.u_time.value = t;
    }
  });

  // provide resolution to shader
  useEffect(() => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_resolution.value.x = size.width * 2;
      matRef.current.uniforms.u_resolution.value.y = size.height * 2;


    }
  }, [size]);

  // play pause
  useEffect(() => {
    

    if (isPlay) {
      videoTexture1.image.play();
      videoTexture2.image.play();
    } else {
      videoTexture1.image.pause();
      videoTexture2.image.pause();
    }
  }, [isPlay]);

  const [{ fadeProgress }] = useSpring(
    {
      fadeProgress: clicked ? 0 : 1,
      config:{duration:2000}
    },
    [clicked]
  );

  const { progress } = useSpring({
    progress: clicked ? 0 : 1,
    loop: true,
    config: { mass: 1, tension: 280, friction: 60, duration: 2000 },
  });

  return (
    <ScreenQuad ref={quadRef}>
      {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
      <animated.shaderMaterial
        transparent
        ref={matRef}
        uniforms={uniforms}
        uniforms-u_progress-value={progress}
        uniforms-u_fadeProgress-value={fadeProgress}
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
