import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import { bioPost } from "../../interfaces/interfaces";
interface BioColumnFromMarkdownProps {
  post: bioPost;
}

const BioColumnFromMarkdown = ({ post }: BioColumnFromMarkdownProps) => {
  const { locale } = useRouter();
  return (
    <ReactMarkdown
      // eslint-disable-next-line
      children={  locale === "es"
      ? post.contentSpanish
      : post.contentEnglish}
      className="bio"
      components={{
        // this should go into a separate component
        h1: ({ node, ...props }) => {
          const id = props.children[0] as string;

          return <h1 {...props} id={id.replaceAll(" ", "_")} />;
        },
      }}
    />
  );
};

export default BioColumnFromMarkdown;
