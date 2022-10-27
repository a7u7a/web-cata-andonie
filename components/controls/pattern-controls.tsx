import { useControls } from "leva";
import { MutableRefObject } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";

const PatternControls = (matRef: MutableRefObject<ShaderMaterial>) => {
  const { progress } = useControls("Noise shader", {
    progress: {
      label: "Progress",
      value: 0,
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

    light: {
      label: "Light",
      value: 0.9,
      min: 0,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_light.value = v;
        }
      },
      transient: false,
    },

    x_tiles: {
      label: "X tiles",
      value: 1,
      min: 1,
      max: 20,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_xtiles.value = v;
        }
      },
      transient: false,
    },
    y_tiles: {
      label: "Y tiles",
      value: 1,
      min: 1,
      max: 20,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_ytiles.value = v;
        }
      },
      transient: false,
    },

    scale: {
      label: "scale",
      value: 7.216,
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
    w1: {
      label: "w1",
      value: 0.15,
      min: 0,
      max: 3,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_w1.value = v;
        }
      },
      transient: false,
    },
    w2: {
      label: "w2",
      value: 0.15,
      min: 0,
      max: 3,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_w2.value = v;
        }
      },
      transient: false,
    },
    w3: {
      label: "w3",
      value: 0.15,
      min: 0,
      max: 3,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_w3.value = v;
        }
      },
      transient: false,
    },
  });
};

export default PatternControls;
