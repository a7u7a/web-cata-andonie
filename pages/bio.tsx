import { useState, useRef, useEffect } from "react";
import useMeasure from "react-use-measure";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import useMediaQuery from "../lib/media";
import { getAllBioPosts, getBioStatement } from "../lib/posts";
import { bioPost, bioStatementPost } from "../interfaces/interfaces";
import BioIndex from "../components/bio/bio-index";
import BioColumnFromMarkdown from "../components/bio/bio-column-from-md";

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
  const [ref, bounds] = useMeasure();

  return (
    <div>
      <NavBar
        transparent={true}
        scrollThreshold={bounds.height}
        scrollTop={scrollTop}
      />
      <div ref={ref} className="w-screen bg-gray-200">
        <div className="pt-28 pb-28 pl-3 md:pl-6 pr-3 md:pr-6 text-3xl font-bold w-full md:w-2/3 text-white">
          {locale === "es"
            ? bioStatement.contentSpanish
            : bioStatement.contentEnglish}
        </div>
      </div>

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
