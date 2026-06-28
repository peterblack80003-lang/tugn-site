// Sync YouTube channel videos to Sanity as draft videoArticle documents.
// Run: node --env-file=.env.local scripts/sync-youtube-videos.js
// Requires: YOUTUBE_API_KEY and SANITY_API_TOKEN in .env.local
// If your tokens are split across .env and .env.local, chain both:
//   node --env-file=.env --env-file=.env.local scripts/sync-youtube-videos.js

const { createClient } = require('@sanity/client')

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN
const CHANNEL_ID = 'UCg30BKGYJPyTzeVJmBmHnLg'
// Uploads playlist: replace leading "UC" with "UU" in the channel ID
const UPLOADS_PLAYLIST_ID = 'UU' + CHANNEL_ID.slice(2)

if (!YOUTUBE_API_KEY) {
  console.error('Error: YOUTUBE_API_KEY is not set.')
  process.exit(1)
}
if (!SANITY_API_TOKEN) {
  console.error('Error: SANITY_API_TOKEN is not set.')
  process.exit(1)
}

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1z2mxem5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: SANITY_API_TOKEN,
  useCdn: false,
})

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

async function fetchAllPlaylistItems() {
  const items = []
  let pageToken = ''

  do {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('playlistId', UPLOADS_PLAYLIST_ID)
    url.searchParams.set('maxResults', '50')
    url.searchParams.set('key', YOUTUBE_API_KEY)
    if (pageToken) url.searchParams.set('pageToken', pageToken)

    const res = await fetch(url.toString())
    const data = await res.json()

    if (data.error) {
      throw new Error(`YouTube API error ${data.error.code}: ${data.error.message}`)
    }

    items.push(...(data.items || []))
    pageToken = data.nextPageToken || ''

    if (pageToken) {
      // Brief pause to stay within quota burst limits
      await new Promise((r) => setTimeout(r, 200))
    }
  } while (pageToken)

  return items
}

async function videoArticleExists(youtubeVideoId) {
  const result = await sanity.fetch(
    `*[_type == "videoArticle" && youtubeVideoId == $id][0]._id`,
    { id: youtubeVideoId }
  )
  return !!result
}

async function main() {
  console.log(`Fetching uploads playlist: ${UPLOADS_PLAYLIST_ID}`)
  const items = await fetchAllPlaylistItems()
  console.log(`Found ${items.length} videos on channel\n`)

  let created = 0
  let skipped = 0
  let errors = 0

  for (const item of items) {
    const snippet = item.snippet || {}
    const videoId = snippet.resourceId?.videoId

    if (!videoId) {
      console.log('  SKIP  (no videoId — likely deleted/private)')
      errors++
      continue
    }

    const title = snippet.title || 'Untitled'

    try {
      const exists = await videoArticleExists(videoId)
      if (exists) {
        console.log(`  SKIP   ${videoId}  "${title}"`)
        skipped++
        continue
      }

      const rawDesc = (snippet.description || '').replace(/\s+/g, ' ').trim()
      const excerpt = rawDesc.length > 200 ? rawDesc.slice(0, 197) + '…' : rawDesc
      const publishedAt = snippet.publishedAt || new Date().toISOString()
      const slug = slugify(title)

      await sanity.create({
        _type: 'videoArticle',
        title,
        slug: { _type: 'slug', current: slug },
        youtubeVideoId: videoId,
        publishedAt,
        excerpt,
        contentLane: 'Lane A',
        tags: [],
        status: 'draft',
      })

      console.log(`  CREATE ${videoId}  "${title}"`)
      created++
    } catch (err) {
      console.error(`  ERROR  ${videoId}  "${title}" — ${err.message}`)
      errors++
    }
  }

  console.log(`\n──────────────────────────────────────`)
  console.log(`  Created : ${created}`)
  console.log(`  Skipped : ${skipped}`)
  console.log(`  Errors  : ${errors}`)
  console.log(`──────────────────────────────────────`)
  console.log('\nAll drafts created. Review and update contentLane in Sanity Studio before publishing.')
}

main().catch((err) => {
  console.error('\nFatal error:', err.message)
  process.exit(1)
})
