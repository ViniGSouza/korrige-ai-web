import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { PricingCard } from "../components/PricingCard";
import { useCheckout } from "../hooks/useCheckout";
import { useAuthUser } from "@/domain/auth/hooks";
import { useSubscription } from "../hooks/useSubscription";

export function PricingPage() {
  const navigate = useNavigate();
  const { data: user } = useAuthUser();
  const { isSubscriber } = useSubscription();
  const { mutate: createCheckout, isPending } = useCheckout();

  const handleSubscribe = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    createCheckout();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Escolha seu <span className="text-gradient">Plano</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Comece com 1 redação gratuita. Assine para continuar melhorando.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard
              title="Gratuito"
              price="R$ 0"
              features={[
                "1 redação gratuita",
                "Correção completa com IA",
                "Avaliação das 5 competências",
                "Feedback detalhado",
              ]}
              ctaText="Começar Grátis"
              onCtaClick={() => navigate("/sign-up")}
            />

            <PricingCard
              title="Pro"
              price="R$ 29,90"
              period="mês"
              highlighted
              features={[
                "20 redações por mês",
                "Correção completa com IA",
                "Avaliação das 5 competências",
                "Feedback detalhado e personalizado",
                "Suporte prioritário",
                "Acesso ilimitado ao histórico",
              ]}
              ctaText={isSubscriber ? "Plano Atual" : "Assinar Agora"}
              onCtaClick={handleSubscribe}
              isLoading={isPending}
            />
          </div>

          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>Todas as correções seguem os critérios oficiais do ENEM</p>
            <p className="mt-2">Cancele a qualquer momento, sem compromisso</p>
          </div>
        </div>
      </div>
    </div>
  );
}
