import Intro from "@/components/intro"; // Importing a custom Intro component from a local module
import { client } from "@/sanity/client"; // Importing the Sanity client instance from a local module
import Landing from "@/components/landing"; // Importing a custom Landing component from a local module
import imageUrlBuilder from "@sanity/image-url"; // Importing the imageUrlBuilder function from the Sanity image URL library
import { type SanityDocument } from "next-sanity"; // Importing the SanityDocument type from next-sanity for type checking
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"; // Importing the SanityImageSource type for type checking
import Testimonials from "@/components/testimonials";
import Performance from "@/components/performances";

// Extracting projectId and dataset from the Sanity client configuration
const { projectId, dataset } = client.config();

interface LandingProps {
  image: string;
  alt: string;
  videoId: string;
  ctaText: {
    nb: string;
    fr: string;
  }
  ctaBtnText: {
    nb: string;
    fr: string;
  }
}

interface IntroProps {
  title: {
    nb: string;
    fr: string;
  }
  description: {
    nb: string;
    fr: string;
  }
  imageURLS: [
    {
      alt: string;
      url: string;
    }
  ]
}
interface IntroImage {
  _key: string;
  asset: {
    _ref: string;
  };
  alt: string;
  caption?: string;
}

interface FeedbackProps {
  title: string;
  feedback: {
    nb: string
    fr: string
  }
  who: string;
  position: {
    nb: string
    fr: string
  }
}

interface PerformanceProps {
  performanceType: {
    nb: string;
    fr: string;
  }
  description: {
    nb: string;
    fr: string;
  }
  ctaText: {
    nb: string;
    fr: string;
  }
  image: {
    asset: string;
  }
}

// Query to fetch the landing page data
const LANDING_QUERY = `*[
  _type == "Landing"]
  {
    title,
    image,
    youtubeUrl,
    ctaText,
    ctaBtnText
  }`;

const INTRO_QUERY = `*[
_type == "Intro"]
{
  intro,
  description,
  images
  }`;

const FEEDBACK_QUERY = `*[
_type == "Testimonials"]
{
  title,
  feedback,
  who,
  position
}`;

const PERFORMANCE_QUERY = `*[
  _type == "Performance"]
  {
    performanceType,
    description,
    ctaText,
    image
  }`;

// Function to build the URL for a given Sanity image source
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Options for the fetch requests, including revalidation time
const options = { next: { revalidate: 500 } };

// The main component for the index page
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
      <Landing data={landingData as LandingProps} />
      <Intro data={introData as IntroProps} />
      <Testimonials data={feedbackData as FeedbackProps[]} />
      <Performance data={performanceData as PerformanceProps[]} />
    </main>
  );
}