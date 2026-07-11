import { BookOpen, GitFork, GraduationCap, Home } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Welcome", url: "/", icon: Home },
  { title: "Case Directory", url: "/cases", icon: BookOpen },
  { title: "Case Relationships", url: "/relationships", icon: GitFork },
  { title: "Study & Quiz", url: "/study", icon: GraduationCap },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="border-r border-foreground">
        <div className="p-5 pb-4">
          {!collapsed ? (
            <>
              <h1 className="font-hand text-2xl font-bold leading-tight text-foreground">
                my simple
                <br />
                <span className="border-b-2 border-foreground pb-0.5">Esqwaya</span>
              </h1>
              <p className="text-xs text-muted-foreground mt-2 tracking-widest uppercase">
                ~ law · study · notes ~
              </p>
            </>
          ) : (
            <span className="font-hand font-bold text-xl">E</span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent transition-colors tracking-wide"
                      activeClassName="bg-sidebar-accent text-foreground font-bold"
                    >
                      <item.icon className="mr-2 h-4 w-4" strokeWidth={1.5} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
