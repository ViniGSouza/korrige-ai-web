import { Clock, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { essayService } from "../services";
import type { EssayStatus } from "../types";

interface EssayStatusBadgeProps {
  status: EssayStatus;
  className?: string;
}

export function EssayStatusBadge({ status, className }: EssayStatusBadgeProps) {
  const getIcon = () => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />;
      case "processing":
        return <Loader2 className="h-3 w-3 animate-spin" />;
      case "completed":
        return <CheckCircle className="h-3 w-3" />;
      case "failed":
        return <XCircle className="h-3 w-3" />;
    }
  };

  return (
    <Badge
      variant="secondary"
      className={`flex items-center gap-1 ${essayService.getStatusColor(
        status
      )} ${className}`}
    >
      {getIcon()}
      {essayService.getStatusLabel(status)}
    </Badge>
  );
}
