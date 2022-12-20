import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface MenuItemProps {
  titleEs: string;
  titleEng: string;
  href?: string;
  langBtn?: boolean;
}

const MenuItem = ({ titleEs, titleEng, langBtn=false, href="" }: MenuItemProps) => {
  const router = useRouter();
  const { locales, locale: activeLocale, pathname, asPath, query } = router;

  // Get other locale, assumes only two locales
  const otherLocale = locales!.filter((locale) => locale !== activeLocale)[0];
  const [hovered, setHovered] = useState(false);
  const MainContent = (
    <div
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
      className="relative w-auto h-full text-white hover:text-indigo-600 cursor-pointer"
    >
      <div className="z-50">{activeLocale === "es" ? titleEs : titleEng}</div>
      <div
        className={`absolute inset-0 w-full z-10 blur-xl rounded-3xl ${
          hovered ? "bg-white" : "bg-indigo-300"
        }`}
      ></div>
    </div>
  );
  return (
    <div>
      {langBtn ? (
        <Link href={{ pathname, query }} as={asPath} locale={otherLocale}>
          {MainContent}
        </Link>
      ) : (
        <Link href={href}>{MainContent}</Link>
      )}
    </div>
  );
};

export default MenuItem;
