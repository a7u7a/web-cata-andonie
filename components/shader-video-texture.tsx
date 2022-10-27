import {
  ScreenQuad,
  Plane,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ShaderMaterial,
  TextureLoader,
  Vector2,
  sRGBEncoding,
  Vector3,
} from "three";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

interface VideoPlaneProps {
  imgPath: string;
}

const VideoPlane = ({ imgPath }: VideoPlaneProps) => {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: imgPath,
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
      autoplay: true,
    })
  );
  
  useEffect(() => void video.play(), []);
  return (
    <Plane args={[16, 9]}>
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={sRGBEncoding} />
      </meshBasicMaterial>
    </Plane>
  );
};

const VideoTextureQuad = () => {
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
      <OrbitControls makeDefault />
      <group position={[0,0,0]}>
        <VideoPlane imgPath="/videos/pulsos.mp4" />
      </group>
      <group position={[0,0,3]}>
        <VideoPlane imgPath="/videos/vidrio.mp4" />
      </group>
      
    </Canvas>
  );
};
export default VideoTextureQuad;
