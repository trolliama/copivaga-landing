import {
  Search,
  Sparkles,
  LineChart,
  Bot,
  Rocket,
  Kanban,
  Check,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/constants";

const features = [
  {
    icon: Search,
    name: "Busca multi-plataforma",
    title: "Encontre Vagas em Todos os Lugares",
    summary:
      "Cansou de alternar entre LinkedIn, Gupy, Catho e Indeed e abrir 10 abas todos os dias? A IA do CopiVaga varre automaticamente as principais plataformas de emprego do Brasil e traz apenas as vagas que fazem sentido para você.",
    bullets: [
      "Busca simultânea em LinkedIn, Gupy, Catho e Indeed",
      "Score de compatibilidade (70-100%) para cada vaga",
      "Feed único ranqueado pelos melhores matches",
      "Atualização automática de novas vagas",
    ],
    image: `${BASE_URL}images/job-search-feed.png`,
  },
  {
    icon: Bot,
    name: "Otimização ATS",
    title: "Chega do seu currículo ser rejeitado antes de chegar no RH",
    summary:
      "75% dos currículos são barrados por robôs ATS antes do RH ver. Nossa IA identifica e corrige problemas, garantindo aprovação em 95% dos sistemas.",
    bullets: [
      "Nota do seu currículo nos sistemas de seleção automática (ATS)",
      "+100 Templates customizáveis otimizados para ATS",
      "Veja os principais erros e receba instruções simples de como corrigir",
      "Entenda exatamente como o robô enxerga seu currículo",
      "Baixe uma versão melhorada do seu currículo (PDF e Word)",
    ],
    image: `${BASE_URL}images/cv-optimization.png`,
  },
  {
    icon: Sparkles,
    name: "Personalização inteligente",
    title: "Cada Vaga Recebe um Currículo Feito Sob Medida",
    summary:
      "Enviar o mesmo currículo para todas as vagas? Isso mata suas chances de ser visto! Nossa IA analisa cada descrição de vaga e adapta automaticamente seu currículo",
    bullets: [
      "CV adaptado automaticamente para cada vaga",
      "Ajuste de palavras-chaves a partir da descrição da vaga",
      "Experiências ordenadas por relevância",
      "Pré-visualização e aprovação do currículo",
    ],
    image: `${BASE_URL}images/cv-personalized-v4.png`,
  },
  {
    icon: LineChart,
    name: "Análise de LinkedIn",
    title: "Aumente sua visibilidade e atraia mais recrutadores",
    summary:
      "Seu LinkedIn pode estar invisível para recrutadores sem você saber. Nossa análise de IA escaneia seu perfil completo e identifica exatamente o que está impedindo você de aparecer nas buscas. Receba uma lista priorizada de ações que realmente aumentam sua visibilidade.",
    bullets: [
      "Score do seu perfil completo",
      "Top 5 melhorias priorizadas por impacto",
      "Impacto de cada ação em pontos de visibilidade",
      "Análise de foto, headline, sobre, experiências e skills",
    ],
    image: `${BASE_URL}images/linkedin-analytics.png`,
  },
  {
    icon: Rocket,
    name: "Aplicação automática",
    title: "Ative o Piloto Automático e Deixe a IA Trabalhar Por Você",
    summary:
      "Aplicar manualmente em 50 vagas por semana é exaustivo e desmotivante. Com nossa IA você tem até 20 aplicações nas melhores vagas por dia enquanto você foca em se preparar para entrevistas",
    bullets: [
      "Aplicações 100% automáticas nas melhores vagas para seu perfil",
      "Foco apenas em vagas com alta compatibilidade (≥75%)",
      "Currículo é customizado automaticamente para cada candidatura",
      "Relatório diário das vagas aplicadas e próximos passos",
    ],
    image: `${BASE_URL}images/auto-pilot.png`,
  },
  {
    icon: Kanban,
    name: "Tracking centralizado",
    title: "Organize suas Candidaturas em um Só Lugar",
    summary:
      "Tenha um dashboard visual que organiza automaticamente todas as suas aplicações em um só lugar. Arraste, adicione notas, baixe CVs enviados - tudo centralizado.",
    bullets: [
      "Alertas automáticos para follow-ups e prazos importantes",
      "Visualização intuitiva de todas as suas candidaturas em um funil",
      "Notas, status e históricos centralizados para cada vaga",
      "Métricas de performance para acompanhar seu progresso",
      "Registro automático das candidaturas pela nossa IA",
    ],
    image: `${BASE_URL}images/kanban-dashboard.png`,
  },
  {
    icon: MessageSquare,
    name: "Notificações WhatsApp",
    title: "Receba Vagas e Atualizações Direto no Seu Celular",
    summary:
      "Não perca nenhuma oportunidade! Receba alertas instantâneos no WhatsApp sempre que surgir uma vaga perfeita para você ou quando houver atualizações nas suas candidaturas. Sem precisar ficar abrindo a plataforma toda hora.",
    bullets: [
      "Notificações em tempo real de vagas com alta compatibilidade",
      "Resumo diário das candidaturas enviadas pelo piloto automático",
      "Alertas de mudanças de status nas suas aplicações",
      "Lembretes de follow-ups e prazos importantes",
      "Responda e gerencie candidaturas direto pelo WhatsApp",
    ],
    image: `${BASE_URL}images/whatsapp-notifications.jpeg`
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Tudo em Uma Plataforma
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-16">
            Funcionalidades completas para automatizar sua busca de emprego
          </p>

          <div className="space-y-16">
            {features.map((feature, index) => {
              const isReversed = index % 2 !== 0;
              return (
                <div
                  key={feature.title}
                  className="grid gap-10 items-center md:grid-cols-2"
                >
                  <div
                    className={clsx(
                      "space-y-5",
                      isReversed ? "md:order-2" : "md:order-1"
                    )}
                  >
                    <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 w-fit">
                      <feature.icon className="h-5 w-5 text-primary" />
                      <span className="text-sm font-semibold text-primary">
                        {feature.name}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {feature.summary}
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {feature.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-base text-foreground"
                        >
                          <Check className="h-4 w-4 text-primary mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-5 border-primary text-primary hover:bg-primary group"
                      asChild
                    >
                      <a
                        href="#planos"
                        className="inline-flex items-center gap-2"
                      >
                        <span>Teste agora</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>

                  <div
                    className={clsx(
                      "relative w-full md:max-w-xl mx-auto",
                      isReversed ? "md:order-1" : "md:order-2"
                    )}
                  >
                    <div className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-primary/30 blur-3xl opacity-60" />
                    <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border/40 bg-muted aspect-[4/3]">
                      <img
                        src={feature.image}
                        alt={`Ilustração sobre ${feature.title}`}
                        className={clsx(
                          "h-full w-full object-cover",
                          feature.image.includes("linkedin-analytics") &&
                            "object-[center_20%] scale-100",
                          feature.image.includes("whatsapp-notifications") &&
                            "object-[center_40%]"
                        )}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
