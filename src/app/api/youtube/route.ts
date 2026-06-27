import { NextResponse } from 'next/server'

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCg30BKGYJPyTzeVJmBmHnLg'
const FALLBACK_VIDEO_COUNT = 50

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY

  if (apiKey) {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${apiKey}`,
        { next: { revalidate: 3600 } }
      )
      if (res.ok) {
        const data = await res.json()
        const stats = data.items?.[0]?.statistics
        if (stats) {
          return NextResponse.json({
            videoCount: parseInt(stats.videoCount ?? String(FALLBACK_VIDEO_COUNT)),
            subscriberCount: parseInt(stats.subscriberCount ?? '0'),
          })
        }
      }
    } catch {
      // fall through to fallback
    }
  }

  return NextResponse.json({
    videoCount: FALLBACK_VIDEO_COUNT,
    subscriberCount: 0,
  })
}
