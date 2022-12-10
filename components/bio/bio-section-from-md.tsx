import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import { bioPost } from "../../interfaces/interfaces";
import { useState } from "react";
import { CaretRight, CaretDown } from "phosphor-react";

interface BioColumnFromMarkdownProps {
  post: bioPost;
}

const BioSectionFromMarkdown = ({ post }: BioColumnFromMarkdownProps) => {
  const { locale } = useRouter();
  const [dropdown, setDropdown] = useState(false);

  return (
    <div>
      <div
        onClick={() => setDropdown(!dropdown)}
        className={`text-white hover:underline 
      cursor-pointer flex flex-row
      justify-start w-full `}
      >
        {dropdown ? (
          <div className="w-12 -ml-2.5">
            <CaretDown size={38} weight="bold" color="white" />
          </div>
        ) : (
          <div className="w-12 -ml-2.5">
            <CaretRight size={38} weight="bold" color="white" />
          </div>
        )}
        <h2 className="text-3xl md:text-4xl text-left">{locale === "es" ? post.title : post.title_eng}</h2>
      </div> 
      {dropdown ? (
        <ReactMarkdown
          // eslint-disable-next-line
          children={locale === "es" ? post.contentSpanish : post.contentEnglish}
          className="bio"
          components={{
            // this should go into a separate component
            h5: ({ node, ...props }) => {
              const id = props.children[0] as string;

              return <h5 {...props} id={id.replaceAll(" ", "_")} />;
            },
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default BioSectionFromMarkdown;
