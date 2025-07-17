// supabase/functions/task-completion-notification/index.ts
// 🎯 FEATURE #6: Edge Functions (Serverless)
// Automatically sends notifications when cards are completed

// @ts-ignore - Deno imports work in edge functions
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore - Deno imports work in edge functions  
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface NotificationRequest {
  taskId: string
  taskTitle: string
  listTitle: string
  userEmail: string
}

serve(async (req: Request) => {
  // Enable CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    })
  }

  try {
    // Parse the request
    const { taskId, taskTitle, listTitle, userEmail }: NotificationRequest = await req.json()

    // Check if card was moved to "Done"
    if (listTitle !== 'Done') {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Not a completion - no notification sent' 
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    // 🎉 TASK COMPLETED! Send notification
    console.log(`🎉 Task completed: "${taskTitle}" by ${userEmail}`)
    
    // In a real app, you'd send:
    // - Email via SendGrid/Resend
    // - Slack notification
    // - Push notification
    // - Webhook to other services
    
    // For demo purposes, we'll simulate sending an email
    const notificationResult = await sendCompletionNotification({
      taskTitle,
      userEmail,
      taskId
    })

    return new Response(JSON.stringify({
      success: true,
      message: `Completion notification sent for: ${taskTitle}`,
      notification: notificationResult
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })

  } catch (error) {
    console.error('❌ Edge function error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
})

// 📧 Simulate sending notification (replace with real service)
async function sendCompletionNotification({ taskTitle, userEmail, taskId }: {
  taskTitle: string
  userEmail: string  
  taskId: string
}) {
  // In production, replace this with:
  // - await sendEmail({ to: userEmail, subject: `Task completed: ${taskTitle}` })
  // - await sendSlackMessage({ channel: '#notifications', text: `✅ ${taskTitle} completed` })
  // - await sendPushNotification({ userId, title: 'Task completed!' })
  
  const notification = {
    type: 'task_completion',
    to: userEmail,
    subject: `🎉 Task Completed: ${taskTitle}`,
    message: `Congratulations! You've successfully completed "${taskTitle}".`,
    timestamp: new Date().toISOString(),
    taskId
  }
  
  // Simulate external API call delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  console.log('📧 Notification sent:', notification)
  return notification
} 