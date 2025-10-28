import { useTheme } from "@/shared/hooks/useTheme";

const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  const { theme } = useTheme();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 50" {...props}>
      <defs>
        {/* Gradiente Roxo Premium */}
        <linearGradient
          id="corrigeGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#8B5CF6", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#A855F7", stopOpacity: 1 }}
          />
        </linearGradient>

        {/* Gradiente Verde para Check */}
        <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#34D399", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#10B981", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      {/* Container do Ícone - Caneta com Check */}
      <g transform="translate(8, 8)">
        {/* Círculo de fundo do ícone */}
        <circle
          cx="17"
          cy="17"
          r="17"
          fill="url(#corrigeGradient)"
          opacity="0.1"
        />

        {/* Caneta (Pen) */}
        <path
          d="M 20 8 L 26 14 L 14 26 L 8 28 L 10 22 Z"
          fill="url(#corrigeGradient)"
          stroke={theme === "dark" ? "#fff" : "#1e293b"}
          strokeWidth="0.5"
        />
        <path
          d="M 26 14 L 20 8 L 22 6 L 28 12 Z"
          fill="url(#corrigeGradient)"
          opacity="0.8"
        />

        {/* Check Mark sobreposto */}
        <path
          d="M 12 18 L 16 22 L 24 12"
          fill="none"
          stroke="url(#checkGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Texto "KorrigeAI" */}
      <text
        x="52"
        y="32"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.5"
        fill={theme === "dark" ? "#f8fafc" : "#0f172a"}
      >
        Korrige
        <tspan fill="url(#corrigeGradient)">AI</tspan>
      </text>

      {/* Slogan pequeno (opcional) */}
      <text
        x="54"
        y="42"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="8"
        fontWeight="500"
        letterSpacing="0.5"
        fill={theme === "dark" ? "#94a3b8" : "#64748b"}
      >
        CORREÇÃO INTELIGENTE
      </text>
    </svg>
  );
};

export default Logo;
