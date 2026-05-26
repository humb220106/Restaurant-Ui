"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UtensilsCrossed, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "Menu",         href: "/menu" },
  { label: "About",        href: "/about" },
  { label: "Contact",      href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const pathname                  = usePathname();

  /* scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mobile menu on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#site-header")) setMenuOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  /* close menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        id="site-header"
        className={[
          "fixed top-0 left-0 right-0 z-50 h-[70px] transition-all duration-300",
          scrolled
            ? "bg-[#1f2937] shadow-[0_2px_20px_rgba(31,41,55,0.3)]"
            : "bg-white/95 backdrop-blur-md border-b border-black/10",
        ].join(" ")}
      >
        <div className="max-w-[1200px] mx-auto px-5 h-full flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className={[
              "flex items-center gap-2.5 font-semibold text-[1.4rem] no-underline shrink-0 transition-colors duration-300",
              scrolled ? "text-white" : "text-[#2c2c2c]",
            ].join(" ")}
          >
            <UtensilsCrossed size={22} color="#c8963e" />
            <span>Savory Haven</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "relative text-[0.95rem] font-medium whitespace-nowrap transition-colors duration-300 no-underline",
                    "after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-[2px] after:bg-amber-600",
                    active ? "text-amber-600 after:block" : "after:hidden",
                    scrolled
                      ? "text-white/90 hover:text-amber-500"
                      : "text-[#2c2c2c] hover:text-amber-600",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Reserve button — hidden on mobile */}
            <Link
              href="/reservations"
              className={[
                "hidden md:inline-flex items-center px-[18px] py-2 rounded-md text-white font-semibold text-[0.9rem] no-underline transition-all duration-300 hover:-translate-y-px",
                scrolled
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-amber-600 hover:bg-amber-700",
              ].join(" ")}
            >
              Reserve Table
            </Link>

            {/* Hamburger — visible on mobile */}
            <button
              className={[
                "md:hidden p-2 -m-2 rounded-md border-none bg-transparent cursor-pointer transition-colors duration-300",
                scrolled ? "text-white" : "text-[#2c2c2c]",
              ].join(" ")}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <nav
          className={[
            "md:hidden absolute top-full left-0 right-0 z-50 flex flex-col transition-all duration-300 overflow-hidden",
            scrolled ? "bg-[#1f2937]" : "bg-white",
            "shadow-[0_4px_20px_rgba(0,0,0,0.12)]",
            menuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-3 pointer-events-none",
          ].join(" ")}
        >
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={close}
                className={[
                  "w-full px-6 py-3 text-[1rem] font-medium no-underline border-b transition-colors duration-200",
                  scrolled
                    ? "text-white/90 border-white/10 hover:text-amber-400"
                    : "text-[#2c2c2c] border-[#f3f3f3] hover:text-amber-600",
                  active ? (scrolled ? "text-amber-400" : "text-amber-600") : "",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}

          <Link
            href="/reservations"
            onClick={close}
            className="mx-6 my-3 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-md text-center no-underline transition-colors duration-200"
          >
            Reserve Table
          </Link>
        </nav>
      </header>

      {/* Mobile backdrop overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={close}
        />
      )}
    </>
  );
}