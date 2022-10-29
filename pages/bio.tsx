import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import useMediaQuery from "../lib/media";
import { getAllBioPosts, getBioStatement } from "../lib/posts";
import { bioPost, bioStatementPost } from "../interfaces/interfaces";
import BioIndex from "../components/bio/bio-index";
import BioColumnFromMarkdown from "../components/bio/bio-column-from-md";
import BioHeader from "../components/bio-header";

import MyFooter from "../components/my-footer";
import NavBar from "../components/nav-bar";

interface BioProps {
  bioPosts: bioPost[];
  bioStatement: bioStatementPost;
}

const Bio = ({ bioPosts, bioStatement }: BioProps) => {
  // maybe will use this in the future to build index sidebar titles from content
  // get all titles and split by column
  // const re = /#{1,6}.+(?=\n)/g;
  // const f = bioPosts[0].contentSpanish.match(re);

  // const titles: string[][] = [];
  // bioPosts.map((post) => {
  //   const f = post.contentSpanish.match(re);
  //   if (f?.length) {
  //     titles.push(f);
  //   }
  // });

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

  const isMd = useMediaQuery("(max-width: 768px)");

  const { locale } = useRouter();
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver });

  return (
    <div>
      <Head>
        <title>Bio Catalina Andonie</title>
        <meta name="description" content="Catalina Andonie, Artista" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar
        transparent={true}
        scrollThreshold={bounds.height}
        scrollTop={scrollTop}
      />
      <BioHeader bioStatement={bioStatement} ref={ref} />
      {isMd ? (
        <div className="flex flex-row space-x-4 mb-6">
          <div className="flex flex-col w-1/2 pl-3 md:pl-6">
            <BioIndex />
            <BioColumnFromMarkdown post={bioPosts[0]} />
            <BioColumnFromMarkdown post={bioPosts[2]} />
          </div>
          <div className="flex flex-col w-1/2 pr-3 md:pr-6">
            <BioColumnFromMarkdown post={bioPosts[1]} />
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="sticky top-0 w-1/4 self-start pl-3 md:pl-6">
            <BioIndex />
          </div>

          {/* main content */}
          <div className="w-3/4">
            <div className="flex flex-col mb-20">
              <div className="flex items-center h-28">
                <div className="text-3xl ">Artist Bio</div>
              </div>

              <div className="flex flex-row space-x-6 pr-3 md:pr-6">
                <BioColumnFromMarkdown post={bioPosts[0]} />
                <BioColumnFromMarkdown post={bioPosts[1]} />
                <BioColumnFromMarkdown post={bioPosts[2]} />
              </div>
            </div>
          </div>
        </div>
      )}
      <MyFooter />
    </div>
  );
};
export default Bio;

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
