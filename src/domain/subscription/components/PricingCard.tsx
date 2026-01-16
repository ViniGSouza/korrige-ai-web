import { Check, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  onCtaClick: () => void;
  isLoading?: boolean;
}

export function PricingCard({
  title,
  price,
  period,
  features,
  highlighted = false,
  ctaText,
  onCtaClick,
  isLoading = false,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative p-8 rounded-2xl border bg-card",
        highlighted
          ? "border-primary shadow-xl scale-105"
          : "border-border"
      )}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-medium shadow-lg">
            <Sparkles className="w-4 h-4" />
            Mais Popular
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground">/{period}</span>}
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className="w-full"
        variant={highlighted ? "default" : "outline"}
        size="lg"
        onClick={onCtaClick}
        disabled={isLoading}
      >
        {isLoading ? "Carregando..." : ctaText}
      </Button>
    </div>
  );
}
