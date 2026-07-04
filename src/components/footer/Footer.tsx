




import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-7 border-t bg-background">
      <div className="container mx-auto px-4 py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-emerald-600">
              <Leaf className="h-6 w-6 text-emerald-500 fill-emerald-500" />
              <span>EcoSpark</span>
              <Sparkles className="h-4 w-4 text-amber-500 fill-amber-500 -ml-1" />
            </h2>

            <p className="text-sm text-muted-foreground leading-6">
              Powering a sustainable future with clean energy solutions,
              smart innovation, and eco-friendly technologies for tomorrow.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-foreground">Quick Links</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link></li>
              <li><Link href="/projects" className="hover:text-emerald-500 transition-colors">Projects</Link></li>
              <li><Link href="/ideas" className="hover:text-emerald-500 transition-colors">Ideas</Link></li>
              <li><Link href="/about" className="hover:text-emerald-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-foreground">Resources</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-emerald-500 transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-500 transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-foreground">Newsletter</h3>

            <p className="mb-4 text-sm text-muted-foreground">
              Get updates about renewable energy innovations and EcoSpark projects.
            </p>

            <div className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11 focus-visible:ring-emerald-500"
              />

              <Button className="h-11 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors shadow-sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">

          <p>
            &copy; {new Date().getFullYear()} EcoSpark. All rights reserved.
          </p>

          {/* 🔗 TEXT LINKS FOR SOCIALS (No Icon Errors) */}
          <div className="flex items-center gap-5 font-medium">
            <Link href="https://facebook.com" target="_blank" className="hover:text-emerald-500 transition-colors">
              Facebook
            </Link>

            <Link href="https://linkedin.com" target="_blank" className="hover:text-emerald-500 transition-colors">
              LinkedIn
            </Link>

            <Link href="https://github.com" target="_blank" className="hover:text-emerald-500 transition-colors">
              GitHub
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}