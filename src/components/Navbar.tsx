// src/components/Navbar.tsx
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <aside className="bg-[#161D2F] p-4 flex items-center justify-between md:justify-start md:flex-col md:w-24 md:p-8">
      {/* Logo */}
      <div className="mb-12 md:mb-16">
        <Image src="/assets/logo.svg" alt="App Logo" width={32} height={32} />
      </div>

      {/* Navigation Links */}
      <nav className="flex md:flex-col gap-6 md:gap-10">
        {/* Home */}
        <Link
          href="/"
          className="text-[#5A698F] hover:text-[#FC4747] transition-colors"
        >
          <Image
            src="/assets/icon-nav-home.svg"
            alt="Home"
            width={20}
            height={20}
          />
        </Link>
        {/* Movies */}
        <Link
          href="/movies"
          className="text-[#5A698F] hover:text-[#FC4747] transition-colors"
        >
          <Image
            src="/assets/icon-nav-movies.svg"
            alt="Movies"
            width={20}
            height={20}
          />
        </Link>
        {/* TV Series */}
        <Link
          href="/tv-series"
          className="text-[#5A698F] hover:text-[#FC4747] transition-colors"
        >
          <Image
            src="/assets/icon-nav-tv-series.svg"
            alt="TV Series"
            width={20}
            height={20}
          />
        </Link>
        {/* Bookmarked */}
        <Link
          href="/bookmarked"
          className="text-[#5A698F] hover:text-[#FC4747] transition-colors"
        >
          <Image
            src="/assets/icon-nav-bookmark.svg"
            alt="Bookmarked"
            width={20}
            height={20}
          />
        </Link>
      </nav>

      <div className="mt-0 md:mt-auto">
        <Image
          src="/assets/image-avatar.png"
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full border-2 border-white"
        />
      </div>
    </aside>
  );
}
