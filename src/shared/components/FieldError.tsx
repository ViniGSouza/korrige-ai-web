import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldErrorProps {
  message?: string;
  className?: string;
}

/**
 * Componente de erro de campo
 * Exibe mensagem de erro com ícone e estilo consistente
 */
export const FieldError = ({ message, className }: FieldErrorProps) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-sm text-destructive mt-1.5 animate-fade-in-up",
        className
      )}
      role="alert"
    >
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default FieldError;
