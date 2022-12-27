import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFBO } from "@react-three/drei";

interface MenuItemProps {
  titleEs: string;
  titleEng: string;
  href?: string;
  langBtn?: boolean;
  whiteBackground: boolean;
}

const MenuItem = ({
  titleEs,
  titleEng,
  langBtn = false,
  href = "",
  whiteBackground,
}: MenuItemProps) => {
  const router = useRouter();
  const { locales, locale: activeLocale, pathname, asPath, query } = router;

  // Get other locale, assumes only two locales
  const otherLocale = locales!.filter((locale) => locale !== activeLocale)[0];
  const [hovered, setHovered] = useState(false);
  const [highlightColor, setHighlightColor] = useState("indigo-600");
  

  useEffect(() => {
    if (whiteBackground) {
      setHighlightColor("[#858008]");
    } else {
      setHighlightColor("indigo-400");
    }
  }, [whiteBackground]);

  const MainContent = (
    <div
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
      className={`relative w-auto h-full text-white hover:md:text-${highlightColor} cursor-pointer`}
    >
      <div className="relative z-50">
        {activeLocale === "es" ? titleEs : titleEng}
      </div>
     
        <div
          className={`absolute inset-0 w-full z-10 blur-xl rounded-3xl transition-colors ${
            hovered ? "bg-white " : `bg-${highlightColor}`
          }`}
        />
     
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
