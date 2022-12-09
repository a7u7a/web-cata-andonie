import Link from "next/link";
import { useRouter } from "next/router";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { useState, useEffect, useRef } from "react";

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
  const [hoverMenu, setHoverMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const wrapperRef = useRef(null);

  const router = useRouter();
  const { locales, locale: activeLocale, pathname, asPath, query } = router;

  // Get other locale, assumes only two locales
  const otherLocale = locales!.filter((locale) => locale !== activeLocale)[0];

  useEffect(() => {
    // hide menu after transition is complete
    // show menu when hover is true
    if (hoverMenu === false) {
      setTimeout(() => {
        setHidden(true);
      }, 200);
    } else {
      setHidden(false);
    }
  }, [hoverMenu]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      // @ts-ignore
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setHoverMenu(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="fixed bottom-0 md:top-0 right-0 z-50 mix-blend-difference p-4 md:p-6">
      <div
        onMouseEnter={() => setHoverMenu(true)}
        onClick={() => setHoverMenu(true)}
        className={`absolute pr-4 md:pt-4 md:pr-6 h-14 bottom-0 md:top-0 right-0 text-right text-3xl text-white z-50 transition-opacity duration-200 ${
          hoverMenu ? "opacity-0 z-40" : "opacity-100 z-50"
        }`}
      >
        Menu
      </div>

      <div
        ref={wrapperRef}
        onMouseLeave={() => setHoverMenu(false)}
        className={`text-3xl text-white z-50 transition-opacity text-right mix-blend-normal duration-200 ${
          hoverMenu ? "opacity-100 z-50" : "opacity-0 z-40"
        }
        ${hidden ? "hidden" : "block"}
        `}
      >
        <div className="absolute h-64 inset-0 bg-gray-400 w-full z-0 blur-xl "></div>
        <div className="relative flex flex-col space-y-3">
          <Link href="/">
            <div className="hover:underline cursor-pointer z-50">HOME</div>
          </Link>
          <Link href="/obras">
            <div className="hover:underline cursor-pointer z-50">WORKS</div>
          </Link>
          <Link href="/bio">
            <div className="hover:underline cursor-pointer z-50">BIO</div>
          </Link>
          <Link href="/#contact">
            <div className="hover:underline cursor-pointer z-50">CONTACT</div>
          </Link>
          <Link href={{ pathname, query }} as={asPath} locale={otherLocale}>
            <div className="hover:underline cursor-pointer z-50">
              {activeLocale === "es" ? "ENGLISH" : "ESPAÑOL"}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
