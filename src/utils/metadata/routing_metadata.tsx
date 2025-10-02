import { Params } from "@/types";
import { fetchMovieDetails } from "..";
const NEXT_PRODUCTION = process.env.NEXT_PRODUCTION === "true";

export async function generateMetadata({ params }: { params: Params }) {
  const movieDetails = await fetchMovieDetails((await params).slug);
  // console.log(movieDetails)
  return {
    title: movieDetails.data.seoOnPage.titleHead,
    description: movieDetails.data.seoOnPage.descriptionHead,
    openGraph: {
      title: movieDetails.data.seoOnPage.titleHead,
      description: movieDetails.data.seoOnPage.descriptionHead,
      url: `${NEXT_PRODUCTION}/details/${movieDetails.data.item.slug}`,
      type: "website",
      siteName: "Next Movie",
      images: [
        {
          // url: `https://img.ophim.live/uploads/${}`movieDetails.data.seoOnPage.og_image[0],
          // url: movieDetails.data.seoOnPage.seoSchema.image,
          url: `https://img.ophim.live/uploads/movies/${movieDetails.data.item.poster_url}`,
          alt: movieDetails.data.item.origin_name,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {},
    facebook: {},
    alternates: {
      canonical: `${NEXT_PRODUCTION}/details/${movieDetails.data.item.slug}`,
    },
    propertys: {
      "og:title": movieDetails.data.seoOnPage.titleHead,
      "og:description": movieDetails.data.seoOnPage.descriptionHead,
      "og:image": `https://img.ophim.live/uploads/movies/${movieDetails.data.item.poster_url}`,
    },
  };
}
