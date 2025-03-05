import { useAuth } from "@/hooks/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Home,
  HandCoins,
  BarChart,
  History,
  Megaphone,
  Wallet,
  Users,
  UserCog,
  User,
  Inbox,
  Book,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  const selectedMenu = pathname.split("/")[2] || null;

  console.log(selectedMenu);

  const getMenuItems = (role: string) => {
    switch (role) {
      case "donor":
        return [
          { text: "Dashboard", href: "/overview/dashboard", icon: Home },
          { text: "Donation", href: "/overview/donate", icon: HandCoins },
          {
            text: "Impact Tracking",
            href: "/overview/impact",
            icon: BarChart,
          },
          {
            text: "Donation History",
            href: "/overview/donations",
            icon: History,
          },
        ];
      case "NGO":
        return [
          { text: "Dashboard", href: "/overview/dashboard", icon: Home },
          { text: "Campaign", href: "/overview/campaign", icon: Megaphone },
          { text: "Funds Management", href: "/overview/funds", icon: Wallet },
          {
            text: "Beneficiary Management",
            href: "/overview/beneficiaries",
            icon: Users,
          },
          {
            text: "Transaction History",
            href: "/overview/transactions",
            icon: History,
          },
        ];
      case "admin":
        return [
          { text: "Dashboard", href: "/overview/dashboard", icon: Home },
          { text: "User Management", href: "/overview/users", icon: UserCog },
          {
            text: "Campaign Management",
            href: "/overview/campaigns",
            icon: Book,
          },
          {
            text: "Transaction History",
            href: "/overview/transactions",
            icon: History,
          },
        ];
      case "victim":
        return [
          { text: "Profile", href: "/overview/profile", icon: User },
          { text: "Requests", href: "/overview/requests", icon: Inbox },
        ];
      default:
        return [];
    }
  };

  const menuItems = user ? getMenuItems(user.role) : [];

  return (
    <Sidebar className="static h-full pt-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-6">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="px-2 py-1.5">
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ))
                : menuItems.map((item) => (
                    <Link key={item.text} href={item.href}>
                      <SidebarMenuItem
                        className={`flex items-center gap-3 h-12 px-8 ${
                          selectedMenu === item.href.split("/")[2]
                            ? "bg-secondary border-r-4 border-accent-2"
                            : ""
                        }`}
                      >
                        <item.icon className="size-8" />
                        <span className="font-plusJakartaSans font-normal text-base leading-[16px]">
                          {item.text}
                        </span>
                      </SidebarMenuItem>
                    </Link>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
