'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadConversation(formData: FormData) {
    const supabase = await createClient()
    // logic to upload conversation recording to supabase

    // trigger analysis service of the conversation recording
}
