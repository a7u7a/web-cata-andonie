import { meshBounds, ScreenQuad, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { ShaderMaterial, TextureLoader, Vector2, Mesh, Vector3 } from "three";
import clipSpaceVert from "../shaders/clip-space.vert";
import textureDistorsionFrag from "../shaders/texture-distorsion.frag";
import wobbleDistorsion from "../shaders/wobble-distorsion.frag";
import { useControls } from "leva";
import UniformsControl from "./controls/uniform-controls";
import { MutableRefObject } from "react";

// following https://dev.to/eriksachse/create-your-own-post-processing-shader-with-react-three-fiber-usefbo-and-dreis-shadermaterial-with-ease-1i6d

interface QuadTestProps {
  imgPath: string;
}

const ScreenQuadWithCustomShader = ({ imgPath }: QuadTestProps) => {
  const matRef = useRef<ShaderMaterial>(null!);
  const quadRef = useRef<Mesh>(null!);
  const [textureA] = useLoader(TextureLoader, [imgPath]);

  UniformsControl(matRef);

  const size = useThree((state) => state.size);

  const uniforms = useMemo(() => {
    return {
      u_texture: { value: textureA },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_progress: { value: 0.49 },
      u_scale: { value: 3.07 },
      u_time: { value: 0.0 },
      u_speed: { value: 0.38738 },
      u_direction: { value: 2.0 },
    };
  }, [textureA]);

  useFrame((state) => {
    // console.log("state.camera", state.camera);
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });
  useEffect(() => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_resolution.value.x = size.width * 2;
      matRef.current.uniforms.u_resolution.value.y = size.height * 2;
    }
  }, [size]);

  return (
    <ScreenQuad ref={quadRef}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        fragmentShader={wobbleDistorsion}
        vertexShader={clipSpaceVert}
      />
    </ScreenQuad>
  );
};

const ShaderTextureQuad = () => {
  return (
    <Canvas>
        <OrbitControls makeDefault />
      <ScreenQuadWithCustomShader imgPath="/imgs/nebula.jpg" />
    </Canvas>
  );
};
export default ShaderTextureQuad;
