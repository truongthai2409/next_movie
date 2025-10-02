"use client";

import { Menu, User } from "lucide-react";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import SearchBox from "./search_box";
import { Locale, useTranslations } from "next-intl";
// import SearchBox from "@/components/SearchBox"; // 🌟 mới thêm

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations("Header");

  const supportedLocales: Locale[] = ["en", "vi", "kr"];

  const currentLocale = useMemo<Locale>(() => {
    const segments = pathname.split("/").filter(Boolean);
    const loc = (segments[0] || "vi") as string;
    return supportedLocales.includes(loc as Locale) ? (loc as Locale) : "vi";
  }, [pathname, supportedLocales]);

  // const segments = pathname.split("/").filter(Boolean);
  // const loc = (segments[0] || "vi") as string;
  // const currentLocale = supportedLocales.includes(loc as Locale)
  //   ? (loc as Locale)
  //   : "vi";

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

  const [showLangMenu, setShowLangMenu] = useState(false);
  const toggleLangMenu = () => setShowLangMenu((v) => !v);

  const switchLocale = async (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    const pathWithoutLocale = pathname.replace(/^\/(en|vi|kr)(?=\/|$)/, "");
    router.replace(pathWithoutLocale || "/", { locale: newLocale });
    setShowLangMenu(false);
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
      if (
        showUserMenu &&
        !(event.target as Element).closest(".user-menu-container")
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  return (
    <header
      className={`sticky md:fixed top-0 left-0 z-50 w-full transition duration-300 ${scrolled ? "bg-slate-950 md:shadow-lg" : "bg-black md:bg-transparent"}`}
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

        {/* Navigation */}
        <nav className="md:flex hidden space-x-4">
          <Link href="/" className="hover:text-gray-300">
            {t("newfilm")}
          </Link>
          <Link href="/" className="hover:text-gray-300">
            {t("suggest")}
          </Link>
          <div className="relative group">
            <button className="hover:text-gray-300">{t("other")}</button>
            <div className="absolute left-0 hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg w-40">
              <Link href="/" className="block px-4 py-2 hover:bg-gray-200">
                {t("option1")}
              </Link>
              <Link href="/" className="block px-4 py-2 hover:bg-gray-200">
                {t("option2")}
              </Link>
            </div>
          </div>
        </nav>

        {/* Search */}
        <SearchBox />

        {/* User Actions */}
        <div className="md:flex hidden items-center space-x-4">
          <Link href="/" className="hover:text-gray-300">
            {t("history")}
          </Link>
          <div className="relative">
            <button onClick={toggleLangMenu} className="hover:text-gray-300">
              🌐 {currentLocale.toUpperCase()}
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-28 z-50">
                <button
                  onClick={() => switchLocale("vi")}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-200"
                >
                  VI
                </button>
                <button
                  onClick={() => switchLocale("en")}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-200"
                >
                  EN
                </button>
                <button
                  onClick={() => switchLocale("kr")}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-200"
                >
                  KR
                </button>
              </div>
            )}
          </div>

          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
          ) : isAuthenticated && session?.user ? (
            <div className="relative user-menu-container">
              <button
                onClick={toggleUserMenu}
                className="flex items-center hover:text-gray-300"
              >
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
                <span className="ml-2">{session.user.name || "User"}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 bg-gray-800 rounded shadow-lg w-48 z-50">
                  <Link
                    href={`/user/profile`}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    {t("profile")}
                  </Link>
                  <Link
                    href={`/user/favorites`}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    {t("favorites")}
                  </Link>
                  <Link
                    href={`/user/settings`}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    {t("settings")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400"
                  >
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="hover:text-gray-300 flex items-center"
            >
              <User size={18} className="mr-1" /> {t("login")}
            </button>
          )}

          <button className="bg-gray-800 px-2 py-1 rounded text-white hover:bg-gray-700">
            {t("app")}
          </button>
          <button className="bg-orange-500 px-2 py-1 rounded text-white hover:bg-orange-600">
            {t("vip")}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
