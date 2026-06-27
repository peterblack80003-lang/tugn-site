import { client } from './sanity'

export async function getArticles() {
  return client.fetch(
    `*[_type == "article" && status == "published"] | order(published_at desc) {
      _id, title, slug, excerpt, meta_description, published_at, content_lane, series, youtube_video_id, tags
    }`
  )
}

export async function getArticle(slug: string) {
  return client.fetch(
    `*[_type == "article" && slug.current == $slug && status == "published"][0] {
      _id, title, slug, seo_title, meta_description, excerpt, primary_keyword,
      body, youtube_video_id, content_lane, series, published_at, tags
    }`,
    { slug }
  )
}

export async function getFeaturedEpisode() {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      featured_episode_id, featured_episode_title, featured_episode_description
    }`
  )
}

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}

export async function getSeriesByLane(lane: string) {
  return client.fetch(
    `*[_type == "series" && lane == $lane] | order(name asc) {
      _id, name, slug, description, episode_count, lane
    }`,
    { lane }
  )
}

export async function getRecentEpisodes(limit: number = 6) {
  return client.fetch(
    `*[_type == "episode"] | order(published_at desc) [0...$limit] {
      _id, title, youtube_id, description, series, lane, published_at, thumbnail_url
    }`,
    { limit }
  )
}

export async function getEpisodesBySeries(seriesName: string) {
  return client.fetch(
    `*[_type == "episode" && series == $seriesName] | order(published_at asc) {
      _id, title, youtube_id, description, published_at, thumbnail_url
    }`,
    { seriesName }
  )
}
