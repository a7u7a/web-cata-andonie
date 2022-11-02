import { useControls } from "leva";
import { MutableRefObject } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";

const BackgroundControls = (matRef: MutableRefObject<ShaderMaterial>) => {
  const { w1 } = useControls("Noise shader", {
    progress: {
      label: "progress",
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
    p: {
      label: "p",
      value: 0.01,
      min: 0,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_p.value = v;
        }
      },
      transient: false,
    },
    w1: {
      label: "w1",
      value: 0.07,
      min: 0,
      max: 1,
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
      value: 1.0,
      min: 0,
      max: 1,
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
      value: 0.11,
      min: 0,
      max: 1,
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
      value: 1.0,
      min: 0,
      max: 1.5,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_v2.value = v;
        }
      },
      transient: false,
    },
    v4: {
      label: "v4",
      value: 0.9,
      min: 0,
      max: 1.5,
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
      value: 0.4,
      min: 0,
      max: 1.5,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_v5.value = v;
        }
      },
      transient: false,
    },
    scale: {
      label: "scale",
      value: 0.88,
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
      value: 0.01,
      min: 0.01,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_speed.value = v;
        }
      },
      transient: false,
    },
    imgScale: {
      label: "imgScale",
      value: 2.0,
      min: 0.01,
      max: 3,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_imgScale.value = v;
        }
      },
      transient: false,
    },
  });
};

export default BackgroundControls;
