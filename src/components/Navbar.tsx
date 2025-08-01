"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useIsDesktop from "@/hooks/useIsDesktop";
import { useAuth } from "@/context/AuthContext";

// An array of navigation link objects to keep the code clean and maintainable.
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

/**
 * The main navigation component for the application.
 * It renders differently for desktop and mobile views and displays
 * user-specific controls (Avatar/Logout or Login button) based on authentication status.
 */
const Navbar = () => {
  // Custom hooks to get application state.
  const isDesktop = useIsDesktop(); // Detects if the viewport is desktop-sized.
  const pathname = usePathname(); // Gets the current URL path to highlight the active link.
  const { isAuthenticated, logout } = useAuth(); // Gets authentication state and logout function.

  // --- DESKTOP NAVIGATION ---
  if (isDesktop) {
    return (
      <header className="p-8">
        {/* The main nav container for the desktop sidebar. */}
        <nav className="bg-blue h-[calc(100vh-64px)] w-24 flex flex-col justify-between p-8 rounded-2xl">
          {/* Top section: Logo and navigation icons. */}
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
                    // Apply a white filter to the icon if it's the active page.
                    className={
                      pathname === link.href ? "brightness-0 invert" : ""
                    }
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom section: User controls (Avatar/Logout or Login). */}
          <div className="flex flex-col items-center gap-4">
            {isAuthenticated ? (
              // If the user is logged in, show their avatar and a logout button.
              <>
                <div className="h-10 w-10 rounded-full border">
                  <Image
                    src="/assets/image-avatar.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <button
                  onClick={logout}
                  className="text-white/75 hover:text-white hover:bg-red/80 hover:cursor-pointer transition-colors text-sm bg-red p-2 rounded-lg"
                  title="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              // If the user is not logged in, show a login button.
              <Link
                href="/login"
                className="bg-red text-white text-sm px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>
    );
  }

  // --- MOBILE NAVIGATION ---
  return (
    <header>
      {/* The main nav container for the mobile top bar. */}
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
          {isAuthenticated ? (
            // If logged in, show the user's avatar.
            <div className="h-6 w-6 rounded-full border border-white">
              <Image
                src="/assets/image-avatar.png"
                alt="Avatar"
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
          ) : (
            // If not logged in, show a login button.
            <Link
              href="/login"
              className="bg-red text-white text-sm px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
