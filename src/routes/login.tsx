import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Globe, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Wanderly" },
      {
        name: "description",
        content: "Log in to book unique stays and experiences with Wanderly.",
      },
      { property: "og:title", content: "Log in — Wanderly" },
      {
        property: "og:description",
        content: "Log in to book unique stays and experiences with Wanderly.",
      },
    ],
  }),
  component: LoginPage,
});

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-primary">
      <svg viewBox="0 0 32 32" className="h-9 w-9 fill-current" aria-hidden>
        <path d="M16 1c2.5 0 4.5 2 4.9 4.6.3 1.8-.3 3.6-1.4 5.9l-.6 1.2c2.6 4.2 5 8.4 6 11.6.6 2 .3 3.7-.9 4.9-1 1-2.4 1.3-3.7 1-1.4-.3-2.7-1.2-4-2.6-1.3 1.4-2.6 2.3-4 2.6-1.3.3-2.7 0-3.7-1-1.2-1.2-1.5-2.9-.9-4.9 1-3.2 3.4-7.4 6-11.6l-.6-1.2c-1.1-2.3-1.7-4.1-1.4-5.9C11.5 3 13.5 1 16 1zm0 2.2c-1.4 0-2.5 1.1-2.7 2.7-.2 1.1.2 2.4 1.2 4.4l1.5 3 1.5-3c1-2 1.4-3.3 1.2-4.4-.2-1.6-1.3-2.7-2.7-2.7z" />
      </svg>
      <span className="text-2xl font-extrabold tracking-tight">Wanderly</span>
    </Link>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Welcome back!");
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <Button variant="ghost" size="sm" asChild className="rounded-full">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-sm sm:p-8"
        >
          <h1 className="text-2xl font-extrabold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Log in to continue exploring stays.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11 pl-10"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 px-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="h-11 w-full rounded-full text-base font-semibold">
              Log in
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            className="h-11 w-full rounded-full"
            onClick={() => toast.info("Social login is a demo")}
          >
            <Globe className="mr-2 h-4 w-4" /> Continue with Google
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
