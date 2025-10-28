import { useMutation, useQueryClient } from "@tanstack/react-query";
import { essayService } from "../services";
import type { CreateEssayRequest } from "../types";

export function useCreateEssay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      ...data
    }: CreateEssayRequest & { file?: File }) => {
      if (file) {
        return essayService.createEssayWithFile(
          data.title,
          file,
          data.aiProvider || "openai"
        );
      } else if (data.content) {
        return essayService.createEssayWithText(
          data.title,
          data.content,
          data.aiProvider || "openai"
        );
      }
      throw new Error("Conteúdo ou arquivo é obrigatório");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["essays"] });
      queryClient.refetchQueries({ queryKey: ["essays"] });
    },
  });
}
