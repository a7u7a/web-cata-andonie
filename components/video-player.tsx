import { ScreenQuad, OrbitControls, Plane } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { ShaderMaterial, TextureLoader, Vector2, Mesh, Vector3 } from "three";
import clipSpaceVert from "../shaders/clip-space.vert";
import noiseTransition from "../shaders/noise-transition.frag";
import { useVideoTexture } from "./my-useVideoTexture";
import { useSpring, a, config } from "@react-spring/three";
import PatternControls from "./controls/pattern-controls";
import { VideoNavProps } from "../lib/interfaces";

// here we try to pass the video as a texture to the shader

interface VideoPlayerProps {
  videoNav: VideoNavProps;
}

const VideoLayer = ({ videoNav }: VideoPlayerProps) => {
  const matRef = useRef<ShaderMaterial>(null!);
  const size = useThree((state) => state.size);

  const vPath1 = "/videos/faro_zoom.mp4";
  const vPath2 = "/videos/pasillo.mp4";
  const vPath3 = "/videos/sagrada.mp4";
  const vPath4 = "/videos/agua.mp4";

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

  const videoTexture3 = useVideoTexture(vPath3, {
    unsuspend: "canplaythrough",
    muted: true,
    loop: true,
    start: true,
    crossOrigin: "Anonymous",
    playsinline: true,
  });

  const videoTexture4 = useVideoTexture(vPath4, {
    unsuspend: "canplaythrough",
    muted: true,
    loop: true,
    start: true,
    crossOrigin: "Anonymous",
    playsinline: true,
  });

  const [imgTexture] = useLoader(TextureLoader, ["imgs/orb.jpg"]);

  PatternControls(matRef);

  const uniforms = useMemo(() => {
    return {
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_texture1: { value: videoTexture1 },
      u_texture2: { value: videoTexture2 },
      u_mouseX: { value: 0 },
      u_scaleX: { value: 1 },
      u_scaleY: { value: 1 },
      u_offX: { value: 1 },
      u_offY: { value: 0.5 },
      u_mouseY: { value: 0 },
      u_posX: { value: 0.0 },
      u_posY: { value: 0.0 },
      u_progress: { value: 0 },
      u_fadeProgress: { value: 0 },
      u_time: { value: 0.0 },
      u_tyles_y: { value: 15 },
      u_tyles_x: { value: 25 },
      u_light: { value: 0.9 },
    };
  }, [videoTexture1, videoTexture2]);

  //
  useFrame((state) => {
    if (matRef.current.uniforms) {
      const t = state.clock.elapsedTime;
      matRef.current.uniforms.u_time.value = t;
    }
  });

  // Update canvas resolution
  useEffect(() => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_resolution.value.x = size.width;
      matRef.current.uniforms.u_resolution.value.y = size.height;
    }
  }, [size]);

  const [currentTexture, setCurrentTexture] = useState(0);

  /**
   * Swap textures between each of the shader`s
   * channels, following the playlist's order
   */
  useEffect(() => {
    console.log("videoTexture1", videoTexture1.image);
    const playlist = [
      videoTexture1,
      videoTexture2,
      videoTexture3,
      videoTexture4,
    ];
    const _ = Math.abs(currentTexture + videoNav.direction) % playlist.length;
    playlist[_].image.play();

    if (videoNav.toggle) {
      matRef.current.uniforms.u_texture2.value = playlist[_];
    } else {
      matRef.current.uniforms.u_texture1.value = playlist[_];
    }
    setCurrentTexture(currentTexture + videoNav.direction);
  }, [videoNav]);

  // pause invisible texture
  //playlist[currentTexture].image.pause()

  const [{ fadeProgress }] = useSpring(
    {
      fadeProgress: videoNav.toggle ? 0 : 1,
      config: { duration: 500 },
    },
    [videoNav]
  );

  // const { progress } = useSpring({
  //   progress: clicked ? 0 : 1,
  //   loop: () => console.log("progress loop"),
  //   config: { mass: 1, tension: 280, friction: 60, duration: 2000 },
  // });

  return (
    <ScreenQuad>
      {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
      <a.shaderMaterial
        transparent
        ref={matRef}
        uniforms={uniforms}
        // uniforms-u_progress-value={progress}
        uniforms-u_fadeProgress-value={fadeProgress}
        fragmentShader={noiseTransition}
        vertexShader={clipSpaceVert}
      />
    </ScreenQuad>
  );
};

const VideoPlayer = ({ videoNav }: VideoPlayerProps) => {
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
      <VideoLayer videoNav={videoNav} />
    </Canvas>
  );
};
export default VideoPlayer;
