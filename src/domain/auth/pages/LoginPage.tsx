import { LoginForm } from "@/domain/auth";
import { Sparkles, Target, FileText, CheckCircle, Gift, Crown } from "lucide-react";
import Logo from "@/brand/Logo";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const benefits = [
    { icon: Sparkles, text: "Correção por IA em minutos" },
    { icon: Target, text: "5 competências do ENEM" },
    { icon: FileText, text: "Histórico de redações" },
    { icon: CheckCircle, text: "Feedback personalizado" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Lado esquerdo - Formulário */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 relative">
        {/* Background sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
        
        <div className="w-full max-w-md space-y-8 animate-fade-in-up">
          {/* Logo e título */}
          <div className="text-center">
            <Link to="/" className="inline-block mb-8 transition-transform hover:scale-105">
              <Logo className="h-12 mx-auto" />
            </Link>
            <h1 className="text-3xl font-bold text-foreground font-display">
              Bem-vindo de volta
            </h1>
            <p className="mt-2 text-muted-foreground">
              Entre para continuar sua preparação
            </p>
          </div>

          {/* Formulário */}
          <div className="p-8 rounded-2xl bg-card shadow-lg">
            <LoginForm />
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-muted-foreground">
            © 2025 KorrigeAI. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Lado direito - Info */}
      <div className="hidden lg:flex lg:flex-1 bg-muted/30 border-l border-border/50 relative overflow-hidden">
        {/* Decoração sutil */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 max-w-xl">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold font-display text-foreground leading-tight">
                Correção de redações com{" "}
                <span className="font-serif italic text-primary">
                  Inteligência Artificial
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Receba feedback detalhado e melhore suas redações com tecnologia
                de ponta. Sua nota <strong className="text-foreground">1000</strong> começa aqui.
              </p>
            </div>

            {/* Benefits list */}
            <div className="space-y-3 pt-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/30 animate-stagger-reveal"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Planos */}
            <div className="grid gap-3 pt-8 border-t border-border/50">
              <div className="flex items-center gap-3 text-sm">
                <Gift className="w-5 h-5 text-emerald-500" />
                <span className="text-muted-foreground">Não tem conta? <Link to="/sign-up" className="text-emerald-500 font-medium hover:underline">Teste grátis</Link> com 1 correção</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Crown className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Plano Pro: <span className="text-foreground font-medium">R$ 29,90/mês</span> = 20 correções</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
