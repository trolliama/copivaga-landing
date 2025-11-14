import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const quizPage3Schema = z.object({
  expectations: z.array(z.string()).min(1, "Selecione pelo menos uma opção"),
  features: z.array(z.string()).min(1, "Selecione pelo menos uma opção").max(2, "Selecione no máximo 2 opções"),
  result: z.string().min(10, "Por favor, descreva o resultado esperado (mínimo 10 caracteres)"),
});

type QuizPage3FormData = z.infer<typeof quizPage3Schema>;

const QuizPage3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [trialSignupId, setTrialSignupId] = useState<string | null>(null);
  const [expectations, setExpectations] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expectationOptions = [
    "Economizar tempo na busca de vagas",
    "Aumentar o número de entrevistas",
    "Passar nos filtros ATS (robôs)",
    "Organizar minhas candidaturas",
    "Encontrar vagas mais compatíveis",
    "Automatizar aplicações repetitivas",
    "Melhorar meu perfil no LinkedIn",
    "Reduzir o estresse da busca",
  ];

  const featureOptions = [
    "Busca automática multi-plataforma",
    "Aplicação automática (piloto automático)",
    "Personalização de CV por vaga",
    "Análise e otimização de LinkedIn",
    "Análise e correção de ATS",
    "Tracking visual de candidaturas",
  ];

  useEffect(() => {
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

  const handleExpectationChange = (option: string, checked: boolean) => {
    if (checked) {
      setExpectations([...expectations, option]);
    } else {
      setExpectations(expectations.filter((e) => e !== option));
    }
  };

  const handleFeatureChange = (option: string, checked: boolean) => {
    if (checked) {
      if (features.length >= 2) {
        toast({
          title: "Limite atingido",
          description: "Você pode selecionar no máximo 2 funcionalidades.",
          variant: "destructive",
        });
        return;
      }
      setFeatures([...features, option]);
    } else {
      setFeatures(features.filter((f) => f !== option));
    }
  };

  const isFormValid = () => {
    return expectations.length > 0 && features.length > 0 && result.trim().length >= 10;
  };

  const handleContinue = async () => {
    if (!trialSignupId) return;
    
    try {
      quizPage3Schema.parse({
        expectations,
        features,
        result,
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
        { span: "O que você espera com o CopiVaga?", answer: expectations.join(", ") },
        { span: "Quais funcionalidades mais te interessam?", answer: features.join(", ") },
        { span: "Que resultado você espera alcançar?", answer: result },
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
        title: "Quiz completo!",
        description: "Suas respostas foram salvas com sucesso.",
      });

      // Navigate to completion page
      navigate("/quiz/complete", { state: { trialSignupId } });
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
          <Progress value={100} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Última etapa!</h1>
            <p className="text-muted-foreground text-lg">
              Queremos entender suas expectativas para personalizar sua experiência.
            </p>
          </div>

          <div className="space-y-12 bg-card p-8 rounded-lg shadow-lg border">
            {/* Question 1: Expectations (Multiple checkboxes) */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-foreground">
                O que você espera com o CopiVaga?*
              </Label>
              <p className="text-sm text-muted-foreground">(Selecione todas que se aplicam)</p>
              <div className="space-y-3">
                {expectationOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <Checkbox
                      id={`expectation-${option}`}
                      checked={expectations.includes(option)}
                      onCheckedChange={(checked) =>
                        handleExpectationChange(option, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`expectation-${option}`}
                      className="text-base font-normal cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Question 2: Features (Limited to 2) */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-foreground">
                Quais funcionalidades mais te interessam?*
              </Label>
              <p className="text-sm text-muted-foreground">(Escolha até 2)</p>
              <div className="space-y-3">
                {featureOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <Checkbox
                      id={`feature-${option}`}
                      checked={features.includes(option)}
                      onCheckedChange={(checked) =>
                        handleFeatureChange(option, checked as boolean)
                      }
                      disabled={features.length >= 2 && !features.includes(option)}
                    />
                    <Label
                      htmlFor={`feature-${option}`}
                      className={`text-base font-normal cursor-pointer ${
                        features.length >= 2 && !features.includes(option)
                          ? "text-muted-foreground"
                          : ""
                      }`}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Selecionadas: {features.length}/2
              </p>
            </div>

            {/* Question 3: Free text */}
            <div className="space-y-4">
              <Label htmlFor="result" className="text-lg font-semibold text-foreground">
                Que resultado você espera alcançar?*
              </Label>
              <Textarea
                id="result"
                placeholder='Exemplo: "Conseguir 3-5 entrevistas por mês em vagas de Product Manager remoto"'
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="min-h-[100px] text-base"
              />
              <p className="text-xs text-muted-foreground">
                {result.length < 10
                  ? `Mínimo 10 caracteres (${result.length}/10)`
                  : `${result.length} caracteres`}
              </p>
            </div>

            {/* Continue Button */}
            <div className="pt-6">
              <Button
                size="lg"
                onClick={handleContinue}
                disabled={!isFormValid() || isSubmitting}
                className="w-full text-lg py-6"
              >
                {isSubmitting ? "Salvando..." : "Finalizar"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage3;
