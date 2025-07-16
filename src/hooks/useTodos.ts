import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../lib/supabaseClient';
import { queryKeys } from '../utils/constants';

export const useTodos = () => {
  const queryClient = useQueryClient();

  const { data: todos, isLoading, error } = useQuery({
    queryKey: [queryKeys.tasks],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addTodo = useMutation({
    mutationFn: async (title: string) => {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ title, is_complete: false }]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
    },
  });

  return {
    todos,
    isLoading,
    error,
    addTodo,
  };
};
