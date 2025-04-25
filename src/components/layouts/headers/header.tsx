"use client";
import { Menu, Search, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { MovieListResponse } from "@/types";
import { signOut, useSession } from "next-auth/react";

// Custom hook for debounced value
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Function to fetch search results
const fetchSearchResults = async (keyword: string): Promise<MovieListResponse[]> => {
  if (!keyword) return [];
  
  // Replace this with your actual API endpoint
  const response = await fetch(`https://ophim1.com/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}`);
  console.log(response.json());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  
  // Get session from NextAuth
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  // Fetch search results using TanStack Query
  const { data: searchResults, isLoading, error } = useQuery<MovieListResponse[], Error>({
    queryKey: ['searchResults', debouncedSearchQuery],
    queryFn: () => fetchSearchResults(debouncedSearchQuery),
    enabled: debouncedSearchQuery.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
  };

  const handleSearchBlur = (): void => {
    // Only hide results if the user doesn't have focus on the search input
    setTimeout(() => {
      setIsSearching(false);
    }, 200);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
    setShowUserMenu(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu && !(event.target as Element).closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header
      className={`sticky md:fixed top-0 left-0 z-50 w-full transition duration-300 ${
        scrolled ? "bg-slate-950 md:shadow-lg" : "bg-black md:bg-transparent"
      }`}
    >
      <div className="flex md:flex-wrap items-center justify-between text-white px-4 py-2 md:py-4">
        {/* Logo */}
        <Menu className="md:hidden flex" />
        <Link href="/">
          <div className="flex items-center">
            <span className="text-green-500 font-bold text-sm md:text-lg">
              NEXT iMoVie
            </span>
          </div>
        </Link>
        {/* Navigation Links */}
        <nav className="md:flex hidden space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Bạch Nguyệt Phạn Tình
          </Link>
          <Link href="/" className="hover:text-gray-300">
            Đề xuất
          </Link>
          <div className="relative group">
            <button className="hover:text-gray-300">Khác</button>
            {/* Dropdown */}
            <div className="absolute left-0 hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg w-40">
              <Link href="/" className="block px-4 py-2 hover:bg-gray-200">
                Tùy chọn 1
              </Link>
              <Link href="/" className="block px-4 py-2 hover:bg-gray-200">
                Tùy chọn 2
              </Link>
            </div>
          </div>
        </nav>
        {/* Search Bar */}
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
          
          {/* Search Results Dropdown */}
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
              ) : debouncedSearchQuery.length > 0 ? (
                <div className="p-3 text-gray-400">Không tìm thấy kết quả</div>
              ) : null}
            </div>
          )}
        </div>
        {/* Action Buttons */}
        <div className="md:flex hidden items-center space-x-4">
          <Link href="/" className="hover:text-gray-300">
            📖 Lịch sử xem
          </Link>
          <Link href="/" className="hover:text-gray-300">
            🌐 Ngôn ngữ
          </Link>
          
          {/* User profile or login button */}
          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
          ) : isAuthenticated && session?.user ? (
            <div className="relative user-menu-container">
              <button onClick={toggleUserMenu} className="flex items-center hover:text-gray-300">
                {session.user.image ? (
                  <Image 
                    src={session.user.image} 
                    alt="User avatar" 
                    width={32} 
                    height={32} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <User size={18} />
                  </div>
                )}
                <span className="ml-2">{session.user.name || 'User'}</span>
              </button>
              
              {/* User dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 bg-gray-800 rounded shadow-lg w-48 z-50">
                  <Link href="/user/profile" className="block px-4 py-2 hover:bg-gray-700">
                    Hồ sơ
                  </Link>
                  <Link href="/user/favorites" className="block px-4 py-2 hover:bg-gray-700">
                    Danh sách yêu thích
                  </Link>
                  <Link href="/user/settings" className="block px-4 py-2 hover:bg-gray-700">
                    Cài đặt
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="hover:text-gray-300 flex items-center">
              <User size={18} className="mr-1" /> Đăng nhập
            </Link>
          )}
          
          <button className="bg-gray-800 px-2 py-1 rounded text-white hover:bg-gray-700">
            📱 APP
          </button>
          <button className="bg-orange-500 px-2 py-1 rounded text-white hover:bg-orange-600">
            VIP
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;