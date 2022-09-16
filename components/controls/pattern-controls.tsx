import { useControls } from "leva";
import { MutableRefObject } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";

const PatternControls = (matRef: MutableRefObject<ShaderMaterial>) => {
  const { originScale, positionX, positionY } = useControls(
    "Glass Pattern",
    {
      positionX: {
        label: "PosX",
        value: 0.10,
        min: -5,
        max: 5,
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
        value: 0.22,
        min: -3,
        max: 3,
        step: 0.00001,
        onChange: (v) => {
          if (matRef.current.uniforms) {
            matRef.current.uniforms.u_posY.value = v;
          }
        },
        transient: false,
      },
      stScale: {
        label: "st Scale",
        value: 0.25,
        min: -3,
        max: 15,
        step: 0.00001,
        onChange: (v) => {
          if (matRef.current.uniforms) {
            matRef.current.uniforms.u_stScale.value = v;
            // matRef.current.needsUpdate = true;
          }
        },
        transient: false,
      },
      // speed: {
      //   label: "Speed",
      //   value: 0.38738,
      //   min: 0,
      //   max: 5,
      //   step: 0.00001,
      //   onChange: (v) => {
      //     if (matRef.current.uniforms) {
      //       matRef.current.uniforms.u_speed.value = v;
      //     }
      //   },
      //   transient: false,
      // },
      originScale: {
        label: "Origin scale",
        value: 0.5,
        min: -5,
        max: 5,
        step: 0.00001,
        onChange: (v) => {
          if (matRef.current.uniforms) {
            matRef.current.uniforms.u_originScale.value = v;
          }
        },
        transient: false,
      },
      progress: {
        label: "Progress",
        value: 0.5,
        min: 0,
        max: 5,
        step: 0.00001,
        onChange: (v) => {
          if (matRef.current.uniforms) {
            matRef.current.uniforms.u_progress.value = v;
          }
        },
        transient: false,
      },
      // scale: {
      //   label: "Scale",
      //   value: 0.62,
      //   min: -3,
      //   max: 5,
      //   step: 0.00001,
      //   onChange: (v) => {
      //     if (matRef.current.uniforms) {
      //       matRef.current.uniforms.u_scale.value = v;
      //     }
      //   },
      //   transient: false,
      // },
      // alpha0: {
      //   label: "alpha0",
      //   value: 1,
      //   min: 0,
      //   max: 1,
      //   step: 0.00001,
      //   onChange: (v) => {
      //     if (matRef.current.uniforms) {
      //       matRef.current.uniforms.u_alpha0.value = v;
      //     }
      //   },
      //   transient: false,
      // },
      // alpha1: {
      //   label: "alpha1",
      //   value: 1,
      //   min: 0,
      //   max: 1,
      //   step: 0.00001,
      //   onChange: (v) => {
      //     if (matRef.current.uniforms) {
      //       matRef.current.uniforms.u_alpha1.value = v;
      //     }
      //   },
      //   transient: false,
      // },
      tyles_y: {
        label: "Tiles Y",
        value: 6,
        min: 0,
        max: 15,
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
        value: 8,
        min: 0,
        max: 15,
        step: 0.00001,
        onChange: (v) => {
          if (matRef.current.uniforms) {
            matRef.current.uniforms.u_tyles_x.value = v;
          }
        },
        transient: false,
      },
    }
  );
};

export default PatternControls;
