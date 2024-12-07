import Intro from "@/components/intro"; // Importing a custom Intro component from a local module
import { client } from "@/sanity/client"; // Importing the Sanity client instance from a local module
import Landing from "@/components/landing"; // Importing a custom Landing component from a local module
import imageUrlBuilder from "@sanity/image-url"; // Importing the imageUrlBuilder function from the Sanity image URL library
import { type SanityDocument } from "next-sanity"; // Importing the SanityDocument type from next-sanity for type checking
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"; // Importing the SanityImageSource type for type checking

// Extracting projectId and dataset from the Sanity client configuration
const { projectId, dataset } = client.config();

interface LandingProps {
  image: string;
  alt: string;
  videoId: string;
  ctaText: string;
}

interface IntroProps {
  title: string;
  description: string;
  imageURLS: [
    { alt: string; 
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

// Function to build the URL for a given Sanity image source
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Options for the fetch requests, including revalidation time
const options = { next: { revalidate: 30 } };

// The main component for the index page
export default async function IndexPage() {
  const [landing, intro] = await Promise.all([
    client.fetch<SanityDocument[]>(LANDING_QUERY, {}, options),
    client.fetch<SanityDocument[]>(INTRO_QUERY, {}, options),
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

  return (
    <main>
      <Landing data={landingData as LandingProps}/>
      <Intro data={introData as IntroProps} />
    </main>
  );
}