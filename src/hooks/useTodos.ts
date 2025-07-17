import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../lib/supabaseClient';
import { queryKeys } from '../utils/constants';
import { createTask, deleteTask, updateTask } from '../utils/api/tasks/tasks.api';
import { Task } from '../interfaces';


export const useTodos = () => {
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

    return {
        tasks,
        isLoading,
        error,
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

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (args: { id: string; updates: Partial<Task> }) =>
            updateTask(args.id, args.updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
        },
    });
};

export const useTaskStatusCounts = () => {
    return useQuery({
        queryKey: ['task-status-counts'],
        queryFn: async () => {
            const { data: tasks, error } = await supabase
                .from('Task')
                .select('status');

            if (error) throw error;

            const counts = tasks.reduce(
                (acc, task) => {
                    acc[task.status] = (acc[task.status] || 0) + 1;
                    return acc;
                },
                {} as Record<string, number>
            );

            return counts;
        },
    });
};
