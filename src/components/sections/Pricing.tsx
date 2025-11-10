import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  email: z.string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "Email deve ter no máximo 255 caracteres" }),
  whatsapp: z.string()
    .trim()
    .min(10, { message: "WhatsApp deve ter pelo menos 10 dígitos" })
    .max(20, { message: "WhatsApp deve ter no máximo 20 caracteres" })
    .regex(/^[\d\s\(\)\-\+]+$/, { message: "WhatsApp deve conter apenas números e símbolos válidos" })
});

type TrialFormData = z.infer<typeof trialSchema>;

export const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<TrialFormData>({
    resolver: zodResolver(trialSchema)
  });

  const onSubmit = async (data: TrialFormData) => {
    try {
      // TODO: Integrar com backend para salvar os dados
      console.log("Trial signup:", data);
      
      toast({
        title: "Cadastro realizado!",
        description: "Em breve você receberá as instruções para começar seu teste gratuito.",
      });
      
      setIsModalOpen(false);
      reset();
    } catch (error) {
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
                {...register("whatsapp")}
                className={errors.whatsapp ? "border-destructive" : ""}
              />
              {errors.whatsapp && (
                <p className="text-sm text-destructive">{errors.whatsapp.message}</p>
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
