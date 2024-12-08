"use client";

interface PerformanceProps {
  data: {
    performanceType: string;
    description: string;
    ctaText: string;
  }[];
}

export default function Performance({ data } : PerformanceProps) {
  return (
    <section className="bg-[#FAF2EE] text-emerald-900 h-fit py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-8">
         Du kan enkelt booke oss til
        </h2>
        <div className="flex flex-col gap-8 max-w-screen-md text-center mx-auto">
          {data.map((performance, index) => (
            <div key={index} className="bg-transparent p-4 ">
              <p className="text-3xl lg:text-4xl mb-4 font-bold">{performance.performanceType}</p>
              <p className="text-xl lg:text-3xl">{performance.description}</p>       
              <button className="text-xl lg:text-2xl px-4 py-2 mt-6 bg-emerald-800 rounded-lg text-white">
                {performance.ctaText}
              </button>     
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}