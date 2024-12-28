'use client';
import Image from "next/image"; // Importing the Image component from Next.js for optimized image rendering
import { motion } from 'motion/react';
import { useLanguage } from "@/context/LanguageContext";
import { IntroProps } from "@/lib/types";

export default function Intro({ data }: { data: IntroProps }) {
    const { language } = useLanguage();
  
  return (
    <motion.section
      className="flex flex-col text-center px-4 sm:px-6 lg:px-8 mx-auto bg-[#E9EEEC] text-green-900 h-fit mb-12"
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
        {data.title[language]}
      </motion.h1>
      <div className="flex flex-col items-center">
        <motion.p
          className="mb-8 text-xl lg:text-3xl w-3/4 text-center whitespace-pre-line"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {data.description[language]}
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
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}