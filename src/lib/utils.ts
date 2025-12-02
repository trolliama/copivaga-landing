import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWhatsappUrl() {
  const whatsappNumber =
    import.meta.env.VITE_WHATSAPP_SUPPORT || "5511999999999";

  // Format: remove all non-digits and create WhatsApp link
  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}`;
}
