import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import ShaderBasicSample from "../components/shader-sample";
import ShaderTexture from "../components/shader-texture";
import ShaderTextureQuad from "../components/shader-texture2";
import VideoTextureQuad from "../components/shader-video-texture";
import VideoPlayer from "../components/video-player";
import { VideoNavProps } from "../interfaces/interfaces";

const Home: NextPage = () => {
  const [isPlay, setIsPlay] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [videoNav, setVideoNav] = useState<VideoNavProps>({
    toggle: false,
    direction: 0,
  });

  return (
    <div>
      <Head>
        <title>Catalina Andonie</title>
        <meta name="description" content="Catalina Andonie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative w-full h-[135vh]">
        <VideoPlayer isPlay={isPlay} videoNav={videoNav} />
        {/* <div className="absolute pl-4 left-0 bottom-0 text-white text-4xl w-2/3 mix-blend-plus-lighter pb-24">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum fugit
        voluptates voluptatem sunt unde necessitatibus possimus minus neque et
        incidunt cupiditate.
      </div>   */}
      </div>

      <div className="fixed pt-3 pl-4 left-0 top-0 text-gray-200  mix-blend-plus-lighter">
        {/* <div className="text-7xl font-black">Catalina Andonie</div> */}
        {/* <div className="flex flex-row justify-between text-4xl pr-4 pt-4">
          <div>About</div>
          <div>Works</div>
        </div> */}
        <div className="flex flex-row justify-between text-5xl pr-4 pt-4 mix-blend-plus-lighter">
          <button
            onClick={() =>
              setVideoNav({ toggle: !videoNav.toggle, direction: -1 })
            }
          >
            ←
          </button>
          <button
            onClick={() =>
              setVideoNav({ toggle: !videoNav.toggle, direction: 1 })
            }
          >
            →
          </button>
          {/* <button
            onClickCapture={() => {
              setIsPlay(!isPlay);
            }}
          >
            {isPlay ? "Pause" : "Play"}
          </button> */}
        </div>
      </div>
      <div className="pl-4 pt-12 text-black text-4xl w-2/3 pb-28">
        Resto del contenido acá. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum fugit
        voluptates voluptatem sunt unde necessitatibus possimus minus neque et
        incidunt cupiditate.
      </div>  
    </div>
  );
};

export default Home;
