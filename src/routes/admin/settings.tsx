import { createFileRoute } from "@tanstack/react-router";
import { User, Shield, Bell, Palette, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({ component: SettingsPage });

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage your account and platform preferences" />

      <Tabs defaultValue="profile">
        <TabsList className="flex h-auto flex-wrap justify-start">
          <TabsTrigger value="profile" className="gap-1.5"><User className="h-4 w-4" />Profile</TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5"><Shield className="h-4 w-4" />Security</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5"><Bell className="h-4 w-4" />Notifications</TabsTrigger>
          <TabsTrigger value="appearance" className="gap-1.5"><Palette className="h-4 w-4" />Appearance</TabsTrigger>
          <TabsTrigger value="system" className="gap-1.5"><SlidersHorizontal className="h-4 w-4" />System</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader><CardTitle>Profile Settings</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16"><AvatarFallback className="bg-primary text-lg font-bold text-primary-foreground">AD</AvatarFallback></Avatar>
                <Button variant="outline" onClick={() => toast.info("Upload avatar")}>Change Avatar</Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label>Full Name</Label><Input defaultValue="Admin User" /></div>
                <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="admin@wanderly.com" /></div>
                <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+1 555 0100" /></div>
                <div className="space-y-1.5"><Label>Role</Label><Input defaultValue="Super Admin" disabled /></div>
              </div>
              <Button onClick={() => toast.success("Profile saved")}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader><CardTitle>Security Settings</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label>Current Password</Label><Input type="password" placeholder="••••••••" /></div>
                <div className="space-y-1.5"><Label>New Password</Label><Input type="password" placeholder="••••••••" /></div>
              </div>
              <SettingRow title="Two-Factor Authentication" desc="Add an extra layer of security" defaultChecked />
              <SettingRow title="Login Alerts" desc="Get notified of new device logins" defaultChecked />
              <Button onClick={() => toast.success("Security settings updated")}>Update Security</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader><CardTitle>Notification Settings</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <SettingRow title="Email Notifications" desc="Receive updates via email" defaultChecked />
              <SettingRow title="Push Notifications" desc="Browser push alerts" defaultChecked />
              <SettingRow title="New Booking Alerts" desc="Notify on every new booking" defaultChecked />
              <SettingRow title="Weekly Reports" desc="Summary delivered each Monday" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader><CardTitle>Appearance Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div>
                  <p className="font-semibold">Theme</p>
                  <p className="text-sm text-muted-foreground">Toggle light and dark mode</p>
                </div>
                <ThemeToggle />
              </div>
              <SettingRow title="Compact Mode" desc="Reduce spacing for denser layout" />
              <SettingRow title="Animations" desc="Enable interface animations" defaultChecked />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader><CardTitle>System Settings</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <SettingRow title="Maintenance Mode" desc="Temporarily disable public access" />
              <SettingRow title="Auto Backups" desc="Daily database backups" defaultChecked />
              <SettingRow title="Debug Logging" desc="Verbose system logs" />
              <Button variant="destructive" className="mt-2" onClick={() => toast.warning("Cache cleared")}>Clear Cache</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettingRow({ title, desc, defaultChecked }: { title: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border p-4">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} onCheckedChange={(v) => toast.success(`${title} ${v ? "enabled" : "disabled"}`)} />
    </div>
  );
}
