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
  FileText,
  Sparkles,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useEssay } from "../hooks";
import { EssayCorrectionView, EssayStatusBadge } from "../components";
import { essayService } from "../services";

export function EssayDetailPage() {
  const { essayId } = useParams<{ essayId: string }>();
  const navigate = useNavigate();
  const { data: essay, isLoading, error } = useEssay(essayId!);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="p-4 rounded-2xl bg-primary/10 mb-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <p className="text-muted-foreground">Carregando redação...</p>
      </div>
    );
  }

  if (error || !essay) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="p-4 rounded-2xl bg-destructive/10 mb-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <p className="text-foreground font-medium mb-2">Erro ao carregar redação</p>
        <p className="text-sm text-muted-foreground mb-4">
          Não foi possível encontrar esta redação
        </p>
        <Button onClick={() => navigate("/app/essays")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Redações
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Background decorativo */}
      <div className="fixed inset-0 -z-10 bg-mesh opacity-30" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/app/essays")}
          className="rounded-xl border-border/40 hover:bg-accent/50 shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-display truncate">
              {essay.title}
            </h1>
            <EssayStatusBadge status={essay.status} />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {format(
                new Date(essay.createdAt),
                "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                { locale: ptBR }
              )}
            </span>
            {essay.aiProvider && (
              <span className="flex items-center gap-1.5">
                <Brain className="h-4 w-4" />
                {essayService.getProviderLabel(essay.aiProvider)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Status Cards */}
      {(essay.status === "pending" || essay.status === "processing") && (
        <div className="rounded-2xl glass border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                {essay.status === "pending"
                  ? "Aguardando processamento"
                  : "Processando redação"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Sua redação está sendo analisada pela IA. Isso pode levar alguns
                minutos. Esta página será atualizada automaticamente quando a
                correção estiver pronta.
              </p>
            </div>
          </div>
        </div>
      )}

      {essay.status === "failed" && (
        <div className="rounded-2xl glass border border-destructive/20 bg-destructive/5 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-destructive shadow-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-destructive mb-1">
                Falha no processamento
              </h3>
              <p className="text-sm text-muted-foreground">
                Ocorreu um erro ao processar sua redação. Por favor, tente criar
                uma nova redação ou entre em contato com o suporte se o problema
                persistir.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da redação */}
      <div className="rounded-2xl glass border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-border/40 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Texto da Redação</h2>
              <p className="text-sm text-muted-foreground">
                {essay.fileType
                  ? `Enviado como ${essay.fileType.toUpperCase()}`
                  : "Texto digitado"}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          {essay.extractedText || essay.content ? (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                {essay.extractedText || essay.content}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="italic">
                O texto ainda está sendo extraído do arquivo...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Correção */}
      {essay.correction && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold font-display">Correção Detalhada</h2>
            </div>
            {essay.correction.processingTimeMs && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground px-3 py-1.5 rounded-full bg-muted/50">
                <Clock className="h-4 w-4" />
                Processado em{" "}
                {essayService.formatProcessingTime(
                  essay.correction.processingTimeMs
                )}
              </span>
            )}
          </div>
          <EssayCorrectionView correction={essay.correction} />
        </div>
      )}
    </div>
  );
}
