"use client";
import {
  Home,
  Package2,
  Power,
  MonitorPlay,
  User2,
  Users,
  HouseIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import generateSlug from "@/utils/generateSlug";

export default function Sidebar({ session }: { session: Session }) {
  const { user } = session;
  const role = user?.role || "USER"; // Default to USER if role is undefined
  const id = user.id;
  const slug = generateSlug(user.name ?? "");
  const pathname = usePathname();

  const roles = {
    USER: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      { title: "Favourites", path: "/favourites", icon: Users },
    ],
    ADMIN: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      { title: "Properties", path: "/dashboard/properties", icon: Users },
      { title: "Companies", path: "/dashboard/companies", icon: Users },
      { title: "Agents", path: "/dashboard/agents", icon: Users },
      { title: "Categories", path: "/dashboard/categories", icon: Users },
      { title: "SubCategories", path: "/dashboard/subcategories", icon: Users },
      { title: "Cities", path: "/dashboard/cities", icon: Users },
      { title: "Towns", path: "/dashboard/towns", icon: Users },
      { title: "Blogs", path: "/dashboard/blogs", icon: Users },
      { title: "Adverts", path: "/dashboard/adverts", icon: MonitorPlay },
    ],
    AGENT: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      { title: "Properties", path: "/dashboard/properties", icon: Users },
      {
        title: "Profile",
        path: `/dashboard/agent/profile/`,
        icon: User2,
      },
    ],
  };

  // Get sidebar links based on user role
  const sideBarLinks = roles[role] || roles.USER; // Fallback to USER links if role is invalid
  
  const router = useRouter();
  
  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <div className="text-emerald-500 text-2xl font-normal flex items-center justify-center">
              <HouseIcon className='mx-2 h-6 w-6' /> Market<span className='font-bold'>Hub</span>
            </div>
          {role === "ADMIN" && (
            <Badge className="ml-2" variant="secondary">
              Admin
            </Badge>
          )}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sideBarLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.path ? "bg-muted text-primary" : ""
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button size="sm" className="w-full" onClick={handleLogout}>
            <Power className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}