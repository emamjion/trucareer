"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Building2, Menu, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/salaries", label: "Browse Salaries" },
    { href: "/stories", label: "Salary Stories" },
    { href: "/contribute-salary", label: "Contribute Your Salary" },
    { href: "/paid-fairly", label: "Are You Paid Fairly?" },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      {/* Top Row - Logo and Auth Buttons */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Trucareer</span>
          </Link>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href={"/contribute-salary"}>
              <Button className="">
                <Plus className="h-4 w-4 mr-2" />
                Contribute
              </Button>
            </Link>
            <Button variant="outline">Login</Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => {
                  const isDisabled = item.label === "Are You Paid Fairly?";
                  return (
                    <Link
                      key={item.href}
                      href={isDisabled ? "#" : item.href}
                      onClick={(e) => {
                        if (isDisabled) e.preventDefault();
                        setIsOpen(false);
                      }}
                      className={`text-sm font-medium py-3 transition-colors ${
                        isDisabled
                          ? "text-gray-400 cursor-not-allowed pointer-events-none"
                          : "hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link href={"/contribute-salary"}>
                    <Button className="justify-start ">
                      <Plus className="h-4 w-4 mr-2" />
                      Contribute
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Bottom Row - Navigation Menu (Desktop Only) */}
      <div className="hidden md:block border-t">
        <div className="container mx-auto px-4">
          <div className="flex h-12 items-center justify-start space-x-8">
            {navItems.map((item) => {
              const isDisabled = item.label === "Are You Paid Fairly?";
              return (
                <Link
                  key={item.href}
                  href={isDisabled ? "#" : item.href}
                  onClick={(e) => isDisabled && e.preventDefault()}
                  className={`text-sm font-medium py-3 transition-colors ${
                    isDisabled
                      ? "text-gray-400 cursor-not-allowed pointer-events-none"
                      : "hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
