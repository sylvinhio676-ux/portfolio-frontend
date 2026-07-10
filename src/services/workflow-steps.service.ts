import { apiClient } from '@/lib/axios';
import { API_ROUTES } from '@/core/constants';
import type { ApiResponse, WorkflowStep } from '@/core/types';

export const workflowStepsService = {
  // Étapes visibles de la méthode de travail.
  getAll: async (): Promise<WorkflowStep[]> => {
    const { data } = await apiClient.get<ApiResponse<WorkflowStep[]>>(
      API_ROUTES.WORKFLOW_STEPS.LIST
    );
    return data.data;
  },
};
