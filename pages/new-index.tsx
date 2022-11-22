import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import useMeasure from "react-use-measure";
import VideoHero from "../components/new-video-hero";
import { GetStaticProps } from "next";
import { workPost, exhibitionsPost, aboutPost } from "../interfaces/interfaces";
import About from "../components/new-about";
import News from "../components/new-news";
import {
  getAllWorkPosts,
  getAllExhibitionsPosts,
  getAbout,
} from "../lib/posts";
import useMediaQuery from "../lib/media";
import IndexImage from "../components/index-image";
import WorksCatalogue from "../components/new-works-catalogue";

interface VideoHeroProps {
  height: number;
  worksHeight?: number;
}

interface HomeProps {
  workPosts: workPost[];
  exhibitionsPosts: exhibitionsPost[];
  aboutPost: aboutPost;
}

function split(arr: workPost[], index: number) {
  return [arr.slice(0, index), arr.slice(index)];
}

const Home = ({ workPosts, exhibitionsPosts, aboutPost }: HomeProps) => {
  const { locale } = useRouter();
  const isMd = useMediaQuery("(max-width: 768px)");
  const frontPagePosts = workPosts.filter((post) => post.front_page);
  const [firstCol, secondCol] = split(
    frontPagePosts,
    Math.floor(frontPagePosts.length / 2)
  );

  useEffect(() => {
    frontPagePosts.sort((a, b) => {
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    });
  }, []);

  const [worksRef, worksBounds] = useMeasure({ polyfill: ResizeObserver });

  return (
    <div>
      <div>
        <div>
          {/* <div className="inset-y-0 right-0 mix-blend-difference z-50 w-full">
            <div className="pt-4 ">
              <p className="absolute right-0 pr-4 transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer text-8xl font-bold">
                Catalina Andonie
              </p>
            </div>
          </div> */}

          <div className="pl-4 relative flex flex-col">
            <div className="pt-20 mix-blend-difference  ">
              {/* <div className="font-bold text-7xl flex content-end">
                <p className="absolute right-0 pr-4 transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer ">
                  Catalina Andonie
                </p>
              </div> */}

              <div className="flex flex-col space-y-0 pr-4 text-8xl text-white mb-20">
                <div className="mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
                  <Link href={"/exhibitions"}>Exhibitions</Link>
                </div>
                <div className="mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
                  Works
                </div>
                <div className="mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
                  Bio
                </div>
                <div className="mix-blend-difference transition-all duration-300 hover:text-indigo-600 text-white hover:cursor-pointer">
                  Contact
                </div>
              </div>
            </div>

            {/* <div className="pt-48 flex flex-row justify-between">
              <About post={aboutPost} />
            </div> */}
          </div>
        </div>
        <VideoHero />

        <div className="relative flex flex-row">
          {/* <div className="w-1/2">
            <div className="absolute w-1/2 inset-x-0 bottom-0 text-7xl pt-4 mix-blend-difference transition-all duration-75 hover:text-indigo-600 text-white hover:cursor-pointer">
              <div className="pl-4 pb-8 font-bold text-7xl">Selected</div>
            </div>
          </div> */}
          <div className="">
            {/* <News exhibitionsPosts={exhibitionsPosts} /> */}
            
              <About post={aboutPost} />
            
          </div>
        </div>

        <div className="relative flex flex-col md:flex-row bg-white">
          <div className="flex flex-col w-full md:w-1/2">
            {isMd ? (
              <></>
            ) : (
              firstCol.map((post, i) => (
                <IndexImage
                  key={i}
                  href={"works/" + post.id}
                  title={post.title}
                  h={post.front_img_h!}
                  w={post.front_img_w!}
                  src={post.thumbnail!}
                />
              ))
            )}
          </div>

          {/* Columna izquierda */}
          <div className="flex flex-col w-full md:w-1/2">
            {isMd ? (
              <></>
            ) : (
              secondCol.map((post, i) => (
                <IndexImage
                  key={i}
                  href={"works/" + post.id}
                  title={post.title}
                  h={post.front_img_h!}
                  w={post.front_img_w!}
                  src={post.thumbnail!}
                />
              ))
            )}
          </div>

          {isMd ? (
            <div ref={worksRef} id="works" className="flex flex-col">
              {frontPagePosts.map((post, i) => (
                <IndexImage
                  key={i}
                  href={"works/" + post.id}
                  title={post.title}
                  h={post.front_img_h!}
                  w={post.front_img_w!}
                  src={post.thumbnail!}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
        <WorksCatalogue posts={workPosts} />
        <div className="relative flex flex-row h-[100vh]">
          <div className="pl-4 pt-52 pb-8 flex flex-col w-1/2">
            <div className=" text-7xl mix-blend-difference transition-all duration-75 hover:text-indigo-600 text-white hover:cursor-pointer">
              <div className=" font-bold text-7xl">Photography</div>
            </div>
            <div className="mt-12 text-white text-3xl">
              <ul>
                <li>Paola Velázquez</li>
                <li>Felipe Ugalde</li>
                <li>Matthew Neary</li>
                <li>Jose Noli</li>
                <li>Andres Lennon</li>
                <li>Paulina Kim Ju</li>
              </ul>
            </div>
          </div>

          <div className="pl-4 pt-8 pb-8 flex flex-col w-1/2">
            <div className="text-7xl pt-4 mix-blend-difference transition-all duration-75 hover:text-indigo-600 text-white hover:cursor-pointer">
              <div className=" font-bold text-7xl">Contact</div>
            </div>
            <div className="mt-8 text-white text-3xl">
              <div>
                <a
                  className="break-words"
                  href="mailto:catalinaandonie@gmail.com"
                >
                  catalinaandonie@gmail.com
                </a>
              </div>
              <div className="mt-4">
                <a href="https://www.instagram.com/catalina.andonie/">
                  Ig: @catalina.andonie
                </a>
              </div>
              <div className="mt-4">Todos los derechos reservados</div>
              <div className="mt-4">2022</div>
            </div>

            <div className="pt-36 pb-36 pr-4">
              <div className="text-3xl text-white">
                {locale === "es" ? (
                  <p>
                    corporis asperiores incidunt quam, rerum debitis voluptate
                    enim, quia doloremque eius, dicta eos ut. Commodi adipisci
                    tempore iste, fugit Español lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Laudantium reprehenderit quam.
                  </p>
                ) : (
                  <p>
                    English lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Laudantium corporis asperiores incidunt quam, rerum
                    debitis voluptate enim, quia doloremque eius, dicta eos ut.
                    Commodi adipisci tempore iste, fugit reprehenderit quam.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workPosts = await getAllWorkPosts();
  const exhibitionsPosts = getAllExhibitionsPosts();
  const aboutPost = getAbout();
  return {
    props: {
      workPosts,
      exhibitionsPosts,
      aboutPost,
    },
  };
};
