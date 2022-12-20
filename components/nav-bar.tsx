import Link from "next/link";
import { useRouter } from "next/router";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { useState, useEffect, useRef } from "react";
import MenuItem from "./menu-item";

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

  useEffect(() => {
    // hide menu after transition is complete
    // show menu when hover is true
    if (hoverMenu === false) {
      // hide
      setTimeout(() => {
        setHidden(true);
      }, 200);
    } else {
      // show
      setHidden(false);
    }
  }, [hoverMenu]);

  useEffect(() => {
    // detects click outside
    function handleClickOutside(event: Event) {
      // @ts-ignore
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setHoverMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="fixed bottom-0 md:top-0 right-0 z-50 pr-4 md:pr-6 md:pt-4 mix-blend-difference">
      <div
        onMouseEnter={() => setHoverMenu(true)}
        onClick={() => setHoverMenu(true)}
        className={`absolute pr-4 md:pr-6 md:pt-4 h-14 bottom-0 md:top-0 right-0 text-right text-3xl text-white z-50 transition-opacity duration-100 ${
          hoverMenu ? "opacity-0 z-0" : "opacity-100 z-50"
        }`}
      >
        Menu
      </div>

      <div
        ref={wrapperRef}
        onMouseLeave={() => setHoverMenu(false)}
        className={`text-3xl text-right transition-opacity duration-200 ${
          hoverMenu ? "opacity-100" : "opacity-0"
        }
        ${hidden ? "hidden" : "block"}
        `}
      >
        <div className="relative flex items-end flex-col space-y-4 pl-6 z-50">
          <MenuItem href="/" titleEs={"INICIO"} titleEng={"HOME"} />

          <MenuItem href="/obras" titleEs={"OBRAS"} titleEng={"WORKS"} />

          <MenuItem href="/bio" titleEs={"BIO"} titleEng={"BIO"} />

          <MenuItem
            href="/#contact"
            titleEs={"CONTACTO"}
            titleEng={"CONTACT"}
          />

          <MenuItem titleEs={"ENGLISH"} titleEng={"ESPAÑOL"} langBtn />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
