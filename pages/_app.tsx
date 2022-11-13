import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, forwardRef, useEffect, CSSProperties } from "react";
import { useTransition, animated } from "@react-spring/web";
import PageBackground from "../components/stacking-effects3/index";

const AppWrapper = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  // initial state
  const [componentArray, setComponentArray] = useState([
    <Component key={router.pathname} {...pageProps} />,
  ]);

  const transitions = useTransition(componentArray, {
    from: { opacity: 0 },
    enter: { opacity: 1, position: "relative" },
    leave: { opacity: 0, position: "absolute" },
    config: { mass: 1, tension: 280, friction: 60, duration: 600 },
  });

  // Updates the array when needed. Avoids rerenders
  useEffect(() => {
    if (componentArray[0].key === router.pathname) {
      return;
    }
    setComponentArray([<Component key={router.pathname} {...pageProps} />]);
  }, [Component, pageProps, router, componentArray]);

  return (
    <>
      {transitions((style, item) => {
        return <animated.div style={style}>{item}</animated.div>;
      })}
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div className="fixed w-full h-[110vh] ">
        <PageBackground
          progress={0.5}
          scale={0.8}
          src={"/shader-backgrounds/2.png"}
          imgAspect={1.77}
          imgScale={2.0}
          speed={-0.02}
        />
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </div>
    </div>
  );
}

export default MyApp;
