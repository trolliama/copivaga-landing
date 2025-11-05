import { Clock, Settings, Play, BarChart3, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "1",
    icon: Settings,
    title: "Configure Uma Vez",
    description: "Faça upload do seu currículo. Nossa IA extrai automaticamente experiências, formação e habilidades.",
    time: "3 minutos"
  },
  {
    number: "2",
    icon: Sliders,
    title: "Defina Preferências",
    description: "Cargo desejado, faixa salarial e modelo de trabalho.",
    time: "2 minutos"
  },
  {
    number: "3",
    icon: Play,
    title: "Ative o Piloto Automático",
    description: "A IA assume a busca e aplicação em múltiplas plataformas.",
    time: "1 clique"
  },
  {
    number: "4",
    icon: BarChart3,
    title: "Acompanhe Resultados",
    description: "Dashboard centralizado com todas as candidaturas e status.",
    time: "5-10 min/semana"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            Como Funciona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                )}
                
                <div className="relative bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-border">
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>

                  <div className="mb-4 pt-2">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>

                  <h3 className="font-bold text-lg text-foreground mb-3">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4">
                    {step.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium text-secondary">
                    <Clock className="h-4 w-4" />
                    {step.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Ver Demo Interativa
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
