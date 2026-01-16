import { useNavigate } from "react-router-dom";
import { Plus, FileText, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { EssaysList } from "../components";

export function EssaysListPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Background decorativo */}
      <div className="fixed inset-0 -z-10 bg-mesh opacity-30" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight font-display">
              Minhas Redações
            </h1>
          </div>
          <p className="text-muted-foreground">
            Gerencie suas redações e acompanhe suas correções
          </p>
        </div>
        
        <Button 
          onClick={() => navigate("/app/essays/new")}
          size="lg"
          className="shadow-lg group"
        >
          <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
          Nova Redação
        </Button>
      </div>

      {/* Info card */}
      <div className="p-6 rounded-2xl glass border border-primary/10 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              Correção com Inteligência Artificial
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Suas redações são analisadas por um Agente Especializado que avalia cada uma das 
              5 competências do ENEM, fornecendo feedback detalhado e construtivo.
            </p>
          </div>
        </div>
      </div>

      {/* Lista de redações */}
      <div className="rounded-2xl glass border border-white/10 overflow-hidden">
        <EssaysList />
      </div>
    </div>
  );
}
