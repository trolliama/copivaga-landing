import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Sparkles } from "lucide-react";

// Schemas for validation
const step1Schema = z.object({
  situation: z.string().min(1, "Selecione uma opção"),
  area: z.string().min(1, "Selecione uma opção"),
  areaOther: z.string().optional(),
  experience: z.string().min(1, "Selecione uma opção"),
});

const step2Schema = z.object({
  frustration: z.string().min(1, "Selecione uma opção"),
  searchTime: z.string().min(1, "Selecione uma opção"),
  hoursPerWeek: z.string().min(1, "Selecione uma opção"),
  workModel: z.string().min(1, "Selecione uma opção"),
});

const step3Schema = z.object({
  expectations: z.array(z.string()).min(1, "Selecione pelo menos uma opção"),
  features: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma opção")
    .max(2, "Selecione no máximo 2 opções"),
  result: z
    .string()
    .min(10, "Por favor, descreva o resultado esperado (mínimo 10 caracteres)"),
});

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [trialSignupId, setTrialSignupId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 states
  const [situation, setSituation] = useState("");
  const [area, setArea] = useState("");
  const [areaOther, setAreaOther] = useState("");
  const [experience, setExperience] = useState("");

  // Step 2 states
  const [frustration, setFrustration] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("");
  const [workModel, setWorkModel] = useState("");

  // Step 3 states
  const [expectations, setExpectations] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [result, setResult] = useState("");

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
    const id =
      location.state?.trialSignupId || localStorage.getItem("trial_signup_id");

    if (!id) {
      toast({
        title: "Erro",
        description:
          "Sessão não encontrada. Por favor, faça o cadastro novamente.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setTrialSignupId(id);
  }, [location, navigate, toast]);

  const getProgressValue = () => {
    if (currentStep === 0) return 0;
    if (currentStep === 1) return 33.33;
    if (currentStep === 2) return 66.66;
    if (currentStep === 3) return 100;
    return 0;
  };

  const isStep1Valid = () => {
    if (!situation || !experience) return false;
    if (!area) return false;
    if (area === "Outra" && !areaOther.trim()) return false;
    return true;
  };

  const isStep2Valid = () => {
    return frustration && searchTime && hoursPerWeek && workModel;
  };

  const isStep3Valid = () => {
    return (
      expectations.length > 0 &&
      features.length > 0 &&
      result.trim().length >= 10
    );
  };

  const handleStep1Continue = async () => {
    if (!trialSignupId) return;

    try {
      step1Schema.parse({
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
        {
          span: "Qual sua área de atuação?",
          answer: area === "Outra" ? areaOther : area,
        },
        {
          span: "Quanto tempo de experiência na sua área?",
          answer: experience,
        },
      ];

      for (const response of responses) {
        const { error } = await supabase.from("quiz_responses").insert({
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

      setCurrentStep(2);
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

  const handleStep2Continue = async () => {
    if (!trialSignupId) return;

    try {
      step2Schema.parse({
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
        {
          span: "Há quanto tempo está procurando emprego?",
          answer: searchTime,
        },
        {
          span: "Quantas horas/semana você gasta procurando vagas atualmente?",
          answer: hoursPerWeek,
        },
        { span: "Qual modelo de trabalho você procura?", answer: workModel },
      ];

      for (const response of responses) {
        const { error } = await supabase.from("quiz_responses").insert({
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

      setCurrentStep(3);
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

  const handleStep3Continue = async () => {
    if (!trialSignupId) return;

    try {
      step3Schema.parse({
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
        {
          span: "O que você espera com o CopiVaga?",
          answer: expectations.join(", "),
        },
        {
          span: "Quais funcionalidades mais te interessam?",
          answer: features.join(", "),
        },
        { span: "Que resultado você espera alcançar?", answer: result },
      ];

      for (const response of responses) {
        const { error } = await supabase.from("quiz_responses").insert({
          trial_signup_id: trialSignupId,
          span: response.span,
          answer: response.answer,
        });

        if (error) throw error;
      }

      toast({
        title: "Quiz concluído!",
        description: "Obrigado por completar o questionário.",
      });

      navigate("/quiz/complete");
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

  // Step 0: Welcome Screen
  if (currentStep === 0) {
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
              Vamos personalizar sua experiência! Responda algumas perguntas
              rápidas para que possamos entender melhor suas necessidades e
              oferecer o melhor conteúdo para você.
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <Button
              size="lg"
              onClick={() => setCurrentStep(1)}
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
  }

  // Steps 1-3: Quiz Questions
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Progress value={getProgressValue()} className="h-2" />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-8 md:p-12 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-foreground">
                    Vamos nos conhecer melhor
                  </h2>
                  <p className="text-muted-foreground">
                    Conte-nos um pouco sobre você e sua experiência profissional
                  </p>
                </div>

                {/* Question 1 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Qual sua situação atual? *
                  </Label>
                  <RadioGroup value={situation} onValueChange={setSituation}>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        value="Empregado buscando mudança"
                        id="sit1"
                      />
                      <Label htmlFor="sit1" className="flex-1 cursor-pointer">
                        Empregado buscando mudança
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        value="Desempregado procurando ativamente"
                        id="sit2"
                      />
                      <Label htmlFor="sit2" className="flex-1 cursor-pointer">
                        Desempregado procurando ativamente
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        value="Freelancer/PJ buscando CLT"
                        id="sit3"
                      />
                      <Label htmlFor="sit3" className="flex-1 cursor-pointer">
                        Freelancer/PJ buscando CLT
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        value="Estudante buscando primeiro emprego"
                        id="sit4"
                      />
                      <Label htmlFor="sit4" className="flex-1 cursor-pointer">
                        Estudante buscando primeiro emprego
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 2 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Qual sua área de atuação? *
                  </Label>
                  <RadioGroup value={area} onValueChange={setArea}>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        value="Tech (Desenvolvimento, Produto, Design, Infra)"
                        id="area1"
                      />
                      <Label htmlFor="area1" className="flex-1 cursor-pointer">
                        Tech (Desenvolvimento, Produto, Design, Infra)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        value="Marketing, Vendas ou Customer Success"
                        id="area2"
                      />
                      <Label htmlFor="area2" className="flex-1 cursor-pointer">
                        Marketing, Vendas ou Customer Success
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        value="Gestão, RH ou Finanças"
                        id="area3"
                      />
                      <Label htmlFor="area3" className="flex-1 cursor-pointer">
                        Gestão, RH ou Finanças
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="Jurídico ou Contábil" id="area4" />
                      <Label htmlFor="area4" className="flex-1 cursor-pointer">
                        Jurídico ou Contábil
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="Outra" id="area5" />
                      <Label htmlFor="area5" className="flex-1 cursor-pointer">
                        Outra
                      </Label>
                    </div>
                  </RadioGroup>
                  {area === "Outra" && (
                    <Input
                      placeholder="Especifique sua área de atuação"
                      value={areaOther}
                      onChange={(e) => setAreaOther(e.target.value)}
                      className="mt-2"
                    />
                  )}
                </div>

                {/* Question 3 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Quanto tempo de experiência na sua área? *
                  </Label>
                  <RadioGroup value={experience} onValueChange={setExperience}>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="menos de 1 ano" id="exp1" />
                      <Label htmlFor="exp1" className="flex-1 cursor-pointer">
                        menos de 1 ano
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="1-3 anos" id="exp2" />
                      <Label htmlFor="exp2" className="flex-1 cursor-pointer">
                        1-3 anos
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="3-5 anos" id="exp3" />
                      <Label htmlFor="exp3" className="flex-1 cursor-pointer">
                        3-5 anos
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="5+ anos" id="exp4" />
                      <Label htmlFor="exp4" className="flex-1 cursor-pointer">
                        5+ anos
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  size="lg"
                  onClick={handleStep1Continue}
                  disabled={!isStep1Valid() || isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Salvando..." : "Continuar"}
                </Button>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-foreground">
                    Sua busca por emprego
                  </h2>
                  <p className="text-muted-foreground">
                    Queremos entender melhor seus desafios atuais
                  </p>
                </div>

                {/* Question 1 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Principal frustração na busca atual: *
                  </Label>
                  <RadioGroup
                    value={frustration}
                    onValueChange={setFrustration}
                  >
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        value="Gasto muito tempo procurando vagas"
                        id="frust1"
                      />
                      <Label htmlFor="frust1" className="flex-1 cursor-pointer">
                        Gasto muito tempo procurando vagas
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        value="Baixa taxa de resposta das empresas"
                        id="frust2"
                      />
                      <Label htmlFor="frust2" className="flex-1 cursor-pointer">
                        Baixa taxa de resposta das empresas
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        value="Não sei se meu currículo passa no ATS"
                        id="frust3"
                      />
                      <Label htmlFor="frust3" className="flex-1 cursor-pointer">
                        Não sei se meu currículo passa no ATS
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        value="Desorganização total das candidaturas"
                        id="frust4"
                      />
                      <Label htmlFor="frust4" className="flex-1 cursor-pointer">
                        Desorganização total das candidaturas
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem
                        value="Não encontro vagas compatíveis"
                        id="frust5"
                      />
                      <Label htmlFor="frust5" className="flex-1 cursor-pointer">
                        Não encontro vagas compatíveis
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 2 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Há quanto tempo está procurando emprego? *
                  </Label>
                  <RadioGroup value={searchTime} onValueChange={setSearchTime}>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="Menos de 1 mês" id="time1" />
                      <Label htmlFor="time1" className="flex-1 cursor-pointer">
                        Menos de 1 mês
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="1-3 meses" id="time2" />
                      <Label htmlFor="time2" className="flex-1 cursor-pointer">
                        1-3 meses
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="3-6 meses" id="time3" />
                      <Label htmlFor="time3" className="flex-1 cursor-pointer">
                        3-6 meses
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="Mais de 6 meses" id="time4" />
                      <Label htmlFor="time4" className="flex-1 cursor-pointer">
                        Mais de 6 meses
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 3 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Quantas horas/semana você gasta procurando vagas atualmente?
                    *
                  </Label>
                  <RadioGroup
                    value={hoursPerWeek}
                    onValueChange={setHoursPerWeek}
                  >
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="Menos de 5h" id="hours1" />
                      <Label htmlFor="hours1" className="flex-1 cursor-pointer">
                        Menos de 5h
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="5-10h" id="hours2" />
                      <Label htmlFor="hours2" className="flex-1 cursor-pointer">
                        5-10h
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="10-15h" id="hours3" />
                      <Label htmlFor="hours3" className="flex-1 cursor-pointer">
                        10-15h
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="Mais de 15h" id="hours4" />
                      <Label htmlFor="hours4" className="flex-1 cursor-pointer">
                        Mais de 15h
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 4 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Qual modelo de trabalho você procura?: *
                  </Label>
                  <RadioGroup value={workModel} onValueChange={setWorkModel}>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="100% Remoto" id="model1" />
                      <Label htmlFor="model1" className="flex-1 cursor-pointer">
                        100% Remoto
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="Híbrido" id="model2" />
                      <Label htmlFor="model2" className="flex-1 cursor-pointer">
                        Híbrido
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="Presencial" id="model3" />
                      <Label htmlFor="model3" className="flex-1 cursor-pointer">
                        Presencial
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="Qualquer um" id="model4" />
                      <Label htmlFor="model4" className="flex-1 cursor-pointer">
                        Qualquer um
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  size="lg"
                  onClick={handleStep2Continue}
                  disabled={!isStep2Valid() || isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Salvando..." : "Continuar"}
                </Button>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-foreground">
                    Quase lá!
                  </h2>
                  <p className="text-muted-foreground">
                    Por último, nos conte suas expectativas com o CopiVaga
                  </p>
                </div>

                {/* Question 1 - Checkboxes */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    O que você espera com o CopiVaga? * (Selecione todas que se
                    aplicam)
                  </Label>
                  <div className="space-y-3">
                    {expectationOptions.map((option) => (
                      <div
                        key={option}
                        className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        <Checkbox
                          id={`exp-${option}`}
                          checked={expectations.includes(option)}
                          onCheckedChange={(checked) =>
                            handleExpectationChange(option, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`exp-${option}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question 2 - Max 2 checkboxes */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Quais funcionalidades mais te interessam? * (Escolha até 2)
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {features.length}/2 selecionadas
                  </p>
                  <div className="space-y-3">
                    {featureOptions.map((option) => (
                      <div
                        key={option}
                        className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        <Checkbox
                          id={`feat-${option}`}
                          checked={features.includes(option)}
                          onCheckedChange={(checked) =>
                            handleFeatureChange(option, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`feat-${option}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question 3 - Textarea */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Que resultado você espera alcançar? *
                  </Label>
                  <Textarea
                    placeholder='Exemplo: "Conseguir 3-5 entrevistas por mês em vagas de Product Manager remoto"'
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    {result.length}/10 caracteres mínimos
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={handleStep3Continue}
                  disabled={!isStep3Valid() || isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Salvando..." : "Finalizar"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
