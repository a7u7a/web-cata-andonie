import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef, useEffect, SyntheticEvent, UIEvent } from "react";
import VideoHero from "../components/video-hero";
import NavBar from "../components/nav-bar";
import About from "../components/about";
import News from "../components/news";
import IndexImage from "../components/index-image";
import WorksCatalogue from "../components/works-catalogue";
// import { getPosts } from "../lib/posts";
// import { GetStaticProps } from "next";

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
      <div className="flex flex-row m-2">
        <div className="flex flex-col w-1/2 pr-1 space-y-2">
          <About />
          {/* <IndexImage h={2824} w={1564} src="/imgs/maqueta/horizontal-1.jpg" />
          <IndexImage h={1340} w={890} src="/imgs/maqueta/horizontal-3.jpg" /> */}
          <IndexImage h={1142} w={1614} src="/imgs/maqueta/vertical-2.jpg" />
        </div>
        <div className="flex flex-col w-1/2 pl-1 space-y-2">
          <News />
          <IndexImage h={1159} w={1500} src="/imgs/maqueta/vertical-1.jpg" />
          <IndexImage h={1340} w={957} src="/imgs/maqueta/horizontal-2.jpg" />
          
        </div>
      </div>
      <WorksCatalogue />
    </div>
  );
};

export default Home;
