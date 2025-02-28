import { ApiResponse } from "@/api";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

export default function useApiQuery<T>(
  options: UndefinedInitialDataOptions<ApiResponse<T>>,
) {
  const {
    data: apiResponse,
    isLoading,
    refetch,
    error: tError,
    isError,
  } = useQuery(options);

  const error =
    !isLoading &&
    (apiResponse == undefined || apiResponse.error || isError || tError)
      ? tError || apiResponse?.error || new Error("Unknown error")
      : undefined;

  const result = apiResponse?.result || undefined;

  return { result, isLoading, error, refetch };
}
