import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { workPost } from "../interfaces/interfaces";
import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";
import { GetStaticProps } from "next";
import WorksSection from "../components/obras/works-section";
import { ResizeObserver } from "@juggle/resize-observer";
import NewFooter from "../components/new-footer";
import NewNavBar from "../components/new-nav-bar";
import IdImageWorksPage from "../components/obras/id-image-works-page";
import {
  getAllWorkPosts,
  getAllExhibitionsPosts,
  getAbout,
} from "../lib/posts";
import { ArrowLeft, ArrowRight, List, GridFour } from "phosphor-react";
interface WorkPostProps {
  workPosts: workPost[];
  // post: workPost;
}

function splitIntercalated(arr: workPost[]) {
  const first = [];
  const second = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 == 0) {
      first.push(arr[i]);
    } else {
      second.push(arr[i]);
    }
    const element = arr[i];
  }
  return [first, second];
}

const WorksPage = ({ workPosts }: WorkPostProps) => {
  const [gridView, setGridView] = useState(true);
  const { locale } = useRouter();
  const [scrollTop, setScrollTop] = useState(0);
  const router = useRouter();

  // useEffect(() => {
  //   // sort posts by year in descending order
  //   workPosts.sort((a, b) => b.year - a.year);
  // }),
  //   [];

  const [firstCol, secondCol] = splitIntercalated(workPosts);

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

  const handleButtonToggle = () => {
    setGridView(!gridView);
  };

  return (
    <div className="bg-white">
      <Head>
        <title>{locale === "es" ? "Obras" : "Works"}</title>
        <meta name="description" content="Catalina Andonie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewNavBar scrollTop={10} scrollThreshold={0} />

      <div className="p-6 flex flex-col space-y-4">
        <div className="text-6xl pb-28 mix-blend-difference text-white">
          {locale === "es" ? "OBRAS" : "WORKS"}
        </div>

        <div
          className="flex flex-row space-x-3 w-32 items-end hover:underline hover:cursor-pointer"
          onClick={handleButtonToggle}
        >
          <div className="text-3xl">
            {gridView
              ? locale === "es"
                ? "Lista"
                : "List"
              : locale === "es"
              ? "Grilla"
              : "Grid"}
          </div>
          {gridView ? (
            <List size={36} weight="regular" color="black" />
          ) : (
            <GridFour size={36} weight="regular" color="black" />
          )}
        </div>
      </div>

      {gridView ? (
        // render grid view

        <div className="relative bg-white flex flex-col">
          <div className="flex flex-col md:flex-row m-1">
            <div className="flex flex-col w-full md:w-1/2 pr-0 md:pr-0.5 space-y-1">
              {firstCol.map((post, i) => (
                <IdImageWorksPage
                  title={post.title}
                  title_eng={post.title_eng}
                  year={post.year}
                  key={i}
                  src={post.thumbnail}
                  h={post.front_img_h!}
                  w={post.front_img_w!}
                  title_color={post.title_color}
                  id={post.id}
                />
              ))}
            </div>
            <div className="flex flex-col w-full md:w-1/2 pl-0 md:pl-0.5 space-y-1 ">
              {secondCol.map((post, i) => (
                <IdImageWorksPage
                  title={post.title}
                  title_eng={post.title_eng}
                  year={post.year}
                  key={i}
                  src={post.thumbnail}
                  h={post.front_img_h!}
                  w={post.front_img_w!}
                  title_color={post.title_color}
                  id={post.id}
                />
              ))}
              <div className="w-full p-4">
                <button onClick={() => router.back()}>
                  <div className="flex flex-col items-start hover:underline hover:cursor-pointer">
                    <div className="text-4xl text-left">Back</div>
                    <ArrowLeft size={38} weight="bold" color="black" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // render list view
        <div className="relative flex flex-col px-6 space-y-8 pt-4">
          {workPosts.map((post, i) => (
            <Link key={i} href={"obras/" + post.id}>
              <div className="flex flex-row justify-between text-6xl hover:underline cursor-pointer">
                <div>{locale === "es" ? post.title : post.title_eng}</div>
                <div>{post.year}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

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
