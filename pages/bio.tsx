import { GetStaticProps } from "next";
import { getAllBioPosts } from "../lib/posts";
import { bioPost } from "../interfaces/interfaces";
import BioIndex from "../components/bio/bio-index";
import BioColumnFromMarkdown from "../components/bio/bio-column-from-md";

import MyFooter from "../components/my-footer";
import NavBar from "../components/nav-bar";

interface BioProps {
  bioPosts: bioPost[];
}

const Bio = ({ bioPosts }: BioProps) => {
  
  return (
    <div>
      <NavBar transparent={true} />
      <div className="w-screen bg-gray-200">
        <div className="pt-28 pb-28 ml-6 text-3xl font-bold w-2/3 text-white">
          B. 1989, Santiago de Chile. Lives and works in Santiago de Chile. Ut
          sodales felis et lectus ullamcorper, eget rhoncus massa viverra.
          Aenean volutpat mauris at ultricies porta. Nullam nec tincidunt sem.
        </div>
      </div>

      <div className="flex justify-between">
        <BioIndex />

        {/* main content */}
        <div className="flex flex-row w-3/4">
          <div className="flex flex-col mb-20">
            <div className="flex items-center h-28">
              <div className="text-3xl ">Bio</div>
            </div>

            <div className="flex flex-row space-x-6 pr-6">
              <BioColumnFromMarkdown bioPost={bioPosts[0]} proseClass="bio" />
              <BioColumnFromMarkdown bioPost={bioPosts[1]} proseClass="bio" />
              <BioColumnFromMarkdown bioPost={bioPosts[2]} proseClass="bio" />
            </div>
          </div>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
export default Bio;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bioPosts = await getAllBioPosts();
  return {
    props: {
      bioPosts,
    },
  };
};
