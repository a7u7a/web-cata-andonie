import { useControls } from "leva";
import { MutableRefObject } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";

const BackgroundControls = (matRef: MutableRefObject<ShaderMaterial>) => {
  const { p1 } = useControls("Noise shader", {
    p1: {
      label: "p1",
      value: 0,
      min: 0,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_p1.value = v;
        }
      },
      transient: false,
    },
    p2: {
      label: "p2",
      value: 0,
      min: 0,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_p2.value = v;
        }
      },
      transient: false,
    },
    p3: {
      label: "p3",
      value: 0,
      min: 0,
      max: 3,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_p3.value = v;
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
