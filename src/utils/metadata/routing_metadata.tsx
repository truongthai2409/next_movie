import { Params } from "@/types";
import { fetchMovieDetails } from "..";

export async function generateMetadata({ params }: { params: Params }) {
  const movieDetails = await fetchMovieDetails((await params).slug);
  // console.log(movieDetails)
  return {
    title: movieDetails.data.seoOnPage.titleHead,
    description: movieDetails.data.seoOnPage.descriptionHead,
    openGraph: {
      title: movieDetails.data.seoOnPage.titleHead,
      description: movieDetails.data.seoOnPage.descriptionHead,
      url: `https://next-imovie.vercel.app/details/${movieDetails.data.item.slug}`,
      type: "website",
      siteName: "Next Movie",
      images: [
        {
          // url: `https://img.ophim.live/uploads/${}`movieDetails.data.seoOnPage.og_image[0],
          url: movieDetails.data.seoOnPage.seoSchema.image,
          alt: movieDetails.data.item.origin_name,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {},
    facebook: {},
    alternates: {
      canonical: `https://next-imovie.vercel.app/details/${movieDetails.data.item.slug}`,
    },
    propertys: {
      "og:title": movieDetails.data.seoOnPage.titleHead,
      "og:description": movieDetails.data.seoOnPage.descriptionHead,
      "og:image": movieDetails.data.seoOnPage.og_image[0],
    },
  };
}
