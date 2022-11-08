import { useState, forwardRef, useEffect } from "react";
import { useRouter } from "next/router";
import useMediaQuery from "../lib/media";
import VideoPlayer from "../components/video-player";
import { VideoNavProps } from "../interfaces/interfaces";
import { ArrowLeft, ArrowRight } from "phosphor-react";

interface VideoHeroProps {
  height: number;
  worksHeight?: number;
}

const VideoHero = 
  () => {
    
    const [isPlay, setIsPlay] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [videoNav, setVideoNav] = useState<VideoNavProps>({
      toggle: false,
      direction: 0,
    });

    const isMd = useMediaQuery("(max-width: 768px)");

    // const clickHandler = () => {
    //   window.scrollTo({ left: 0, top: height - 40, behavior: "smooth" });
    // };

    // const clickHandlerSmall = () => {
    //   window.scrollTo({ left: 0, top: worksHeight! - 40, behavior: "smooth" });
    // };
    const { locale } = useRouter();

    const videoNext = () => {
      setVideoNav({ toggle: !videoNav.toggle, direction: -1 });
    };

    const videoPrev = () => {
      setVideoNav({ toggle: !videoNav.toggle, direction: 1 });
    };

    return (
      <div className="relative">
        <div className="absolute z-0 w-full h-[90vh]">
          <VideoPlayer isPlay={isPlay} videoNav={videoNav} />
        </div>
        <div>
          <div className="w-screen max-w-screen-2xl ">
            
             <div className="sticky w-full pt-3 md:pt-6 pl-3 sm:pl-6 left-0 top-0 text-gray-200 mix-blend-plus-lighter">
              <div className="flex flex-row justify-between pr-3 sm:pr-6 pt-4 md:pt-8 pb-4">
                <button onClick={videoNext}>
                  <ArrowLeft size={38} weight="bold" color="white" />
                </button>
                <button onClick={videoPrev}>
                  <ArrowRight size={38} weight="bold" color="white" />
                </button>
              </div>
            </div> 
          </div>
        </div>
      </div>
    );
  }

export default VideoHero;
