import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Sparkles,
  Zap,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
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
    { number: 1, name: "Domínio da Escrita Formal", color: "bg-green-500" },
    { number: 2, name: "Compreensão do Tema", color: "bg-blue-500" },
    { number: 3, name: "Organização de Ideias", color: "bg-purple-500" },
    { number: 4, name: "Mecanismos Linguísticos", color: "bg-orange-500" },
    { number: 5, name: "Proposta de Intervenção", color: "bg-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Navbar */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50 animate-fade-in-down">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo className="h-10 w-auto" />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Entrar
            </Button>
            <Button onClick={() => navigate("/sign-up")}>Começar Grátis</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center animate-fade-in-up">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 animate-scale-in">
            🚀 Correção Inteligente com IA
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Corrija suas redações com
            <span className="gradient-text-animated">
              {" "}
              Inteligência Artificial
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Receba correções detalhadas seguindo os critérios do ENEM, com
            feedback personalizado para cada uma das 5 competências.
            Potencialize seus estudos com tecnologia de ponta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 hover-lift transition-all ripple-effect"
              onClick={() => navigate("/sign-up")}
            >
              Começar Agora
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 hover-lift transition-all"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Saiba Mais
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="animate-fade-in-up animation-delay-100">
              <div className="text-4xl font-bold text-primary">1000</div>
              <div className="text-sm text-muted-foreground">
                Pontuação Máxima
              </div>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <div className="text-4xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Competências</div>
            </div>
            <div className="animate-fade-in-up animation-delay-300">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">
                Disponibilidade
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl font-bold mb-4">
            Por que escolher o CorrigeAI?
          </h2>
          <p className="text-xl text-muted-foreground">
            Tecnologia de ponta para impulsionar seus resultados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover-lift transition-all animate-fade-in-up border-primary/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Competencies */}
      <section className="container mx-auto px-4 py-20 bg-secondary/20 rounded-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">As 5 Competências do ENEM</h2>
          <p className="text-xl text-muted-foreground">
            Avaliação completa e detalhada de cada critério
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {competencies.map((comp, index) => (
            <div
              key={comp.number}
              className="flex items-center gap-4 p-6 bg-card rounded-xl hover-lift transition-all animate-slide-in-right"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-12 h-12 ${comp.color} text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0`}
              >
                {comp.number}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{comp.name}</h3>
                <p className="text-sm text-muted-foreground">0-200 pontos</p>
              </div>
              <div className="text-sm font-medium text-primary">Avaliado</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="px-8 py-6 ripple-effect hover-lift transition-all"
            onClick={() => navigate("/sign-up")}
          >
            Comece a Corrigir Agora
          </Button>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            Pronto para melhorar suas redações?
          </h2>
          <p className="text-xl text-muted-foreground">
            Junte-se a centenas de estudantes que já estão melhorando suas notas
            com o CorrigeAI
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-7 hover-lift transition-all ripple-effect"
            onClick={() => navigate("/sign-up")}
          >
            Criar Conta Gratuita
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground">
              © 2025 KorrigeAI. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover:text-primary transition-colors">
                Termos
              </button>
              <button className="hover:text-primary transition-colors">
                Privacidade
              </button>
              <button className="hover:text-primary transition-colors">
                Contato
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
