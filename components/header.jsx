"use client";

import { useStoreUser } from "@/hooks/use-store-user";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarLoader } from "react-spinners";
import { Button } from "./ui/button";

const Header = () => {
  const { isAuthenticated, isLoading } = useStoreUser();
  const path = usePathname();

  // Hide header on public profile and post pages (but not on feed)
  if (path !== "/" && path !== "/feed" && path.split("/").length >= 2) {
    return null;
  }

  return (
    <header className="fixed top-6 left-1/2 z-50 w-full max-w-3xl -translate-x-1/2 transform px-4">
      <div className="flex items-center justify-between gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md sm:px-6 md:px-8">
        <Link href={isAuthenticated ? "/feed" : "/"} className="shrink-0">
          <Image
            src={"/logo.png"}
            alt="Creatr Logo"
            width={96}
            height={32}
            className="h-8 w-auto object-contain sm:h-10"
          />
        </Link>

        {path === "/" && (
          <div className="hidden flex-1 justify-center space-x-6 lg:flex">
            <Link
              href={"#features"}
              className="cursor-pointer font-medium text-white transition-all duration-300 hover:text-purple-300"
            >
              Features
            </Link>
            <Link
              href={"#testimonials"}
              className="cursor-pointer font-medium text-white transition-all duration-300 hover:text-purple-300"
            >
              Testimonials
            </Link>
          </div>
        )}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Authenticated>
            <Link href={"/dashboard"}>
              <Button variant={"outline"} className="hidden sm:flex" size="sm">
                <LayoutDashboard className="h-4 w-4" />
                <span className="ml-2 hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            <UserButton />
          </Authenticated>

          <Unauthenticated>
            <SignInButton>
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                variant="primary"
                className={"whitespace-nowrap"}
                size="sm"
              >
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
        </div>

        {isLoading && (
          <div className="fixed bottom-0 left-0 z-40 flex w-full justify-center">
            <BarLoader width={"95%"} color="#D8B4FE" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
