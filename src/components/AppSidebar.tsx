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
  const { state, isMobile, setOpen, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";

  // Return the sidebar to its resting state once the user has chosen a page.
  const collapseAfterSelect = () => {
    if (isMobile) setOpenMobile(false);
    else setOpen(false);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="border-r border-sidebar-border">
        <div className="p-5 pb-4">
          {!collapsed ? (
            <>
              <h1 className="text-xl font-bold leading-tight">
                my simple<br /><span className="ink-underline">Esqwaya</span>
              </h1>
              <p className="text-[10px] text-muted-foreground mt-3 font-display">
                law · study · quiz
              </p>
            </>
          ) : (
            <span className="font-bold text-xl text-foreground">E</span>
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
                      onClick={collapseAfterSelect}
                       className="hover:bg-sidebar-accent transition-colors"
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
