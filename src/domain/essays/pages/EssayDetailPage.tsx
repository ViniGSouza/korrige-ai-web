import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Calendar,
  Brain,
  Clock,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useEssay } from "../hooks";
import { EssayCorrectionView, EssayStatusBadge } from "../components";
import { essayService } from "../services";

export function EssayDetailPage() {
  const { essayId } = useParams<{ essayId: string }>();
  const navigate = useNavigate();
  const { data: essay, isLoading, error } = useEssay(essayId!);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !essay) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <p className="text-foreground mb-4">Erro ao carregar redação</p>
        <Button onClick={() => navigate("/app/essays")}>Voltar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/app/essays")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{essay.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(
                new Date(essay.createdAt),
                "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                { locale: ptBR }
              )}
            </span>
            {essay.aiProvider && (
              <span className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                {essayService.getProviderLabel(essay.aiProvider)}
              </span>
            )}
          </div>
        </div>
        <EssayStatusBadge status={essay.status} />
      </div>

      {/* Status em processamento */}
      {(essay.status === "pending" || essay.status === "processing") && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              {essay.status === "pending"
                ? "Aguardando processamento"
                : "Processando redação"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Sua redação está sendo processada pela IA. Isso pode levar alguns
              minutos. Esta página será atualizada automaticamente quando a
              correção estiver pronta.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Status falhou */}
      {essay.status === "failed" && (
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-lg text-red-900 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Falha no processamento
            </CardTitle>
          </CardHeader>
          <CardContent className="text-red-800">
            <p>
              Ocorreu um erro ao processar sua redação. Por favor, tente criar
              uma nova redação ou entre em contato com o suporte se o problema
              persistir.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Conteúdo da redação */}
      <Card>
        <CardHeader>
          <CardTitle>Texto da Redação</CardTitle>
          <CardDescription>
            {essay.fileType
              ? `Enviado como ${essay.fileType.toUpperCase()}`
              : "Texto digitado"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {essay.extractedText || essay.content ? (
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                {essay.extractedText || essay.content}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground italic">
              O texto ainda está sendo extraído do arquivo...
            </p>
          )}
        </CardContent>
      </Card>

      {/* Correção */}
      {essay.correction && (
        <>
          <div className="flex items-center justify-between pt-4">
            <h2 className="text-2xl font-bold">Correção Detalhada</h2>
            {essay.correction.processingTimeMs && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Processado em{" "}
                {essayService.formatProcessingTime(
                  essay.correction.processingTimeMs
                )}
              </span>
            )}
          </div>
          <EssayCorrectionView correction={essay.correction} />
        </>
      )}
    </div>
  );
}
