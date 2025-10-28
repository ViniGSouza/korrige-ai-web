import { useMutation, useQueryClient } from "@tanstack/react-query";
import { essayService } from "../services";

export function useDeleteEssay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (essayId: string) => essayService.deleteEssay(essayId),
    onSuccess: (_, essayId) => {
      queryClient.invalidateQueries({ queryKey: ["essays"] });
      queryClient.refetchQueries({ queryKey: ["essays"] });
      queryClient.removeQueries({ queryKey: ["essay", essayId] });
    },
  });
}
