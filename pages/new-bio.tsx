import Head from "next/head";
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
import WorksSection from "../components/works/works-section";
import NewFooter from "../components/new-footer";
import { bioPost, bioStatementPost } from "../interfaces/interfaces";
import BioColumnFromMarkdown from "../components/bio/bio-column-from-md";
import { getAllBioPosts, getBioStatement } from "../lib/posts";
import PageBackground from "../components/stacking-effects3/index";

interface BioProps {
  bioPosts: bioPost[];
  bioStatement: bioStatementPost;
}

const NewBio = ({ bioPosts, bioStatement }: BioProps) => {
  const [scrollTop, setScrollTop] = useState(0);

  const isMd = useMediaQuery("(max-width: 768px)");

  const { locale } = useRouter();
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver });

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
      <Head>
        <title>Bio Catalina Andonie</title>
        <meta name="description" content="Catalina Andonie, Artista" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewNavBar scrollTop={10} scrollThreshold={0} />

      {/* Custom header, make component */}
      <div className="relative">
        <div className="absolute w-full h-full">
          <PageBackground
            progress={0.5}
            scale={0.8}
            src={"/shader-backgrounds/3.jpg"}
            imgAspect={1.77}
            imgScale={2.0}
            speed={-0.02}
            brightness={-0.5}
            scroll={scrollTop}
          />
        </div>

        <div className="relative w-screen p-6 pt-40 pb-14">
          <div className="w-4/5 mt-20">
            <div className="text-6xl text-white leading-snug">
              B. 1989, Santiago de Chile. Lives and works in Santiago de Chile.
              Ut sodales felis et lectus ullamcorper, eget rhoncus massa
              viverra. Aenean volutpat mauris at ultricies porta. Nullam nec
              tincidunt sem.
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="pt-16 pb-16 pl-6 text-6xl font-bold transition-all duration-300 hover:text-indigo-600 text-black hover:cursor-pointer">
          Bio
        </div>
        <div className="pl-6 pr-6 flex flex-row space-x-4">
        <BioColumnFromMarkdown post={bioPosts[1]} />
        <BioColumnFromMarkdown post={bioPosts[0]} />
        <BioColumnFromMarkdown post={bioPosts[2]} />
        <BioColumnFromMarkdown post={bioPosts[3]} />
        </div>
      </div>
      <NewFooter />
    </div>
  );
};

export default NewBio;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bioPosts = await getAllBioPosts();
  const bioStatement = getBioStatement();
  return {
    props: {
      bioPosts,
      bioStatement,
    },
  };
};
