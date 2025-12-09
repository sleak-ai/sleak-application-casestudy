import { cache } from 'react'
import 'server-only'
import { createClient } from '../supabase/server'

// Cached helper methods makes it easy to get the same value in many places
// without manually passing it around. This discourages passing it from Server
// Component to Server Component which minimizes risk of passing it to a Client
// Component.
export const getCurrentUser = cache(async () => {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // TODO: Fetch user's profile from the database

    return user
})
