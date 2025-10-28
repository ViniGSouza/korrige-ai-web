import { useQuery } from "@tanstack/react-query";
import { essayService } from "../services";

export function useEssay(essayId: string) {
  return useQuery({
    queryKey: ["essay", essayId],
    queryFn: () => essayService.getEssay(essayId),
    enabled: !!essayId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "pending" || status === "processing") {
        return 5000;
      }
      return false;
    },
  });
}
