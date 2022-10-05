import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef, useEffect, SyntheticEvent, UIEvent } from "react";
import VideoHero from "../components/video-hero";
import NavBar from "../components/nav-bar";
import About from "../components/about";
import News from "../components/news";

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
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col w-1/2">
          <About />
        </div>
        <div className="flex flex-col w-1/2">
          <News />
        </div>
      </div>
    </div>
  );
};

export default Home;
