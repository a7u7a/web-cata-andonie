import { useControls } from "leva";
import { MutableRefObject } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";

const PatternControls = (matRef: MutableRefObject<ShaderMaterial>) => {
  const { progress, fadeProgress } = useControls("Noise shader", {
    fadeProgress: {
      label: "Fade Progress",
      value: 1,
      min: 0,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_fadeProgress.value = v;
        }
      },
      transient: false,
    },
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
    v2: {
      label: "v2",
      value: 0.25,
      min: 0,
      max: 2,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_v2.value = v;
        }
      },
      transient: false,
    },
    v3: {
      label: "v3",
      value: 0.25,
      min: 0,
      max: 2,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_v3.value = v;
        }
      },
      transient: false,
    },
    v4: {
      label: "v4",
      value: 0.746,
      min: 0,
      max: 2,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_v4.value = v;
        }
      },
      transient: false,
    },
    v5: {
      label: "v5",
      value: 1.106,
      min: 0,
      max: 2,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_v5.value = v;
        }
      },
      transient: false,
    },
    v6: {
      label: "v6",
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_v6.value = v;
        }
      },
      transient: false,
    },
    v7: {
      label: "v7",
      value: 0.75,
      min: 0,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_v7.value = v;
        }
      },
      transient: false,
    },
  });
};

export default PatternControls;
