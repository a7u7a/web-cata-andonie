import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import ImageHero from "../../components/obras/image-hero";
import NavBar from "../../components/nav-bar";
import WorksCatalogue from "../../components/obras-catalogue";
import MyFooter from "../../components/my-footer";
import IdImage from "../../components/obras/id-image";
import { getWorkPost, getAllPostIds, getAllWorkPosts } from "../../lib/posts";
import { workPost } from "../../interfaces/interfaces";
import PostCard from "../../components/obras/post-card";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import YouTubeEmbed from "../../components/youtube-embed";
import VimeoPlayer from "../../components/vimeo-player";
import NewNavBar from "../../components/new-nav-bar";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import NewFooter from "../../components/new-footer";

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

      <div
        ref={titleRef}
        className={`fixed hover:text-indigo-600
  flex flex-col w-screen items-center z-0
  text-center text-8xl font-bold text-black
  transition-opacity duration-1000
  ${scrollTop > 40 ? "opacity-40" : "opacity-100"}`}
      >
        {locale === "es" ? post.title! : post.title_eng!}
      </div>

      {/* <NavBar /> */}

      <div className="relative pt-28">
        {post.vimeo_front_url.length > 0 ? (
          // <YouTubeEmbed url="https://www.youtube.com/embed/n48pzSbs0lA" />
          <VimeoPlayer url={post.vimeo_front_url} className="w-screen aspect-video" />
        ) : (
          <ImageHero src={post.hero_img!} />
        )}
      </div>

      <PostCard post={post} />

      {/* Custom image display, make component */}
      <div className="relative bg-white flex flex-col">
        <div className="flex flex-col md:flex-row m-1">
          <div className="flex flex-col w-full md:w-1/2 pr-0 md:pr-0.5 space-y-1">
            {firstCol.map((img, i) => (
              <IdImage key={i} src={img.path} h={img.h} w={img.w} />
            ))}
          </div>

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
              <IdImage key={i} src={img.path} h={img.h} w={img.w} />
            ))}

            <div className="w-full p-4">
              <button onClick={() => router.back()}>
                <div className="flex flex-col items-start hover:underline hover:cursor-pointer">
                  <div className="text-4xl text-left font-bold">Back</div>
                  <ArrowLeft size={38} weight="bold" color="black" />
                </div>
              </button>
            </div>
          </div>
        </div>
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
