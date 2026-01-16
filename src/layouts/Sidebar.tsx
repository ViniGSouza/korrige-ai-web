import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import Logo from "@/brand/Logo";

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      path: "/app/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/app/essays",
      label: "Redações",
      icon: FileText,
    },
  ];

  return (
    <aside
      className={cn(
        "flex sticky top-0 flex-col h-screen border-r transition-all duration-300 bg-card/50 backdrop-blur-xl border-border/40",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-border/40">
        {!collapsed && (
          <Link
            to="/app/dashboard"
            className="flex items-center flex-1 transition-transform hover:scale-[1.02]"
          >
            <Logo className="w-36" />
          </Link>
        )}

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "w-8 h-8 rounded-lg hover:bg-accent/50 shrink-0 transition-colors",
            collapsed && "mx-auto"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Quick action */}
      {!collapsed && (
        <div className="p-4">
          <Link to="/app/essays/new">
            <Button className="w-full group">
              <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Nova Redação
            </Button>
          </Link>
        </div>
      )}

      {collapsed && (
        <div className="p-3">
          <Link to="/app/essays/new">
            <Button 
              size="icon" 
              className="w-full h-10"
              title="Nova Redação"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {!collapsed && (
          <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Menu
          </p>
        )}
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group relative",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                  collapsed && "mx-auto"
                )}
              />

              {!collapsed && <span className="flex-1">{item.label}</span>}

              {!collapsed && item.badge !== undefined && (
                <span className="flex justify-center items-center px-2 h-5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border/40">
        {!collapsed ? (
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Dica</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pratique regularmente para melhorar sua pontuação no ENEM.
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
          </div>
        )}
        
        {!collapsed && (
          <p className="mt-3 text-xs text-center text-muted-foreground/60">
            v1.0.0
          </p>
        )}
      </div>
    </aside>
  );
};
