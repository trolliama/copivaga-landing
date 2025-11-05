import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o piloto automático?",
    answer: "Você define critérios (cargo, salário, modelo de trabalho) e a IA busca vagas compatíveis. Quando encontra match ≥75%, personaliza seu CV e aplica automaticamente. Você recebe notificação diária com resumo."
  },
  {
    question: "Preciso aprovar cada aplicação?",
    answer: "Não. O piloto automático funciona de forma independente dentro dos critérios definidos. Mas você pode optar pelo modo manual se preferir revisar cada vaga antes."
  },
  {
    question: "Funciona com quais plataformas?",
    answer: "LinkedIn, Gupy, Catho e Indeed — onde estão concentradas 95% das vagas formais do Brasil."
  },
  {
    question: "Meus dados ficam seguros?",
    answer: "Sim. Criptografia ponta-a-ponta, servidores em conformidade com LGPD. Seus dados nunca são compartilhados com terceiros."
  },
  {
    question: "Quanto tempo leva para configurar?",
    answer: "5 minutos. Upload de CV + 3 perguntas básicas. A IA extrai e organiza tudo automaticamente."
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim. Sem multa, sem burocracia. Cancela em 2 cliques pela plataforma."
  }
];

export const FAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            Tudo o que você precisa saber
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <button className="text-primary hover:underline font-medium">
              + Ver todas as perguntas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
