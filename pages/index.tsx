import type { NextPage } from "next";
import Head from "next/head";
import ThreeTest2 from "../components/three-test2";
import ShadeSample from "../components/shader-sample";
import ShaderTexture from "../components/shader-texture";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Catalina Andonie</title>
        <meta name="description" content="Catalina Andonie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-5xl">Catalina Andonie</div>
      <div className="text-5xl font-bold">Catalina Andonie</div>
      <div className="text-5xl font-black">Catalina Andonie</div>

      {/* <ThreeTest2 /> */}
      <div className="w-1/4">
        <ShadeSample />
      </div>
      <div className="w-full h-[50vh]">
        <ShaderTexture />
      </div>
    </div>
  );
};

export default Home;
