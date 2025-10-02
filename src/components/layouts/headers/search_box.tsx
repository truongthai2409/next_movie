"use client";

import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { useDebounce } from "@/hooks";
import { MovieListResponse } from "@/types";

const fetchSearchResults = async (
  keyword: string,
): Promise<MovieListResponse[]> => {
  if (!keyword) return [];
  const response = await fetch(
    `https://ophim1.com/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);

  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery<MovieListResponse[], Error>({
    queryKey: ["searchResults", debouncedSearchQuery],
    queryFn: () => fetchSearchResults(debouncedSearchQuery),
    enabled: debouncedSearchQuery.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setIsSearching(false), 200);
  };

  return (
    <div className="relative flex items-center bg-gray-800 rounded px-2 md:px-4 py-1">
      <input
        type="text"
        placeholder="One Piece (Đảo Hải Tặc)"
        className="md:mx-4 bg-gray-800 text-white placeholder-gray-400 focus:outline-none w-full"
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={() => setIsSearching(true)}
        onBlur={handleSearchBlur}
      />
      <Search className="md:my-1 text-gray-400 hover:text-white" />

      {isSearching && debouncedSearchQuery.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded shadow-lg max-h-60 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-3 text-gray-400">Đang tìm kiếm...</div>
          ) : error ? (
            <div className="p-3 text-red-400">Lỗi: Không thể tìm kiếm</div>
          ) : searchResults && searchResults.length > 0 ? (
            searchResults.map((result) => (
              <Link
                key={result.items[0]._id}
                href={`/movie/${result.items[0]._id}`}
                className="px-4 py-2 hover:bg-gray-700 flex items-center"
              >
                <h1>{result.items[0].name}</h1>
              </Link>
            ))
          ) : (
            <div className="p-3 text-gray-400">Không tìm thấy kết quả</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
