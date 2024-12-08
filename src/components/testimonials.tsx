"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { motion } from 'motion/react';

interface TestimonialsProps {
  data: {
    title: string;
    feedback: string;
    who: string;
    position: string;
  }[];
}

export default function Testimonials({ data }: TestimonialsProps) {
  return (
    <motion.section
      className="bg-white text-emerald-900 h-fit py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Tilbakemeldinger
        </motion.h2>
        {/* feedback card container */}
        <Carousel
          className="w-full md:w-2/3 lg:w-3/4 md:mx-auto"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000 })]}
        >
          <CarouselNext className="hidden md:block" />
          <CarouselPrevious className="hidden md:block" />
          <CarouselContent>
            {data.map((testimonial, index) => (
              <CarouselItem key={index} className="lg:basis-1/2 my-4">
                <motion.div
                  className="border p-4 rounded-md shadow-md h-full flex flex-col"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <p className="text-lg mb-4">{testimonial.feedback}</p>
                  <div className="mt-auto">
                    <p className="font-bold">{testimonial.who}</p>
                    <p className="font-semibold">{testimonial.position}</p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </motion.section>
  );
}