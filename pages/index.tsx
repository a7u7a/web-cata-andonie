import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef, useEffect, SyntheticEvent, UIEvent } from "react";
import VideoHero from "../components/video-hero";
import NavBar from "../components/nav-bar";
import About from "../components/about";
import News from "../components/news";
import IndexImage from "../components/index-image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Catalina Andonie</title>
        <meta name="description" content="Catalina Andonie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VideoHero />
      <NavBar />
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2 mt-2 mb-2 ml-2 mr-1 space-y-2">
          <About />
          <IndexImage src="/imgs/maqueta/horizontal-1.jpg" />
          <IndexImage src="/imgs/maqueta/horizontal-3.jpg" />
        </div>
        <div className="flex flex-col w-1/2 mt-2 mb-2 ml-1 pr-2 space-y-2">
          <News />
          <IndexImage src="/imgs/maqueta/vertical-1.jpg" />
          <IndexImage src="/imgs/maqueta/horizontal-2.jpg" />
          <IndexImage src="/imgs/maqueta/vertical-2.jpg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
