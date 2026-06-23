import { Facebook, Globe, Instagram, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const columns = [
  {
    title: "Support",
    links: ["Help Center", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options"],
  },
  {
    title: "Hosting",
    links: ["List your home", "AirCover for Hosts", "Hosting resources", "Community forum", "Hosting responsibly"],
  },
  {
    title: "Wanderly",
    links: ["Newsroom", "New features", "Careers", "Investors", "Gift cards"],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-bold">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-4 text-sm font-bold">Stay connected</h3>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full bg-background transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Wanderly · Built for portfolio</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Globe className="h-4 w-4" /> English (US)
            </span>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
