"use client";

import { motion } from 'motion/react';

interface PerformanceProps {
  data: {
    performanceType: string;
    description: string;
    ctaText: string;
  }[];
}

export default function Performance({ data }: PerformanceProps) {
  return (
    <motion.section
      className="bg-[#FAF2EE] text-emerald-900 h-fit py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl lg:text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Du kan enkelt booke oss til
        </motion.h2>
        <div className="flex flex-col gap-8 max-w-screen-md mx-auto whitespace-pre-line text-center">
          {data.map((performance, index) => (
            <motion.div
              key={index}
              className="bg-transparent p-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <p className="text-3xl lg:text-4xl mb-4 font-bold">{performance.performanceType}</p>
              <p className="text-xl lg:text-3xl">{performance.description}</p>
              <a href={`mailto:duo@leduodubistro.no?subject=${encodeURIComponent(performance.performanceType + '-booking')}`}>
                <motion.button
                  className="text-xl lg:text-2xl px-4 py-2 mt-6 bg-emerald-800 rounded-lg text-white hover:bg-emerald-700 transition duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {performance.ctaText}
                </motion.button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}