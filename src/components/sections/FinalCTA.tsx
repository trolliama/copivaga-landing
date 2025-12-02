import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getWhatsappUrl } from "@/lib/utils";
import { MessageCircle, Zap } from "lucide-react";
import { TrialSignupModal } from "@/components/TrialSignupModal";

export const FinalCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto Para Automatizar?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Configure em 5 minutos. Veja resultados na primeira semana.
          </p>

          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold shadow-xl mb-6"
            onClick={() => setIsModalOpen(true)}
          >
            <Zap className="mr-2 h-5 w-5" />
            Começar Teste Gratuito
          </Button>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/90">
            <div className="flex items-center gap-2">✓ 14 dias grátis</div>
            <div className="flex items-center gap-2">✓ Sem cartão</div>
            <div className="flex items-center gap-2">
              ✓ Cancele quando quiser
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-white/20">
            <p className="text-white/90 mb-6 font-medium">Ainda tem dúvidas?</p>
            <div className="flex justify-center">
              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Falar com Suporte
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <TrialSignupModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};
