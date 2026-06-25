import { Bell, MessageSquare, Menu, Search, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  onOpenMobile: () => void;
}

export function AdminHeader({ onOpenMobile }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenMobile} aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="hidden min-w-0 flex-col sm:flex">
        <p className="truncate text-sm font-semibold leading-tight">Welcome Back, Admin 👋</p>
        <p className="truncate text-xs text-muted-foreground">Here's what's happening today</p>
      </div>

      <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search anything..." className="h-10 rounded-full pl-9" />
      </div>

      <div className="ml-auto flex items-center gap-1 md:ml-2">
        <ThemeToggle />

        <Link to="/admin/messages">
          <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Messages">
            <MessageSquare className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          </Button>
        </Link>

        <Link to="/admin/notifications">
          <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full p-0 text-[9px]">
              3
            </Badge>
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 flex items-center gap-2 rounded-full p-1 pr-2 transition-colors hover:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-xs font-bold text-primary-foreground">
                  AD
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:block">Admin</span>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs font-normal text-muted-foreground">admin@wanderly.com</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin/settings"><User className="mr-2 h-4 w-4" />Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/admin/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/" className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
