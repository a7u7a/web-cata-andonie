import type { NextPage } from "next";
import Head from "next/head";
import ShaderBasicSample from "../components/shader-sample";
import ShaderTexture from "../components/shader-texture";
import ShaderPostProcessing from "../components/shader-texture2";
const Home: NextPage = () => {
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
      </div>
      <div className="w-full h-[50vh]">
        <ShaderTexture />
      </div> */}
      <div className="w-1/2 h-[20rem]">
        <ShaderPostProcessing />
      </div>
    </div>
  );
};

export default Home;
