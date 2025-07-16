
import { Task, TaskStatus } from "../../../interfaces";
import supabase from "../../../lib/supabaseClient";

export async function createTask(newTask: Omit<Task, 'id' | 'user_id' | 'created_at'>) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not logged in');

    const { data, error } = await supabase
        .from('Task')
        .insert([{ ...newTask, user_id: user.id }])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteTask(id: string) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not logged in');

    const { data, error } = await supabase
        .from('Task')
        .delete()
        .eq('id', id)
    // .eq('user_id', user.id); 

    if (error) throw error;
    return data;
}

export async function updateTask(id: string, updates: Partial<Omit<Task, "id" | "user_id" | "created_at">>) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error("User not logged in");

    const { data, error } = await supabase
        .from("Task")
        .update({ ...updates })
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

    if (error) throw error;
    return data;
}
