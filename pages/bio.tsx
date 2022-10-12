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
              <BioColumnFromMarkdown bioPost={bioPosts[0]} />
              <BioColumnFromMarkdown bioPost={bioPosts[1]} />
              <BioColumnFromMarkdown bioPost={bioPosts[2]} />
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
