import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Globe, Heart, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";

function Logo() {
  return (
    <div className="flex items-center gap-2 text-primary">
      <svg viewBox="0 0 32 32" className="h-8 w-8 fill-current" aria-hidden>
        <path d="M16 1c2.5 0 4.5 2 4.9 4.6.3 1.8-.3 3.6-1.4 5.9l-.6 1.2c2.6 4.2 5 8.4 6 11.6.6 2 .3 3.7-.9 4.9-1 1-2.4 1.3-3.7 1-1.4-.3-2.7-1.2-4-2.6-1.3 1.4-2.6 2.3-4 2.6-1.3.3-2.7 0-3.7-1-1.2-1.2-1.5-2.9-.9-4.9 1-3.2 3.4-7.4 6-11.6l-.6-1.2c-1.1-2.3-1.7-4.1-1.4-5.9C11.5 3 13.5 1 16 1zm0 2.2c-1.4 0-2.5 1.1-2.7 2.7-.2 1.1.2 2.4 1.2 4.4l1.5 3 1.5-3c1-2 1.4-3.3 1.2-4.4-.2-1.6-1.3-2.7-2.7-2.7zM16 16.4c-2.2 3.6-4.2 7.4-5 10-.4 1.3-.2 2.2.3 2.7.5.5 1.2.6 1.9.5.9-.2 1.9-.9 2.9-2.1-1.2-1.6-2.1-3.4-2.1-5.1 0-.8.7-1.4 1.5-1.4s1.5.6 1.5 1.4c0 1-.5 2.1-1.3 3.3.8 1.2 1.8 1.9 2.7 2.1.7.1 1.4 0 1.9-.5.5-.5.7-1.4.3-2.7-.8-2.6-2.8-6.4-5-10z" />
      </svg>
      <span className="hidden text-xl font-extrabold tracking-tight sm:inline">Wanderly</span>
    </div>
  );
}

interface NavbarProps {
  search: string;
  onSearch: (v: string) => void;
  wishlistCount: number;
}

export function Navbar({ search, onSearch, wishlistCount }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("English (US)");
  const languages = [
    "English (US)",
    "Español",
    "Français",
    "Deutsch",
    "日本語",
    "हिन्दी",
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Center search */}
        <div className="relative hidden flex-1 max-w-md md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search destinations…"
            className="h-12 rounded-full border-border pl-11 pr-4 shadow-sm transition-shadow focus-visible:shadow-md"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hidden rounded-full sm:inline-flex"
                aria-label="Select language"
              >
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {languages.map((lang) => (
                <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)}>
                  <span className="flex-1">{lang}</span>
                  {language === lang && <Check className="ml-2 h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative hidden h-11 items-center gap-2 rounded-full pl-3 pr-2 sm:flex"
              >
                <Menu className="h-4 w-4" />
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-muted">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                {wishlistCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild className="font-semibold">
                <Link to="/login">Log in</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/wishlist">
                  <Heart className="mr-2 h-4 w-4" /> Wishlist ({wishlistCount})
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/help">Help Center</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full sm:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/wishlist">
                    <Heart className="mr-2 h-4 w-4" /> Wishlist ({wishlistCount})
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/help">Help Center</Link>
                </Button>
                <div className="mt-2 border-t pt-2">
                  <p className="px-3 pb-1 text-xs font-semibold text-muted-foreground">
                    <Globe className="mr-1 inline h-3.5 w-3.5" /> Language
                  </p>
                  {languages.map((lang) => (
                    <Button
                      key={lang}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setLanguage(lang)}
                    >
                      <span className="flex-1 text-left">{lang}</span>
                      {language === lang && <Check className="h-4 w-4 text-primary" />}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile search */}
      <div className="relative px-4 pb-3 md:hidden">
        <Search className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search destinations…"
          className="h-11 rounded-full pl-11 shadow-sm"
        />
      </div>
    </motion.header>
  );
}
