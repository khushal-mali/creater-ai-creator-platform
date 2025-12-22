import CustomMouse from "@/components/custom-mouse";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 animate-pulse bg-linear-to-br from-purple-900/20 via-blue-900/20 to-green-900/20" />

      <CustomMouse />

      {/* Hero Section */}
      <section className="relative z-10 mt-48 px-4 sm:px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6 text-center sm:space-y-8 lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-7xl leading-none font-black tracking-tight lg:text-8xl">
                <span className="block font-black text-white">Create.</span>
                <span className="block font-light text-purple-300 italic">
                  Publish.
                </span>
                <span className="block bg-linear-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text font-black text-transparent">
                  Grow.
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed font-light text-gray-300 sm:text-xl md:max-w-none md:text-2xl">
                The AI-powered platform that turns your ideas into{" "}
                <span className="font-semibold text-purple-300">
                  engaging content
                </span>{" "}
                and helps you build a thriving creator business.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <Link href="/dashboard">
                <Button
                  size="xl"
                  variant="primary"
                  className="w-full rounded-full text-white sm:w-auto"
                >
                  Start Creating for Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/feed">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full rounded-full sm:w-auto"
                >
                  Explore the Feed
                </Button>
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center gap-6 text-sm text-gray-400 sm:flex-row sm:gap-8 lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
                  ].map((src, i) => (
                    <div key={i} className="relative h-6 w-6 sm:h-8 sm:w-8">
                      <Image
                        src={src}
                        alt={`Creator ${i + 1}`}
                        fill
                        className="rounded-full border-2 border-black object-cover"
                        sizes="32px"
                      />
                    </div>
                  ))}
                </div>
                <span>10k+ creators</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4"
                  />
                ))}
                <span className="ml-1">4.9/5</span>
              </div>
            </div>
          </div>

          {/* Interactive 3D-style elements */}
          <div>
            <Image
              src="/banner.png"
              alt="Platform Banner"
              width={500}
              height={700}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}
