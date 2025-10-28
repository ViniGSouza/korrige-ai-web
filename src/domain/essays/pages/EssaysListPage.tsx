import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { EssaysList } from "../components";

export function EssaysListPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minhas Redações</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas redações e acompanhe as correções
          </p>
        </div>
        <Button onClick={() => navigate("/app/essays/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Redação
        </Button>
      </div>

      {/* Lista de redações */}
      <EssaysList />
    </div>
  );
}
