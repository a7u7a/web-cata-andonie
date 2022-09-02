import type { NextPage } from "next";
import Head from "next/head";
import ThreeTest2 from "../components/three-test2";
import ThreeTest3 from "../components/three-test3";
import ThreeTest4 from "../components/three-test4";

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

      <ThreeTest2 />
      <div className="w-1/4">
        <ThreeTest3 />
      </div>
      <ThreeTest4 />
    </div>
  );
};

export default Home;
