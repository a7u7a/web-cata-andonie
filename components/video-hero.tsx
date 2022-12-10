import { useState, forwardRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useMediaQuery from "../lib/media";
import VideoPlayer from "./video-player/video-player";
import { VideoNavProps } from "../interfaces/interfaces";
import { ArrowLeft, ArrowRight } from "phosphor-react";

interface VideoHeroProps {
  className: string;
}

const VideoHero = () => {
  const [tituloVideo, setTituloVideo] = useState<videoSourceProps>({
    name: " ",
    url: " ",
    path: " ",
  });
  const [isPlay, setIsPlay] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const [videoNav, setVideoNav] = useState<VideoNavProps>({
    toggle: false,
    direction: 0,
  });

  interface videoSourceProps {
    name: string;
    path: string;
    url: string;
  }

  const isMd = useMediaQuery("(max-width: 768px)");

  const { locale } = useRouter();

  const videoNext = () => {
    setVideoNav({ toggle: !videoNav.toggle, direction: -1 });
  };

  const videoPrev = () => {
    setVideoNav({ toggle: !videoNav.toggle, direction: 1 });
  };

  const setName = ({ name, path, url }: videoSourceProps) => {
    setTituloVideo({ name, path, url });
  };

  return (
    <div className="relative">
      <div className="absolute w-full h-full">
        <VideoPlayer setName={setName} isPlay={isPlay} videoNav={videoNav} />
      </div>
      <div>
        <div className="relative w-screen h-[90vh]">
          <div className="absolute inset-x-0 bottom-0 px-3 md:px-6">
            <div className="mix-blend-difference flex flex-row items-center justify-between pt-4 pb-4">
              <button
                onMouseEnter={() => setLeftHover(true)}
                onMouseLeave={() => setLeftHover(false)}
                onClick={videoPrev}
              >
                <ArrowLeft
                  size={38}
                  weight="bold"
                  color={`${leftHover ? "#4f46e5" : "white"}`}
                />
              </button>

              <Link href={tituloVideo.url}>
                <div className="text-white text-center text-3xl cursor-pointer hover:underline">
                  {tituloVideo.name}
                </div>
              </Link>

              <button
                onMouseEnter={() => setRightHover(true)}
                onMouseLeave={() => setRightHover(false)}
                onClick={videoPrev}
              >
                <ArrowRight
                  size={38}
                  weight="bold"
                  color={`${rightHover ? "#4f46e5" : "white"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
