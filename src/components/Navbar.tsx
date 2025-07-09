// src/components/Navbar.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useIsDesktop from "@/hooks/useIsDesktop";

const Navbar = () => {
  const isDesktop = useIsDesktop();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", title: "Home", icon: "/assets/icon-nav-home.svg" },
    { href: "/movies", title: "Movies", icon: "/assets/icon-nav-movies.svg" },
    {
      href: "/tv-series",
      title: "TV Series",
      icon: "/assets/icon-nav-tv-series.svg",
    },
    {
      href: "/bookmarked",
      title: "Bookmarked",
      icon: "/assets/icon-nav-bookmark.svg",
    },
  ];

  if (isDesktop) {
    return (
      <nav className="bg-blue h-full w-24 flex flex-col justify-between p-8 rounded-2xl mx-4">
        <div className="flex flex-col items-center gap-10">
          <div>
            <Image src="/assets/logo.svg" alt="Logo" width={32} height={25} />
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} title={link.title}>
                <Image
                  src={link.icon}
                  alt={`${link.title} Icon`}
                  width={20}
                  height={20}
                  className={
                    pathname === link.href ? "brightness-0 invert" : ""
                  }
                />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="h-10 w-10 rounded-full border border-white">
            <Image
              src="/assets/image-avatar.png"
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-blue p-4 flex justify-between items-center">
      <div>
        <Image src="/assets/logo.svg" alt="Logo" width={25} height={20} />
      </div>
      <div className="flex gap-6">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} title={link.title}>
            <Image
              src={link.icon}
              alt={`${link.title} Icon`}
              width={16}
              height={16}
              className={pathname === link.href ? "brightness-0 invert" : ""}
            />
          </Link>
        ))}
      </div>
      <div>
        <div className="h-6 w-6 rounded-full border border-white">
          <Image
            src="/assets/image-avatar.png"
            alt="Avatar"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
