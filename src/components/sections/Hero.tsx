import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Users, Zap } from "lucide-react";
import { BASE_URL } from "@/lib/constants";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center justify-center">
              <img
                src={`${BASE_URL}logo.svg`}
                alt="CopiVaga Logo"
                className="h-12 w-12"
              />
              CopiVaga
            </h2>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Automatize Sua Busca de Emprego.
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Recupere 10 Horas por Semana.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            IA que encontra vagas compatíveis, personaliza seu currículo e
            aplica automaticamente enquanto você foca no que realmente importa.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <a href="#planos">
                <Zap className="mr-2 h-5 w-5" />
                Começar Gratuitamente
              </a>
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Sem cartão de crédito • Setup em 5 minutos
            </p>
          </div>

          {/* Trust Bar */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 pt-8 border-t border-border">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-foreground">
                2.000+ profissionais
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-foreground">
                +15.000 aplicações automatizadas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-foreground">
                Média de 3x mais entrevistas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
