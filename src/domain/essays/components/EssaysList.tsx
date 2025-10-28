import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  FileText,
  Loader2,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { useEssays, useDeleteEssay } from "../hooks";
import { essayService } from "../services";
import type { Essay } from "../types";

export function EssaysList() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useEssays();
  const deleteEssay = useDeleteEssay();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (essayId: string) => {
    if (!confirm("Tem certeza que deseja deletar esta redação?")) return;

    setDeletingId(essayId);
    try {
      await deleteEssay.mutateAsync(essayId);
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = (essayId: string) => {
    navigate(`/app/essays/${essayId}`);
  };

  const getStatusIcon = (status: Essay["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "failed":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <p className="text-foreground">Erro ao carregar redações</p>
      </div>
    );
  }

  if (!data?.essays || data.essays.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-foreground mb-2">Nenhuma redação encontrada</p>
        <p className="text-sm text-muted-foreground">
          Comece criando sua primeira redação para receber correção
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.essays.map((essay) => (
        <Card key={essay.essayId} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg line-clamp-2">
                  {essay.title}
                </CardTitle>
                <CardDescription className="mt-1">
                  {format(new Date(essay.createdAt), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className={`ml-2 flex items-center gap-1 ${essayService.getStatusColor(
                  essay.status
                )}`}
              >
                {getStatusIcon(essay.status)}
                {essayService.getStatusLabel(essay.status)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {/* Informações */}
              <div className="text-sm space-y-1">
                {essay.aiProvider && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">IA:</span>{" "}
                    {essayService.getProviderLabel(essay.aiProvider)}
                  </p>
                )}
                {essay.fileType && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">Tipo:</span>{" "}
                    {essay.fileType.toUpperCase()}
                  </p>
                )}
                {essay.correction && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">Nota:</span>{" "}
                    <span className="font-bold text-lg text-primary">
                      {essay.correction.totalScore}
                    </span>
                    /1000
                  </p>
                )}
              </div>

              {/* Ações */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleView(essay.essayId)}
                  className="flex-1"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalhes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(essay.essayId)}
                  disabled={deletingId === essay.essayId}
                >
                  {deletingId === essay.essayId ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
