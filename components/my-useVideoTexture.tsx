import * as THREE from "three";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { suspend, preload, clear } from "suspend-react";

interface VideoTextureProps extends HTMLVideoElement {
  unsuspend?: "canplay" | "canplaythrough";
  start?: boolean;
  playsinline: boolean;
}

export function useVideoTexture(
  src: string,
  props: Partial<VideoTextureProps>
) {
  const { unsuspend, start, crossOrigin, muted, playsinline, loop, ...rest } = {
    unsuspend: "canplay",
    crossOrigin: "Anonymous",
    muted: true,
    loop: true,
    start: true,
    playsinline: true,
    ...props,
  };
  const gl = useThree((state) => state.gl);
  const texture = suspend<[url: string], () => Promise<THREE.VideoTexture>>(
    () =>
      new Promise((res, rej) => {
        // console.log("playsinline", playsinline);
        const video = Object.assign(document.createElement("video"), {
          src,
          crossOrigin,
          loop,
          muted,
          playsinline,
          ...rest,
        });
        const texture = new THREE.VideoTexture(video);
        texture.encoding = gl.outputEncoding;

        // get video dimensions
        video.addEventListener("loadedmetadata", () => {
          const height = video.videoHeight;
          const width = video.videoWidth;
          console.log("width", width, "height", height);
          // return res({width, height})
        });

        video.addEventListener("loadstart", (e) => {
          //   console.log("canplaytype", video);
          //   video.playsinline = true;
          //   console.log("texture", texture);
          //   console.log("video", video);
          //   console.log("event", e.type);
          // console.log("canplay", video.canPlayType("video/mp4"));
          // console.log("readyState at loadstart", video.readyState);
        });

        video.addEventListener("progress", (e) => {
          //   console.log("canplaytype", video);
          //   video.playsinline = true;
          //   console.log("texture", texture);
          //   console.log("video", video);
          //   console.log("event", e.type);
          // console.log("readyState at progress", video.readyState);
        });
        video.addEventListener(unsuspend, (e) => {
          // console.log("event", unsuspend, e.type);

          return res(texture);
        });
      }),
    [src]
  );
  useEffect(() => void (start && texture.image.play()), [texture]);
  return texture;
}

/*
tested mp4, webm, ogv video file

events tested on iOS Safari:
loadstart (fires)
progress (fires)
abort (not fired)
stalled (not fired)
error (not fired)
waiting (not fired)
canplay (not fired)
canplaythrough (not fired)
*/
