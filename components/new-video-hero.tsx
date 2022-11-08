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

const VideoHero = () => {
  const [tituloVideo, setTituloVideo] = useState("");
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

  const setName = (titulo: string) => {
    setTituloVideo(titulo);
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute z-0 w-full h-full">
          <VideoPlayer setName={setName} isPlay={isPlay} videoNav={videoNav} />
        </div>
        <div>
          <div className="w-screen h-[90vh]">
            <div className="sticky pl-4 pr-4 inset-x-0 top-0 text-gray-200 mix-blend-plus-lighter">
              <div className="flex flex-row justify-between pt-4 pb-4">
                <button onClick={videoNext}>
                  <ArrowLeft size={38} weight="bold" color="white" />
                </button>
                <button onClick={videoPrev}>
                  <ArrowRight size={38} weight="bold" color="white" />
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 ml-4 mb-4">
              <div className="text-white">{tituloVideo}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
