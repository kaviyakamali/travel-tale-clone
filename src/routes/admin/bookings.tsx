import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, Download, Inbox } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { bookings, type Booking } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/bookings")({ component: BookingsPage });

const PER_PAGE = 6;

function BookingsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let rows = bookings.filter(
      (b) =>
        (status === "all" || b.status === status) &&
        (b.customer.toLowerCase().includes(query.toLowerCase()) ||
          b.property.toLowerCase().includes(query.toLowerCase()) ||
          b.id.toLowerCase().includes(query.toLowerCase())),
    );
    rows = rows.sort((a, b) => (sortAsc ? a.amount - b.amount : b.amount - a.amount));
    return rows;
  }, [query, status, sortAsc]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bookings"
        subtitle="Manage and track all reservations across the platform"
        actions={
          <Button onClick={() => toast.success("Bookings exported as CSV")} className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        }
      />

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              className="pl-9"
            />
          </div>
          <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Property</TableHead>
                <TableHead className="hidden md:table-cell">Check-in</TableHead>
                <TableHead className="hidden md:table-cell">Check-out</TableHead>
                <TableHead>
                  <button onClick={() => setSortAsc((s) => !s)} className="flex items-center gap-1 hover:text-foreground">
                    Amount <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <EmptyState />
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((b: Booking, i) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b transition-colors hover:bg-muted/40"
                  >
                    <TableCell className="font-mono text-xs font-semibold">{b.id}</TableCell>
                    <TableCell className="font-medium">{b.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{b.property}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">{b.checkIn}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">{b.checkOut}</TableCell>
                    <TableCell className="font-bold">${b.amount.toLocaleString()}</TableCell>
                    <TableCell><StatusBadge status={b.status} /></TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {rows.length} of {filtered.length} bookings
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" disabled={current <= 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{current} / {pages}</span>
            <Button variant="outline" size="icon" disabled={current >= pages} onClick={() => setPage((p) => p + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-muted">
        <Inbox className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="font-semibold">No bookings found</p>
      <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
    </div>
  );
}
