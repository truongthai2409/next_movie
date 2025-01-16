"use client";
import Carousel from "@/components/ui/carousel/carousel";
import { useFetchData } from "@/hooks";
import {
  extractItems,
  getVersionEndPointUrl,
} from "@/utils";
import React from "react";

const MovieList = () => {
  const { data: phimmoi, isLoading: loadingPhimmoi } = useFetchData(
    "phimmoi",
    getVersionEndPointUrl(`danh-sach/phim-moi`)
  );
  const { data: phimle } = useFetchData(
    "phimle",
    // v1/api
    getVersionEndPointUrl("danh-sach/phim-le")
  );
  const { data: phimbo, isLoading: loadingPhimbo } = useFetchData(
    "phimbo",
    getVersionEndPointUrl("danh-sach/phim-bo")
  );
  const { data: tvshow, isLoading: loadingTvshow } = useFetchData(
    "tvshow",
    getVersionEndPointUrl("danh-sach/tv-shows")
  );
  const { data: hoathinh, isLoading: loadingHoathinh } = useFetchData(
    "hoathinh",
    getVersionEndPointUrl("danh-sach/hoat-hinh")
  );
  const { data: theloai, isLoading: loadingTheloai } = useFetchData(
    "theloai",
    getVersionEndPointUrl("the-loai/hanh-dong")
  );
  const { data: quocgia, isLoading: loadingQuocgia } = useFetchData(
    "quocgia",
    getVersionEndPointUrl("quoc-gia/han-quoc")
  );
  if (
    loadingPhimmoi ||
    loadingPhimbo ||
    loadingTvshow ||
    loadingHoathinh ||
    loadingTheloai ||
    loadingQuocgia
  ) {
    return <div>Loading...</div>;
  }
  return (
    <div className="pb-10">
      <Carousel title="Phim Mới" items={extractItems(phimmoi)} />
      <Carousel title="Hàn Quốc" items={extractItems(hoathinh)} />
      <Carousel title="Phim Lẻ" items={extractItems(phimle)} />
      <Carousel title="TV Shows" items={extractItems(tvshow)} />
      <Carousel title="Phim Bộ" items={extractItems(phimbo)} />
      <Carousel title="Hoạt Hình" items={extractItems(theloai)} />
      <Carousel title="Hành Động" items={extractItems(quocgia)} />
    </div>
  );
};

export default MovieList;
