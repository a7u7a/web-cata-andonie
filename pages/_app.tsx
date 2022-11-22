import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, forwardRef, useEffect, CSSProperties } from "react";
import { useTransition, animated, Transition } from "@react-spring/web";
import PageBackground from "../components/stacking-effects3/index";

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
  // return (
  //   <div>
  //     <div className="z-0 fixed w-full flex flex-row justify-center text-8xl font-bold">
  //       Catalina Andonie
  //     </div>
  //     <div className="absolute z-10 w-full h-[110vh] pt-40">
  //       <PageBackground
  //         progress={0.5}
  //         scale={0.8}
  //         src={"/shader-backgrounds2/1.png"}
  //         imgAspect={1.77}
  //         imgScale={2.0}
  //         speed={-0.02}
  //       />
  //     </div>
  //     <Component {...pageProps} />
  //   </div>
  // );

  return (
    <div>
      <div className="z-0 fixed w-full flex flex-row justify-center text-8xl font-bold">
        Catalina Andonie
      </div>
      <div className="absolute z-10 w-full h-[110vh] pt-40">
        <PageBackground
          progress={0.5}
          scale={0.8}
          src={"/shader-backgrounds2/1.png"}
          imgAspect={1.77}
          imgScale={2.0}
          speed={-0.02}
        />
      </div>

      <Transition
        items={items}
        // @ts-ignore
        keys={(item) => item.id}
        from={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        enter={{ opacity: 1  }}
        leave={{ opacity: 0}}
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
