import { Params } from "@/types";
import { fetchMovieDetails } from "..";

export async function generateMetadata({ params }: { params: Params }) {
  const movieDetails = await fetchMovieDetails((await params).slug);
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
          url: movieDetails.data.seoOnPage.og_image[0],
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
