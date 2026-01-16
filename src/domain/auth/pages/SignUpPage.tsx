import Logo from "@/brand/Logo";
import { SignUpForm } from "../components";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { Link } from "react-router-dom";
import { CheckCircle, Shield, Zap, Gift, Crown } from "lucide-react";

export const SignUpPage = () => {
  const features = [
    "1 correção grátis para testar",
    "Análise completa das 5 competências",
    "Feedback detalhado com IA",
    "Resultado em minutos",
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Lado esquerdo - Info */}
      <div className="hidden lg:flex lg:flex-1 bg-muted/30 border-r border-border/50 relative overflow-hidden">
        {/* Decoração sutil */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 max-w-xl ml-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                <Gift className="w-4 h-4" />
                1 Redação Grátis
              </div>

              <h2 className="text-3xl font-bold font-display text-foreground leading-tight">
                Teste nossa correção{" "}
                <span className="font-serif italic text-primary">
                  sem pagar nada
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Crie sua conta grátis e ganhe <strong className="text-foreground">1 correção completa</strong> para 
                experimentar nossa IA. Gostou? Assine o plano Pro por R$ 29,90/mês.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3 pt-4">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 animate-stagger-reveal"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* Cards de planos */}
            <div className="grid gap-4 mt-8">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <Gift className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-foreground">Conta Gratuita</span>
                    <span className="text-xs text-muted-foreground ml-2">Você está aqui</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  1 redação grátis para você testar e conhecer
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Crown className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-foreground">Plano Pro</span>
                    <span className="text-xs text-primary ml-2">R$ 29,90/mês</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  20 correções por mês + histórico completo
                </p>
              </div>
            </div>

            {/* Badges de confiança */}
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Dados seguros</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4" />
                <span>Correção rápida</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 relative">
        {/* Background sutil */}
        <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 via-transparent to-primary/5 -z-10" />
        
        <div className="w-full max-w-md space-y-8 animate-fade-in-up">
          {/* Logo e título */}
          <div className="text-center">
            <Link to="/" className="inline-block mb-6 transition-transform hover:scale-105">
              <Logo className="h-12 mx-auto" />
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-4">
              <Gift className="w-3.5 h-3.5" />
              1 correção grátis incluída
            </div>
            <h1 className="text-3xl font-bold text-foreground font-display">
              Crie sua conta grátis
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Cadastre-se e ganhe sua primeira correção sem custo
            </p>
          </div>

          {/* Formulário */}
          <div className="p-8 rounded-2xl bg-card shadow-lg">
            <SignUpForm />
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-muted-foreground">
            Ao criar uma conta, você concorda com nossos{" "}
            <button className="text-primary hover:underline">Termos de Uso</button>
            {" "}e{" "}
            <button className="text-primary hover:underline">Política de Privacidade</button>
          </p>
        </div>
      </div>
    </div>
  );
};
