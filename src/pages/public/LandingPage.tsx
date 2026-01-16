import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Sparkles,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  ArrowRight,
  Star,
  GraduationCap,
  PenTool,
  Target,
  BookOpen,
  Crown,
  Gift,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import Logo from "@/brand/Logo";

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "IA Avançada",
      description:
        "Correção inteligente por Agente Especializado, seguindo rigorosamente os critérios do ENEM",
    },
    {
      icon: Zap,
      title: "Resultado Rápido",
      description:
        "Receba sua correção detalhada em poucos minutos, não em dias",
    },
    {
      icon: Shield,
      title: "5 Competências",
      description:
        "Análise completa das 5 competências do ENEM com feedback específico",
    },
    {
      icon: Clock,
      title: "Disponível 24/7",
      description: "Corrija suas redações a qualquer hora, sem limitações",
    },
    {
      icon: TrendingUp,
      title: "Acompanhe Evolução",
      description: "Visualize seu progresso e melhore continuamente suas notas",
    },
    {
      icon: CheckCircle,
      title: "Feedback Detalhado",
      description: "Pontos fortes e áreas de melhoria claramente identificados",
    },
  ];

  const competencies = [
    { number: 1, name: "Domínio da Escrita Formal", gradient: "from-emerald-500 to-teal-600" },
    { number: 2, name: "Compreensão do Tema", gradient: "from-blue-500 to-indigo-600" },
    { number: 3, name: "Organização de Ideias", gradient: "from-violet-500 to-purple-600" },
    { number: 4, name: "Mecanismos Linguísticos", gradient: "from-amber-500 to-orange-600" },
    { number: 5, name: "Proposta de Intervenção", gradient: "from-rose-500 to-pink-600" },
  ];

  const steps = [
    { icon: PenTool, title: "Envie", desc: "Texto ou arquivo" },
    { icon: Sparkles, title: "Análise", desc: "IA processa" },
    { icon: Target, title: "Correção", desc: "5 competências" },
    { icon: BookOpen, title: "Feedback", desc: "Nota detalhada" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorativo */}
      <div className="fixed inset-0 -z-10 bg-mesh opacity-40" />
      <div className="fixed inset-0 -z-10 pattern-dots opacity-20" />
      
      {/* Gradient orbs decorativos */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -z-10 animate-float" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-3xl -z-10 animate-float animation-delay-500" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo className="h-10 w-auto" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              onClick={() => navigate("/login")}
              className="font-medium"
            >
              Entrar
            </Button>
            <Button 
              onClick={() => navigate("/sign-up")}
            >
              Começar Grátis
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in-down">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm font-medium">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent">
                <Star className="w-3 h-3 text-white" />
              </div>
              <span className="text-foreground">Correção com Inteligência Artificial</span>
            </div>
          </div>

          {/* Título principal */}
          <div className="text-center space-y-6 animate-hero-title">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-foreground">Transforme suas</span>
              <br />
              <span className="font-serif italic text-gradient bg-clip-text">
                redações em conquistas
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Correção automática seguindo os critérios do ENEM, com feedback 
              personalizado para cada competência. Sua nota <strong className="text-foreground font-semibold">1000</strong> começa aqui.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-stagger-reveal animation-delay-300">
            <Button
              size="lg"
              className="text-lg px-8 py-7 shadow-xl group"
              onClick={() => navigate("/sign-up")}
            >
              Testar Grátis
              <Gift className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-7 bg-card border-border text-foreground hover:bg-muted hover:text-foreground"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver Planos
            </Button>
          </div>
          
          {/* Aviso de gratuito */}
          <p className="text-center text-sm text-muted-foreground mt-4 animate-stagger-reveal animation-delay-400">
            <Gift className="inline w-4 h-4 mr-1" />
            Crie sua conta grátis e ganhe <strong className="text-foreground">1 correção gratuita</strong> para experimentar
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            {[
              { value: "1000", label: "Pontuação Máxima", delay: "animation-delay-0" },
              { value: "5", label: "Competências", delay: "animation-delay-75" },
              { value: "24/7", label: "Disponível", delay: "animation-delay-150" },
            ].map((stat) => (
              <div key={stat.label} className={`text-center animate-stagger-reveal ${stat.delay}`}>
                <div className="text-4xl md:text-5xl font-bold text-gradient font-display">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona - Visual */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Simples como <span className="font-serif italic text-primary">1, 2, 3, 4</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Do envio ao feedback em minutos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.title}
                  className="relative group"
                >
                  {/* Linha conectora */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                  )}
                  
                  <div className="relative p-6 rounded-2xl glass border border-white/10 hover-lift-glow text-center">
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Recursos
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Por que escolher o <span className="font-serif italic">KorrigeAI</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tecnologia de ponta para impulsionar seus resultados no ENEM
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl glass border border-white/10 hover-lift-glow animate-stagger-reveal"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Competências */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              ENEM
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              As <span className="font-serif italic">5 Competências</span> do ENEM
            </h2>
            <p className="text-lg text-muted-foreground">
              Avaliação completa e detalhada de cada critério
            </p>
          </div>

          <div className="space-y-4">
            {competencies.map((comp, index) => (
              <div
                key={comp.number}
                className="group flex items-center gap-4 p-5 rounded-2xl glass border border-white/10 hover-lift-glow animate-stagger-reveal"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${comp.gradient} text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg flex-shrink-0`}
                >
                  {comp.number}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{comp.name}</h3>
                  <p className="text-sm text-muted-foreground">0 a 200 pontos</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <CheckCircle className="w-4 h-4" />
                  Avaliado
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Crown className="w-4 h-4" />
              Planos
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Comece <span className="font-serif italic">grátis</span>, evolua com o Pro
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Teste nossa correção com IA gratuitamente. Gostou? Assine e continue evoluindo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Gratuito */}
            <div className="relative p-8 rounded-2xl glass border border-white/10 hover-lift-glow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                  <Gift className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Gratuito</h3>
                  <p className="text-sm text-muted-foreground">Para experimentar</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">R$ 0</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Crie sua conta sem custo
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm"><strong>1 redação grátis</strong> para testar</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Correção completa com IA</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Avaliação das 5 competências</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Feedback detalhado</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Correções adicionais</span>
                </li>
              </ul>

              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => navigate("/sign-up")}
              >
                Criar Conta Grátis
              </Button>
            </div>

            {/* Plano Pro */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-2 border-primary shadow-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-medium shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  Mais Popular
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 mt-2">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Pro</h3>
                  <p className="text-sm text-muted-foreground">Para quem quer evoluir</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">R$ 29,90</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Menos de R$ 1,50 por redação
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm"><strong>20 redações por mês</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Correção completa com IA</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Avaliação das 5 competências</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Feedback detalhado e personalizado</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Histórico completo de correções</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Cancele quando quiser</span>
                </li>
              </ul>

              <Button
                className="w-full shadow-lg"
                size="lg"
                onClick={() => navigate("/sign-up")}
              >
                Começar com Pro
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm">
              <Gift className="w-4 h-4 text-emerald-500" />
              <span className="text-muted-foreground">
                Crie sua conta grátis, teste com <strong className="text-foreground">1 redação</strong>, depois decida se quer assinar
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent p-12 md:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute inset-0 pattern-dots opacity-10" />
            
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
                <Gift className="w-4 h-4" />
                1 correção grátis para você testar
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white font-display leading-tight">
                Pronto para sua
                <br />
                <span className="font-serif italic font-normal">próxima conquista?</span>
              </h2>
              <p className="text-xl text-white/80 max-w-xl mx-auto">
                Crie sua conta, envie sua primeira redação <strong>grátis</strong> e veja a qualidade da nossa correção com IA
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-lg px-10 py-7 bg-white text-primary hover:bg-white/90 shadow-xl group font-semibold"
                  onClick={() => navigate("/sign-up")}
                >
                  Testar Grátis Agora
                  <Gift className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
              <p className="text-sm text-white/60">
                Sem cartão de crédito • Cancele quando quiser
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo className="h-8 w-auto opacity-70" />
            <p className="text-sm text-muted-foreground">
              © 2025 KorrigeAI. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover:text-primary transition-colors">Termos</button>
              <button className="hover:text-primary transition-colors">Privacidade</button>
              <button className="hover:text-primary transition-colors">Contato</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
