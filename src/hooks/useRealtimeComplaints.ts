// src/hooks/useRealtimeComplaints.ts
// Supabase Realtime docs: https://supabase.com/docs/guides/realtime
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useRealtimeComplaints(queryKey: string[]) {
    const qc = useQueryClient()
    const queryKeyStr = JSON.stringify(queryKey)

    useEffect(() => {
        const channel = supabase
            .channel('complaints-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'complaints' },
                () => {
                    // Invalidate cached data — TanStack Query re-fetches automatically
                    qc.invalidateQueries({ queryKey: JSON.parse(queryKeyStr) })
                }
            )
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [qc, queryKeyStr])
}

// Usage in admin queue page:
// useRealtimeComplaints(['admin-queue'])
// — queue auto-refreshes whenever any complaint row changes