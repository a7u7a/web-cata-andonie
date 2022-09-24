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
  const [clicked, setClicked] = useState(false);

  const onClick = () => {};

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

      <div className="relative w-full h-[110vh]">
        <WobbleVideo clicked={clicked} isPlay={isPlay} />
        
      </div>

      <div className="absolute pl-4 left-0 bottom-0 text-indigo-200 text-4xl w-2/3 mix-blend-plus-lighter">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum fugit
        voluptates voluptatem sunt unde necessitatibus possimus minus neque et
        incidunt cupiditate.
      </div>

      <div className="fixed pt-3 pl-4 left-0 top-0 text-indigo-200 w-full mix-blend-plus-lighter">
        <div className="text-7xl font-black">Catalina Andonie</div>
        <div className="flex flex-row justify-between text-4xl pr-4 pt-4">
          <div>About</div>
          <div>Works</div>
        </div>
        <div className="flex flex-row justify-between text-5xl pr-4 pt-4">
          <button onClick={() => setClicked(!clicked)}>←</button>
          <button onClick={() => setClicked(!clicked)}>→</button>
        </div>
      </div>
      <div className="text-5xl mt-12">Hola</div>
    </div>
  );
};

export default Home;
