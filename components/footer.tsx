import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Trucareer</span>
            </Link>
            <p className="text-muted-foreground">
              Your trusted platform for company reviews, salary insights, and
              career guidance.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/companies"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Browse Companies
              </Link>
              <Link
                href="/salaries"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Salary Guide
              </Link>
              <Link
                href="/reviews"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Latest Reviews
              </Link>
              <Link
                href="/jobs"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Job Search
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link
                href="/help"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Help Center
              </Link>
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest company insights and career tips delivered to your
              inbox.
            </p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Trucareer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
