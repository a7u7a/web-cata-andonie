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
  whiteBackground?: boolean;
  
}

const NavBar = ({
  scrollTop,
  scrollThreshold,
  whiteText = false,
  whiteBackground = false,
}: NavBarProps) => {
  const [hoverMenu, setHoverMenu] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [otherHidden, setOtherHidden] = useState(false);
  const wrapperRef = useRef(null);
  const buttonClassName = `absolute p-4 md:p-6 pb-12 md:pt-4 h-14 bottom-0 md:top-0 right-0 text-right cursor-pointer text-3xl text-white z-50 transition-opacity duration-100`;

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
        ref={wrapperRef}
          onMouseEnter={() => setHoverMenu(true)}
          onClick={() => setHoverMenu(!hoverMenu)}
          className={buttonClassName}
        >
          Menu
        </div>

        <div
          onMouseLeave={() => setHoverMenu(false)}
          
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
              whiteBackground={whiteBackground}
              href="/"
              titleEs={"INICIO"}
              titleEng={"HOME"}
            />

            <MenuItem
              whiteBackground={whiteBackground}
              href="/obras"
              titleEs={"OBRAS"}
              titleEng={"WORKS"}
            />

            <MenuItem
              whiteBackground={whiteBackground}
              href="/bio"
              titleEs={"BIO"}
              titleEng={"BIO"}
            />

            <MenuItem
              whiteBackground={whiteBackground}
              href="/#contact"
              titleEs={"CONTACTO"}
              titleEng={"CONTACT"}
            />

            <MenuItem
              whiteBackground={whiteBackground}
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
