import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { CreateEssayForm } from "../components";

export function NewEssayPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/app/essays");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/app/essays")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nova Redação</h1>
          <p className="text-muted-foreground mt-1">
            Envie sua redação para receber uma correção detalhada por IA
          </p>
        </div>
      </div>

      {/* Informações */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Como funciona?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            1. Envie sua redação digitando o texto ou fazendo upload de um
            arquivo
          </p>
          <p>2. Análise por Agente Especializado em correção de redações</p>
          <p>3. Aguarde alguns minutos enquanto a IA analisa sua redação</p>
          <p>
            4. Receba uma correção completa com nota nas 5 competências do ENEM
          </p>
        </CardContent>
      </Card>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle>Enviar Redação</CardTitle>
          <CardDescription>
            Preencha as informações abaixo para enviar sua redação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateEssayForm onSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </div>
  );
}
