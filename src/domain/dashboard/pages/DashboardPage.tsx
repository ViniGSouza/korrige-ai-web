import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  Award,
  Plus,
  Brain,
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

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: essaysData, isLoading } = useEssays();

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

  const stats = [
    {
      title: "Total de Redações",
      value: totalEssays,
      description: "Redações enviadas",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Redações Corrigidas",
      value: completedEssays.length,
      description: "Correções concluídas",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Em Processamento",
      value: pendingEssays.length,
      description: "Aguardando correção",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Nota Média",
      value: averageScore,
      description: "De 1000 pontos",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Maior Nota",
      value: highestScore,
      description: "Sua melhor performance",
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe seu progresso e estatísticas de correção
          </p>
        </div>
        <Button onClick={() => navigate("/app/essays/new")} size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Nova Redação
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">
              Bem-vindo ao KorrigeAI! 🎓
            </CardTitle>
            <CardDescription className="text-primary-foreground/90">
              Plataforma de correção automática de redações do ENEM usando
              Inteligência Artificial
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-primary-foreground/80">
              Envie suas redações e receba correções detalhadas baseadas nas 5
              competências do ENEM, com feedback personalizado e nota de 0 a
              1000 pontos.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate("/app/essays/new")}
                variant="secondary"
                size="lg"
              >
                <Plus className="mr-2 h-4 w-4" />
                Enviar Primeira Redação
              </Button>
              <Button
                onClick={() => navigate("/app/essays")}
                variant="outline"
                size="lg"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Ver Minhas Redações
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Como Funciona
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                1
              </div>
              <p className="text-foreground">
                Envie sua redação digitando ou fazendo upload de arquivo
                (imagem, PDF, DOCX)
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                2
              </div>
              <p className="text-foreground">
                Análise por Agente Especializado em correção de redações
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                3
              </div>
              <p className="text-foreground">
                Aguarde alguns minutos enquanto a IA analisa sua redação
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                4
              </div>
              <p className="text-foreground">
                Receba correção detalhada com nota e feedback nas 5 competências
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redações Recentes</CardTitle>
            <CardDescription>Suas últimas submissões</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Carregando...</p>
            ) : essays.length === 0 ? (
              <div className="text-center py-6">
                <FileText className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-3">
                  Você ainda não enviou nenhuma redação
                </p>
                <Button
                  onClick={() => navigate("/app/essays/new")}
                  variant="outline"
                  size="sm"
                >
                  Enviar Agora
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {essays.slice(0, 5).map((essay) => (
                  <div
                    key={essay.essayId}
                    className="group flex items-center justify-between p-3 rounded-lg hover:bg-primary/90 cursor-pointer transition-all"
                    onClick={() => navigate(`/app/essays/${essay.essayId}`)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate group-hover:text-primary-foreground transition-colors">{essay.title}</p>
                      <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">
                        {new Date(essay.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    {essay.correction && (
                      <div className="ml-2 text-right">
                        <p className="font-bold text-primary group-hover:text-primary-foreground transition-colors">
                          {essay.correction.totalScore}
                        </p>
                        <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">pontos</p>
                      </div>
                    )}
                  </div>
                ))}
                {essays.length > 5 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/app/essays")}
                    className="w-full"
                  >
                    Ver Todas
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
