import { useControls } from "leva";
import { MutableRefObject } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";

const PatternControls = (matRef: MutableRefObject<ShaderMaterial>) => {
  const { positionX, positionY } = useControls("Glass Pattern", {
    positionX: {
      label: "PosX",
      value: 0.0,
      min: -1,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_posX.value = v;
          // matRef.current.needsUpdate = true;
        }
      },
      transient: false,
    },
    positionY: {
      label: "PosY",
      value: 0.0,
      min: -1,
      max: 1,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_posY.value = v;
        }
      },
      transient: false,
    },
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
    offX: {
      label: "offX",
      value: 0,
      min: 0,
      max: 4,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_offX.value = v;
        }
      },
      transient: false,
    },
    offY: {
      label: "offY",
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_offY.value = v;
        }
      },
      transient: false,
    },
    scaleX: {
      label: "scaleX",
      value: 3.55,
      min: 0,
      max: 4,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_scaleX.value = v;
        }
      },
      transient: false,
    },
    scaleY: {
      label: "scaleY",
      value: 2,
      min: 0,
      max: 2,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_scaleY.value = v;
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
    tyles_y: {
      label: "Tiles Y",
      value: 15,
      min: 0,
      max: 20,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_tyles_y.value = v;
        }
      },
      transient: false,
    },
    tyles_x: {
      label: "Tiles X",
      value: 25,
      min: 0,
      max: 30,
      step: 0.00001,
      onChange: (v) => {
        if (matRef.current.uniforms) {
          matRef.current.uniforms.u_tyles_x.value = v;
        }
      },
      transient: false,
    },
  });
};

export default PatternControls;
