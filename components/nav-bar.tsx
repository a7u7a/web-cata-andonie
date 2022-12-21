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
  background?: boolean;
}

const NavBar = ({
  scrollTop,
  scrollThreshold,
  whiteText = false,
  background = false,
}: NavBarProps) => {
  const [hoverMenu, setHoverMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [otherHidden, setOtherHidden] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // hide menu after transition is complete
    // show menu when hover is true
    if (!hoverMenu) {
      // hide menu
      setTimeout(() => {
        if (!hoverMenu) {
          setHidden(true);
        }
      }, 200);
      setOtherHidden(true);
    } else {
      // show menu
      setHidden(false);
      setTimeout(() => {
        setOtherHidden(false);
      }, 10);
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
    <div className="relative">

    
    <div      
      className={`fixed bottom-0 md:top-0 right-0 z-50 mix-blend-difference`}
    >

      <div
      onMouseEnter={() => setHoverMenu(true)}
        onClick={() => setHoverMenu(!hoverMenu)}
        className={`absolute p-4 md:p-6 pb-12 md:pt-4 h-14 bottom-0 md:top-0 right-0 text-right cursor-pointer text-3xl text-white z-50 transition-opacity duration-100 `}
      >
        Menu
      </div>

      <div
      onMouseLeave={() => setHoverMenu(false)}
        ref={wrapperRef}
        className={`text-3xl text-right transition-all duration-200 p-4 md:p-6 ${
          !otherHidden
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 md:-translate-y-2"
        }
        ${hidden ? "hidden" : "block"}
        `}
      >
        <div className="relative flex items-end flex-col space-y-4 pl-6 z-50 pb-12 md:pt-12 md:pb-0">
          <MenuItem
            background={background}
            href="/"
            titleEs={"INICIO"}
            titleEng={"HOME"}
          />

          <MenuItem
            background={background}
            href="/obras"
            titleEs={"OBRAS"}
            titleEng={"WORKS"}
          />

          <MenuItem
            background={background}
            href="/bio"
            titleEs={"BIO"}
            titleEng={"BIO"}
          />

          <MenuItem
            background={background}
            href="/#contact"
            titleEs={"CONTACTO"}
            titleEng={"CONTACT"}
          />

          <MenuItem
            background={background}
            titleEs={"ENGLISH"}
            titleEng={"ESPAÑOL"}
            langBtn
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default NavBar;
