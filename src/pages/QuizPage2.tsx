import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const quizPage2Schema = z.object({
  frustration: z.string().min(1, "Selecione uma opção"),
  searchTime: z.string().min(1, "Selecione uma opção"),
  hoursPerWeek: z.string().min(1, "Selecione uma opção"),
  workModel: z.string().min(1, "Selecione uma opção"),
});

type QuizPage2FormData = z.infer<typeof quizPage2Schema>;

const QuizPage2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [trialSignupId, setTrialSignupId] = useState<string | null>(null);
  const [frustration, setFrustration] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("");
  const [workModel, setWorkModel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get trial_signup_id from location state or localStorage
    const id = location.state?.trialSignupId || localStorage.getItem("trial_signup_id");
    
    if (!id) {
      toast({
        title: "Erro",
        description: "Sessão não encontrada. Por favor, faça o cadastro novamente.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    setTrialSignupId(id);
  }, [location, navigate, toast]);

  const isFormValid = () => {
    return frustration && searchTime && hoursPerWeek && workModel;
  };

  const handleContinue = async () => {
    if (!trialSignupId) return;
    
    try {
      quizPage2Schema.parse({
        frustration,
        searchTime,
        hoursPerWeek,
        workModel,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro de validação",
          description: error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const responses = [
        { span: "Principal frustração na busca atual", answer: frustration },
        { span: "Há quanto tempo está procurando emprego?", answer: searchTime },
        { span: "Quantas horas/semana você gasta procurando vagas atualmente?", answer: hoursPerWeek },
        { span: "Qual modelo de trabalho você procura?", answer: workModel },
      ];

      for (const response of responses) {
        const { error } = await supabase
          .from("quiz_responses")
          .insert({
            trial_signup_id: trialSignupId,
            span: response.span,
            answer: response.answer,
          });

        if (error) throw error;
      }

      toast({
        title: "Respostas salvas!",
        description: "Vamos para a última etapa.",
      });

      // Navigate to next page (to be created)
      navigate("/quiz/page3", { state: { trialSignupId } });
    } catch (error) {
      console.error("Error saving quiz responses:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas respostas. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progresso do Quiz</span>
              <span>Página 2 de 3</span>
            </div>
            <Progress value={66.66} className="h-2" />
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Entenda seus desafios
            </h1>
            <p className="text-muted-foreground">
              Queremos saber mais sobre suas dificuldades atuais
            </p>
          </div>

          {/* Question 1 */}
          <div className="space-y-4 p-6 rounded-lg border bg-card">
            <Label className="text-lg font-semibold">
              Principal frustração na busca atual:
            </Label>
            <RadioGroup value={frustration} onValueChange={setFrustration}>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Gasto muito tempo procurando vagas" id="frustration-1" />
                <Label htmlFor="frustration-1" className="flex-1 cursor-pointer">
                  Gasto muito tempo procurando vagas
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Baixa taxa de resposta das empresas" id="frustration-2" />
                <Label htmlFor="frustration-2" className="flex-1 cursor-pointer">
                  Baixa taxa de resposta das empresas
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Não sei se meu currículo passa no ATS" id="frustration-3" />
                <Label htmlFor="frustration-3" className="flex-1 cursor-pointer">
                  Não sei se meu currículo passa no ATS
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Desorganização total das candidaturas" id="frustration-4" />
                <Label htmlFor="frustration-4" className="flex-1 cursor-pointer">
                  Desorganização total das candidaturas
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Não encontro vagas compatíveis" id="frustration-5" />
                <Label htmlFor="frustration-5" className="flex-1 cursor-pointer">
                  Não encontro vagas compatíveis
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Question 2 */}
          <div className="space-y-4 p-6 rounded-lg border bg-card">
            <Label className="text-lg font-semibold">
              Há quanto tempo está procurando emprego?
            </Label>
            <RadioGroup value={searchTime} onValueChange={setSearchTime}>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Menos de 1 mês" id="time-1" />
                <Label htmlFor="time-1" className="flex-1 cursor-pointer">
                  Menos de 1 mês
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="1-3 meses" id="time-2" />
                <Label htmlFor="time-2" className="flex-1 cursor-pointer">
                  1-3 meses
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="3-6 meses" id="time-3" />
                <Label htmlFor="time-3" className="flex-1 cursor-pointer">
                  3-6 meses
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Mais de 6 meses" id="time-4" />
                <Label htmlFor="time-4" className="flex-1 cursor-pointer">
                  Mais de 6 meses
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Question 3 */}
          <div className="space-y-4 p-6 rounded-lg border bg-card">
            <Label className="text-lg font-semibold">
              Quantas horas/semana você gasta procurando vagas atualmente?
            </Label>
            <RadioGroup value={hoursPerWeek} onValueChange={setHoursPerWeek}>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Menos de 5h" id="hours-1" />
                <Label htmlFor="hours-1" className="flex-1 cursor-pointer">
                  Menos de 5h
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="5-10h" id="hours-2" />
                <Label htmlFor="hours-2" className="flex-1 cursor-pointer">
                  5-10h
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="10-15h" id="hours-3" />
                <Label htmlFor="hours-3" className="flex-1 cursor-pointer">
                  10-15h
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Mais de 15h" id="hours-4" />
                <Label htmlFor="hours-4" className="flex-1 cursor-pointer">
                  Mais de 15h
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Question 4 */}
          <div className="space-y-4 p-6 rounded-lg border bg-card">
            <Label className="text-lg font-semibold">
              Qual modelo de trabalho você procura?
            </Label>
            <RadioGroup value={workModel} onValueChange={setWorkModel}>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="100% Remoto" id="model-1" />
                <Label htmlFor="model-1" className="flex-1 cursor-pointer">
                  100% Remoto
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Híbrido" id="model-2" />
                <Label htmlFor="model-2" className="flex-1 cursor-pointer">
                  Híbrido
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Presencial" id="model-3" />
                <Label htmlFor="model-3" className="flex-1 cursor-pointer">
                  Presencial
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Qualquer um" id="model-4" />
                <Label htmlFor="model-4" className="flex-1 cursor-pointer">
                  Qualquer um
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center pt-8">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!isFormValid() || isSubmitting}
              className="px-12"
            >
              {isSubmitting ? "Salvando..." : "Continuar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage2;
