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
  Wallet,
  Users,
  UserCog,
  User,
  Inbox,
  Book,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  const selectedMenu = pathname.split("/")[2] || null;

  const getMenuItems = (roles: string[]) => {
    const res = [
      { text: "Disasters", href: "/overview/", icon: AlertTriangle },
      { text: "Dashboard", href: "/overview/dashboard", icon: Home },
      { text: "Donate", href: "/overview/donate", icon: HandCoins },
    ];

    if (roles.includes("donor")) {
      res.push({
        text: "Impact Tracking",
        href: "/overview/impact",
        icon: BarChart,
      });
      res.push({
        text: "Donation History",
        href: "/overview/donations",
        icon: History,
      });
    }

    if (roles.includes("NGO")) {
      res.push({
        text: "Funds Management",
        href: "/overview/funds",
        icon: Wallet,
      });
      res.push({
        text: "Beneficiary Management",
        href: "/overview/beneficiaries",
        icon: Users,
      });
      res.push({
        text: "Transaction History",
        href: "/overview/transactions",
        icon: History,
      });
    }

    if (roles.includes("admin")) {
      res.push({
        text: "User Management",
        href: "/overview/users",
        icon: UserCog,
      });
      res.push({
        text: "Campaign Management",
        href: "/overview/campaigns",
        icon: Book,
      });
      res.push({
        text: "Transaction History",
        href: "/overview/transactions",
        icon: History,
      });
    }

    if (roles.includes("victim")) {
      res.push({ text: "Profile", href: "/overview/profile", icon: User });
      res.push({ text: "Requests", href: "/overview/requests", icon: Inbox });
    }

    return res;
  };

  const menuItems = user ? getMenuItems(user.roles) : [];

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
                          selectedMenu === (item.href.split("/")[2] || null)
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
