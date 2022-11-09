import "../styles/globals.css";
import type { AppProps } from "next/app";

import { useRouter } from "next/router";
import { useState, forwardRef, useEffect } from "react";

interface TestWrapperProps {
  children: JSX.Element;
}

const TestWrapper = ({ children }: TestWrapperProps) => {
  const { route } = useRouter();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log("TestWrapper route", route);
    setCounter(counter + 1);
  }, [route]);

  useEffect(() => {
    console.log("counter", counter);
  }, [counter]);

  return <div>{children}</div>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TestWrapper>
      <Component {...pageProps} />
    </TestWrapper>
  );
}

export default MyApp;
