import Link from "next/link";
import { GetStaticProps } from "next";
import { exhibitionsPost } from "../interfaces/interfaces";
import News from "../components/new-news";
import {
  getAllWorkPosts,
  getAllExhibitionsPosts,
  getAbout,
} from "../lib/posts";

interface ExhibitionsProps {
  exhibitionsPosts: exhibitionsPost[];
}

const Exhibitions = ({ exhibitionsPosts }: ExhibitionsProps) => {
  return (
    <div className="relative p-6 flex flex-row">
      <div className="w-1/2">
        <div className="absolute w-1/2 inset-x-0 bottom-0 text-7xl pt-4 mix-blend-difference transition-all duration-75 hover:text-indigo-600 text-white hover:cursor-pointer">
          <div className="pl-4 pb-8 font-bold text-7xl">Selected</div>
        </div>
      </div>
      <div className="w-1/2">
        <News exhibitionsPosts={exhibitionsPosts} />
      </div>
    </div>
  );
};

export default Exhibitions;

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
