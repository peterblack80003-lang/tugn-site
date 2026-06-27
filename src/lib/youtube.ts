export interface VideoItem {
  videoId: string
  title: string
  thumbnail: string
  publishedAt: string
  description: string
}

interface YTPlaylistItem {
  snippet: {
    title: string
    publishedAt: string
    description: string
    resourceId: { videoId: string }
  }
}

interface YTSearchItem {
  id: { videoId: string }
  snippet: {
    title: string
    publishedAt: string
    description: string
  }
}

export async function getPlaylistVideos(
  playlistId: string,
  maxResults = 6
): Promise<VideoItem[]> {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) return []
  try {
    const params = new URLSearchParams({
      playlistId,
      part: 'snippet',
      maxResults: String(maxResults),
      key,
    })
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${params}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = (await res.json()) as { items?: YTPlaylistItem[] }
    return (data.items ?? [])
      .filter((item) => item.snippet?.resourceId?.videoId)
      .map((item) => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: `https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/hqdefault.jpg`,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description ?? '',
      }))
  } catch {
    return []
  }
}

export async function getChannelVideos(
  channelId: string,
  maxResults = 6
): Promise<VideoItem[]> {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) return []
  try {
    const params = new URLSearchParams({
      channelId,
      part: 'snippet',
      order: 'date',
      type: 'video',
      maxResults: String(maxResults),
      key,
    })
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = (await res.json()) as { items?: YTSearchItem[] }
    return (data.items ?? [])
      .filter((item) => item.id?.videoId)
      .map((item) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: `https://img.youtube.com/vi/${item.id.videoId}/hqdefault.jpg`,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description ?? '',
      }))
  } catch {
    return []
  }
}
