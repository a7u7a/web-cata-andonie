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
      <div className="flex flex-col space-y-0 pr-4  mb-20 w-1/2">
        <div className="text-8xl text-white mix-blend-difference transition-all duration-300 hover:text-indigo-600 hover:cursor-pointer">
          <Link href={"/exhibitions"}>Exhibitions</Link>
        </div>
        <div className="text-4xl font-bold text-white mix-blend-difference transition-all duration-300 hover:text-indigo-600  hover:cursor-pointer">
          <Link href={"/new-index"}>Back</Link>
        </div>
        
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