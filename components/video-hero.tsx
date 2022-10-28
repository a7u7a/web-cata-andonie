import { useState, forwardRef, useEffect } from "react";
import { useRouter } from "next/router";
import useMediaQuery from "../lib/media";
import VideoPlayer from "../components/video-player";
import { VideoNavProps } from "../interfaces/interfaces";
import { CaretRight, CaretLeft } from "phosphor-react";

interface VideoHeroProps {
  height: number;
  worksHeight?: number;
}

const VideoHero = forwardRef<HTMLDivElement, VideoHeroProps>(
  ({ height, worksHeight }: VideoHeroProps, ref) => {
    VideoHero.displayName = "VideoHero";
    const [isPlay, setIsPlay] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [videoNav, setVideoNav] = useState<VideoNavProps>({
      toggle: false,
      direction: 0,
    });

    const isMd = useMediaQuery("(max-width: 768px)");

    const clickHandler = () => {
      window.scrollTo({ left: 0, top: height - 40, behavior: "smooth" });
    };

    const clickHandlerSmall = () => {
      window.scrollTo({ left: 0, top: worksHeight! - 40, behavior: "smooth" });
    };
    const { locale } = useRouter();

    const videoNext = () => {
      setVideoNav({ toggle: !videoNav.toggle, direction: -1 });
    };

    const videoPrev = () => {
      setVideoNav({ toggle: !videoNav.toggle, direction: 1 });
    };

    return (
      <div ref={ref}>
        <div className="absolute z-0 w-full h-[135vh]">
          <VideoPlayer isPlay={isPlay} videoNav={videoNav} />
        </div>
        <div>
          <div className="h-[135vh] w-screen max-w-screen-2xl">
            <div className="sticky w-full pt-3 md:pt-6 pl-3 sm:pl-6 left-0 top-0 text-gray-200 mix-blend-plus-lighter">
              <div className="w-full text-4xl md:text-6xl font-black">
                Catalina Andonie
              </div>
              <div className="flex flex-row justify-between text-2xl md:text-3xl pr-3 sm:pr-6 pt-4 md:pt-8 pb-4">
                <div
                  onClick={clickHandler}
                  className="hover:underline underline-offset-4 hover:cursor-pointer"
                >
                  {locale === "es" ? "Info" : "About"}
                </div>
                <div
                  onClick={isMd ? clickHandlerSmall : clickHandler}
                  className="hover:underline underline-offset-4 hover:cursor-pointer"
                >
                  {locale === "es" ? "Obra" : "Works"}
                </div>
              </div>
              <div className="flex flex-row justify-between pr-3 sm:pr-6 pt-4 md:pt-8 pb-4">
                <button onClick={videoNext}>
                  <CaretLeft size={38} weight="bold" color="white" />
                </button>
                <button onClick={videoPrev}>
                  <CaretRight size={38} weight="bold" color="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default VideoHero;
