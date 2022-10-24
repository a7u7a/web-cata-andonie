import { Plane, useVideoTexture } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { ShaderMaterial } from "three";

import { MyUseVideoTexture } from "../hooks/my-useVideoTexture";

const VideoLayer = () => {
  const matRef = useRef<ShaderMaterial>(null!);

  const videoPath = "/videos/agua.mp4";

  const videoOptions = {
    crossOrigin: "Anonymous",
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
  };

  const texture = MyUseVideoTexture(videoPath,videoOptions);
//   const texture = useVideoTexture(videoPath,videoOptions);


  return (
    <Plane args={[16, 9]}>
      <meshBasicMaterial map={texture} toneMapped={false} />
    </Plane>
  );
};

const VideoText = () => {
  return (
    <div className="absolute z-0 w-full">
      <Canvas>
        <VideoLayer />
      </Canvas>
    </div>
  );
};

export default VideoText;
