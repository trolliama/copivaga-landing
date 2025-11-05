import { BarChart, FileText, Bot, ListTodo } from "lucide-react";
import { Card } from "@/components/ui/card";

const problems = [
  {
    icon: BarChart,
    title: "Procurar Vagas",
    description: "Vasculhar múltiplas plataformas diariamente"
  },
  {
    icon: FileText,
    title: "Adaptar Currículos",
    description: "30-45 min personalizando para cada vaga"
  },
  {
    icon: Bot,
    title: "Enfrentar o ATS",
    description: "75% dos CVs rejeitados antes de chegar ao RH"
  },
  {
    icon: ListTodo,
    title: "Organizar Candidaturas",
    description: "Perder controle do status de cada processo"
  }
];

export const Problem = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            A Busca de Emprego Não Deveria Consumir Seu Tempo
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            A maioria dos profissionais gasta 10-15 horas por semana em tarefas repetitivas:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {problems.map((problem, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <problem.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto">
            O resultado? Menos tempo para se preparar para entrevistas, desenvolver skills 
            e cuidar da sua carreira de verdade.
          </p>
        </div>
      </div>
    </section>
  );
};
