import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Send, Phone, Video, MoreVertical } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { conversations, chatMessages } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/messages")({ component: MessagesPage });

function MessagesPage() {
  const [active, setActive] = useState(conversations[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState(chatMessages);

  const filtered = conversations.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  const current = conversations.find((c) => c.id === active)!;

  const send = () => {
    if (!draft.trim()) return;
    setMsgs((m) => [...m, { id: Date.now(), from: "me", text: draft, time: "now" }]);
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Messages" subtitle="Conversations with hosts and customers" />

      <Card className="grid h-[calc(100vh-15rem)] grid-cols-1 overflow-hidden md:grid-cols-[320px_1fr]">
        {/* Conversation list */}
        <div className="flex flex-col border-r border-border">
          <div className="border-b border-border p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search messages..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={cn(
                  "flex w-full items-center gap-3 border-b border-border/50 p-3 text-left transition-colors hover:bg-muted/50",
                  active === c.id && "bg-muted",
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-white" style={{ background: `oklch(0.6 0.16 ${c.hue})` }}>
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold">{c.name}</p>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{c.preview}</p>
                </div>
                {c.unread > 0 && <Badge className="h-5 w-5 shrink-0 justify-center rounded-full p-0 text-[10px]">{c.unread}</Badge>}
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 border-b border-border p-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-white" style={{ background: `oklch(0.6 0.16 ${current.hue})` }}>
                {current.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-semibold">{current.name}</p>
              <p className="text-xs text-emerald-500">Online</p>
            </div>
            <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-4">
            {msgs.map((m) => (
              <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                    m.from === "me" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-background shadow-sm",
                  )}
                >
                  <p>{m.text}</p>
                  <p className={cn("mt-1 text-[10px]", m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground")}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-border p-3">
            <Input
              placeholder="Type a message..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button size="icon" onClick={send}><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
