import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, MoreHorizontal, Eye, Pencil, Ban, Trash2, UserPlus, Inbox } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { users as seed, type PlatformUser } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/customers")({ component: CustomersPage });

function CustomersPage() {
  const [rows, setRows] = useState<PlatformUser[]>(seed);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");

  const filtered = useMemo(
    () =>
      rows.filter(
        (u) =>
          (role === "all" || u.role === role) &&
          (u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())),
      ),
    [rows, query, role],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        subtitle="View and manage all platform users"
        actions={<Button onClick={() => toast.success("Invite user dialog opened")} className="gap-2"><UserPlus className="h-4 w-4" />Add User</Button>}
      />

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
          </div>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Customer">Customer</SelectItem>
              <SelectItem value="Host">Host</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden lg:table-cell">Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex flex-col items-center gap-2 py-12 text-center">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-muted"><Inbox className="h-6 w-6 text-muted-foreground" /></div>
                      <p className="font-semibold">No users found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((u, i) => (
                  <motion.tr key={u.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="border-b transition-colors hover:bg-muted/40">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="text-xs text-white" style={{ background: `oklch(0.6 0.16 ${u.hue})` }}>
                            {u.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{u.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">{u.email}</TableCell>
                    <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">{u.joined}</TableCell>
                    <TableCell><StatusBadge status={u.status} /></TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info(`Viewing ${u.name}`)}><Eye className="mr-2 h-4 w-4" />View Profile</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Editing ${u.name}`)}><Pencil className="mr-2 h-4 w-4" />Edit User</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setRows((r) => r.map((x) => x.id === u.id ? { ...x, status: "Suspended" } : x)); toast.warning(`${u.name} suspended`); }}><Ban className="mr-2 h-4 w-4" />Suspend</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { setRows((r) => r.filter((x) => x.id !== u.id)); toast.success("User deleted"); }} className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
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
