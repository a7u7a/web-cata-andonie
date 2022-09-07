import { ScreenQuad } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";

// following https://dev.to/eriksachse/create-your-own-post-processing-shader-with-react-three-fiber-usefbo-and-dreis-shadermaterial-with-ease-1i6d

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const frag = `
varying vec2 vUv;
uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture;
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec4 color = texture2D(u_texture, uv + vec2(sin(u_time + uv.x * 15.0) * 0.2, sin(u_time + uv.y * 15.0) * 0.02 ));
  gl_FragColor = color;
}`;

const QuadTest = () => {
  const matRef = useRef<ShaderMaterial>(null!);
  const [textureA] = useLoader(TextureLoader, ["/imgs/img3.png"]);
  const size = useThree((state) => state.size);

  const uniforms = useMemo(
    () => ({
      u_texture: { value: textureA },
      u_resolution: { value: new Vector2(size.width * 2, size.height * 2) },
      u_time: {
        value: 0.0,
      },
    }),
    [textureA, size]
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
        fragmentShader={frag}
        vertexShader={vert}
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
