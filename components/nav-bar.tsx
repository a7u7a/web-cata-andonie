import Link from "next/link";
import { useRouter } from "next/router";
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

  // // set language
  // const [lang, setLang] = useState("en");
  // useEffect(() => {
  //   if (sessionStorage.getItem("lang")) {
  //     setLang(sessionStorage.getItem("lang")!);
  //   } else {
  //     // if no language in sessionstorage, get from browser
  //     if (/^es\b/.test(navigator.language)) {
  //       setLang("es");
  //     } else {
  //       setLang("en");
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   sessionStorage.setItem("lang", lang);
  //   console.log("setting lang to", sessionStorage.getItem("lang"));
  // }, [lang]);

  const router = useRouter();
  const { locale } = useRouter();

  // const onChangeLanguage = (lang: string) => (e: Event) => {
  //   e.preventDefault();
  //   router.push(router.asPath, undefined, { locale: lang });
  //   console.log("locale after", locale);
  // };

  // useEffect(() => {
  //   console.log("locale", locale);
  // }, [locale]);

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

        <button
          // onClick={() => onChangeLanguage("es")}
          className="flex items-center text-center text-xl hover:underline"
        >
          <div>English</div>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
