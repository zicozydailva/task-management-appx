import { createClient } from '@supabase/supabase-js'
import { PriorityStatus, TaskStatus } from '../interfaces';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export type Database = {
    public: {
        Tables: {
            boards: {
                Row: {
                    id: string
                    title: string
                    description: string | null
                    status: TaskStatus | null
                    extras: {
                        tags?: string[];
                        dueDate?: string;
                        priority?: PriorityStatus
                    } | null
                    user_id: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    description?: string | null
                    status: TaskStatus | null
                    extras: {
                        tags?: string[];
                        dueDate?: string;
                        priority?: PriorityStatus
                    } | null
                    user_id: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string | null
                    status: TaskStatus | null
                    extras: {
                        tags?: string[];
                        dueDate?: string;
                        priority?: PriorityStatus
                    } | null
                    user_id?: string
                    created_at?: string
                    updated_at?: string
                }
            }

        }
    }
} 