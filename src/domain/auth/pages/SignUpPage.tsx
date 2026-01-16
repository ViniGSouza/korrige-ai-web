import Logo from "@/brand/Logo";
import { SignUpForm } from "../components";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle, GraduationCap, Shield, Zap } from "lucide-react";

export const SignUpPage = () => {
  const features = [
    "Correção detalhada por IA",
    "Feedback nas 5 competências",
    "Histórico de evolução",
    "Acesso 24 horas por dia",
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <GraduationCap className="w-4 h-4" />
                Preparação ENEM
              </div>

              <h2 className="text-3xl font-bold font-display text-foreground leading-tight">
                Comece sua jornada{" "}
                <span className="font-serif italic text-primary">
                  rumo ao 1000
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Crie sua conta gratuita e tenha acesso a correções ilimitadas
                com inteligência artificial.
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

            {/* Card de destaque */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 mt-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">Tecnologia de ponta</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nossa IA foi treinada com milhares de redações corrigidas por
                especialistas, garantindo feedback preciso e construtivo.
              </p>
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
            <Link to="/" className="inline-block mb-8 transition-transform hover:scale-105">
              <Logo className="h-12 mx-auto" />
            </Link>
            <h1 className="text-3xl font-bold text-foreground font-display">
              Crie sua conta
            </h1>
            <p className="mt-2 text-muted-foreground">
              Comece a melhorar suas redações hoje
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
