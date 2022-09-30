import * as THREE from "three";
import { useEffect, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import { suspend, preload, clear } from "suspend-react";

export function useVideoTextures(videoPaths: string[]) {
  const gl = useThree((state) => state.gl);

  const texture = (path: string): Promise<THREE.VideoTexture> => {
    const { unsuspend, start, crossOrigin, muted, playsInline, loop } = {
      unsuspend: "loadedmetadata",
      crossOrigin: "Anonymous",
      muted: true,
      loop: true,
      start: true,
      playsInline: true,
    };

    return new Promise((res, rej) => {
      const video = Object.assign(document.createElement("video"), {
        src: path,
        crossOrigin,
        loop,
        muted,
        playsInline,
      });
      const texture = new THREE.VideoTexture(video);
      texture.encoding = gl.outputEncoding;
      video.addEventListener(unsuspend, (e) => {
        // console.log("video", video);
        start && texture.image.play();
        return res(texture);
      });
    });
  };

  const processTextures = suspend(async () => {
    return await Promise.all(videoPaths.map(texture));
  }, []);

  return processTextures;
}
