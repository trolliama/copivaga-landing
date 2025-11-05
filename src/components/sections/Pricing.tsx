import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

const features = [
  "Vagas ilimitadas",
  "Aplicações ilimitadas",
  "Piloto Automático",
  "Personalização de CV por vaga",
  "Tracking completo",
  "Suporte prioritário"
];

export const Pricing = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
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
              <h3 className="text-2xl font-bold text-foreground mb-2">Pro</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-foreground">R$ 67</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Para automatizar completamente
              </p>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium text-muted-foreground mb-4">
                ✓ Tudo do Gratuito, mais:
              </p>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              Testar 14 Dias Grátis
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Sem cartão de crédito • Cancele quando quiser
            </p>
          </Card>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/20 rounded-full px-6 py-3">
              <span className="text-sm font-semibold text-foreground">
                🎁 Oferta de Lançamento:
              </span>
              <span className="text-sm text-foreground">
                50% OFF nos primeiros 3 meses <span className="font-bold">(R$ 33,50/mês)</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
