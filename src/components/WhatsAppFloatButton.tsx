import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsappUrl } from "@/lib/utils";

export const WhatsAppFloatButton = () => {
  const whatsappUrl = getWhatsappUrl();

  const [bubbleState, setBubbleState] = useState<
    "hidden" | "visible" | "bouncing" | "fading"
  >("hidden");

  useEffect(() => {
    // Wait 2 seconds before showing
    const showTimer = setTimeout(() => {
      setBubbleState("visible");
    }, 2000);

    // Start bouncing after showing (2s + 100ms)
    const vibrateTimer = setTimeout(() => {
      setBubbleState("bouncing");
    }, 2100);

    // Start fading out after bouncing (2s + 100ms + 2s)
    const fadeTimer = setTimeout(() => {
      setBubbleState("fading");
    }, 4100);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(vibrateTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  const getBubbleClasses = () => {
    const baseClasses =
      "bg-white text-gray-800 px-4 py-2 mb-2 rounded-lg shadow-lg border border-gray-200 relative transition-all duration-500";

    switch (bubbleState) {
      case "hidden":
        return `${baseClasses} opacity-0 scale-0`;
      case "visible":
        return `${baseClasses} opacity-100 scale-100`;
      case "bouncing":
        return `${baseClasses} opacity-100 scale-100 animate-bounce`;
      case "fading":
        return `${baseClasses} opacity-0 scale-95 pointer-events-none`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      {/* Chat Bubble */}
      {bubbleState !== "hidden" && (
        <div className={getBubbleClasses()}>
          <p className="text-xs font-medium whitespace-nowrap">
            Fale conosco pelo WhatsApp
          </p>
          {/* Tail pointing down */}
          <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};
