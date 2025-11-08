export const Footer = () => {
  const footerLinks = {
    produto: [
      { label: "Como funciona", href: "#" },
      { label: "Funcionalidades", href: "#" },
      { label: "Preços", href: "#" },
      { label: "Casos de uso", href: "#" }
    ],
    recursos: [
      { label: "Blog", href: "#" },
      { label: "Guias", href: "#" },
      { label: "Central de Ajuda", href: "#" },
      { label: "Status da Plataforma", href: "#" }
    ],
    empresa: [
      { label: "Sobre nós", href: "#" },
      { label: "Carreiras", href: "#" },
      { label: "Contato", href: "#" }
    ],
    legal: [
      { label: "Termos de Uso", href: "#" },
      { label: "Política de Privacidade", href: "#" },
      { label: "LGPD", href: "#" }
    ]
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold text-foreground mb-4">Produto</h4>
            <ul className="space-y-3">
              {footerLinks.produto.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              copivaga
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <a href="mailto:contato@copivaga.com" className="hover:text-foreground transition-colors">
                📧 contato@copivaga.com
              </a>
              <span className="hidden sm:inline">•</span>
              <span>💬 Suporte: Chat ao vivo (Seg-Sex, 9h-18h)</span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            © 2025 copivaga. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
