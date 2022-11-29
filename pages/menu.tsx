import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useMeasure from "react-use-measure";
import PageBackground from "../components/stacking-effects3/index";
import NewNavBar from "../components/new-nav-bar";
import Link from "next/link";
const MenuPage = () => {
  const { locale } = useRouter();
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const target = e.target as Document;
      const scrollTop = target.documentElement.scrollTop;
      setScrollTop(scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div>
      <NewNavBar scrollTop={10} scrollThreshold={0} />
      <div className="fixed w-screen h-screen">
        <PageBackground
          progress={0.5}
          scale={0.8}
          src={"/shader-backgrounds/4.jpeg"}
          imgAspect={1.77}
          imgScale={2.0}
          speed={-0.02}
          brightness={-0.4}
          scroll={scrollTop}
        />
      </div>

      <div className="pt-28  flex flex-col space-y-32 items-center text-center text-9xl font-bold overflow-auto">
        {/* Menu */}
        <Link href={"/works"}>
          <div className="mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
            Works
          </div>
        </Link>
        <Link href="/new-index#exhibitions">
          <div className="mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
            Exhibitions
          </div>
        </Link>
        <Link href={"/new-bio"}>
          <div className="mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
            Bio
          </div>
        </Link>

        {/* Contact */}
        <div className="relative text-white text-center flex flex-col items-center pb-40">
          <div className="text-6xl mix-blend-difference transition-all duration-75 hover:text-indigo-600 hover:cursor-pointer">
            Contact
          </div>
          <div className="mt-16 text-4xl flex flex-col items-center">
            <div>
              <a
                className="break-words hover:underline"
                href="mailto:catalinaandonie@gmail.com"
              >
                catalinaandonie@gmail.com
              </a>
            </div>
            <div className="mt-4 hover:underline">
              <a href="https://www.instagram.com/catalina.andonie/">
                @catalina.andonie
              </a>
            </div>
            <div className="mt-4">
              {locale === "es" ? (
                <p>Todos los derechos reservados.</p>
              ) : (
                <p>All rights reserved.</p>
              )}
            </div>
            <div className="mt-4">2022</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
