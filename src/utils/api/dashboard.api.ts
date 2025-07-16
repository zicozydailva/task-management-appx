
import { handleGenericError } from "../notify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";

const useDashboardApi = () => {
  const queryClient = useQueryClient();
};

export default useDashboardApi;
