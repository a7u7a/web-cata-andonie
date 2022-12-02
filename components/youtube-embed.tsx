interface YouTubeEmbedProps {
  url: string;
}

const YouTubeEmbed = ({ url }: YouTubeEmbedProps) => {
  return (
    <div className="relative overflow-hidden">
      <iframe className="w-full h-[70vh]"
        width="560"
        height="315"
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="modestbranding; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
