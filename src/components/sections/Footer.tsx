import { BASE_URL } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center">
              <img src={`${BASE_URL}logo.svg`} alt="CopiVaga Logo" className="h-12 w-12" />
              CopiVaga
            </div>

            <a
              href="mailto:contato@copivaga.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              📧 contato@copivaga.com
            </a>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            © 2025 CopiVaga. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
