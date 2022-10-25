import Link from "next/link";
import { useRouter } from "next/router";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { useState, useEffect, useLayoutEffect } from "react";

interface NavBarProps {
  transparent?: boolean;
  scrollTop?: number;
  scrollThreshold?: number;
}

const NavBar = ({
  transparent = false,
  scrollTop,
  scrollThreshold,
}: NavBarProps) => {
  const [check, setCheck] = useState(false);
  const [classString, setClassString] = useState("");

  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver });

  // Using two useEffects so I can avoid updating isVisible every time scrollTop changes
  useEffect(() => {
    if (scrollThreshold != undefined) {
      if (scrollTop! >= scrollThreshold - bounds.height) {
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
    if (transparent) {
      // either transition from bg-transparent to bg-black
      setClassString(`fixed inset-x-0 top-0 flex flex-row justify-between
        w-screen text-white z-50 
        transition-all duration-300 ease-out
        ${check ? "bg-black" : " bg-transparent"} `);
    } else {
      // or transition from opacity-0 to opacity-100
      setClassString(`fixed inset-x-0 top-0 flex flex-row justify-between
        w-screen text-white z-50 
        transition-all duration-300 ease-out bg-black
        ${check ? "opacity-100" : "opacity-0"} `);
    }
  }, [check]);

  const router = useRouter();
  const { locales, locale: activeLocale, pathname, asPath, query } = router;

  // Get other locale, assumes only two locales
  const otherLocale = locales!.filter((locale) => locale !== activeLocale)[0];

  return (
    <div ref={ref} className={classString}>
      <Link href={"/"}>
        <div className="pl-3 md:pl-6 p-3 font-black text-2xl cursor-pointer hover:text-gray-300">
          Catalina Andonie
        </div>
      </Link>
      <div className="flex flex-row pr-3 md:pr-6 space-x-5 md:space-x-12">
        <Link href={"/bio"}>
          <div className="flex items-center text-center text-xl hover:underline cursor-pointer">
            Bio
          </div>
        </Link>

        <div
          className="flex items-center text-center text-xl hover:underline cursor-pointer"
          placeholder=""
        >
          <Link href={{ pathname, query }} as={asPath} locale={otherLocale}>
            <div>{activeLocale === "es" ? "English" : "Español"}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
