import { Progress } from "@/shared/components/ui/progress";
import { useSubscription } from "../hooks/useSubscription";
import { Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";

export function UsageMeter() {
  const { essaysUsed, essaysLimit, isSubscriber } = useSubscription();
  const navigate = useNavigate();
  
  const percentage = (essaysUsed / essaysLimit) * 100;
  const remaining = essaysLimit - essaysUsed;

  return (
    <div className="p-4 rounded-lg border bg-card space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Uso mensal</h3>
        {!isSubscriber && remaining === 0 && (
          <Button
            size="sm"
            onClick={() => navigate("/pricing")}
            className="h-7 text-xs"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Assinar
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Progress value={percentage} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {essaysUsed} de {essaysLimit} redações utilizadas
        </p>
      </div>

      {!isSubscriber && remaining > 0 && (
        <p className="text-xs text-muted-foreground">
          Assine para ter 20 redações/mês
        </p>
      )}
    </div>
  );
}
