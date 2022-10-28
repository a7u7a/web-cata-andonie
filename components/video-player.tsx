import {
  ScreenQuad,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  useEffect,
  useMemo,
  Suspense,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import {
  ShaderMaterial,
  TextureLoader,
  Vector2,
  Mesh,
  Vector3,
  LinearToneMapping,
} from "three";
import clipSpaceVert from "../shaders/clip-space.vert";
import linearFadeTransition from "../shaders/linear-fade-transition.frag";
import newTransition from "../shaders/new-transition.frag";
import patternTransition from "../shaders/pattern-transition.frag";
import noiseTransition from "../shaders/noise-transition.frag";
import { useVideoTextures } from "../hooks/my-useVideoTextures";
import { useSpring, a, config, SpringValue } from "@react-spring/three";
import PatternControls from "./controls/pattern-controls";
import { VideoNavProps } from "../interfaces/interfaces";

interface VideoPlayerProps {
  videoNav: VideoNavProps;
  isPlay: boolean;
}

const shuffledVideoPaths = [
  "/videos/faro.mp4",
  "/videos/pasillo.mp4",
  "/videos/sagrada.mp4",
  "/videos/agua.mp4",
].sort((a, b) => 0.5 - Math.random());

const VideoLayer = ({ videoNav, isPlay }: VideoPlayerProps) => {
  const matRef = useRef<ShaderMaterial>(null!);
  const size = useThree((state) => state.size);
  const playlist = useVideoTextures(shuffledVideoPaths);
  // PatternControls(matRef);

  const uniforms = useMemo(() => {
    return {
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_texture1: { value: playlist[0] },
      u_texture2: { value: playlist[1] },
      u_progress: { value: 0 },
      u_time: { value: 0.0 },
      u_scale: { value: 1 },
      u_w1: { value: 0 },
      u_w2: { value: 0 },
      u_w3: { value: 0 },
      u_light: { value: 0.9 },
      u_scroll: { value: 0.0 },
      u_xtiles: { value: 0.9 },
      u_ytiles: { value: 0.9 },
    };
  }, [playlist]);

  // unused
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

  const [currentTexture, setCurrentTexture] = useState(1);

  /**
   * Swap textures between each of the shader`s
   * channels, following the playlist's order
   */
  useEffect(() => {
    const nextVideoIndex =
      Math.abs(currentTexture + videoNav.direction) % playlist.length;
    if (videoNav.toggle) {
      matRef.current.uniforms.u_texture2.value = playlist[nextVideoIndex];
    } else {
      matRef.current.uniforms.u_texture1.value = playlist[nextVideoIndex];
    }
    setCurrentTexture(currentTexture + videoNav.direction);
  }, [videoNav]);

  const [faderProgress, setFaderProgress] = useState(0);

  const { progress } = useSpring({
    progress: videoNav.toggle ? 0 : 1,
    onChange: () => {
      // spring cumulative progress
      const p = progress.get();
      const dir = videoNav.direction;
      const dif = Math.abs(p - faderProgress) * dir;
      matRef.current.uniforms.u_progress.value += dif;
      setFaderProgress(p);
    },
    config: { mass: 1, tension: 280, friction: 60, duration: 500 },
  });

  return (
    <ScreenQuad>
      <Suspense fallback={<FallbackMaterial url="imgs/orb.jpg" />}>
        {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
        <a.shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          // uniforms-u_progress-value={progress}
          fragmentShader={linearFadeTransition}
          vertexShader={clipSpaceVert}
        />
      </Suspense>
    </ScreenQuad>
  );
};

function FallbackMaterial({ url }: { url: string }) {
  const texture = useTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

const VideoPlayer = ({ videoNav, isPlay }: VideoPlayerProps) => {
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
      <VideoLayer isPlay={isPlay} videoNav={videoNav} />
    </Canvas>
  );
};
export default VideoPlayer;
