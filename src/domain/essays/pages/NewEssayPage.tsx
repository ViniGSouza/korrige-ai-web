import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, PenTool, Upload, Brain, Target } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { CreateEssayForm } from "../components";
import { useSubscription } from "@/domain/subscription/hooks";
import { UpsellModal } from "@/domain/subscription/components";

export function NewEssayPage() {
  const navigate = useNavigate();
  const { essaysUsed, essaysLimit, isSubscriber, freeEssayUsed } = useSubscription();
  const [showUpsell, setShowUpsell] = useState(false);

  const canCreateEssay = isSubscriber 
    ? essaysUsed < essaysLimit 
    : !freeEssayUsed;

  useEffect(() => {
    if (!canCreateEssay) {
      setShowUpsell(true);
    }
  }, [canCreateEssay]);

  const handleSuccess = () => {
    navigate("/app/essays");
  };

  const steps = [
    { icon: PenTool, text: "Digite ou faça upload" },
    { icon: Brain, text: "IA analisa sua redação" },
    { icon: Target, text: "Receba nota nas 5 competências" },
  ];

  return (
    <div className="space-y-8">
      {/* Background decorativo */}
      <div className="fixed inset-0 -z-10 bg-mesh opacity-30" />
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/app/essays")}
          className="rounded-xl border-border/40 hover:bg-accent/50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight font-display">
            Nova Redação
          </h1>
          <p className="text-muted-foreground">
            Envie sua redação para receber uma correção detalhada por IA
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Coluna principal - Formulário */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card do formulário */}
          <div className="rounded-2xl glass border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-border/40 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                  <PenTool className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Enviar Redação</h2>
                  <p className="text-sm text-muted-foreground">
                    Preencha as informações abaixo
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <CreateEssayForm onSuccess={handleSuccess} />
            </div>
          </div>
        </div>

        {/* Coluna lateral - Informações */}
        <div className="space-y-6">
          {/* Como funciona */}
          <div className="rounded-2xl glass border border-white/10 overflow-hidden">
            <div className="p-5 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Como funciona</h3>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{step.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dicas */}
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-semibold">Dicas para uma boa redação</h3>
            </div>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-white/60">•</span>
                Leia atentamente o tema proposto
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/60">•</span>
                Faça um rascunho antes de escrever
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/60">•</span>
                Organize suas ideias em parágrafos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/60">•</span>
                Proponha uma intervenção clara
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/60">•</span>
                Revise ortografia e gramática
              </li>
            </ul>
          </div>

          {/* Formatos aceitos */}
          <div className="rounded-2xl glass border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Upload className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Formatos aceitos</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["PDF", "DOCX", "DOC", "JPG", "PNG"].map((format) => (
                <span
                  key={format}
                  className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium"
                >
                  {format}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Ou digite o texto diretamente no formulário
            </p>
          </div>
        </div>
      </div>

      <UpsellModal 
        open={showUpsell} 
        onOpenChange={(open) => {
          setShowUpsell(open);
          if (!open && !canCreateEssay) {
            navigate("/app/essays");
          }
        }} 
      />
    </div>
  );
}
