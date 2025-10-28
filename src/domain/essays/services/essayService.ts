import { essaysApi } from "../api";
import type { Essay, UploadUrlRequest } from "../types";

export const essayService = {
  async listEssays(params?: { limit?: number; nextToken?: string }) {
    return essaysApi.list(params);
  },

  async getEssay(essayId: string) {
    return essaysApi.getById(essayId);
  },

  async createEssayWithText(
    title: string,
    content: string,
    aiProvider: "claude" | "openai" = "claude"
  ): Promise<Essay> {
    return essaysApi.create({
      title,
      content,
      aiProvider,
    });
  },

  async createEssayWithFile(
    title: string,
    file: File,
    aiProvider: "claude" | "openai" = "claude"
  ): Promise<Essay> {
    const uploadData: UploadUrlRequest = {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    };
    const { uploadUrl, fileKey } = await essaysApi.getUploadUrl(uploadData);

    await essaysApi.uploadFile(uploadUrl, file);

    const fileType = this.getFileTypeFromMimeType(file.type);
    return essaysApi.create({
      title,
      fileKey,
      fileType,
      aiProvider,
    });
  },

  async deleteEssay(essayId: string) {
    return essaysApi.delete(essayId);
  },

  getFileTypeFromMimeType(mimeType: string): "image" | "pdf" | "docx" | "text" {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType === "application/pdf") return "pdf";
    if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimeType === "application/msword"
    ) {
      return "docx";
    }
    return "text";
  },

  getStatusColor(status: Essay["status"]): string {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-primary/10 text-primary",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  },

  getStatusLabel(status: Essay["status"]): string {
    const labels = {
      pending: "Aguardando",
      processing: "Processando",
      completed: "Concluída",
      failed: "Falhou",
    };
    return labels[status] || status;
  },

  getProviderLabel(provider?: "claude" | "openai"): string {
    return "Agente Especializado";
  },

  formatProcessingTime(ms?: number): string {
    if (!ms) return "N/A";
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  },
};
