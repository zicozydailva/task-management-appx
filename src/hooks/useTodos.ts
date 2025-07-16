import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../lib/supabaseClient';
import { queryKeys } from '../utils/constants';
import { createTask, deleteTask } from '../utils/api/tasks/tasks.api';


export const useTodos = () => {

    const queryClient = useQueryClient();
    const { data: tasks, isLoading, error } = useQuery({
        queryKey: [queryKeys.tasks],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('Task')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
    });

    const addTodo = useMutation({
        mutationFn: async (title: string) => {
            const { data, error } = await supabase
                .from('Task')
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

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
        },
    });
};


export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
        },
    });
};
