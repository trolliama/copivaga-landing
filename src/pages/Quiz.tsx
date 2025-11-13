import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Quiz = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Bem-vindo ao Quiz de Onboarding
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Vamos personalizar sua experiência! Responda algumas perguntas rápidas para 
            que possamos entender melhor suas necessidades e oferecer o melhor conteúdo para você.
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <Button 
            size="lg" 
            onClick={() => navigate("/quiz/questions")}
            className="text-lg px-8 py-6 h-auto"
          >
            Vamos lá
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Leva apenas 2 minutos • 3 perguntas simples
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
