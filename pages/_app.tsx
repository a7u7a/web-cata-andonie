import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, forwardRef, useEffect, CSSProperties } from "react";
import { useTransition, animated } from "@react-spring/web";
import PageBackground from "../components/stacking-effects3/index";

interface AppWrapperProps {
  children: JSX.Element;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  const router = useRouter();
  const transitions = useTransition(router, {
    from: { opacity: 0 },
    enter: { opacity: 1, position: "absolute" },
    leave: { opacity: 0, position: "relative" },
    config: { mass: 1, tension: 280, friction: 60, duration: 600 },
  });

  return (
    <>
      {transitions((style, item) => {
        return <animated.div style={style}>{children}</animated.div>;
      })}
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div className="fixed w-full h-[110vh]">
        <PageBackground
          progress={0.5}
          scale={0.8}
          src={"/shader-backgrounds/2.png"}
          imgAspect={1.77}
          imgScale={2.0}
          speed={-0.02}
        />
      </div>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </div>
  );
}

export default MyApp;
