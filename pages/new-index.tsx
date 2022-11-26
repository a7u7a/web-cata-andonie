import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import useMeasure from "react-use-measure";
import VideoHero from "../components/new-video-hero";
import { GetStaticProps } from "next";
import { workPost, exhibitionsPost, aboutPost } from "../interfaces/interfaces";
import About from "../components/new-about";
import News from "../components/news";
import {
  getAllWorkPosts,
  getAllExhibitionsPosts,
  getAbout,
} from "../lib/posts";
import useMediaQuery from "../lib/media";
import IndexImage from "../components/index-image";
import WorksCatalogue from "../components/new-works-catalogue";
import NewNavBar from "../components/new-nav-bar";
import PageBackground from "../components/stacking-effects3/index";
import WorksSection from "../components/works/works-section";
import NewFooter from "../components/new-footer";

interface HomeProps {
  workPosts: workPost[];
  exhibitionsPosts: exhibitionsPost[];
  aboutPost: aboutPost;
}

function split(arr: workPost[], index: number) {
  return [arr.slice(0, index), arr.slice(index)];
}

const Home = ({ workPosts, exhibitionsPosts, aboutPost }: HomeProps) => {
  const { locale } = useRouter();
  const isMd = useMediaQuery("(max-width: 768px)");
  const frontPagePosts = workPosts.filter((post) => post.front_page);
  // const [firstCol, secondCol] = split(
  //   frontPagePosts,
  //   Math.floor(frontPagePosts.length / 2)
  // );

  useEffect(() => {
    frontPagePosts.sort((a, b) => {
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    });
  }, []);

  const [titleRef, titleBounds] = useMeasure({
    polyfill: ResizeObserver,
  });

  // Update scroll
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const target = e.target as Document;
      const scrollTop = target.documentElement.scrollTop;
      setScrollTop(scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      <NewNavBar scrollTop={scrollTop} scrollThreshold={titleBounds.height} />

      <div
        ref={titleRef}
        className={`fixed hover:text-indigo-600
        flex flex-col w-screen items-center z-0
        text-center text-mainSize font-bold text-black
        transition-opacity duration-1000
        ${scrollTop > 45 ? "opacity-40" : "opacity-100"}`}
      >
        Catalina Andonie
      </div>

      <VideoHero className="" />
      <About post={aboutPost} />
      <News exhibitionsPosts={exhibitionsPosts} scroll={scrollTop} />
      <WorksSection posts={frontPagePosts} />
      <NewFooter />
    </div>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workPosts = await getAllWorkPosts();
  const exhibitionsPosts = getAllExhibitionsPosts();
  const aboutPost = getAbout();
  return {
    props: {
      workPosts,
      exhibitionsPosts,
      aboutPost,
    },
  };
};
