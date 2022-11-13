import "../styles/globals.css";
import type { AppProps } from "next/app";

import { useRouter } from "next/router";
import { useState, forwardRef, useEffect, CSSProperties } from "react";
import { useTransition, animated } from "@react-spring/web";

interface TestWrapperProps {
  children: JSX.Element;
}

const TestWrapper = ({ Component, pageProps }: AppProps) => {
  
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // initial state
  const [componentArray, setComponentArray] = useState([
    <Component key={router.pathname} {...pageProps} />
  ]);

  const transitions = useTransition(componentArray, {
    from: { opacity: 0 },
    enter: { opacity: 1, position: "relative" },
    leave: { opacity: 0, position: "absolute" },
    config: { mass: 1, tension: 280, friction: 60, duration: 600 }
  });

  // Updates the array when needed. Avoids rerenders
  useEffect(() => {
    if (componentArray[0].key === router.pathname) {
      return;
    }
    setComponentArray([<Component key={router.pathname} {...pageProps} />]);
  }, [Component, pageProps, router, componentArray]);

  return (
    <div>
      {transitions((style, item) => {
        return <animated.div style={style}>{item}</animated.div>;
      })}
    </div>
  );
}

export default MyApp;
