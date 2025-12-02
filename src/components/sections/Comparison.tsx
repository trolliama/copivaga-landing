import { Check, X, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

const comparisonData = [
  {
    feature: "Tempo semanal necessário",
    ours: "10 min",
    manual: "10-15h",
    linkedin: "8-12h",
    coach: "5-8h",
  },
  {
    feature: "Busca multi-plataforma",
    ours: "check",
    manual: "x",
    linkedin: "warning",
    coach: "x",
  },
  {
    feature: "Personalização de CV",
    ours: "check",
    manual: "x",
    linkedin: "x",
    coach: "warning",
  },
  {
    feature: "Otimização ATS",
    ours: "check",
    manual: "x",
    linkedin: "x",
    coach: "warning",
  },
  {
    feature: "Aplicação automática",
    ours: "check",
    manual: "x",
    linkedin: "x",
    coach: "x",
  },
  {
    feature: "Tracking centralizado",
    ours: "check",
    manual: "warning",
    linkedin: "warning",
    coach: "x",
  },
  {
    feature: "Investimento",
    ours: "R$ 29,00/mês",
    manual: "15h da sua semana",
    linkedin: "R$ 99/mês",
    coach: "R$ 500-2.000",
  },
];

const getIcon = (value: string) => {
  if (value === "check")
    return <Check className="h-5 w-5 text-success mx-auto" />;
  if (value === "x")
    return <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />;
  if (value === "warning")
    return <AlertTriangle className="h-5 w-5 text-warning mx-auto" />;
  return <span className="text-sm text-center block">{value}</span>;
};

export const Comparison = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Compare as Opções
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            Veja como nos comparamos com alternativas tradicionais
          </p>

          <Card className="overflow-hidden border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="py-4 px-6 text-left text-sm font-semibold text-foreground">
                      Funcionalidade
                    </th>
                    <th className="py-4 px-6 text-center text-sm font-semibold bg-primary text-primary-foreground">
                      Nosso Produto
                    </th>
                    <th className="py-4 px-6 text-center text-sm font-semibold text-foreground">
                      Busca Manual
                    </th>
                    <th className="py-4 px-6 text-center text-sm font-semibold text-foreground">
                      LinkedIn Premium
                    </th>
                    <th className="py-4 px-6 text-center text-sm font-semibold text-foreground">
                      Coach de Carreira
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-4 px-6 text-sm font-medium text-foreground">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 bg-primary/5">
                        {getIcon(row.ours)}
                      </td>
                      <td className="py-4 px-6">{getIcon(row.manual)}</td>
                      <td className="py-4 px-6">{getIcon(row.linkedin)}</td>
                      <td className="py-4 px-6">{getIcon(row.coach)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
