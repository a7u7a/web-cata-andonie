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
import WorksSection from "../components/obras/works-section";
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
    <div className="relative bg-white">
      <Head>
        <title>Bio Catalina Andonie</title>
        <meta name="description" content="Catalina Andonie, Artista" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewNavBar scrollTop={10} scrollThreshold={0} />

      {/* Custom header, make component */}
      <div className="relative">
        <div className="fixed w-full h-full">
          <PageBackground
            progress={0.5}
            scale={0.8}
            src={"/shader-backgrounds/3.jpeg"}
            imgAspect={1.77}
            imgScale={2.0}
            speed={-0.02}
            brightness={-0.6}
            scroll={scrollTop}
          />
        </div>

        <div className="relative w-screen p-6 pt-36 pb-20">
          <div className="w-2/3 pt-36">
            <div className="text-6xl text-white leading-snug mix-blend-difference">
              {locale === "es"
                ? bioStatement.contentSpanish
                : bioStatement.contentEnglish}
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="mx-6 mt-10 flex flex-row space-x-4">
          <BioColumnFromMarkdown post={bioPosts[1]} />
          <BioColumnFromMarkdown post={bioPosts[0]} />
          <BioColumnFromMarkdown post={bioPosts[2]} />
          <BioColumnFromMarkdown post={bioPosts[3]} />
        </div>
      </div>
      <NewFooter background={false} />
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
