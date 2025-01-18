import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="relative md:sticky top-0 left-0 z-50 w-full bg-black md:h-0">
      <div className="flex flex-wrap items-center justify-between bg-transparent text-white px-4 py-4">
        {/* Logo */}
        <Link href="/">
          {" "}
          <div className="flex items-center">
            <span className="text-green-500 font-bold text-lg">
              NEXT iMoVie
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Bạch Nguyệt Phạn Tình
          </Link>
          <Link href="/" className="hover:text-gray-300">
            Đề xuất
          </Link>
          <div className="relative group">
            <button className="hover:text-gray-300">Khác</button>
            {/* Dropdown */}
            <div className="absolute left-0 hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg">
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
        <div className="flex items-center space-x-2 bg-gray-800 rounded px-2 py-1">
          <input
            type="text"
            placeholder="One Piece (Đảo Hải Tặc)"
            className="bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          <button className="text-gray-400 hover:text-white">🔍</button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
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
