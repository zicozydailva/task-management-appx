
import { Task } from "../../../interfaces";
import supabase from "../../../lib/supabaseClient";
import { getCurrentUser } from "../users/users.api";

export async function createTask(newTask: Omit<Task, 'id' | 'user_id' | 'created_at'>) {
    const user = await getCurrentUser();

    const { data, error } = await supabase
        .from('task')
        .insert([{ ...newTask, user_id: user.id }])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteTask(id: string) {
    const user = await getCurrentUser();

    const { data, error } = await supabase
        .from('task')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) throw error;
    return data;
}

export async function updateTask(id: string, updates: Partial<Omit<Task, "id" | "user_id" | "created_at">>) {
    const user = await getCurrentUser();

    const { data, error } = await supabase
        .from("task")
        .update({ ...updates })
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function createSampleData() {
    console.log('🌱 Creating sample data for new user...')
    try {
        const user = await getCurrentUser();
        const { data: task, error: taskError } = await supabase
            .from('task')
            .insert([
                {
                    title: 'Welcome to your Kanban Task Board!',
                    description: 'This is your first task. You can edit or delete it.',
                    user_id: user?.id,
                    status: 'pending',
                    extras: {
                        tag: ['Mild'],
                        dueDate: new Date().toISOString(),
                        priority: 'low'
                    }
                },
                {
                    title: 'Work on User Authentication',
                    description: 'Responsible for Oauth',
                    user_id: user?.id,
                    status: 'in-progress',
                    extras: {
                        tag: ['Urgent'],
                        dueDate: new Date().toISOString(),
                        priority: 'medium'
                    }
                },
                {
                    title: 'Real-time updates',
                    description: 'Changes appear instantly across all devices',
                    user_id: user?.id,
                    status: 'completed',
                    extras: {
                        tag: ['Important'],
                        dueDate: new Date().toISOString(),
                        priority: 'high'
                    }
                }
            ])
            .select();

        if (taskError) throw taskError

        console.log('✅ Sample data created!')
    } catch (error) {
        console.error('❌ Error creating sample data:', error)
    }
}
