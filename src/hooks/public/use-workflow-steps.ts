import { useQuery } from '@tanstack/react-query';
import { workflowStepsService } from '@/services';

export function useWorkflowSteps() {
  return useQuery({
    queryKey: ['workflow-steps'],
    queryFn: workflowStepsService.getAll,
  });
}
