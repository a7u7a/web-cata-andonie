import Link from "next/link";
import { useState, useEffect } from "react";

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

  // Using two useEffects so I can avoid updating isVisible every time scrollTop changes
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
  }, [scrollTop]);

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

  return (
    <div className={classString}>
      <Link href={"/"}>
        <div className="pl-6 p-3 font-black text-2xl cursor-pointer hover:text-gray-300">
          Catalina Andonie
        </div>
      </Link>
      <div className="flex flex-row pr-6 space-x-12">
        <Link href={"/bio"}>
          <div className="flex items-center text-center text-xl hover:underline cursor-pointer">
            Bio
          </div>
        </Link>
        <div className="flex items-center text-center text-xl hover:underline cursor-pointer">
          <div>English</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
