import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../lib/supabaseClient';
import { queryKeys } from '../utils/constants';

export const useTodos = () => {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, error } = useQuery({
    queryKey: [queryKeys.tasks],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addTodo = useMutation({
    mutationFn: async (title: string) => {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ title, is_complete: false }]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
    },
  });

  return {
    tasks,
    isLoading,
    error,
    addTodo,
  };
};
