"use client";

import { Building2, LogOut, Menu, Plus, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/services/auth.services";
import { getProfile } from "@/services/profile";
import ProfileDialog from "./ProfileDialog";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const router = useRouter();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/salaries", label: "Browse Salaries" },
    { href: "/stories", label: "Salary Stories" },
    { href: "/contribute-salary", label: "Contribute Your Salary" },
    { href: "/paid-fairly", label: "Are You Paid Fairly?" },
  ];

  useEffect(() => {
    const loadProfile = async () => {
      const res = await getProfile();
      setUserInfo(res.data);
    };
    loadProfile();
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      setUserInfo(getUserInfo());
    }
  }, []);

  const handleLogout = () => {
    removeUserInfo();
    setUserInfo(null);
    router.push("/auth/login");
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      {/* Top Row */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Trucareer</span>
          </Link>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/contribute-salary">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Contribute
              </Button>
            </Link>

            {userInfo ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          userInfo?.profileImg ||
                          "/placeholder.svg?height=32&width=32"
                        }
                        alt={userInfo?.name}
                      />
                      <AvatarFallback>
                        {userInfo?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 mt-2" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{userInfo?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {userInfo?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setProfileDialogOpen(true)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-1 mt-8">
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
                      className={`text-sm font-medium py-3 ${
                        isDisabled
                          ? "text-gray-400 cursor-not-allowed"
                          : "hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <div className="pt-4 border-t space-y-2">
                  {!userInfo ? (
                    <Link href="/auth/login">
                      <Button variant="default" className="w-full">
                        Login
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="w-full"
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Bottom Row - Desktop Navigation */}
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
                  className={`text-sm font-medium transition-colors ${
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

      <ProfileDialog
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        userInfo={userInfo}
        onProfileUpdate={(updatedUser) => {
          setUserInfo(updatedUser);
        }}
      />
    </nav>
  );
}
