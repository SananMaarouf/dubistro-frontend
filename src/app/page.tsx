import Intro from "@/components/intro"; // Importing a custom Intro component from a local module
import { client } from "@/sanity/client"; // Importing the Sanity client instance from a local module
import Landing from "@/components/landing"; // Importing a custom Landing component from a local module
import imageUrlBuilder from "@sanity/image-url"; // Importing the imageUrlBuilder function from the Sanity image URL library
import { type SanityDocument } from "next-sanity"; // Importing the SanityDocument type from next-sanity for type checking
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"; // Importing the SanityImageSource type for type checking
import Testimonials from "@/components/testimonials";
import Performance from "@/components/performances";
import Footer from "@/components/footer";

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
}

interface IntroProps {
  title: string;
  description: string;
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
  feedback: string;
  who: string;
  position: string;
}

interface PerformanceProps {
  performanceType: string;
  description: string;
  ctaText: string;
}

interface FooterProps {
  instagramURL: string;
  cellNumber: number;
  email: string;
  address: string;
}
// Query to fetch the landing page data
const LANDING_QUERY = `*[
  _type == "Landing"]
  {
    title,
    image,
    youtubeUrl,
    ctaText
  }`;

const INTRO_QUERY = `*[
_type == "Intro"]
{
  title,
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
    ctaText
  }`;

const FOOTER_QUERY = `*[
  _type == "Footer"]
  {
    instagramURL,
    cellNumber,
    email,
    address
  }`;

// Function to build the URL for a given Sanity image source
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Options for the fetch requests, including revalidation time
const options = { next: { revalidate: 30 } };

// The main component for the index page
export default async function IndexPage() {
  const [landing, intro, feedback, performance, footer] = await Promise.all([
    client.fetch<SanityDocument[]>(LANDING_QUERY, {}, options),
    client.fetch<SanityDocument[]>(INTRO_QUERY, {}, options),
    client.fetch<SanityDocument[]>(FEEDBACK_QUERY, {}, options),
    client.fetch<SanityDocument[]>(PERFORMANCE_QUERY, {}, options),
    client.fetch<SanityDocument[]>(FOOTER_QUERY, {}, options),
  ]);

  const landingData = {
    title: landing[0].title,
    alt: landing[0].image.alt,
    image: urlFor(landing[0].image)?.width(800).height(800).url() || '',
    videoId: landing[0].youtubeUrl,
    ctaText: landing[0].ctaText,
  };

  const introData = {
    title: intro[0].title,
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
  }));

  const footerData = {
    instagramURL: footer[0].instagramURL,
    cellNumber: footer[0].cellNumber,
    email: footer[0].email,
    address: footer[0].address,
  };

  return (
    <main>
      <Landing data={landingData as LandingProps} />
      <Intro data={introData as IntroProps} />
      <Testimonials data={feedbackData as FeedbackProps[]} />
      <Performance data={performanceData as PerformanceProps[]} />
      <Footer data={footerData as FooterProps} />
    </main>
  );
}