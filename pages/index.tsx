import type { NextPage } from "next";

import { useState, useRef, useEffect, SyntheticEvent, UIEvent } from "react";
import VideoHero from "../components/video-hero";
import NavBar from "../components/nav-bar";
import About from "../components/about";
import News from "../components/news";
import IndexImage from "../components/index-image";
import WorksCatalogue from "../components/works-catalogue";
import MyFooter from "../components/my-footer";
import MyHeader from "../components/my-header";
import { getAllWorkPosts } from "../lib/posts";
import { GetStaticProps } from "next";
import { workPost } from "../interfaces/interfaces";

import { useScroll } from "react-use";

interface HomeProps {
  workPosts: workPost[];
}

function split(arr: workPost[], index: number) {
  return [arr.slice(0, index), arr.slice(index)];
}

export default function Home({ workPosts }: HomeProps) {
  const scrollRef = useRef(null);
  const { x, y } = useScroll(scrollRef);

  const frontPagePosts = workPosts.filter((post) => post.front_page);
  // split front page posts into two lists, one for each column
  const [firstCol, secondCol] = split(
    frontPagePosts,
    Math.floor(frontPagePosts.length / 3)
  );

  useEffect(() => {
    console.log("y", y);
  }, [y]);

  return (
    <div >
      <MyHeader />
      <VideoHero />
      <NavBar x={x} y={y} />
      <div className="flex flex-row m-2"
      ref={scrollRef}
      >
        <div className="flex flex-col w-1/2 pr-1 space-y-2">
          <About />
          {firstCol.map((post, i) => (
            <IndexImage
              key={i}
              href={"works/" + post.id}
              title={post.title}
              h={post.front_img_h!}
              w={post.front_img_w!}
              src={post.front_thumbnail}
            />
          ))}
          {/* 
          <IndexImage h={2824} w={1564} src="/imgs/maqueta/horizontal-1.jpg" />
          <IndexImage h={1340} w={890} src="/imgs/maqueta/horizontal-3.jpg" /> 
          */}
          {/* <IndexImage h={1142} w={1614} src="/imgs/maqueta/vertical-2.jpg" /> */}
        </div>
        <div className="flex flex-col w-1/2 pl-1 space-y-2">
          <News />
          {secondCol.map((post, i) => (
            <IndexImage
              key={i}
              href={"works/" + post.id}
              title={post.title}
              h={post.front_img_h!}
              w={post.front_img_w!}
              src={post.front_thumbnail}
            />
          ))}
          {/* <IndexImage h={1159} w={1500} src="/imgs/maqueta/vertical-1.jpg" />
          <IndexImage h={1340} w={957} src="/imgs/maqueta/horizontal-2.jpg" /> */}
        </div>
      </div>
      <WorksCatalogue />
      <MyFooter />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workPosts = await getAllWorkPosts();
  return {
    props: {
      workPosts,
    },
  };
};
