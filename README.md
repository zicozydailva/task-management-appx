# 📝 Task management app — Smart Task Manager with Supabase + React

Task management is a full-stack task management application built with **React**, **TypeScript**, and **Supabase**. It lets users securely authenticate, create, update, and manage their daily tasks with real-time syncing and persistent storage.

## ⚙️ Tech Stack

- **Frontend:** React 18, TypeScript
- **Backend-as-a-Service:** Supabase (PostgreSQL + Auth + Storage)
- **State/Data Management:** React Query
- **Styling:** TailwindCSS (or your choice)
- **Notifications:** custom `handleError` and `handleSuccess` wrappers

---

## 📁 Project Structure

src/
├── components/ # Reusable UI components
├── hooks/ # Custom hooks (e.g., useTodos, useCreateTask)
├── lib/ # Supabase client instance
├── pages/ # Page-level components (e.g., TaskPage)
├── types/ # TypeScript types (e.g., Task, TaskStatus)
├── utils/ # Utility functions (e.g., error handling)
└── App.tsx


---

## 🧠 Features

- ✅ User Authentication (via Supabase)
- ✅ Create Task (with title, description, status, extras)
- ✅ Update Task status
- ✅ Delete Task
- ✅ Fetch Tasks per authenticated user
- ✅ Graceful error handling with toasts/logs
- ✅ Strict type validation with TypeScript
- ✅ Query cache invalidation using React Query

---

🪄 Supabase Setup
Create a new Supabase project: https://app.supabase.com

Add a table named Task with columns:

id: UUID, Primary Key

user_id: UUID

title: Text

description: Text

status: Text

extras: JSONB

created_at: Timestamp with timezone


🚀 Getting Started
bash
Copy
Edit
# 1. Clone this repository
git clone https://github.com/zicozydailva/task-management-appx.git
cd task-management-app

# 2. Install dependencies
npm install

# 3. Set your Supabase credentials
cp .env.example .env

# 4. Run the dev server
npm run dev

🌐 Environment Variables - .env.example
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

🧹 Scripts
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint


# What I'd build next if I had more time
- Unit test, E2E testing with Playwright or Cypress
- Third party Oauth, Forgot password, Reset Password Functionality
- AI-assisted autocomplete or tagging (e.g., using OpenAI or Replicate)
- Internationalization (i18n) support
- Real-time updates via Supabase realtime or WebSockets
