"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";

export default function EcoSparkHero() {
  // ইকোস্পার্কের থিমের সাথে মিল রেখে ইমেজ এবং কনটেন্ট
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1920", // Solar Panels
      badge: "Clean Energy Solutions",
      title: "Powering Tomorrow with Clean Energy",
      description:
        "Switch to sustainable solar solutions and reduce your carbon footprint while saving on energy costs.",
      ctaText: "Explore Solutions",
      ctaLink: "/solutions",
    },
    {
      image:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1920", // Wind Turbines
      badge: "Sustainable Future",
      title: "Sparking an Eco-Friendly Revolution",
      description:
        "Join EcoSpark in creating a cleaner, greener planet through smart renewable energy technologies.",
      ctaText: "Join EcoSpark",
      ctaLink: "/register",
    },
    {
      image:
        "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1920", // Nature/Forest Tech
      badge: "Smart Innovation",
      title: "Innovative Tech for Nature",
      description:
        "Bridge the gap between modern infrastructure and environmental preservation with smart energy grids.",
      ctaText: "Learn More",
      ctaLink: "/about",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-10">
      <Carousel 
        className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-lg border border-emerald-500/10"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[500px] md:h-[600px] w-full">
                {/* Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center">
                  <div className="text-left text-white px-6 md:px-16 max-w-2xl md:max-w-3xl">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-4 uppercase tracking-wider">
                      <Leaf className="size-3 md:size-4" />
                      {slide.badge}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                      {slide.title}
                    </h1> 

                    {/* Description */}
                    <p className="text-sm md:text-lg mb-8 text-gray-300 font-light max-w-xl leading-relaxed">
                      {slide.description}
                    </p>

                    {/* CTA Button */}
                    <Button 
                      asChild 
                      size="lg" 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold gap-2 shadow-lg shadow-emerald-600/20"
                    >
                      <Link href={slide.ctaLink}>
                        {slide.ctaText}
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons (Desktop এ বাইরে এবং সুন্দর দেখানোর জন্য ডিজাইন করা) */}
        <div className="hidden md:block">
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-emerald-600 border-none text-white transition-all size-11" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-emerald-600 border-none text-white transition-all size-11" />
        </div>
      </Carousel>
    </div>
  );
}