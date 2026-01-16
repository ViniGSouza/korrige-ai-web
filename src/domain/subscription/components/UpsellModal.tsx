import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Crown, Sparkles, Check } from "lucide-react";
import { useCheckout } from "../hooks/useCheckout";

interface UpsellModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpsellModal({ open, onOpenChange }: UpsellModalProps) {
  const { mutate: createCheckout, isPending } = useCheckout();

  const features = [
    "20 redações por mês",
    "Correção completa com IA",
    "Avaliação das 5 competências",
    "Feedback detalhado e personalizado",
    "Suporte prioritário",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mb-4 mx-auto">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Upgrade para o Plano Pro
          </DialogTitle>
          <DialogDescription className="text-center">
            Você atingiu o limite de redações gratuitas. Assine o plano Pro e
            continue melhorando suas notas!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">
              R$ 29,90
              <span className="text-lg font-normal text-muted-foreground">/mês</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Cancele a qualquer momento
            </p>
          </div>

          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="sm:flex-col gap-2">
          <Button
            onClick={() => createCheckout()}
            disabled={isPending}
            size="lg"
            className="w-full"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isPending ? "Carregando..." : "Assinar Agora"}
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            variant="ghost"
            size="sm"
            className="w-full"
          >
            Talvez depois
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
