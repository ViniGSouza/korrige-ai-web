import { Crown, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useSubscription } from "../hooks/useSubscription";
import { usePortal } from "../hooks/usePortal";
import { useNavigate } from "react-router-dom";

export function SubscriptionBadge() {
  const { isSubscriber, subscriptionStatus } = useSubscription();
  const { mutate: openPortal, isPending } = usePortal();
  const navigate = useNavigate();

  if (!isSubscriber) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/pricing")}
        className="gap-2"
      >
        <Sparkles className="w-4 h-4" />
        Assinar Pro
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => openPortal()}
      disabled={isPending}
      className="gap-2"
    >
      <Crown className="w-4 h-4 text-primary" />
      <span className="font-medium">
        {subscriptionStatus === "past_due" ? "Pagamento Pendente" : "Pro"}
      </span>
    </Button>
  );
}
