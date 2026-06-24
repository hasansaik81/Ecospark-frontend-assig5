import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="mt-24 border-t bg-background">
      <div className="container mx-auto px-4 py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              EcoSpark
            </h2>

            <p className="text-sm text-muted-foreground leading-6">
              Powering a sustainable future with clean energy solutions,
              smart innovation, and eco-friendly technologies for tomorrow.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/projects" className="hover:text-primary">Projects</Link></li>
              <li><Link href="/ideas" className="hover:text-primary">Ideas</Link></li>
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>

            <p className="mb-4 text-sm text-muted-foreground">
              Get updates about renewable energy innovations and EcoSpark projects.
            </p>

            <div className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11"
              />

              <Button className="h-11 w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">

          <p>
            © {new Date().getFullYear()} EcoSpark. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link href="https://facebook.com" target="_blank" className="hover:text-primary">
              Facebook
            </Link>

            <Link href="https://linkedin.com" target="_blank" className="hover:text-primary">
              LinkedIn
            </Link>

            <Link href="https://github.com" target="_blank" className="hover:text-primary">
              GitHub
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}