import {
  ScreenQuad,
  OrbitControls,
  Plane,
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
import noiseTransition from "../shaders/noise-transition.frag";
import { useVideoTexture } from "./my-useVideoTexture";
import { useVideoTextures } from "./my-useVideoTextures";
import { useSpring, a, config } from "@react-spring/three";
import PatternControls from "./controls/pattern-controls";
import { VideoNavProps } from "../lib/interfaces";

interface VideoPlayerProps {
  videoNav: VideoNavProps;
  isPlay: boolean;
}

const VideoLayer = ({ videoNav, isPlay }: VideoPlayerProps) => {
  const matRef = useRef<ShaderMaterial>(null!);
  const size = useThree((state) => state.size);

  const videoPaths = [
    "/videos/faro.mp4",
    "/videos/pasillo.mp4",
    "/videos/sagrada.mp4",
    "/videos/agua.mp4",
  ];

  const playlist = useVideoTextures(videoPaths);

  const [imgTexture] = useLoader(TextureLoader, ["imgs/orb.jpg"]);

  PatternControls(matRef);

  const uniforms = useMemo(() => {
    return {
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_texture1: { value: playlist[0] },
      u_texture2: { value: playlist[1] },
      u_progress: { value: 0 },
      u_fadeProgress: { value: 0 },
      u_time: { value: 0.0 },
      u_scale: { value: 7.216 },
      u_w1: { value: 0.15 },
      u_w2: { value: 0.15 },
      u_w3: { value: 0.15 },
      u_v2: { value: 0.25 },
      u_v3: { value: 0.25 },
      u_v4: { value: 0.746 },
      u_v5: { value: 1.106 },
      u_v6: { value: 0.7 },
      u_v7: { value: 0.75 },
      u_light: { value: 0.9 },
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

  const [{ fadeProgress }] = useSpring(
    {
      fadeProgress: videoNav.toggle ? 0 : 1,
      config: { duration: 300 },
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
      <Suspense fallback={<FallbackMaterial url="imgs/orb.jpg" />}>
        {/* @ts-ignore: https://github.com/pmndrs/react-spring/issues/1515 */}
        <a.shaderMaterial
          transparent
          ref={matRef}
          uniforms={uniforms}
          uniforms-u_progress-value={fadeProgress}
          // uniforms-u_fadeProgress-value={fadeProgress}
          fragmentShader={noiseTransition}
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
