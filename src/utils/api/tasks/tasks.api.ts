
import { Task } from "../../../interfaces";
import supabase from "../../../lib/supabaseClient";

export async function createTask(newTask: Omit<Task, 'id' | 'user_id' | 'created_at'>) {
    const user = (await supabase.auth.getUser()).data.user;
    console.log('USER', user)
    if (!user) throw new Error('User not logged in');

    const { data, error } = await supabase
        .from('Task')
        .insert([{ ...newTask, user_id: user.id }])
        .select()
        .single();

    if (error) throw error;
    return data;
}
