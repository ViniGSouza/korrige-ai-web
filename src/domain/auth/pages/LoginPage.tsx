import { LoginForm } from "@/domain/auth";
import { FileText, Sparkles, Target } from "lucide-react";
import Logo from "@/brand/Logo";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-background relative">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="flex flex-1 justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 w-full max-w-md">
          <div className="text-center">
            <div className="flex justify-center items-center mx-auto mb-4">
              <Logo />
            </div>{" "}
            <p className="mt-2 text-sm text-muted-foreground">
              Correção inteligente de redações com IA
            </p>
          </div>

          <LoginForm />

          <p className="text-xs text-center text-muted-foreground">
            &copy; 2025 KorrigeAI. Todos os direitos reservados.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-l border-border">
        <div className="flex flex-col justify-center px-12 py-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Correção de redações do ENEM com Inteligência Artificial
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Receba feedback detalhado e melhore suas redações com tecnologia
                de ponta.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-br rounded-xl ring-2 from-primary/20 to-accent/20 ring-primary/20">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Correção por IA
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Análise detalhada por Agente Especializado seguindo
                    critérios do ENEM
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-br rounded-xl ring-2 from-primary/20 to-accent/20 ring-primary/20">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    5 Competências
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Avaliação completa de todas as competências do ENEM com
                    notas
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-br rounded-xl ring-2 from-primary/20 to-accent/20 ring-primary/20">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Histórico completo
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Acompanhe sua evolução com todas as redações corrigidas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
