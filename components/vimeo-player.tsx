import ReactPlayer from "react-player";
import { useEffect, useState, useRef } from "react";

interface VimeoPlayerProps {
  url: string;
  className: string;
}

const VimeoPlayer = ({ url, className }: VimeoPlayerProps) => {
  /**
   * This to avoid hydration error from ReactPlayer
   * https://stackoverflow.com/questions/72235211/trying-to-use-react-player-throws-a-hydration-error
   */
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <div className={className}>
      {hasWindow && (
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          className=""
          controls
        />
      )}
    </div>
  );
};

export default VimeoPlayer;
