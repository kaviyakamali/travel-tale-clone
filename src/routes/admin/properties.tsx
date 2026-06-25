import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Plus, MoreHorizontal, Eye, Pencil, Trash2, Star, Inbox } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { properties as seed, type Property } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/properties")({ component: PropertiesPage });

function PropertiesPage() {
  const [rows, setRows] = useState<Property[]>(seed);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      rows.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.location.toLowerCase().includes(query.toLowerCase()) ||
          p.host.toLowerCase().includes(query.toLowerCase()),
      ),
    [rows, query],
  );

  const remove = (id: string) => {
    setRows((r) => r.filter((p) => p.id !== id));
    toast.success("Property deleted");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Properties"
        subtitle="Manage all listings on the platform"
        actions={
          <Button onClick={() => toast.success("Add property form opened")} className="gap-2">
            <Plus className="h-4 w-4" /> Add Property
          </Button>
        }
      />

      <Card className="p-4">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search properties..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
        </div>

        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden lg:table-cell">Host</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden sm:table-cell">Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="flex flex-col items-center gap-2 py-12 text-center">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-muted"><Inbox className="h-6 w-6 text-muted-foreground" /></div>
                      <p className="font-semibold">No properties found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p, i) => (
                  <motion.tr key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="border-b transition-colors hover:bg-muted/40">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-14 shrink-0 rounded-lg bg-gradient-to-br" style={{ background: `linear-gradient(135deg, oklch(0.72 0.13 ${p.hue}), oklch(0.6 0.15 ${p.hue + 30}))` }} />
                        <span className="font-semibold">{p.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">{p.location}</TableCell>
                    <TableCell className="hidden lg:table-cell">{p.host}</TableCell>
                    <TableCell className="font-bold">${p.price}<span className="text-xs font-normal text-muted-foreground">/night</span></TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="flex items-center gap-1 font-semibold"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{p.rating}</span>
                    </TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info(`Viewing ${p.name}`)}><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Editing ${p.name}`)}><Pencil className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => remove(p.id)} className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
