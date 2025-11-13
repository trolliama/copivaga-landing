import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const quizSchema = z.object({
  situation: z.string().min(1, "Selecione uma opção"),
  area: z.string().min(1, "Selecione uma opção"),
  areaOther: z.string().optional(),
  experience: z.string().min(1, "Selecione uma opção"),
});

type QuizFormData = z.infer<typeof quizSchema>;

const QuizQuestions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [trialSignupId, setTrialSignupId] = useState<string | null>(null);
  const [situation, setSituation] = useState("");
  const [area, setArea] = useState("");
  const [areaOther, setAreaOther] = useState("");
  const [experience, setExperience] = useState("");
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
    if (!situation || !experience) return false;
    if (!area) return false;
    if (area === "Outra" && !areaOther.trim()) return false;
    return true;
  };

  const handleContinue = async () => {
    if (!trialSignupId) return;
    
    try {
      quizSchema.parse({
        situation,
        area: area === "Outra" ? areaOther : area,
        experience,
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
        { span: "Qual sua situação atual?", answer: situation },
        { span: "Qual sua área de atuação?", answer: area === "Outra" ? areaOther : area },
        { span: "Quanto tempo de experiência na sua área?", answer: experience },
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
        description: "Vamos para a próxima etapa.",
      });

      // Navigate to next page (to be created)
      navigate("/quiz/page2", { state: { trialSignupId } });
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
              <span>Página 1 de 3</span>
            </div>
            <Progress value={33.33} className="h-2" />
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Conte mais sobre você
            </h1>
            <p className="text-muted-foreground">
              Responda as perguntas abaixo para personalizarmos sua experiência
            </p>
          </div>

          {/* Question 1 */}
          <div className="space-y-4 p-6 rounded-lg border bg-card">
            <Label className="text-lg font-semibold">
              Qual sua situação atual?
            </Label>
            <RadioGroup value={situation} onValueChange={setSituation}>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Empregado buscando mudança" id="situation-1" />
                <Label htmlFor="situation-1" className="flex-1 cursor-pointer">
                  Empregado buscando mudança
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Desempregado procurando ativamente" id="situation-2" />
                <Label htmlFor="situation-2" className="flex-1 cursor-pointer">
                  Desempregado procurando ativamente
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Freelancer/PJ buscando CLT" id="situation-3" />
                <Label htmlFor="situation-3" className="flex-1 cursor-pointer">
                  Freelancer/PJ buscando CLT
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Estudante buscando primeiro emprego" id="situation-4" />
                <Label htmlFor="situation-4" className="flex-1 cursor-pointer">
                  Estudante buscando primeiro emprego
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Question 2 */}
          <div className="space-y-4 p-6 rounded-lg border bg-card">
            <Label className="text-lg font-semibold">
              Qual sua área de atuação?
            </Label>
            <RadioGroup value={area} onValueChange={setArea}>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Tech (Desenvolvimento, Produto, Design, Infra)" id="area-1" />
                <Label htmlFor="area-1" className="flex-1 cursor-pointer">
                  Tech (Desenvolvimento, Produto, Design, Infra)
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Marketing, Vendas ou Customer Success" id="area-2" />
                <Label htmlFor="area-2" className="flex-1 cursor-pointer">
                  Marketing, Vendas ou Customer Success
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Gestão, RH ou Finanças" id="area-3" />
                <Label htmlFor="area-3" className="flex-1 cursor-pointer">
                  Gestão, RH ou Finanças
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Jurídico ou Contábil" id="area-4" />
                <Label htmlFor="area-4" className="flex-1 cursor-pointer">
                  Jurídico ou Contábil
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="Outra" id="area-5" />
                <Label htmlFor="area-5" className="flex-1 cursor-pointer">
                  Outra
                </Label>
              </div>
            </RadioGroup>
            
            {area === "Outra" && (
              <div className="mt-4">
                <Input
                  placeholder="Digite sua área de atuação"
                  value={areaOther}
                  onChange={(e) => setAreaOther(e.target.value)}
                  maxLength={100}
                />
              </div>
            )}
          </div>

          {/* Question 3 */}
          <div className="space-y-4 p-6 rounded-lg border bg-card">
            <Label className="text-lg font-semibold">
              Quanto tempo de experiência na sua área?
            </Label>
            <RadioGroup value={experience} onValueChange={setExperience}>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="menos de 1 ano" id="experience-1" />
                <Label htmlFor="experience-1" className="flex-1 cursor-pointer">
                  menos de 1 ano
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="1-3 anos" id="experience-2" />
                <Label htmlFor="experience-2" className="flex-1 cursor-pointer">
                  1-3 anos
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="3-5 anos" id="experience-3" />
                <Label htmlFor="experience-3" className="flex-1 cursor-pointer">
                  3-5 anos
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors">
                <RadioGroupItem value="5+ anos" id="experience-4" />
                <Label htmlFor="experience-4" className="flex-1 cursor-pointer">
                  5+ anos
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

export default QuizQuestions;
