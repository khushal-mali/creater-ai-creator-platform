"use client";

import CustomMouse from "@/components/custom-mouse";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { features, platformTabs, socialProofStats, testimonials } from "@/lib/data";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

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

      {/* Features Grid */}
      <section
        id="features"
        className="relative z-10 mt-14 bg-linear-to-r from-gray-900/50 to-purple-900/20 px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center sm:mb-16 lg:mb-20">
            <h2 className="mb-4 text-3xl font-black sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="gradient-text-primary">Everything you need</span>
            </h2>
            <p className="mx-auto max-w-3xl px-4 text-lg text-gray-400 sm:text-xl">
              From AI-powered writing assistance to advanced analytics,
              we&apos;ve built the complete toolkit for modern creators.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group card-glass transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 sm:p-8">
                  <div
                    className={`h-12 w-12 bg-linear-to-br sm:h-16 sm:w-16 ${feature.color} mb-4 flex items-center justify-center rounded-2xl transition-transform group-hover:scale-110 sm:mb-6`}
                  >
                    <feature.icon className="h-6 w-6 text-white sm:h-8 sm:w-8" />
                  </div>
                  <CardTitle className="mb-3 text-lg text-white sm:mb-4 sm:text-xl">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-400 sm:text-base">
                    {feature.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="relative z-10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-4 text-3xl font-black sm:mb-6 sm:text-4xl md:text-5xl">
              <span className="gradient-text-primary">How it works</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-400 sm:text-xl">
              Three powerful modules working together to supercharge your
              content creation.
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="lg:w-1/3">
              <div className="space-y-4">
                {platformTabs.map((tab, index) => (
                  <Button
                    key={index}
                    variant={activeTab === index ? "outline" : "ghost"}
                    onClick={() => setActiveTab(index)}
                    className="h-auto w-full justify-start p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                          activeTab === index
                            ? "bg-linear-to-br from-purple-500 to-blue-500"
                            : "bg-muted"
                        }`}
                      >
                        <tab.icon className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold">{tab.title}</h3>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="lg:w-2/3">
              <Card className="border-gray-800 bg-gray-900/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    {platformTabs[activeTab].title}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-400">
                    {platformTabs[activeTab].description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {platformTabs[activeTab].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 shrink-0 text-green-400" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative z-10 bg-linear-to-r from-gray-900/50 to-purple-900/20 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-12 text-3xl font-black sm:mb-16 sm:text-4xl md:text-5xl">
            <span className="gradient-text-primary">
              Loved by creators worldwide
            </span>
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {socialProofStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 to-blue-500 sm:mb-4 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                  <stat.icon className="h-6 w-6 text-white sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                </div>
                <div className="gradient-text-accent mb-2 text-3xl font-black sm:text-4xl lg:text-5xl">
                  {stat.metric}
                </div>
                <div className="text-base text-gray-400 sm:text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Testimonials */}
      <section
        id="testimonials"
        className="relative z-10 px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-4 text-3xl font-black sm:mb-6 sm:text-4xl md:text-5xl">
              <span className="gradient-text-primary">What creators say</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="card-glass transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-6 leading-relaxed text-gray-300">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12">
                      <Image
                        src={`https://images.unsplash.com/photo-${testimonial.imageId}?w=100&h=100&fit=crop&crop=face`}
                        alt={testimonial.name}
                        fill
                        className="rounded-full border-2 border-gray-700 object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role}
                      </div>
                      <Badge variant="secondary" className="mt-1">
                        {testimonial.company}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
