import { OrbitControls, ScreenQuad, shaderMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, Mesh } from "three";

import vertexShader from "../shaders/vert";
import fragmentShader from "../shaders/frag";
  
const MovingPlane = () => {
    // This reference will give us direct access to the mesh
    const mesh = useRef<Mesh>(null);
  
    return (
      <mesh ref={mesh} position={[0, 0, 0]} scale={1.0}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
      </mesh>
    );
  };

  const ThreeTest2 = () => {
    return (
        <Canvas camera={{ position: [0.0, 0.0, 1.0] }}>
          <MovingPlane />
          {/* <OrbitControls /> */}
        </Canvas>
      );
  };
  export default ThreeTest2;
  