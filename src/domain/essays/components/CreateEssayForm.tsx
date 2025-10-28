import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateEssay } from "../hooks";
import { createEssaySchema, type CreateEssayFormData } from "../schemas";
import { FileDropzone } from "./FileDropzone";

interface CreateEssayFormProps {
  onSuccess?: () => void;
}

export function CreateEssayForm({ onSuccess }: CreateEssayFormProps) {
  const [inputType, setInputType] = useState<"text" | "file">("text");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateEssayFormData>({
    resolver: zodResolver(createEssaySchema) as any,
    defaultValues: {
      aiProvider: "openai" as const,
    },
  });

  const createEssay = useCreateEssay();

  const onSubmit = async (data: CreateEssayFormData) => {
    if (inputType === "file" && !selectedFile) {
      return;
    }
    if (inputType === "text" && !data.content?.trim()) {
      return;
    }

    try {
      await createEssay.mutateAsync({
        ...data,
        aiProvider: "openai",
        file: selectedFile || undefined,
      });
      reset();
      setSelectedFile(null);
      onSuccess?.();
    } catch (error) {
      console.error("Error creating essay:", error);
    }
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      setValue("content", undefined);
    }
  };

  const handleTypeChange = (type: "text" | "file") => {
    setInputType(type);
    if (type === "text") {
      setSelectedFile(null);
    } else {
      setValue("content", undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título da Redação</Label>
        <Input
          id="title"
          placeholder="Ex: A importância da educação no Brasil"
          {...register("title")}
          disabled={createEssay.isPending}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Como você quer enviar sua redação?</Label>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={inputType === "text" ? "default" : "outline"}
            onClick={() => handleTypeChange("text")}
            disabled={createEssay.isPending}
            className="h-auto py-4"
          >
            <div className="flex flex-col items-center gap-2">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">Digitar Texto</span>
            </div>
          </Button>
          <Button
            type="button"
            variant={inputType === "file" ? "default" : "outline"}
            onClick={() => handleTypeChange("file")}
            disabled={createEssay.isPending}
            className="h-auto py-4"
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-5 w-5" />
              <span className="text-sm font-medium">Enviar Arquivo</span>
            </div>
          </Button>
        </div>
      </div>

      {inputType === "text" ? (
        <div className="space-y-2">
          <Label htmlFor="content">Conteúdo da Redação</Label>
          <Textarea
            id="content"
            placeholder="Digite ou cole o texto da sua redação aqui..."
            rows={12}
            {...register("content")}
            disabled={createEssay.isPending}
            className="resize-none"
          />
          {errors.content && (
            <p className="text-sm text-destructive">{errors.content.message}</p>
          )}
          {!errors.content && (
            <p className="text-xs text-muted-foreground">
              Mínimo de 100 caracteres recomendado
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <Label>Arquivo da Redação</Label>
          <FileDropzone
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            accept="image/*,.pdf,.doc,.docx"
            maxSize={10 * 1024 * 1024}
          />
          {!selectedFile && (
            <p className="text-xs text-muted-foreground">
              Envie uma foto, PDF ou documento Word da sua redação
            </p>
          )}
        </div>
      )}

      <input type="hidden" {...register("aiProvider")} value="openai" />

      <div className="flex gap-4 pt-2">
        <Button
          type="submit"
          disabled={
            createEssay.isPending ||
            (inputType === "file" && !selectedFile) ||
            (inputType === "text" && !register("content"))
          }
          className="flex-1"
          size="lg"
        >
          {createEssay.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Enviar para Correção
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset();
            setSelectedFile(null);
            setInputType("text");
          }}
          disabled={createEssay.isPending}
          size="lg"
        >
          Limpar
        </Button>
      </div>

      {createEssay.isError && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4">
          <p className="text-sm text-destructive font-medium">
            ❌ Erro ao enviar redação. Por favor, tente novamente.
          </p>
        </div>
      )}

      {createEssay.isSuccess && (
        <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
          <p className="text-sm text-green-600 font-medium dark:text-green-400">
            ✓ Redação enviada com sucesso! Aguarde o processamento pela IA.
          </p>
        </div>
      )}
    </form>
  );
}
