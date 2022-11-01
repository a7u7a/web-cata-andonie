import { useControls } from "leva";
import { MutableRefObject } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";

const BackgroundControls = (matRef: MutableRefObject<ShaderMaterial>) => {
  const { progress } = useControls("Noise shader", {
    progress: {
      label: "Progress",
      value: 1.0,
      min: 0,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_progress.value = v;
        }
      },
      transient: false,
    },
    scale: {
      label: "scale",
      value: 0.82,
      min: 0,
      max: 20,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_scale.value = v;
        }
      },
      transient: false,
    },
    speed: {
      label: "Speed",
      value: 0.05,
      min: 0.01,
      max: 5,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_speed.value = v;
        }
      },
      transient: false,
    },
  });
};

export default BackgroundControls;
