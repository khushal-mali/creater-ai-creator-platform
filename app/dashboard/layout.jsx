"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import {
  FileText,
  LayoutDashboard,
  Menu,
  PenTool,
  Settings,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Create Post",
    href: "/dashboard/create",
    icon: PenTool,
  },
  {
    title: "My Posts",
    href: "/dashboard/posts",
    icon: FileText,
  },
  {
    title: "Followers",
    href: "/dashboard/followers",
    icon: Users,
  },
];

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 border-r border-slate-700 bg-slate-800/50 backdrop-blur-sm transition-transform duration-300 lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-700 p-5">
          <Link className="shrink-0" href={"/"}>
            <Image
              src={"/logo.png"}
              width={96}
              height={32}
              className="h-8 w-auto object-contain sm:h-10 md:h-11"
              alt="Creatr Logo"
            />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={"lg:hidden"}
          >
            <X className="size-5" />
          </Button>
        </div>
        {/* Navigation */}
        <nav className="space-y-2 p-4">
          {sidebarItems.map((item, index) => {
            const isActive =
              pathname === item.href ||
              (pathname !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div
                  className={cn(
                    "group flex items-center space-x-3 rounded-xl px-4 py-3 transition-all duration-200",
                    isActive
                      ? "border border-purple-500 bg-linear-to-r from-purple-600/20 to-blue-600/20 text-white"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isActive
                        ? "text-purple-400"
                        : "text-slate-400 group-hover:text-white",
                    )}
                  />
                  <span className="font-medium">{item.title}</span>

                  {/* Badge for Create Post if draft exists */}
                  {item.title === "Create Post" && true && (
                    <Badge
                      variant="secondary"
                      className="ml-auto border-orange-500/30 bg-orange-500/20 text-xs text-orange-300"
                    >
                      Draft
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute right-4 bottom-4 left-4">
          <Link href="/dashboard/settings">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start rounded-xl p-4 text-slate-300 hover:text-white"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
      </aside>

      <div className="ml-0 lg:ml-64">
        <header
          className="fixed top-0 right-0 z-30 w-full border-b border-slate-700 bg-slate-800/80 backdrop-blur-md"
          // style={{ left: "auto", width: "calc(100% - 16rem)" }}
        >
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            {/* Left Side - Mobile Menu + Search */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Right Side - Notifications + User */}
            <div className="flex items-center space-x-4">
              {/* User Button */}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-lg border border-slate-600",
                    userButtonPopoverCard:
                      "shadow-xl backdrop-blur-md bg-slate-800/90 border border-slate-600",
                    userPreviewMainIdentifier: "font-semibold text-white",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </div>
        </header>
        {/* Page Content */}
        <main className="mt-16">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
