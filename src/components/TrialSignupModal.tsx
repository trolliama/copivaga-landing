import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";

const trialSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: "Nome muito curto" })
    .max(100, { message: "Nome muito longo" })
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, { message: "Nome deve conter apenas letras" })
    .refine((val) => val.split(" ").filter((n) => n.length > 0).length >= 2, {
      message: "Digite nome e sobrenome completos",
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Digite um email válido" })
    .max(255, { message: "Email muito longo" })
    .toLowerCase(),
  birthDate: z
    .string()
    .min(1, { message: "Data de nascimento é obrigatória" })
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: "Use o formato dd/mm/aaaa" })
    .refine((val) => {
      const [day, month, year] = val.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      return !Number.isNaN(date.getTime()) && 
             date.getDate() === day && 
             date.getMonth() === month - 1 && 
             date.getFullYear() === year;
    }, { message: "Data inválida" })
    .refine((val) => {
      const [day, month, year] = val.split('/').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 16 && age <= 100;
    }, { message: "Você deve ter entre 16 e 100 anos" }),
  whatsapp: z
    .string()
    .trim()
    .min(1, { message: "WhatsApp é obrigatório" })
    .transform((val) => val.replaceAll(/\D/g, ""))
    .refine((val) => val.length >= 10 && val.length <= 11, {
      message: "Número inválido. Use DDD + 8 ou 9 dígitos",
    })
    .refine(
      (val) => {
        if (val.length === 11) {
          return val[2] === "9";
        }
        return true;
      },
      {
        message: "Celular deve começar com 9",
      }
    ),
});

type TrialFormData = z.infer<typeof trialSchema>;

interface TrialSignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TrialSignupModal = ({
  open,
  onOpenChange,
}: TrialSignupModalProps) => {
  const navigate = useNavigate();
  const [phoneValue, setPhoneValue] = useState("");
  const [birthDateValue, setBirthDateValue] = useState("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<TrialFormData>({
    resolver: zodResolver(trialSchema),
  });

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replaceAll(/\D/g, "");

    if (numbers.length <= 2) {
      return numbers;
    }
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
        7
      )}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const formatBirthDate = (value: string) => {
    const numbers = value.replaceAll(/\D/g, "");

    if (numbers.length <= 2) {
      return numbers;
    }
    if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneValue(formatted);
    setValue("whatsapp", e.target.value.replaceAll(/\D/g, ""), {
      shouldValidate: true,
    });
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBirthDate(e.target.value);
    setBirthDateValue(formatted);
    setValue("birthDate", formatted, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: TrialFormData) => {
    try {
      // Convert dd/mm/yyyy to yyyy-mm-dd for database
      const [day, month, year] = data.birthDate.split('/');
      const birthDateISO = `${year}-${month}-${day}`;

      const { data: responseData, error } = await supabase.functions.invoke(
        "submit-trial-signup",
        {
          body: {
            fullName: data.fullName,
            email: data.email,
            birthDate: birthDateISO,
            whatsapp: data.whatsapp,
          },
        }
      );

      if (error) throw error;

      // Store trial_signup_id for quiz
      if (responseData?.data?.id) {
        localStorage.setItem("trial_signup_id", responseData.data.id);
      }

      // Store phone number for pre-filling in quiz complete page
      localStorage.setItem("last_whatsapp_number", phoneValue);

      toast({
        title: "Cadastro realizado!",
        description: "Agora vamos conhecer melhor você.",
      });

      onOpenChange(false);
      reset();
      setPhoneValue("");
      setBirthDateValue("");

      // Navigate to quiz
      navigate("/quiz");
    } catch (error) {
      console.error("Error submitting trial signup:", error);
      toast({
        title: "Erro ao cadastrar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Comece seu teste grátis
          </DialogTitle>
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
              <p className="text-sm text-destructive">
                {errors.fullName.message}
              </p>
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
            <Label htmlFor="birthDate">Data de Nascimento</Label>
            <Input
              id="birthDate"
              type="text"
              placeholder="dd/mm/aaaa"
              value={birthDateValue}
              onChange={handleBirthDateChange}
              maxLength={10}
              className={errors.birthDate ? "border-destructive" : ""}
            />
            {errors.birthDate && (
              <p className="text-sm text-destructive">
                {errors.birthDate.message}
              </p>
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
              <p className="text-sm text-destructive">
                {errors.whatsapp.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Iniciar Teste Grátis"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
