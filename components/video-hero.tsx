import {
  useState,
  forwardRef,
  useRef,
  useEffect,
  SyntheticEvent,
  UIEvent,
} from "react";
import VideoPlayer from "../components/video-player";
import { VideoNavProps } from "../interfaces/interfaces";

// so stupid
interface VideoHeroProps {
  height: number;
}

const VideoHero = forwardRef<HTMLDivElement, VideoHeroProps>(
  ({ height }: VideoHeroProps, ref) => {
    VideoHero.displayName = "VideoHero";
    const [isPlay, setIsPlay] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [videoNav, setVideoNav] = useState<VideoNavProps>({
      toggle: false,
      direction: 0,
    });

    const clickHandler = () => {
      window.scrollTo({ left: 0, top: height, behavior: "smooth" });
    };

    return (
      <div ref={ref}>
        <div className="absolute z-0 w-full h-[135vh]">
          <VideoPlayer isPlay={isPlay} videoNav={videoNav} />
        </div>

        <div className="h-[135vh]">
          <div className="sticky w-full pt-6 pl-6 left-0 top-0 text-gray-200 mix-blend-plus-lighter">
            <div className="w-1/2 text-6xl font-black">Catalina Andonie</div>
            <div className="flex flex-row justify-between text-3xl pr-6 pt-8 pb-4">
              <div
                onClick={clickHandler}
                className="hover:underline hover:cursor-pointer"
              >
                About
              </div>
              <div
                onClick={clickHandler}
                className="hover:underline hover:cursor-pointer"
              >
                Works
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default VideoHero;
