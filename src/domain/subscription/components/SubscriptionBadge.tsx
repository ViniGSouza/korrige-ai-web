import { Crown, Zap, Loader2 } from "lucide-react";
import { useSubscription } from "../hooks/useSubscription";
import { usePortal } from "../hooks/usePortal";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SubscriptionBadgeProps {
  variant?: "default" | "compact";
  className?: string;
}

export function SubscriptionBadge({ variant = "default", className }: SubscriptionBadgeProps) {
  const { isSubscriber, subscriptionStatus } = useSubscription();
  const { mutate: openPortal, isPending } = usePortal();
  const navigate = useNavigate();

  if (!isSubscriber) {
    return (
      <button
        onClick={() => navigate("/pricing")}
        className={cn(
          "group relative inline-flex items-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300",
          "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500",
          "hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105",
          "active:scale-95",
          variant === "compact" 
            ? "px-3 py-1.5 text-xs" 
            : "px-4 py-2 text-sm",
          className
        )}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Zap className={cn(
          "relative text-white group-hover:animate-pulse",
          variant === "compact" ? "w-3.5 h-3.5" : "w-4 h-4"
        )} />
        <span className="relative text-white tracking-wide">
          {variant === "compact" ? "Pro" : "Seja Pro"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => openPortal()}
      disabled={isPending}
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300",
        "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600",
        "hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105",
        "active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100",
        variant === "compact" 
          ? "px-3 py-1.5 text-xs" 
          : "px-4 py-2 text-sm",
        className
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {isPending ? (
        <Loader2 className={cn(
          "relative text-white animate-spin",
          variant === "compact" ? "w-3.5 h-3.5" : "w-4 h-4"
        )} />
      ) : (
        <Crown className={cn(
          "relative text-amber-300",
          variant === "compact" ? "w-3.5 h-3.5" : "w-4 h-4"
        )} />
      )}
      <span className="relative text-white tracking-wide">
        {subscriptionStatus === "past_due" ? "Pendente" : "Pro"}
      </span>
    </button>
  );
}
