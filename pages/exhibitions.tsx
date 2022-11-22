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
    <div className="pt-40">
      <div className="absolute h-[110vh] p-6 z-50">
        <div className="flex flex-col space-y-0 pr-4  mb-20 w-1/2">
          <div className="text-8xl text-white mix-blend-difference transition-all duration-300 hover:text-indigo-600 hover:cursor-pointer">
            <Link href={"/exhibitions"}>Exhibitions</Link>
          </div>
          <div className="text-4xl font-bold text-white mix-blend-difference transition-all duration-300 hover:text-indigo-600  hover:cursor-pointer">
            <Link href={"/test-layout"}>Back</Link>
          </div>

          <News exhibitionsPosts={exhibitionsPosts} />
        </div>
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
