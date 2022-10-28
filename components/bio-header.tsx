import { forwardRef } from "react";
import { useRouter } from "next/router";
import { bioStatementPost } from "../interfaces/interfaces";

interface BioHeaderProps {
  bioStatement: bioStatementPost;
}

const BioHeader = forwardRef<HTMLDivElement, BioHeaderProps>(
  ({ bioStatement }: BioHeaderProps, ref) => {
    BioHeader.displayName = "VideoHero";
    const { locale } = useRouter();
    return (
      <div ref={ref} className="w-screen bg-gray-200">
        <div className="pt-28 pb-28 pl-3 md:pl-6 pr-3 md:pr-6 text-3xl font-bold w-full md:w-2/3 text-white">
          {locale === "es"
            ? bioStatement.contentSpanish
            : bioStatement.contentEnglish}
        </div>
      </div>
    );
  }
);

export default BioHeader;
