import { meshBounds, ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";
import clipSpaceVert from "../shaders/clip-space.vert";
import textureDistorsionFrag from "../shaders/texture-distorsion.frag";
import wobbleDistorsion from "../shaders/wobble-distorsion.frag";
import { useControls } from "leva";
import UniformsControl from "./controls/uniform-controls";

// following https://dev.to/eriksachse/create-your-own-post-processing-shader-with-react-three-fiber-usefbo-and-dreis-shadermaterial-with-ease-1i6d

const QuadTest = () => {
  const matRef = useRef<ShaderMaterial>(null!);
  const [textureA] = useLoader(TextureLoader, ["/imgs/img3_small.png"]);

  UniformsControl(matRef);

  const size = useThree((state) => state.size);

  const uniforms = useMemo(() => {
    return {
      u_texture: { value: textureA },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_progress: { value: 5 },
      u_scale: { value: 0.5 },
      u_time: { value: 0.0 },
      u_speed: { value: 0.1 },
      u_size: { value: 0.5 },
    };
  }, [textureA]);

  useFrame((state) => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });
  useEffect(() => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_resolution.value.x = size.width*2
      matRef.current.uniforms.u_resolution.value.y = size.height*2;
    }
  }, [size]);
  return (
    <ScreenQuad>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        fragmentShader={wobbleDistorsion}
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
