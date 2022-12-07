import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { ArrowLeft } from "phosphor-react";

import ImageHero from "../../components/obras/image-hero";
import IdImage from "../../components/obras/id-image";
import PostCard from "../../components/obras/post-card";
import VimeoPlayer from "../../components/vimeo-player";
import NewNavBar from "../../components/nav-bar";
import NewFooter from "../../components/footer";
import { workPost, pathsAndDimsProps } from "../../interfaces/interfaces";
import { getWorkPost, getAllPostIds, getAllWorkPosts } from "../../lib/posts";

interface WorkPostProps {
  workPosts: workPost[];
  post: workPost;
}

function split(arr: { h: number; w: number; path: string }[], index: number) {
  return [arr.slice(0, index), arr.slice(index)];
}

export default function Post({ post, workPosts }: WorkPostProps) {
  const { locale } = useRouter();
  const router = useRouter();

  const [firstCol, secondCol] = post.pathsAndDims
    ? split(post.pathsAndDims!, Math.floor(post.pathsAndDims!.length / 2))
    : [];

  useEffect(() => {
    console.log("firstCol, secondCol", firstCol, secondCol);
  }, [firstCol, secondCol]);

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
    <div className="relative">
      <Head>
        <title>{locale === "es" ? post.title : post.title_eng}</title>
        <meta name="description" content="Catalina Andonie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewNavBar scrollTop={scrollTop} scrollThreshold={titleBounds.height} />

      <div className="fixed mix-blend-difference z-40">
        <div className="p-6 text-6xl text-white">
          {locale === "es"
            ? post.title!.toUpperCase()
            : post.title_eng!.toUpperCase()}
        </div>
      </div>

      <div className="relative">
        {post.vimeo_front_url.length > 0 ? (
          <VimeoPlayer
            url={post.vimeo_front_url}
            className="w-screen aspect-video"
          />
        ) : (
          <ImageHero src={post.hero_img!} />
        )}
      </div>

      {/* Custom image display, make component */}
      <div className="relative flex flex-col bg-white">
        <div className="flex flex-col md:flex-row p-1">
          <div className="flex flex-col w-1/2 pr-0.5 space-y-1">
            <PostCard post={post} />
            {firstCol.map((img, i) => (
              <IdImage
                key={i}
                src={img.path}
                h={img.h}
                w={img.w}
                // @ts-ignore
                lowResSrc={img.lowResPath}
              />
            ))}
          </div>
          {/* Video goes always first on second column */}
          <div className="flex flex-col w-full md:w-1/2 pl-0 md:pl-0.5 space-y-1 ">
            {post.vimeo_video_gallery.length > 0 ? (
              post.vimeo_video_gallery.map((url, i) => (
                <VimeoPlayer
                  key={i}
                  url={url}
                  className="w-full aspect-video"
                />
              ))
            ) : (
              <></>
            )}
            {secondCol.map((img, i) => (
              <IdImage
                key={i}
                src={img.path}
                h={img.h}
                w={img.w}
                // @ts-ignore
                lowResSrc={img.lowResPath}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="relative p-4 bg-white">
        <button onClick={() => router.back()}>
          <div className="flex flex-col items-start hover:underline hover:cursor-pointer">
            <div className="text-4xl text-left">
              {locale === "es" ? "Atrás" : "Back"}
            </div>
            <ArrowLeft size={38} weight="bold" color="black" />
          </div>
        </button>
      </div>
      <NewFooter />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = getAllPostIds(locales);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workPosts = await getAllWorkPosts();
  const post = await getWorkPost(params!.id as string);
  return {
    props: {
      post,
      workPosts,
    },
  };
};
