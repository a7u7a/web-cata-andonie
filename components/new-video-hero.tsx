import { useState, forwardRef, useEffect } from "react";
import { useRouter } from "next/router";
import useMediaQuery from "../lib/media";
import VideoPlayer from "./video-player/video-player";
import { VideoNavProps } from "../interfaces/interfaces";
import { ArrowLeft, ArrowRight } from "phosphor-react";

interface VideoHeroProps {
  className: string;
}

const VideoHero = ({ className }: VideoHeroProps) => {
  const [tituloVideo, setTituloVideo] = useState("");
  const [isPlay, setIsPlay] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [videoNav, setVideoNav] = useState<VideoNavProps>({
    toggle: false,
    direction: 0,
  });

  const isMd = useMediaQuery("(max-width: 768px)");

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
    <div className="pt-36 relative">
      <div className="absolute w-full h-full">
        <VideoPlayer setName={setName} isPlay={isPlay} videoNav={videoNav} />
      </div>
      <div>
        <div className="mt-36 relative w-screen h-[90vh]">
          <div className="absolute inset-x-0 bottom-0 pl-4 pr-4">
            <div className="flex flex-row items-center justify-between pt-4 pb-4">

              <button onClick={videoNext}>
                <ArrowLeft size={38} weight="bold" color="white" />
              </button>

              
                <div className="text-white text-center">{tituloVideo}</div>
              

              <button onClick={videoPrev}>
                <ArrowRight size={38} weight="bold" color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
