'use client';
import Image from "next/image"; // Importing the Image component from Next.js for optimized image rendering

interface IntroProps {
  data: {
    title: string;
    description: string;
    imageURLS: [{
      alt:string;
      url: string;
    }]
  }
}

export default function Intro({ data }: IntroProps) {
  return (
    <section className="flex flex-col text-center px-4 sm:px-6 lg:px-8 mx-auto bg-[#E9EEEC] text-green-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 mt-10">{data.title}</h1>
      <div className="flex flex-col items-center">
        <p className="mb-8 text-3xl w-3/4 text-center">{data.description}</p>
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {data.imageURLS?.map((image, index) => (
            <div key={index} className="flex-1 min-w-[300px] max-w-[400px] aspect-square overflow-hidden rounded-2xl">
              <Image
                src={image.url}
                alt={image.alt||"Gallery image"}
                width={1000}
                height={1000}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}