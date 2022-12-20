import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import useMeasure from "react-use-measure";
import { GetStaticProps } from "next";

import Statement from "../components/statement";
import Exhibitions from "../components/exhibitions";
import NavBar from "../components/nav-bar";
import PageBackground from "../components/page-background/index";
import SelectedWorks from "../components/obras/selected-works";
import Footer from "../components/footer";
import Logo from "../components/logo";
import { workPost, exhibitionsPost, aboutPost } from "../interfaces/interfaces";
import {
  getAllWorkPosts,
  getAllExhibitionsPosts,
  getAbout,
} from "../lib/posts";
import useMediaQuery from "../lib/media";

interface HomeProps {
  workPosts: workPost[];
  exhibitionsPosts: exhibitionsPost[];
  aboutPost: aboutPost;
}

const Home = ({ workPosts, exhibitionsPosts, aboutPost }: HomeProps) => {
  const { locale } = useRouter();
  const isMd = useMediaQuery("(max-width: 768px)");
  const frontPagePosts = workPosts.filter((post) => post.front_page);

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
      <NavBar scrollTop={10} scrollThreshold={0} />

      <div className="fixed w-full h-full">
        <PageBackground
          progress={0.5}
          scale={0.8}
          src={"/shader-backgrounds/4.jpeg"}
          imgAspect={1.77}
          imgScale={2.0}
          speed={-0.02}
          brightness={-0.3}
          scroll={scrollTop}
        />
      </div>

      <div>
        {isMd ? (
          <Logo className="relative mix-blend-difference w-screen p-4" />
        ) : (
          <div className="flex items-center text-center w-full relative z-30 font-bold text-4xl md:text-6xl text-white p-3 md:p-6 mix-blend-difference">
            Catalina Andonie
          </div>
        )}
      </div>

      <Statement post={aboutPost} />
      <SelectedWorks posts={frontPagePosts} nextButton title />
      <Exhibitions exhibitionsPosts={exhibitionsPosts} scroll={scrollTop} />
      <Footer colophon background={false} />
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
