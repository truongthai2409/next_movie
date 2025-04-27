"use client";

import { Menu, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchBox from "./search_box";
// import SearchBox from "@/components/SearchBox"; // 🌟 mới thêm

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = () => {
    router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu && !(event.target as Element).closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  return (
    <header className={`sticky md:fixed top-0 left-0 z-50 w-full transition duration-300 ${scrolled ? "bg-slate-950 md:shadow-lg" : "bg-black md:bg-transparent"}`}>
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

        {/* Navigation */}
        <nav className="md:flex hidden space-x-4">
          <Link href="/" className="hover:text-gray-300">Bạch Nguyệt Phạn Tình</Link>
          <Link href="/" className="hover:text-gray-300">Đề xuất</Link>
          <div className="relative group">
            <button className="hover:text-gray-300">Khác</button>
            <div className="absolute left-0 hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg w-40">
              <Link href="/" className="block px-4 py-2 hover:bg-gray-200">Tùy chọn 1</Link>
              <Link href="/" className="block px-4 py-2 hover:bg-gray-200">Tùy chọn 2</Link>
            </div>
          </div>
        </nav>

        {/* Search */}
        <SearchBox />

        {/* User Actions */}
        <div className="md:flex hidden items-center space-x-4">
          <Link href="/" className="hover:text-gray-300">📖 Lịch sử xem</Link>
          <Link href="/" className="hover:text-gray-300">🌐 Ngôn ngữ</Link>

          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
          ) : isAuthenticated && session?.user ? (
            <div className="relative user-menu-container">
              <button onClick={toggleUserMenu} className="flex items-center hover:text-gray-300">
                {session.user.image ? (
                  <Image src={session.user.image} alt="User avatar" width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <User size={18} />
                  </div>
                )}
                <span className="ml-2">{session.user.name || 'User'}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 bg-gray-800 rounded shadow-lg w-48 z-50">
                  <Link href="/user/profile" className="block px-4 py-2 hover:bg-gray-700">Hồ sơ</Link>
                  <Link href="/user/favorites" className="block px-4 py-2 hover:bg-gray-700">Danh sách yêu thích</Link>
                  <Link href="/user/settings" className="block px-4 py-2 hover:bg-gray-700">Cài đặt</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400">Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleLogin} className="hover:text-gray-300 flex items-center">
              <User size={18} className="mr-1" /> Đăng nhập
            </button>
          )}

          <button className="bg-gray-800 px-2 py-1 rounded text-white hover:bg-gray-700">📱 APP</button>
          <button className="bg-orange-500 px-2 py-1 rounded text-white hover:bg-orange-600">VIP</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
