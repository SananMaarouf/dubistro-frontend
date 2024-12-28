export const LANDING_QUERY = `*[
  _type == "Landing"]{
    title,
    image,
    youtubeUrl,
    ctaText,
    ctaBtnText
  }`;

export const INTRO_QUERY = `*[
_type == "Intro"]{
  intro,
  description,
  images
}`;

export const FEEDBACK_QUERY = `*[
_type == "Testimonials"]{
  title,
  feedback,
  who,
  position
}`;

export const PERFORMANCE_QUERY = `*[
  _type == "Performance"]{
    performanceType,
    description,
    ctaText,
    image
  }`;

export const FOOTER_QUERY = `*[
  _type == "Footer"][0]{
    instagramURL,
    cellNumber,
    email,
    address
  }`;