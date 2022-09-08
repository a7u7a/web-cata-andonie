import { ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";
import clipSpaceVert from "../shaders/clip-space.vert";
import textureDistorsionFrag from "../shaders/texture-distorsion.frag";
// following https://dev.to/eriksachse/create-your-own-post-processing-shader-with-react-three-fiber-usefbo-and-dreis-shadermaterial-with-ease-1i6d

const QuadTest = () => {
  const matRef = useRef<ShaderMaterial>(null!);
  const [textureA] = useLoader(TextureLoader, ["/imgs/cat_small.jpg"]);
  const size = useThree((state) => state.size);

  const uniforms = useMemo(
    () => ({
      u_texture: { value: textureA },
      u_resolution: { value: new Vector2(400, 400) },
      u_time: {
        value: 0.0,
      },
    }),
    [textureA]
  );

  useFrame((state) => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      matRef.current.needsUpdate = true;
    }
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        fragmentShader={textureDistorsionFrag}
        vertexShader={clipSpaceVert}
      />
    </ScreenQuad>
  );
};

const ShaderPostProcessing = () => {
  return (
    <Canvas>
      <QuadTest />
    </Canvas>
  );
};
export default ShaderPostProcessing;
