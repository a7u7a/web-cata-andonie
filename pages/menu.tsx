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


{/* <div className="h-screen"></div> */}

      <div className="pt-28 pb-40 flex flex-col space-y-24 items-center text-center text-9xl font-bold overflow-auto">
        <Link href={"/obras"}>
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

        <Link href={"/new-bio"}>
          <div className="mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
            Contact
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MenuPage;
