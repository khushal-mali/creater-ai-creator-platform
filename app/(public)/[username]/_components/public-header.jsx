import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PublicHeader = ({ link, title }) => {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href={link}>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {title}
          </Button>
        </Link>
        <Link href={"/"} className="shrink-0">
          <Image
            src="/logo.png"
            alt="Creatr Logo"
            width={96}
            height={32}
            className="h-8 w-auto object-contain sm:h-10 md:h-11"
          />
        </Link>
      </div>
    </header>
  );
};

export default PublicHeader;
