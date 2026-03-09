import { BookOpen, GitFork, GraduationCap } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar } from
"@/components/ui/sidebar";

const navItems = [
{ title: "Case Directory", url: "/", icon: BookOpen },
{ title: "Case Relationships", url: "/relationships", icon: GitFork },
{ title: "Study & Quiz", url: "/study", icon: GraduationCap }];


export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4 pb-2">
          {!collapsed ?
          <h1 className="text-xl font-bold text-primary tracking-wide font-serif">
              LexStudy
            </h1> :

          <span className="text-primary font-display font-bold text-lg">L</span>
          }
          {!collapsed &&
          <p className="text-xs text-muted-foreground mt-1">Ghana Law Study Companion</p>
          }
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) =>
              <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                    to={item.url}
                    end={item.url === "/"}
                    className="hover:bg-sidebar-accent/80 transition-colors"
                    activeClassName="bg-sidebar-accent text-primary font-medium">
                    
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>);

}