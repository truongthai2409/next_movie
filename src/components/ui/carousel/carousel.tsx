"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "../card/card";
import { Movie } from "@/types";

interface CarouselProps {
  title?: string;
  items: Movie[];
}

const Carousel: React.FC<CarouselProps> = ({
  title = "Đề xuất hot",
  items = [],
}) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right"): void => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -638 : 638;
      container.scrollBy({ left: scrollAmount, behavior: "auto" });
      console.log(scrollPosition);
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between pl-2 mb-4 pt-4 my-2">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth md:gap-4 pb-4 pt-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, index) => (
            <Card key={item._id || index} card={item} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
