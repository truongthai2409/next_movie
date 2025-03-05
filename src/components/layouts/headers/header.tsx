"use client";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className="flex items-center bg-gray-800 rounded px-2 md:px-4 py-1">
          <input
            type="text"
            placeholder="One Piece (Đảo Hải Tặc)"
            className="md:mx-4 bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
          <Search className="md:my-1 text-gray-400 hover:text-white" />
        </div>

        {/* Action Buttons */}
        <div className="md:flex hidden items-center space-x-4">
          <Link href="/" className="hover:text-gray-300">
            📖 Lịch sử xem
          </Link>
          <Link href="/" className="hover:text-gray-300">
            🌐 Ngôn ngữ
          </Link>
          <Link href="/" className="hover:text-gray-300">
            👤 Của tôi
          </Link>
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
