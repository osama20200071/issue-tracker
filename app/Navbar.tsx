"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/issues", label: "Issues" },
];

const Navbar = () => {
  const currentPath = usePathname();

  return (
    <nav className="flex items-center border-b px-5 mb-5 space-x-6 h-14">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(" hover:text-zinc-700 transition-colors", {
                "text-zinc-900": currentPath === link.href,
                "text-zinc-500": currentPath !== link.href,
              })}
              // className={` hover:text-zinc-700 transition-colors ${
              //   currentPath === link.href ? "text-zinc-900" : "text-zinc-500"
              // }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
