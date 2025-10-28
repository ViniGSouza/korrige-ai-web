import { z } from "zod";

export const createEssaySchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(200, "Título deve ter no máximo 200 caracteres"),
  content: z.string().optional(),
  fileKey: z.string().optional(),
  fileType: z.enum(["image", "pdf", "docx", "text"]).optional(),
  aiProvider: z.enum(["claude", "openai"]).optional(),
});

export const uploadUrlSchema = z.object({
  fileName: z.string().min(1, "Nome do arquivo é obrigatório"),
  fileType: z.string().min(1, "Tipo do arquivo é obrigatório"),
  fileSize: z
    .number()
    .positive("Tamanho do arquivo deve ser positivo")
    .max(10485760, "Arquivo deve ter no máximo 10MB"),
});

export type CreateEssayFormData = z.infer<typeof createEssaySchema>;
export type UploadUrlFormData = z.infer<typeof uploadUrlSchema>;
