import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { configService } from "./api";

// Query Keys
export const configKeys = {
  all: ["config"] as const,
  detail: () => [...configKeys.all, "detail"] as const,
};

// Get Config Query
export function useConfig() {
  return useQuery({
    queryKey: configKeys.detail(),
    queryFn: configService.getConfig,
    staleTime: 1000 * 60 * 5, // 5 minutes - won't refetch for 5 mins
    gcTime: 1000 * 60 * 10, // 10 minutes - keeps in cache
  });
}

// Update Config Mutation
export function useUpdateConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: configService.updateConfig,
    onSuccess: (updatedConfig) => {
      // Update cache immediately with new data
      queryClient.setQueryData(configKeys.detail(), updatedConfig);
    },
    onError: () => {
      // Invalidate to refetch on error
      queryClient.invalidateQueries({ queryKey: configKeys.all });
    },
  });
}
