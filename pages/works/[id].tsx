import { GetStaticProps, GetStaticPaths } from "next";
import ImageHero from "../../components/works/image-hero";
import NavBar from "../../components/nav-bar";
import WorksCatalogue from "../../components/works-catalogue";
import MyFooter from "../../components/my-footer";
import IdImage from "../../components/works/id-image";
import { getWorkPost, getAllPostIds } from "../../lib/posts";
import { workPost } from "../../interfaces/interfaces";
import PostCard from "../../components/works/post-card";

interface WorkPostProps {
  post: workPost;
}

export default function Post({ post }: WorkPostProps) {
  console.log("post", post);
  return (
    <div>
      <NavBar />
      <ImageHero src={post.hero_img!} />

      <div className="flex flex-row m-2">
        <div className="flex flex-col w-1/2 pr-1 space-y-2">
          <PostCard post={post} />
          <IdImage h={1142} w={1614} src="/imgs/maqueta/vertical-2.jpg" />
        </div>
        <div className="flex flex-col w-1/2 pl-1 space-y-2">
          <IdImage h={1159} w={1500} src="/imgs/maqueta/vertical-1.jpg" />
          <IdImage h={1340} w={957} src="/imgs/maqueta/horizontal-2.jpg" />
          <IdImage h={1340} w={890} src="/imgs/maqueta/horizontal-3.jpg" />
        </div>
      </div>
      <WorksCatalogue />
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
  const post = getWorkPost(params!.id as string);
  return {
    props: {
      post,
    },
  };
};
