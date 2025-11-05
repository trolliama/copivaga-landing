import { Clock, TrendingUp, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: Clock,
    stat: "10-15h/semana",
    label: "Tempo médio recuperado pelos usuários"
  },
  {
    icon: TrendingUp,
    stat: "3x mais respostas",
    label: "Comparado com aplicação manual tradicional"
  },
  {
    icon: Zap,
    stat: "-40% tempo até emprego",
    label: "Usuários reduzem de 6 para 3,5 meses em média"
  }
];

export const Benefits = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            O Impacto nos Números
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-16">
            Resultados reais de profissionais que automatizaram sua busca
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-shadow border-border bg-card">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {benefit.stat}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.label}
                </p>
              </Card>
            ))}
          </div>

          <blockquote className="text-center max-w-3xl mx-auto">
            <p className="text-xl italic text-foreground font-medium">
              "A diferença está na consistência. A IA aplica todos os dias, com qualidade, sem falhar."
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};
