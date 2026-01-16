import { useTheme } from "@/shared/hooks/useTheme";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: "full" | "icon" | "text";
  showSlogan?: boolean;
}

const Logo = ({ variant = "full", showSlogan = true, ...props }: LogoProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Cores alinhadas com o design system (--primary oklch)
  // Light: oklch(0.50 0.24 280) ≈ #6D28D9
  // Dark: oklch(0.72 0.20 280) ≈ #A78BFA
  const primaryColor = isDark ? "#A78BFA" : "#6D28D9";
  const textColor = isDark ? "#F8FAFC" : "#0F172A";
  const mutedColor = isDark ? "#94A3B8" : "#64748B";

  // Renderiza apenas o ícone
  if (variant === "icon") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" {...props}>
        {/* Fundo com cantos arredondados */}
        <rect x="2" y="2" width="36" height="36" rx="10" fill={primaryColor} />

        {/* Ícone de caneta estilizada com check */}
        <g transform="translate(10, 10)">
          {/* Caneta */}
          <path
            d="M14 2L18 6L6 18L2 20L4 16L14 2Z"
            fill="white"
            fillOpacity="0.95"
          />
          {/* Linha da caneta */}
          <path
            d="M14 2L18 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Check integrado */}
          <path
            d="M6 12L9 15L15 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.9"
          />
        </g>
      </svg>
    );
  }

  // Renderiza apenas o texto
  if (variant === "text") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" {...props}>
        <text
          x="0"
          y="30"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="26"
          fontWeight="800"
          letterSpacing="-1"
          fill={textColor}
        >
          Korrige
          <tspan fill={primaryColor}>AI</tspan>
        </text>

        {showSlogan && (
          <text
            x="2"
            y="44"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontSize="9"
            fontWeight="600"
            letterSpacing="1.5"
            fill={mutedColor}
          >
            CORREÇÃO INTELIGENTE
          </text>
        )}
      </svg>
    );
  }

  // Versão completa (ícone + texto)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" {...props}>
      {/* Ícone */}
      <g transform="translate(0, 5)">
        {/* Fundo com cantos arredondados */}
        <rect x="2" y="2" width="36" height="36" rx="10" fill={primaryColor} />

        {/* Ícone de caneta estilizada */}
        <g transform="translate(10, 10)">
          <path
            d="M14 2L18 6L6 18L2 20L4 16L14 2Z"
            fill="white"
            fillOpacity="0.95"
          />
          <path
            d="M14 2L18 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M6 12L9 15L15 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.9"
          />
        </g>
      </g>

      {/* Texto */}
      <text
        x="48"
        y="30"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="24"
        fontWeight="800"
        letterSpacing="-0.5"
        fill={textColor}
      >
        Korrige
        <tspan fill={primaryColor}>AI</tspan>
      </text>

      {showSlogan && (
        <text
          x="50"
          y="43"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="8"
          fontWeight="600"
          letterSpacing="1.2"
          fill={mutedColor}
        >
          CORREÇÃO INTELIGENTE
        </text>
      )}
    </svg>
  );
};

export default Logo;
