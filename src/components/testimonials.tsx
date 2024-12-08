"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"

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
    <section className="bg-white text-emerald-900 h-fit py-12">
      <div className="w-full px-4">
        <h2 className="
          text-3xl font-bold 
          text-center mb-8">
          Tilbakemeldinger
        </h2>
        {/* feedback card container */}
        <Carousel className="w-full md:w-2/3 lg:w-3/4 md:mx-auto"
          opts={{loop: true }}
          plugins={[Autoplay({
            delay: 5000,
          })]}
        >
        <CarouselNext  className="hidden md:block"  />
        <CarouselPrevious className="hidden md:block" />
          <CarouselContent >
            {data.map((testimonial, index) => (
              <CarouselItem key={index} className="lg:basis-1/2 my-4">
                <div className="border p-4 rounded-md shadow-md h-full flex flex-col">
                  <p className="text-lg mb-4">{testimonial.feedback}</p>
                  <div className="mt-auto">
                    <p className="font-bold">{testimonial.who}</p>
                    <p className="font-semibold">{testimonial.position}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}