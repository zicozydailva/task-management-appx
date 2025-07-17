import { useMutation, useQuery } from "@tanstack/react-query";
import supabase from "../../../lib/supabaseClient";

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ['all-auth-users'],
        queryFn: async () => {
            const { data, error } = await supabase.auth.admin.listUsers();

            if (error) throw error;

            return data.users;
        },
    });
};

export const useLogout = () => {
    return useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        },
    });
};
