import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  Award,
  Plus,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  BookOpen,
  PenTool,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useEssays } from "@/domain/essays/hooks";
import { useAuthUser } from "@/domain/auth/hooks";
import { UsageMeter, SubscriptionBadge } from "@/domain/subscription/components";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/shared/lib/toast";
import { authService } from "@/domain/auth/services";

export function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { data: essaysData, isLoading } = useEssays();
  const { data: user } = useAuthUser();

  useEffect(() => {
    const checkoutStatus = searchParams.get("checkout");
    if (checkoutStatus === "success") {
      toast.success("Assinatura realizada com sucesso! Bem-vindo ao Pro!");
      authService.getMe().then(() => {
        queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      });
      searchParams.delete("checkout");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, queryClient]);

  const essays = essaysData?.essays || [];
  const totalEssays = essays.length;
  const completedEssays = essays.filter((e) => e.status === "completed");
  const pendingEssays = essays.filter(
    (e) => e.status === "pending" || e.status === "processing"
  );

  const averageScore =
    completedEssays.length > 0
      ? Math.round(
          completedEssays.reduce(
            (sum, e) => sum + (e.correction?.totalScore || 0),
            0
          ) / completedEssays.length
        )
      : 0;

  const highestScore =
    completedEssays.length > 0
      ? Math.max(...completedEssays.map((e) => e.correction?.totalScore || 0))
      : 0;

  const firstName = user?.name?.split(" ")[0] || "Estudante";
  const greeting = getGreeting();

  const stats = [
    {
      title: "Total",
      value: totalEssays,
      label: "redações",
      icon: FileText,
      gradient: "from-violet-500 to-purple-600",
      delay: "animation-delay-0",
    },
    {
      title: "Corrigidas",
      value: completedEssays.length,
      label: "concluídas",
      icon: CheckCircle,
      gradient: "from-emerald-500 to-teal-600",
      delay: "animation-delay-75",
    },
    {
      title: "Pendentes",
      value: pendingEssays.length,
      label: "em análise",
      icon: Clock,
      gradient: "from-amber-500 to-orange-600",
      delay: "animation-delay-150",
    },
    {
      title: "Média",
      value: averageScore,
      label: "pontos",
      icon: TrendingUp,
      gradient: "from-blue-500 to-indigo-600",
      delay: "animation-delay-225",
    },
    {
      title: "Recorde",
      value: highestScore,
      label: "melhor nota",
      icon: Award,
      gradient: "from-rose-500 to-pink-600",
      delay: "animation-delay-300",
    },
  ];

  const steps = [
    {
      icon: PenTool,
      title: "Envie",
      description: "Texto digitado ou arquivo",
    },
    {
      icon: Sparkles,
      title: "Análise IA",
      description: "Processamento inteligente",
    },
    {
      icon: Target,
      title: "Correção",
      description: "5 competências do ENEM",
    },
    {
      icon: BookOpen,
      title: "Feedback",
      description: "Nota de 0 a 1000",
    },
  ];

  return (
    <div className="relative min-h-full">
      {/* Background decorativo com mesh gradient */}
      <div className="fixed inset-0 -z-10 bg-mesh opacity-60" />
      <div className="fixed inset-0 -z-10 pattern-dots opacity-30" />

      <div className="space-y-8">
        {/* Hero Section com saudação personalizada */}
        <section className="relative overflow-hidden rounded-2xl bg-hero-gradient p-8 md:p-10 animate-hero-title">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float animation-delay-500" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-white/70 font-medium text-sm tracking-wide uppercase">
                {greeting}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display tracking-tight">
                Olá, {firstName}! <span className="inline-block animate-float">✨</span>
              </h1>
              <p className="text-white/80 text-lg max-w-xl font-light">
                Continue praticando para alcançar a nota dos seus sonhos no ENEM.
                Cada redação é um passo mais perto do seu objetivo.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <SubscriptionBadge />
              <Button
                onClick={() => navigate("/app/essays/new")}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 group font-semibold"
              >
                <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                Nova Redação
              </Button>
              <Button
                onClick={() => navigate("/app/essays")}
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                Ver Histórico
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Cards com glassmorphism */}
        <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
          <div className="md:col-span-2 lg:col-span-1">
            <UsageMeter />
          </div>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className={`group glass border-white/20 dark:border-white/10 hover-lift-glow animate-stagger-reveal ${stat.delay}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg animate-icon-pop ${stat.delay}`}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {stat.title}
                    </span>
                  </div>
                  <div className={`animate-number-reveal ${stat.delay}`}>
                    <p className="text-3xl md:text-4xl font-bold font-display tracking-tight text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          }).slice(0, 5)}
        </section>

        {/* Como Funciona - Design mais visual */}
        <section className="animate-stagger-reveal animation-delay-400">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold font-display">Como Funciona</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group relative p-6 rounded-2xl glass border border-white/20 dark:border-white/10 hover-lift-glow cursor-default"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {index + 1}
                  </div>
                  
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <h3 className="font-semibold font-display text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Grid inferior - Redações Recentes + CTA */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Redações Recentes - Ocupa 3 colunas */}
          <Card className="lg:col-span-3 glass border-white/20 dark:border-white/10 animate-stagger-reveal animation-delay-500">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-display flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Redações Recentes
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Suas últimas submissões e notas
                  </CardDescription>
                </div>
                {essays.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/app/essays")}
                    className="text-primary hover:text-primary"
                  >
                    Ver Todas
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 rounded-xl skeleton" />
                  ))}
                </div>
              ) : essays.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary/50" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 font-display">
                    Nenhuma redação ainda
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
                    Comece sua jornada de preparação enviando sua primeira redação para correção.
                  </p>
                  <Button
                    onClick={() => navigate("/app/essays/new")}
                    className="shadow-lg"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Enviar Primeira Redação
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {essays.slice(0, 5).map((essay, index) => (
                    <div
                      key={essay.essayId}
                      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-primary hover:shadow-lg cursor-pointer transition-all duration-300"
                      onClick={() => navigate(`/app/essays/${essay.essayId}`)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <FileText className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate group-hover:text-white transition-colors">
                          {essay.title}
                        </p>
                        <p className="text-xs text-muted-foreground group-hover:text-white/70 transition-colors">
                          {new Date(essay.createdAt).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      
                      {essay.correction ? (
                        <div className="text-right">
                          <p className="text-2xl font-bold font-display text-primary group-hover:text-white transition-colors">
                            {essay.correction.totalScore}
                          </p>
                          <p className="text-xs text-muted-foreground group-hover:text-white/70 transition-colors">
                            pontos
                          </p>
                        </div>
                      ) : (
                        <div className="px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium group-hover:bg-white/20 group-hover:text-white transition-colors">
                          Pendente
                        </div>
                      )}
                      
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* CTA Card - Design impactante */}
          <Card className="lg:col-span-2 relative overflow-hidden border-0 animate-stagger-reveal animation-delay-600">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
            
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full animate-morph" />
            
            <CardContent className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[320px]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium mb-6 backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Correção com IA
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white font-display mb-3 leading-tight">
                  Pronto para sua
                  <br />
                  <span className="font-serif italic font-normal">próxima conquista?</span>
                </h3>
                
                <p className="text-white/80 text-sm leading-relaxed">
                  Receba feedback detalhado nas 5 competências do ENEM e descubra exatamente onde melhorar.
                </p>
              </div>
              
              <Button
                onClick={() => navigate("/app/essays/new")}
                size="lg"
                className="w-full bg-white text-primary hover:bg-white/90 shadow-xl font-semibold mt-6 group"
              >
                <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                Iniciar Nova Redação
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}
