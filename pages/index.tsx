import type { NextPage } from "next";

import { useState, useRef, useEffect } from "react";
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

interface HomeProps {
  workPosts: workPost[];
}

function split(arr: workPost[], index: number) {
  return [arr.slice(0, index), arr.slice(index)];
}

export default function Home({ workPosts }: HomeProps) {
  const frontPagePosts = workPosts.filter((post) => post.front_page);
  // split front page posts into two lists, one for each column
  const [firstCol, secondCol] = split(
    frontPagePosts,
    Math.floor(frontPagePosts.length / 3)
  );

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const target = e.target as Document;
      const scrollTop = target.documentElement.scrollTop;
      setScrollTop(scrollTop);
      console.log("scrollTop", scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <MyHeader />
      <VideoHero />
      <NavBar transparent={false} scrollTop={scrollTop} scrollThreshold={1013} />
      <div className="flex flex-row m-2">
        {/* Columna derecha */}
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
        </div>

        {/* Columna izquierda */}
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
