import Link from "next/link";
import VideoHero from "../components/new-video-hero";

const TestLayout = () => {
  return (
    <div className="mix-blend-difference pt-64 absolute z-50 flex flex-col space-y-0 pr-4 text-8xl text-white mb-20">
      <div className="mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
        <Link href={"/exhibitions"}>Exhibitions</Link>
      </div>
      <div className="mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
        Works
      </div>
      <div className="mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
        Bio
      </div>
      <div className="mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
        Contact
      </div>
    </div>
  );
};

export default TestLayout;
