import Image from "next/image";
import { useState } from "react";
import VideoHero from "../components/new-video-hero";
import StackingEffects from "../components/stacking-effects2/index";
import { GetStaticProps } from "next";
import { workPost, exhibitionsPost, aboutPost } from "../interfaces/interfaces";
import About from "../components/new-about";
import {
  getAllWorkPosts,
  getAllExhibitionsPosts,
  getAbout,
} from "../lib/posts";

interface VideoHeroProps {
  height: number;
  worksHeight?: number;
}

interface HomeProps {
  workPosts: workPost[];
  exhibitionsPosts: exhibitionsPost[];
  aboutPost: aboutPost;
}

const Home = ({ workPosts, exhibitionsPosts, aboutPost }: HomeProps) => {
  return (
    <div>
      <div className="relative">
        <div className="fixed w-full h-[110vh] ">
          <StackingEffects
            progress={0.5}
            scale={0.8}
            src={"/shader-backgrounds/2.png"}
            imgAspect={1.77}
            imgScale={2.0}
            speed={-0.02}
          />
        </div>

        <div className={`relative p-6`}>
          <div className="pt-4 mix-blend-difference transition-all duration-75 hover:text-indigo-600 text-white hover:cursor-pointer">
            <div>
              <div className="font-bold text-7xl">Catalina Andonie</div>
            </div>
          </div>
          <About post={aboutPost} />
        </div>
      </div>
      <VideoHero />
      <div>hola</div>
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
