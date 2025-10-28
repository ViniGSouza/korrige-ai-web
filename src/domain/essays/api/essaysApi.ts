import { api } from "@/api";
import type {
  Essay,
  CreateEssayRequest,
  UploadUrlRequest,
  UploadUrlResponse,
  ListEssaysResponse,
} from "../types";

export const essaysApi = {
  async list(params?: {
    limit?: number;
    nextToken?: string;
  }): Promise<ListEssaysResponse> {
    const response = await api.get<ListEssaysResponse>("/essays", {
      params,
    });
    return response.data || { essays: [], count: 0 };
  },

  async getById(essayId: string): Promise<Essay> {
    const response = await api.get<Essay>(`/essays/${essayId}`);
    return response.data;
  },

  async create(data: CreateEssayRequest): Promise<Essay> {
    const response = await api.post<Essay>("/essays", data);
    return response.data;
  },

  async delete(essayId: string): Promise<void> {
    await api.delete(`/essays/${essayId}`);
  },

  async getUploadUrl(data: UploadUrlRequest): Promise<UploadUrlResponse> {
    const response = await api.post<UploadUrlResponse>(
      "/essays/upload-url",
      data
    );
    return response.data;
  },

  async uploadFile(uploadUrl: string, file: File): Promise<void> {
    await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });
  },
};
