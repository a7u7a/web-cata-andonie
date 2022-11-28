import "../styles/globals.css";
import { GetStaticProps } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, forwardRef, useEffect, CSSProperties } from "react";
import { useTransition, animated, Transition } from "@react-spring/web";
import {
  getAllWorkPosts,
  getAllExhibitionsPosts,
  getAbout,
} from "../lib/posts";
import About from "../components/new-about";
import PageBackground from "../components/stacking-effects3/index";
import VideoHero from "../components/new-video-hero";
import { workPost, exhibitionsPost, aboutPost } from "../interfaces/interfaces";

interface AppWrapperProps {
  children: JSX.Element;
}

// const AppWrapper = ({ children }: AppWrapperProps) => {
//   const router = useRouter();
//   const transitions = useTransition(router, {
//     from: { opacity: 0 },
//     enter: { opacity: 1, position: "absolute" },
//     leave: { opacity: 0, position: "relative" },
//     config: { mass: 1, tension: 280, friction: 60, duration: 600 },
//   });

//   return (
//     <>
//       {transitions((style, item) => {

//         return <animated.div style={style}>{children}</animated.div>;
//       })}
//     </>
//   );
// };

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const items = [
    {
      id: router.route,
      Component,
      pageProps,
    },
  ];

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
      <Transition
        items={items}
        // @ts-ignore
        keys={(item) => item.id}
        from={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {(
          // @ts-ignore
          styles,
          // @ts-ignore
          { pageProps: animatedPageProps, Component: AnimatedComponent },
          // @ts-ignore
          key
        ) => (
          <animated.div
            key={key}
            style={{
              ...styles,
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <AnimatedComponent {...animatedPageProps} />
          </animated.div>
        )}
      </Transition>
    </div>
  );
}

export default MyApp;
