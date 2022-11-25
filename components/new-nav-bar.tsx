import Link from "next/link";
import { useRouter } from "next/router";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { useState, useEffect } from "react";

interface NavBarProps {
  scrollTop?: number;
  scrollThreshold?: number;
}

const NavBar = ({
  scrollTop,
  scrollThreshold,
}: NavBarProps) => {
  const [check, setCheck] = useState(false);
  const [classString, setClassString] = useState("");
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver });

  // Using two useEffects so I can avoid updating the check every time scrollTop updates
  useEffect(() => {
    if (scrollThreshold != undefined) {
      if (scrollTop! >= scrollThreshold) {
        // update visibility
        setCheck(true);
      } else {
        setCheck(false);
      }
    } else {
      setCheck(true);
    }
  }, [scrollTop, scrollThreshold, bounds.height]);

  useEffect(() => {
    // or transition from opacity-0 to opacity-100
    setClassString(`fixed mix-blend-difference inset-x-0 top-0 flex flex-row justify-between
        w-screen text-white z-50 px-6
        transition-all duration-300 ease-out
        ${check ? "opacity-100" : "opacity-0"} `);
  }, [check]);

  const router = useRouter();
  const { locales, locale: activeLocale, pathname, asPath, query } = router;

  // Get other locale, assumes only two locales
  const otherLocale = locales!.filter((locale) => locale !== activeLocale)[0];

  return (
    <div ref={ref} className={classString}>
      <Link href={"/bio"}>
        <div className="flex items-center text-center text-xl hover:underline cursor-pointer">
          Menu
        </div>
      </Link>

      <Link href={"/"}>
        <div className="pl-3 md:pl-6 p-3 font-black text-4xl cursor-pointer hover:text-indigo-600">
          Catalina Andonie
        </div>
      </Link>

      <Link href={{ pathname, query }} as={asPath} locale={otherLocale}>
        <div className="flex items-center text-center text-xl hover:underline cursor-pointer">
          {activeLocale === "es" ? "English" : "Español"}
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
