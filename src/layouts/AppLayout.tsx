import { Outlet, useNavigate } from "react-router-dom";
import { useAuthUser, useLogout } from "@/domain/auth/hooks";
import { Button } from "@/shared/components/ui/button";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { LogOut, User, ChevronDown, Settings, HelpCircle } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const AppLayout = () => {
  const { data: user } = useAuthUser();
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Pegar iniciais do nome
  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex overflow-hidden flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-40 h-16 border-b border-border/40 bg-background/80 backdrop-blur-xl">
          <div className="flex justify-between items-center px-6 h-full">
            <div className="flex-1" />

            <div className="flex gap-3 items-center">
              <ThemeToggle />

              {/* User menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex gap-3 items-center h-10 px-3 hover:bg-accent/50 group rounded-xl"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  {/* Avatar com iniciais */}
                  <div className="flex justify-center items-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent text-white text-sm font-semibold shadow-md shadow-primary/20">
                    {getInitials(user?.name)}
                  </div>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-medium leading-none text-foreground">
                      {user?.name}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform text-muted-foreground",
                      userMenuOpen && "rotate-180"
                    )}
                  />
                </Button>

                {/* Dropdown menu */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-border bg-card p-2 shadow-xl animate-in fade-in-0 zoom-in-95 z-50">
                      {/* User info */}
                      <div className="px-3 py-4 mb-2 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5">
                        <div className="flex items-center gap-3">
                          <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-white text-lg font-semibold shadow-md">
                            {getInitials(user?.name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground truncate">{user?.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
                          <User className="w-4 h-4" />
                          Meu Perfil
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
                          <Settings className="w-4 h-4" />
                          Configurações
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
                          <HelpCircle className="w-4 h-4" />
                          Ajuda
                        </button>
                      </div>

                      <div className="my-2 h-px bg-border/40" />

                      {/* Logout */}
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4" />
                        Sair da conta
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
