import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Star, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const features = [
  "Vagas ilimitadas",
  "Aplicações ilimitadas",
  "Piloto Automático",
  "Personalização de CV por vaga",
  "Tracking completo",
  "Suporte prioritário"
];

const trialSchema = z.object({
  fullName: z.string()
    .trim()
    .min(3, { message: "Nome muito curto" })
    .max(100, { message: "Nome muito longo" })
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, { message: "Nome deve conter apenas letras" })
    .refine((val) => val.split(' ').filter(n => n.length > 0).length >= 2, {
      message: "Digite nome e sobrenome completos"
    }),
  email: z.string()
    .trim()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Digite um email válido" })
    .max(255, { message: "Email muito longo" })
    .toLowerCase(),
  whatsapp: z.string()
    .trim()
    .min(1, { message: "WhatsApp é obrigatório" })
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length >= 10 && val.length <= 11, {
      message: "Número inválido. Use DDD + 8 ou 9 dígitos"
    })
    .refine((val) => {
      if (val.length === 11) {
        return val[2] === '9';
      }
      return true;
    }, {
      message: "Celular deve começar com 9"
    }),
  dateOfBirth: z.date({
    required_error: "Data de nascimento é obrigatória",
    invalid_type_error: "Data inválida"
  })
    .refine((date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= 16 && age <= 100;
    }, {
      message: "Você deve ter entre 16 e 100 anos"
    })
});

type TrialFormData = z.infer<typeof trialSchema>;

export const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, control } = useForm<TrialFormData>({
    resolver: zodResolver(trialSchema)
  });

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 2) {
      return numbers;
    }
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneValue(formatted);
    setValue('whatsapp', e.target.value.replace(/\D/g, ''), { shouldValidate: true });
  };

  const onSubmit = async (data: TrialFormData) => {
    try {
      const { data: responseData, error } = await supabase.functions.invoke('submit-trial-signup', {
        body: {
          fullName: data.fullName,
          email: data.email,
          whatsapp: data.whatsapp,
          dateOfBirth: format(data.dateOfBirth, 'yyyy-MM-dd')
        }
      });

      if (error) throw error;

      // Store trial_signup_id for quiz
      if (responseData?.data?.id) {
        localStorage.setItem("trial_signup_id", responseData.data.id);
      }
      
      toast({
        title: "Cadastro realizado!",
        description: "Agora vamos conhecer melhor você.",
      });
      
      setIsModalOpen(false);
      reset();
      setPhoneValue("");

      // Navigate to quiz
      window.location.href = "/quiz";
    } catch (error) {
      console.error("Error submitting trial signup:", error);
      toast({
        title: "Erro ao cadastrar",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Planos
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            Transparente e sem surpresas
          </p>

          <Card className="max-w-md mx-auto p-8 border-2 border-primary shadow-xl relative overflow-hidden">
            {/* Badge */}
            <div className="absolute top-0 right-0 bg-gradient-success text-white px-4 py-1 text-sm font-semibold flex items-center gap-1">
              <Star className="h-4 w-4" />
              Pro
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Pro Trimestral</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-muted-foreground line-through">R$ 167</span>
                <span className="text-5xl font-bold text-foreground">R$ 83,50</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">/a cada 3 meses</p>
              <p className="text-sm font-medium text-foreground mt-1">ou 3x de R$ 27,83 sem juros</p>
              <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/20 rounded-full px-4 py-2 mt-3">
                <span className="text-xs font-semibold text-foreground">
                  🎁 50% OFF Vitalício - Oferta válida até 31/12
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Para automatizar completamente
              </p>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium text-muted-foreground mb-4">
                ✓ Tudo do Gratuito, mais:
              </p>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
              onClick={() => setIsModalOpen(true)}
            >
              Testar 14 Dias Grátis
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Sem cartão de crédito • Cancele quando quiser
            </p>
          </Card>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Comece seu teste grátis</DialogTitle>
            <DialogDescription>
              14 dias de acesso completo, sem cartão de crédito
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome e Sobrenome</Label>
              <Input
                id="fullName"
                placeholder="João Silva"
                {...register("fullName")}
                className={errors.fullName ? "border-destructive" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="joao@exemplo.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">Número do WhatsApp</Label>
              <Input
                id="whatsapp"
                placeholder="(11) 98765-4321"
                value={phoneValue}
                onChange={handlePhoneChange}
                maxLength={15}
                className={errors.whatsapp ? "border-destructive" : ""}
              />
              {errors.whatsapp && (
                <p className="text-sm text-destructive">{errors.whatsapp.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Data de Nascimento *</Label>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "dd/MM/yyyy") : <span>Selecione a data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Iniciar Teste Grátis"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
