import { meshBounds, ScreenQuad, Plane } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { ShaderMaterial, TextureLoader, Vector2, sRGBEncoding } from "three";
// import clipSpaceVert from "../shaders/clip-space.vert";
// import textureDistorsionFrag from "../shaders/texture-distorsion.frag";
// import wobbleDistorsion from "../shaders/wobble-distorsion.frag";
// import { useControls } from "leva";

// following https://dev.to/eriksachse/create-your-own-post-processing-shader-with-react-three-fiber-usefbo-and-dreis-shadermaterial-with-ease-1i6d

const QuadTest = () => {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/videos/AT_1.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
      autoplay: true,
    })
  );
  console.log(video);
  useEffect(() => void video.play(), []);
  return (
    <Plane args={[16/1.5, 9/1.5]}>
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={sRGBEncoding} />
      </meshBasicMaterial>
    </Plane>
  );
};

const VideoTextureQuad = () => {
  return (
    <Canvas>
      <QuadTest />
    </Canvas>
  );
};
export default VideoTextureQuad;
