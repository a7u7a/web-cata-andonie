import Head from "next/head";
import { useRouter } from "next/router";
import { workPost } from "../interfaces/interfaces";
import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";
import { GetStaticProps } from "next";
import WorksSection from "../components/works/works-section";
import { ResizeObserver } from "@juggle/resize-observer";
import NewFooter from "../components/new-footer";
import NewNavBar from "../components/new-nav-bar";
import {
  getAllWorkPosts,
  getAllExhibitionsPosts,
  getAbout,
} from "../lib/posts";

interface WorkPostProps {
  workPosts: workPost[];
  post: workPost;
}

const WorksPage = ({ workPosts }: WorkPostProps) => {
  const { locale } = useRouter();

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

  const [titleRef, titleBounds] = useMeasure({
    polyfill: ResizeObserver,
  });

  return (
    <div>
      <Head>
        <title>{locale === "es" ? "Obras" : "Works"}</title>
        <meta name="description" content="Catalina Andonie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewNavBar scrollTop={scrollTop} scrollThreshold={titleBounds.height} />

      <div
        ref={titleRef}
        className={`fixed hover:text-indigo-600
  flex flex-col w-screen items-center z-0
  text-center text-8xl font-bold text-black
  transition-opacity duration-1000
  ${scrollTop > 40 ? "opacity-40" : "opacity-100"}`}
      >
        {locale === "es" ? "Obras" : "Works"}
      </div>
      <div className="pt-28">
        <WorksSection posts={workPosts} backButton />
      </div>
      <NewFooter />
    </div>
  );
};

export default WorksPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workPosts = await getAllWorkPosts();
  return {
    props: {
      workPosts,
    },
  };
};
