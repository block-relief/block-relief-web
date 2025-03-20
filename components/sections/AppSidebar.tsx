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

  const selectedMenu = pathname.split("/")[2] || "";

  const getMenuItems = (roles: string[]) => {
    const res = [
      { text: "Disasters", pages: ["", "disasters"], Icon: AlertTriangle },
      { text: "Dashboard", pages: ["dashboard"], Icon: Home },
      { text: "Donate", pages: ["donate"], Icon: HandCoins },
    ];

    if (roles.includes("donor")) {
      res.push({
        text: "Impact Tracking",
        pages: ["impact"],
        Icon: BarChart,
      });
      res.push({
        text: "My Donations",
        pages: ["transactions"],
        Icon: History,
      });
    }

    if (roles.includes("NGO")) {
      res.push({
        text: "Funds Management",
        pages: ["funds"],
        Icon: Wallet,
      });
      res.push({
        text: "Beneficiary Management",
        pages: ["beneficiaries"],
        Icon: Users,
      });
      res.push({
        text: "Donations",
        pages: ["donations"],
        Icon: History,
      });
    }

    if (roles.includes("admin")) {
      res.push({
        text: "Users",
        pages: ["users"],
        Icon: UserCog,
      });
      res.push({
        text: "Proposals",
        pages: ["proposals"],
        Icon: Book,
      });
      res.push({
        text: "Donations",
        pages: ["donations"],
        Icon: History,
      });
    }

    if (roles.includes("victim")) {
      res.push({ text: "Profile", pages: ["profile"], Icon: User });
      res.push({ text: "Requests", pages: ["requests"], Icon: Inbox });
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
                : menuItems.map(({ text, pages, Icon }) => (
                    <Link key={text} href={`/overview/${pages[0]}`}>
                      <SidebarMenuItem
                        className={`flex items-center gap-3 h-12 px-8 ${
                          pages.includes(selectedMenu)
                            ? "bg-secondary border-r-4 border-accent-2"
                            : ""
                        }`}
                      >
                        <Icon className="size-8" />
                        <span className="font-plusJakartaSans font-normal text-base leading-[16px]">
                          {text}
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
