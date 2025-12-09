import { cache } from 'react'
import 'server-only'
import { createClient } from '../supabase/server'
import { getCurrentUser } from './auth'

/**
 * DTO (Data Transfer Object) for a conversation
 * Only includes safe, minimal data needed for the UI
 */
type ConversationDTO = {
    id: string
    title: string
    duration_seconds: number | null
    recording_url: string | null
}

/**
 * Get all conversations created by the current user.
 * This function:
 * - Only runs on the server
 * - Performs authorization checks
 * - Returns safe, minimal DTOs
 * - Uses caching to avoid redundant queries
 */
export const getOwnConversations = cache(async (): Promise<ConversationDTO[]> => {
    // Get the current authenticated user
    const user = await getCurrentUser()

    // Authorization check: user must be authenticated
    if (!user) {
        throw new Error('Unauthorized: User must be authenticated')
    }

    // Create Supabase client
    const supabase = await createClient()

    // Query conversations created by the current user
    const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching conversations:', error)
        throw new Error('Failed to fetch conversations')
    }

    // Return safe DTOs
    const conversations: ConversationDTO[] = data.map((conversation) => ({
        id: conversation.id,
        title: conversation.title,
        duration_seconds: conversation.duration_seconds,
        recording_url: conversation.recording_url,
    }))

    return conversations || []
})
