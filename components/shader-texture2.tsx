import { ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";
import clipSpaceVert from "../shaders/clip-space.vert";
import textureDistorsionFrag from "../shaders/texture-distorsion.frag";
import wobbleDistorsion from "../shaders/wobble-distorsion.frag";
import { useControls } from "leva";

// following https://dev.to/eriksachse/create-your-own-post-processing-shader-with-react-three-fiber-usefbo-and-dreis-shadermaterial-with-ease-1i6d

const QuadTest = () => {
  const matRef = useRef<ShaderMaterial>(null!);
  const [textureA] = useLoader(TextureLoader, ["/imgs/img3_small.png"]);
  const size = useThree((state) => state.size);

  const { progress, scale } = useControls("Uniforms", {
    progress: {
      label: "Progress",
      value: 0,
      min: 0,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_progress.value = v;
          matRef.current.needsUpdate = true;
        }
      },
      transient: false,
    },
    scale: {
      label: "Scale",
      value: 0,
      min: 0,
      max: 5,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_scale.value = v;
          matRef.current.needsUpdate = true;
        }
      },
      transient: false,
    },
  });

  const uniforms = useMemo(() => {
    return {
      u_texture: { value: textureA },
      u_resolution: { value: new Vector2(800,800) },
      u_progress: { value: 0 },
      u_scale: { value: 0.1 },
      u_time: { value: 0.0 },
    };
  }, [textureA]);

  useFrame((state) => {
    if (matRef.current.uniforms) {
      matRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

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
