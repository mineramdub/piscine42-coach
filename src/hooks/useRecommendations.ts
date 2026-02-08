import { useEffect, useState } from 'react'

export interface Recommendation {
  exerciseId: string
  title?: string
  reason: 'new' | 'revise' | 'practice'
  points?: number
}

export default function useRecommendations(userId?: string, limit = 6) {
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const uid = userId || localStorage.getItem('userId') || 'default-user'

  useEffect(() => {
    let mounted = true
    setLoading(true)

    fetch(`/api/recommend?userId=${encodeURIComponent(uid)}&limit=${limit}`)
      .then(res => res.json())
      .then((data) => {
        if (!mounted) return
        if (data?.success) setRecommendations(data.recommendations || [])
      })
      .catch(err => console.error('recommend fetch err', err))
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [uid, limit])

  return { loading, recommendations }
}
