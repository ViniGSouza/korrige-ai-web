import { CheckCircle, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";
import type { EssayCorrection, CompetencyScore } from "../types";

interface EssayCorrectionViewProps {
  correction: EssayCorrection;
}

export function EssayCorrectionView({ correction }: EssayCorrectionViewProps) {
  const competencies = [
    {
      number: 1,
      title: "Domínio da Escrita Formal",
      description:
        "Demonstrar domínio da modalidade escrita formal da língua portuguesa",
      data: correction.competency1,
    },
    {
      number: 2,
      title: "Compreensão e Desenvolvimento do Tema",
      description:
        "Compreender a proposta de redação e aplicar conceitos para desenvolver o tema",
      data: correction.competency2,
    },
    {
      number: 3,
      title: "Organização de Informações",
      description:
        "Selecionar, relacionar, organizar e interpretar informações em defesa de um ponto de vista",
      data: correction.competency3,
    },
    {
      number: 4,
      title: "Mecanismos Linguísticos",
      description:
        "Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação",
      data: correction.competency4,
    },
    {
      number: 5,
      title: "Proposta de Intervenção",
      description:
        "Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos",
      data: correction.competency5,
    },
  ];

  const getScoreColor = (score: number): string => {
    if (score >= 160) return "text-green-600";
    if (score >= 120) return "text-primary";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 160) return "bg-green-50 border-green-200";
    if (score >= 120) return "bg-primary/5 border-primary/20";
    if (score >= 80) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getTotalScoreColor = (score: number): string => {
    if (score >= 800) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 600) return "text-primary bg-primary/5 border-primary/20";
    if (score >= 400) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="space-y-6">
      {/* Nota Total */}
      <Card className={`border-2 ${getTotalScoreColor(correction.totalScore)}`}>
        <CardHeader>
          <CardTitle className="text-2xl">Nota Final</CardTitle>
          <CardDescription>Soma das 5 competências do ENEM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-5xl font-bold">{correction.totalScore}</p>
              <p className="text-gray-600 mt-1">de 1000 pontos</p>
            </div>
            <div className="text-right">
              <Progress
                value={(correction.totalScore / 1000) * 100}
                className="w-32 h-3"
              />
              <p className="text-sm text-gray-600 mt-2">
                {((correction.totalScore / 1000) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Geral */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback Geral</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {correction.overallFeedback}
          </p>
        </CardContent>
      </Card>

      {/* Competências Detalhadas */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Análise por Competência</h3>
        {competencies.map((competency) => (
          <CompetencyCard
            key={competency.number}
            number={competency.number}
            title={competency.title}
            description={competency.description}
            data={competency.data}
            getScoreColor={getScoreColor}
            getScoreBgColor={getScoreBgColor}
          />
        ))}
      </div>
    </div>
  );
}

interface CompetencyCardProps {
  number: number;
  title: string;
  description: string;
  data: CompetencyScore;
  getScoreColor: (score: number) => string;
  getScoreBgColor: (score: number) => string;
}

function CompetencyCard({
  number,
  title,
  description,
  data,
  getScoreColor,
  getScoreBgColor,
}: CompetencyCardProps) {
  return (
    <Card className={`border ${getScoreBgColor(data.score)}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline">Competência {number}</Badge>
              <span
                className={`text-2xl font-bold ${getScoreColor(data.score)}`}
              >
                {data.score}/200
              </span>
            </div>
            <CardTitle className="text-lg font-semibold dark:text-black">
              {title}
            </CardTitle>
            <CardDescription className="mt-1 text-foreground/90 dark:text-black">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Feedback */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-900">Análise</h4>
          <p className="text-gray-700 leading-relaxed">{data.feedback}</p>
        </div>

        {/* Pontos Fortes */}
        {data.strengths.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-700">
              <CheckCircle className="h-4 w-4" />
              Pontos Fortes
            </h4>
            <ul className="space-y-1">
              {data.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pontos a Melhorar */}
        {data.improvements.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2 text-orange-700">
              <TrendingUp className="h-4 w-4" />
              Pontos a Melhorar
            </h4>
            <ul className="space-y-1">
              {data.improvements.map((improvement, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
