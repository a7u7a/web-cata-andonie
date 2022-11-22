import Link from "next/link";
import VideoHero from "../components/new-video-hero";

const TestLayout = () => {
  return (
    <div>
      <div className="pt-40">
        <div className="h-[110vh] pt-12 pb-12 absolute w-full mix-blend-difference z-50 flex flex-col items-center justify-between text-8xl text-white">
          <div className="transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
            <Link href={"/exhibitions"}>Exhibitions</Link>
          </div>
          <div className="transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
            Works
          </div>
          <div className="transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
            Bio
          </div>
          <div className="transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
            Contact
          </div>
        </div>
      </div>
      <div className="pt-[110vh]">
        <VideoHero />
      </div>
    </div>
  );
};

export default TestLayout;
