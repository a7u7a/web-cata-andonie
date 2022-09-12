import { useControls } from "leva";
import { MutableRefObject } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";

const UniformsControl = (matRef: MutableRefObject<ShaderMaterial>) => {
  const { progress, scale, speed } = useControls("Uniforms", {
    direction: {
      label: "Direction",
      value: 2,
      min: 0,
      max: 10,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_speed.value = v;
          // matRef.current.needsUpdate = true;
        }
      },
      transient: false,
    },
    speed: {
      label: "Speed",
      value: 0.38738,
      min: 0,
      max: 5,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_speed.value = v;
          // matRef.current.needsUpdate = true;
        }
      },
      transient: false,
    },
    progress: {
      label: "Progress",
      value: 0.49,
      min: 0,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_progress.value = v;
          // matRef.current.needsUpdate = true;
        }
      },
      transient: false,
    },
    scale: {
      label: "Scale",
      value: 3.07,
      min: 0,
      max: 5,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_scale.value = v;
          // matRef.current.needsUpdate = true;
        }
      },
      transient: false,
    },
    alpha0: {
      label: "alpha0",
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_alpha0.value = v;
          // matRef.current.needsUpdate = true;
        }
      },
      transient: false,
    },
    alpha1: {
        label: "alpha1",
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.00001,
        onChange: (v) => {
          if (matRef.current.uniforms) {
            matRef.current.uniforms.u_alpha1.value = v;
            // matRef.current.needsUpdate = true;
          }
        },
        transient: false,
      },
  });
};

export default UniformsControl;
