import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import ImageHero from "../../components/works/image-hero";
import NavBar from "../../components/nav-bar";
import WorksCatalogue from "../../components/works-catalogue";
import MyFooter from "../../components/my-footer";
import IdImage from "../../components/works/id-image";
import { getWorkPost, getAllPostIds, getAllWorkPosts } from "../../lib/posts";
import { workPost } from "../../interfaces/interfaces";
import PostCard from "../../components/works/post-card";
import YouTubeEmbed from "../../components/youtube-embed";

interface WorkPostProps {
  workPosts: workPost[];
  post: workPost;
}

function split(arr: { h: number; w: number; path: string }[], index: number) {
  return [arr.slice(0, index), arr.slice(index)];
}

export default function Post({ post, workPosts }: WorkPostProps) {
  const { locale } = useRouter();
  const [firstCol, secondCol] = post.pathsAndDims
    ? split(post.pathsAndDims!, Math.floor(post.pathsAndDims!.length / 2))
    : [];

  return (
    <div>
      <Head>
        <title>{locale === "es" ? post.title : post.title_eng}</title>
        <meta name="description" content="Catalina Andonie, Artista" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      {post.yt_url.length > 0 ? (
        <YouTubeEmbed url="https://www.youtube.com/embed/n48pzSbs0lA" />
      ) : (
        <ImageHero src={post.hero_img!} />
      )}
      <div className="flex flex-col md:flex-row m-2">
        <div className="flex flex-col w-full md:w-1/2 pr-0 md:pr-1 space-y-2">
          <PostCard post={post} />
          {firstCol.map((img, i) => (
            <IdImage key={i} src={img.path} h={img.h} w={img.w} />
          ))}
        </div>
        <div className="flex flex-col w-full md:w-1/2 pl-0 md:pl-1 space-y-2">
          {secondCol.map((img, i) => (
            <IdImage key={i} src={img.path} h={img.h} w={img.w} />
          ))}
        </div>
      </div>
      <WorksCatalogue posts={workPosts} />
      <MyFooter />
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
