import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { TrialSignupModal } from "@/components/TrialSignupModal";

const features = [
  "Vagas ilimitadas",
  "50 Aplicações automáticas por dia",
  "Análise de currículo e LinkedIn",
  "Personalização de CV por vaga",
  "Otimização para ATS",
  "Tracking de suas aplicações completo e automático",
  "Suporte prioritário no whatsapp",
];

export const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section
      id="planos"
      className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Planos
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            Transparente e sem surpresas
          </p>

          <Card className="max-w-md mx-auto p-8 border-2 border-primary shadow-xl relative overflow-hidden">
            {/* Badge */}
            <div className="absolute top-0 right-0 bg-gradient-success text-white px-4 py-1 text-sm font-semibold flex items-center gap-1">
              <Star className="h-4 w-4" />
              Pro
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Pro Trimestral
              </h3>
              <div className="flex items-end gap-3 flex-wrap">
                <span className="text-2xl font-bold text-muted-foreground line-through">
                  R$ 174
                </span>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-foreground">
                    R$ 87
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / 3 meses
                  </span>
                </div>
              </div>
              <p className="inline-flex items-center gap-2 text-base font-semibold text-primary mt-2 px-3 py-1 bg-primary/10 rounded-full">
                <span>✨</span>
                <span>ou 3x de R$ 29 sem juros</span>
              </p>
              <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/20 rounded-full px-4 py-2 mt-3">
                <span className="text-xs font-semibold text-foreground">
                  🎁 50% OFF - Oferta válida até 31/12
                </span>
              </div>
            </div>

            <div className="mb-8">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
              onClick={() => setIsModalOpen(true)}
            >
              Testar 14 Dias Grátis
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Sem cartão de crédito • Cancele quando quiser
            </p>
          </Card>
        </div>
      </div>

      <TrialSignupModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};
