import Link from "next/link";
import { useRouter } from "next/router";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { useState, useEffect } from "react";

interface NavBarProps {
  scrollTop?: number;
  scrollThreshold?: number;
  whiteText?: boolean;
}

const NavBar = ({
  scrollTop,
  scrollThreshold,
  whiteText = false,
}: NavBarProps) => {
  const [check, setCheck] = useState(false);
  const [classString, setClassString] = useState("");
  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver });
  const [hoverMenu, setHoverMenu] = useState(false);

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
        w-screen z-50 px-6 pt-4
        transition-all duration-300 ease-out
        ${check ? "opacity-100" : "opacity-0"}`);
  }, [check]);

  const router = useRouter();
  const { locales, locale: activeLocale, pathname, asPath, query } = router;

  // Get other locale, assumes only two locales
  const otherLocale = locales!.filter((locale) => locale !== activeLocale)[0];

  return (
    <div ref={ref} className={classString}>
      <div
        onMouseLeave={() => setHoverMenu(false)}
        className={`absolute top-0 right-0 p-6 items-end flex text-3xl text-white flex-col space-y-3 transition-opacity ${
          hoverMenu ? "opacity-100 z-50" : "opacity-0 z-40"
        }`}
      >
        <Link href="/">
          <div className="hover:underline cursor-pointer">HOME</div>
        </Link>
        <Link href="/obras">
          <div className="hover:underline cursor-pointer">WORKS</div>
        </Link>
        <Link href="/bio">
          <div className="hover:underline cursor-pointer">BIO</div>
        </Link>
        <Link href="/#contact">
          <div className="hover:underline cursor-pointer">CONTACT</div>
        </Link>
        <Link href={{ pathname, query }} as={asPath} locale={otherLocale}>
          <div className="flex items-center text-center text-3xl hover:underline cursor-pointer">
            {activeLocale === "es" ? "ENGLISH" : "ESPAÑOL"}
          </div>
        </Link>
      </div>

      <div
        onMouseEnter={() => setHoverMenu(true)}
        className={`absolute top-0 right-0 p-6 flex items-center text-white text-center text-3xl cursor-pointer transition-opacity ${
          hoverMenu ? "opacity-0 z-40" : "opacity-100 z-50"
        }`}
      >
        Menu
      </div>
    </div>
  );
};

export default NavBar;
