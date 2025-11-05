import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rafael M.",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    quote: "Em 2 semanas consegui 12 entrevistas. O piloto automático funciona enquanto eu foco em me preparar.",
    result: "De 3 meses buscando → emprego em 6 semanas"
  },
  {
    name: "Juliana S.",
    role: "UX Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    quote: "Meu LinkedIn Score subiu de 58 para 89. Comecei a receber mensagens de recrutadores organicamente.",
    result: "5 propostas recebidas no último mês"
  },
  {
    name: "Carlos H.",
    role: "Desenvolvedor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    quote: "Descobri que meu CV tinha problemas de formatação que eu nem sabia. Taxa de resposta triplicou.",
    result: "Taxa de resposta: 4% → 18%"
  }
];

const companies = ["Nubank", "iFood", "Mercado Livre", "Stone", "QuintoAndar"];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Profissionais Que Já Automatizaram
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-16">
            Histórias reais de transformação de carreira
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-border">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>

                <p className="text-foreground mb-4 italic">
                  "{testimonial.quote}"
                </p>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-success">
                    {testimonial.result}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Profissionais contratados por:</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {companies.map((company, index) => (
                <span key={index} className="text-lg font-semibold text-muted-foreground/60">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
