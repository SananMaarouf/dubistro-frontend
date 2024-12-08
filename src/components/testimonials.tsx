"use client";

interface TestimonialsProps {
  data: {
    title: string;
    feedback: string;
    who: string;
    position: string;
  }[];
}

export default function Testimonials({ data }:TestimonialsProps) {
  return (
    <section className="bg-gray-100 text-emerald-900 h-screen py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
         Tilbakemeldinger
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((testimonial, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-lg mb-4">{testimonial.feedback}</p>
              <p className="font-bold">{testimonial.who}</p>
              <p>{testimonial.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}