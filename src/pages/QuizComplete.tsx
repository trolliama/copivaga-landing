import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Gift, MessageSquare, Rocket } from "lucide-react";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const whatsappSchema = z.object({
  whatsapp: z
    .string()
    .min(1, "WhatsApp é obrigatório")
    .regex(
      /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/,
      "Formato inválido. Use (XX) XXXXX-XXXX"
    ),
});

const suggestionSchema = z.object({
  suggestion: z.string().optional(),
});

const QuizComplete = () => {
  const { toast } = useToast();
  const [isSubmittingWhatsapp, setIsSubmittingWhatsapp] = useState(false);
  const [isSubmittingSuggestion, setIsSubmittingSuggestion] = useState(false);
  const [whatsappSubmitted, setWhatsappSubmitted] = useState(false);
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  const whatsappForm = useForm<z.infer<typeof whatsappSchema>>({
    resolver: zodResolver(whatsappSchema),
    defaultValues: {
      whatsapp: "",
    },
  });

  // Load and pre-fill phone number from localStorage on component mount
  useEffect(() => {
    const lastWhatsapp = localStorage.getItem("last_whatsapp_number");
    if (lastWhatsapp) {
      whatsappForm.setValue("whatsapp", lastWhatsapp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const suggestionForm = useForm<z.infer<typeof suggestionSchema>>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      suggestion: "",
    },
  });

  const formatWhatsapp = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 6)
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    if (cleaned.length <= 10)
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
        6
      )}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7,
      11
    )}`;
  };

  const onSubmitWhatsapp = async (values: z.infer<typeof whatsappSchema>) => {
    setIsSubmittingWhatsapp(true);
    try {
      const trialSignupId = localStorage.getItem("trial_signup_id");

      if (!trialSignupId) {
        toast({
          title: "Erro",
          description: "Não foi possível identificar seu cadastro.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("quiz_responses").insert({
        trial_signup_id: trialSignupId,
        span: "bonus_send",
        answer: values.whatsapp,
      });

      if (error) throw error;

      setWhatsappSubmitted(true);
      toast({
        title: "Sucesso! 🎉",
        description: "Você receberá o ebook no seu WhatsApp em até 24h!",
      });
    } catch (error) {
      console.error("Error saving WhatsApp:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingWhatsapp(false);
    }
  };

  const onSubmitSuggestion = async (
    values: z.infer<typeof suggestionSchema>
  ) => {
    if (!values.suggestion || values.suggestion.trim() === "") {
      toast({
        title: "Campo vazio",
        description: "Por favor, escreva uma sugestão antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingSuggestion(true);
    try {
      const trialSignupId = localStorage.getItem("trial_signup_id");

      if (!trialSignupId) {
        toast({
          title: "Erro",
          description: "Não foi possível identificar seu cadastro.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("quiz_responses").insert({
        trial_signup_id: trialSignupId,
        span: "suggestions",
        answer: values.suggestion,
      });

      if (error) throw error;

      setSuggestionSubmitted(true);
      toast({
        title: "Obrigado! 💭",
        description: "Sua sugestão foi registrada com sucesso!",
      });
      suggestionForm.reset();
    } catch (error) {
      console.error("Error saving suggestion:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingSuggestion(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1E40AF]">CopiVaga</h1>
        </div>

        {/* Header com Check */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="w-16 h-16 text-[#10B981]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827]">
            Obrigado por Se Cadastrar!
          </h2>
          <p className="text-lg text-[#6B7280]">
            Você está na lista de primeiros usuários do CopiVaga!
          </p>
        </div>

        <div className="h-px bg-[#E5E7EB]" />

        {/* Estamos Construindo */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-[#1E40AF]" />
            <h3 className="text-2xl font-bold text-[#111827]">
              ESTAMOS CONSTRUINDO SUA SOLUÇÃO
            </h3>
          </div>
          <p className="text-[#6B7280] leading-relaxed">
            A plataforma que vai automatizar sua busca de emprego está sendo
            desenvolvida neste momento.
          </p>
          <p className="text-[#6B7280] leading-relaxed">
            Você será um dos primeiros a testar quando lançarmos.
          </p>
          <p className="text-[#6B7280] leading-relaxed font-medium">
            Fique tranquilo: vamos te avisar por email e WhatsApp sobre cada
            novidade!
          </p>
        </div>

        <div className="h-px bg-[#E5E7EB]" />

        {/* Presente - Ebook */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Gift className="w-6 h-6 text-[#059669]" />
            <h3 className="text-2xl font-bold text-[#111827]">
              SEU PRESENTE DE BOAS-VINDAS
            </h3>
          </div>
          <p className="text-[#6B7280]">
            Como agradecimento por acreditar no projeto desde o início,
            preparamos um conteúdo exclusivo para você:
          </p>

          {/* Card do Ebook */}
          <div className="bg-white border-2 border-[#059669] rounded-lg p-6 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-4xl">📘</span>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-[#1E40AF]">
                  EBOOK EXCLUSIVO
                </h4>
                <p className="text-[#111827] font-semibold">
                  "Currículo Campeão: Estratégias Para Passar no ATS e
                  Conquistar Entrevistas"
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-[#6B7280] ml-14">
              <li className="flex items-center gap-2">
                <span className="text-[#10B981]">✓</span>
                Como otimizar seu CV para robôs (ATS)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#10B981]">✓</span>
                Palavras-chave que recrutadores buscam
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#10B981]">✓</span>
                Erros fatais que matam 80% dos CVs
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#10B981]">✓</span>
                +3 bônus especiais para turbinar sua carreira
              </li>
            </ul>
          </div>

          {/* Form WhatsApp */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-4">
            <p className="text-center text-[#111827] font-medium">
              Informe seu WhatsApp e receba em até 24h:
            </p>

            <Form {...whatsappForm}>
              <form
                onSubmit={whatsappForm.handleSubmit(onSubmitWhatsapp)}
                className="space-y-4"
              >
                <FormField
                  control={whatsappForm.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="(XX) XXXXX-XXXX"
                          {...field}
                          onChange={(e) => {
                            const formatted = formatWhatsapp(e.target.value);
                            field.onChange(formatted);
                          }}
                          disabled={whatsappSubmitted}
                          className="text-center text-lg border-[#E5E7EB] focus:border-[#3B82F6]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmittingWhatsapp || whatsappSubmitted}
                  className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white py-6 text-lg font-semibold rounded-lg"
                >
                  {whatsappSubmitted
                    ? "✅ Ebook Solicitado!"
                    : "📱 QUERO RECEBER O EBOOK"}
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-[#6B7280]">
              *Enviaremos o PDF diretamente no seu WhatsApp
            </p>
          </div>
        </div>

        <div className="h-px bg-[#E5E7EB]" />

        {/* Sugestões */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#1E40AF]" />
            <h3 className="text-2xl font-bold text-[#111827]">
              SUA OPINIÃO É IMPORTANTE
            </h3>
          </div>
          <p className="text-[#6B7280]">
            Ajude a construir o CopiVaga ideal para você.
          </p>
          <p className="text-[#6B7280]">
            Tem alguma dúvida sobre o projeto? Ou uma sugestão de
            funcionalidade?
          </p>

          <Form {...suggestionForm}>
            <form
              onSubmit={suggestionForm.handleSubmit(onSubmitSuggestion)}
              className="space-y-4"
            >
              <FormField
                control={suggestionForm.control}
                name="suggestion"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder='Ex: "Gostaria de integração com LinkedIn desde o início"'
                        className="min-h-[120px] border-[#E5E7EB] focus:border-[#3B82F6] resize-none"
                        {...field}
                        disabled={suggestionSubmitted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center space-y-2">
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isSubmittingSuggestion || suggestionSubmitted}
                  className="border-2 border-[#1E40AF] text-[#1E40AF] hover:bg-[#3B82F6] hover:text-white font-semibold py-6 px-8"
                >
                  {suggestionSubmitted
                    ? "✅ Sugestão Enviada!"
                    : "📝 ENVIAR SUGESTÃO"}
                </Button>
                <p className="text-sm text-[#6B7280]">(Opcional)</p>
              </div>
            </form>
          </Form>
        </div>

        <div className="h-px bg-[#E5E7EB]" />

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-[#6B7280]">Tem alguma dúvida urgente?</p>
          <p className="text-[#1E40AF] font-medium">
            Manda um email:{" "}
            <a
              href={`mailto:${
                import.meta.env.VITE_EMAIL_SUPPORT || "oi@copivaga.com.br"
              }`}
              className="underline hover:text-[#1E3A8A]"
            >
              {import.meta.env.VITE_EMAIL_SUPPORT || "oi@copivaga.com.br"}
            </a>
          </p>
          <p className="text-[#111827] font-semibold text-lg pt-4">
            Até breve! 🚀
          </p>
          <p className="text-[#6B7280]">Equipe CopiVaga</p>
        </div>
      </div>
      <WhatsAppFloatButton />
    </div>
  );
};

export default QuizComplete;
