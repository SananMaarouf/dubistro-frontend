'use client';
import Image from "next/image"; // Importing the Image component from Next.js for optimized image rendering
import { motion } from 'motion/react';

interface IntroProps {
  data: {
    title: string;
    description: string;
    imageURLS: [{
      alt: string;
      url: string;
    }]
  }
}

export default function Intro({ data }: IntroProps) {
  return (
    <motion.section
      className="flex flex-col text-center px-4 sm:px-6 lg:px-8 mx-auto bg-[#E9EEEC] text-green-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-12 mt-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {data.title}
      </motion.h1>
      <div className="flex flex-col items-center">
        <motion.p
          className="mb-8 text-3xl w-3/4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {data.description}
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {data.imageURLS?.map((image, index) => (
            <motion.div
              key={index}
              className="flex-1 min-w-[300px] max-w-[400px] aspect-square overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={image.url}
                alt={image.alt || "Gallery image"}
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}