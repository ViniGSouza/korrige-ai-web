import { useQuery } from "@tanstack/react-query";
import { essayService } from "../services";
import { storage } from "@/core/storage";

export function useEssays(params?: { limit?: number; nextToken?: string }) {
  const token = storage.get<string>("token");

  return useQuery({
    queryKey: ["essays", params],
    queryFn: () => essayService.listEssays(params),
    enabled: !!token,
    refetchOnMount: "always",
    staleTime: 0,
  });
}
