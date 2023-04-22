import {
  ArrowSmallLeftIcon,
  LinkIcon,
  CalendarDaysIcon,
  UserIcon,
  CameraIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import type { GetStaticProps } from "next";
import type { ImageProps } from "../../utils/types";
import Layout from "../../components/layout";
import { images } from "../../utils/images";
import { getPlaiceholder } from "plaiceholder";
import { motion } from "framer-motion";

const ImagePage = ({ currentImage }: { currentImage: ImageProps }) => {
  return (
    <>
      <Head>
        <title>Page transitions with Next.js and Framer Motion</title>
        <meta property="og:image" content={currentImage.src} />
      </Head>
      <Layout>
        <div className="min-h-screen">
          <div className="bg-white w-full p-10">
            <div className="flex flex-col md:flex-row justify-between mb-3 items-start">
              <div className="order-2 md:order-1">
                <motion.h1
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    delay: 0.4,
                  }}
                  className="text-3xl font-bold mb-4"
                >
                  {currentImage.title}
                </motion.h1>
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    delay: 0.6,
                  }}
                  className="flex flex-col"
                >
                  <p className="flex flex-row items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-emerald-500" />
                    <a
                      href={currentImage.reference}
                      className="hover:text-emerald-500"
                    >
                      {currentImage.credits}
                    </a>
                  </p>
                  {currentImage.location ? (
                    <p className="flex flex-row items-center">
                      <MapPinIcon className="w-5 h-5 mr-2 text-emerald-500" />
                      {currentImage.location}
                    </p>
                  ): ''}
                  <p className="flex flex-row items-center">
                    <CalendarDaysIcon className="w-5 h-5 mr-2 text-emerald-500" />
                    Published on {currentImage.publishDate}
                  </p>
                  {currentImage.camera ? (
                    <p className="flex flex-row items-center">
                      <CameraIcon className="w-5 h-5 mr-2 text-emerald-500" />
                      {currentImage.camera}
                    </p>
                  ) : ''}
                  <p className="flex flex-row items-center">
                    <LinkIcon className="w-5 h-5 mr-2 text-emerald-500" />
                    <a
                      href={currentImage.href}
                      className="hover:text-emerald-500"
                    >
                      Original Source
                    </a>
                  </p>
                </motion.div>
                <motion.p
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    delay: 0.8,
                  }}
                  className="mt-4"
                >
                  {currentImage.description}
                </motion.p>
              </div>
              <Link
                href="/"
                className="border border-emerald-500 text-emerald-500 order-1 md:order-2 mb-4 rounded-md group flex py-2 px-3 items-center hover:bg-emerald-500 hover:text-white"
              >
                <ArrowSmallLeftIcon className="w-5 h-5 mr-2 text-emerald-500 group-hover:text-white" />
                Back
              </Link>
            </div>
          </div>
          <div className="overflow-scroll flex">
            <Image
              src={currentImage.src}
              alt={currentImage.title}
              placeholder="blur"
              blurDataURL={currentImage.blurDataUrl}
              width={currentImage.width}
              height={currentImage.height}
              className="h-full"
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ImagePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params && params.imageId) {
      const currentImageId = Number(params.imageId);
      const currentImage = images[currentImageId];

      const imageWithBlurDataUrl = await getPlaiceholder(currentImage.src);

      currentImage.blurDataUrl = imageWithBlurDataUrl.base64;

      return {
        props: {
          currentImage
        }
      };
  }

  return {
    props: {
      error: true,
    }
  };
}

export async function getStaticPaths() {
  let fullPaths = [];

  for (let i = 0; i < images.length; i ++) {
    fullPaths.push({ params: { imageId: i.toString() } });
  }

  return {
    paths: fullPaths,
    fallback: false,
  };
}