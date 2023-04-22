import Image from 'next/image';
import Link from "next/link";
import Head from "next/head";
import { Inter } from 'next/font/google';
import Layout from "../components/layout";
import { images } from "../utils/images";
import type { ImageProps } from "../utils/types";
import { getPlaiceholder } from "plaiceholder";

const inter = Inter({ subsets: ['latin'] })

export default function Home({ images }: { images: ImageProps[] }) {
  return (
    <>
      <Head>
        <title>Page transitions with Next.js and Framer Motion</title>
      </Head>
      <Layout>
        <main className="flex min-h-screen flex-col items-center justify-center max-w-screen-lg m-auto px-5 my-8">
          <h1 className={inter.className + " text-5xl mb-10 text-center max-w-screen-md text-transparent font-extrabold bg-clip-text bg-gradient-to-l from-lime-500 to-emerald-400"}>Page transitions with Next.js and Framer Motion</h1>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
          {images.map((image: ImageProps) => (
            <Link 
              href={`/p/${image.id}`}
              scroll={true}
              key={image.id}
              className="overflow-hidden rounded-md"
            >
                <Image
                  src={image.src}
                  alt={image.title}
                  placeholder="blur"
                  blurDataURL={image.blurDataUrl}
                  width={750}
                  height={500}
                  className="hover:opacity-80 max-w-full h-auto hover:scale-105 transition-all ease-in-out"
                />
            </Link>
          ))}
          </div>
        </main>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
    const blurImagePromises = images.map((image: ImageProps) => {
       return getPlaiceholder(image.src);
    });

    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

    for (let i = 0; i < images.length; i ++) {
      images[i].blurDataUrl = imagesWithBlurDataUrls[i].base64;
    }

    return {
      props: {
        images
      }
    }
}
