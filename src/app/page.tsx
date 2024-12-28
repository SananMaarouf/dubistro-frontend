import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url"; 
import { type SanityDocument } from "next-sanity"; 
import { Intro, Landing, Testimonials, Performance } from '@/components';
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  LANDING_QUERY, INTRO_QUERY,
  FEEDBACK_QUERY, PERFORMANCE_QUERY
} from '@/lib/queries';
import type {
  LandingProps, IntroProps,
  IntroImage, FeedbackProps, PerformanceProps
} from "@/lib/types";

// Extracting projectId and dataset from the Sanity client configuration
const { projectId, dataset } = client.config();

// Function to build the URL for a given Sanity image source
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

// Options for the fetch requests, including revalidation time
const options = { next: { revalidate: 86400 } }; // 24 hours

export default async function IndexPage() {
  const [landing, intro, feedback, performance] = await Promise.all([
    client.fetch<SanityDocument[]>(LANDING_QUERY, {}, options),
    client.fetch<SanityDocument[]>(INTRO_QUERY, {}, options),
    client.fetch<SanityDocument[]>(FEEDBACK_QUERY, {}, options),
    client.fetch<SanityDocument[]>(PERFORMANCE_QUERY, {}, options),
  ]);

  const landingData = {
    title: landing[0].title,
    alt: landing[0].image.alt,
    image: urlFor(landing[0].image)?.width(800).height(800).url() || '',
    videoId: landing[0].youtubeUrl,
    ctaText: landing[0].ctaText,
    ctaBtnText: landing[0].ctaBtnText,
  };

  const introData = {
    title: intro[0].intro,
    description: intro[0].description,
    imageURLS: intro[0].images.map((image: IntroImage) => ({
      alt: image.alt,
      url: urlFor(image.asset)?.width(800).height(800).url() || '',
    }))
  };

  const feedbackData = feedback.map((item) => ({
    title: item.title,
    feedback: item.feedback,
    who: item.who,
    position: item.position,
  }));

  const performanceData = performance.map((item) => ({
    performanceType: item.performanceType,
    description: item.description,
    ctaText: item.ctaText,
    image: {
      asset: urlFor(item.image.asset)?.width(800).height(800).url(),
    } 
  }));

  return (
    <main>
      <Landing {...landingData as LandingProps} />
      <Intro data={introData as IntroProps} />
      <Testimonials data={feedbackData as FeedbackProps[]} />
      <Performance data={performanceData as PerformanceProps[]} />
    </main>
  );
}