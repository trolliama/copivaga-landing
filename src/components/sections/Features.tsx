import { Search, Sparkles, LineChart, Bot, Rocket, Kanban } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Search,
    title: "Busca Multi-Plataforma",
    description: "IA varre LinkedIn, Gupy, Catho e Indeed automaticamente. Matching score identifica as melhores oportunidades."
  },
  {
    icon: Sparkles,
    title: "Personalização Inteligente",
    description: "Cada aplicação usa uma versão otimizada do seu currículo com keywords e estrutura adaptadas à vaga."
  },
  {
    icon: LineChart,
    title: "Análise de LinkedIn",
    description: "Score de 0-100 + sugestões priorizadas para otimizar seu perfil e aumentar visibilidade."
  },
  {
    icon: Bot,
    title: "Otimização ATS",
    description: "Identifica problemas que impedem seu CV de passar em sistemas automatizados e gera versão corrigida."
  },
  {
    icon: Rocket,
    title: "Aplicação Automática",
    description: "Configura uma vez e a IA aplica em até 10 vagas qualificadas por dia, sem sua intervenção."
  },
  {
    icon: Kanban,
    title: "Tracking Centralizado",
    description: "Dashboard visual tipo Kanban organiza todas as candidaturas, entrevistas e feedbacks em um só lugar."
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Tudo em Uma Plataforma
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-16">
            Funcionalidades completas para automatizar sua busca de emprego
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-border">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
