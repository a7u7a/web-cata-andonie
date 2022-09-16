import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import ShaderBasicSample from "../components/shader-sample";
import ShaderTexture from "../components/shader-texture";
import ShaderTextureQuad from "../components/shader-texture2";
import VideoTextureQuad from "../components/shader-video-texture";
import WobbleVideo from "../components/wobble-video";
const Home: NextPage = () => {
  const [isPlay, setIsPlay] = useState(true);

  return (
    <div>
      <Head>
        <title>Catalina Andonie</title>
        <meta name="description" content="Catalina Andonie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div className="text-5xl">Catalina Andonie</div>
      <div className="text-5xl font-bold">Catalina Andonie</div>
      <div className="text-5xl font-black">Catalina Andonie</div> */}

      {/* <div className="w-1/4">
        <ShaderBasicSample />
      </div> */}
      {/* <div className="w-full h-[50vh]">
        <ShaderTexture />
      </div> */}

      {/* <div className="w-full h-screen">
        <ShaderTextureQuad />
      </div> */}

      {/* <div className="w-full h-[25rem]">
        <VideoTextureQuad />
      </div> */}

      <div className="relative w-full h-screen">
        <WobbleVideo isPlay={isPlay} />
        <button
          onClick={() => {
            setIsPlay(!isPlay);
            console.log("isPlay", isPlay);
          }}
          className="absolute left-0 bottom-0 text-white text-2xl"
        >
          play
        </button>
      </div>
      <div className="fixed left-0 top-0 pt-3 pl-4 text-7xl font-black text-white">
        Catalina Andonie
      </div>

      <div className="text-5xl">→</div>
    </div>
  );
};

export default Home;
