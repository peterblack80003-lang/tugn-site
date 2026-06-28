import { client } from './sanity'

const revalidate = { next: { revalidate: 60 } }

export async function getArticles() {
  return client.fetch(
    `*[_type == "article" && status == "published"] | order(published_at desc) {
      _id, title, slug, excerpt, meta_description, published_at, content_lane, series, youtube_video_id, tags
    }`,
    {},
    revalidate
  )
}

export async function getArticle(slug: string) {
  return client.fetch(
    `*[_type == "article" && slug.current == $slug && status == "published"][0] {
      _id, title, slug, seo_title, meta_description, excerpt, primary_keyword,
      body, youtube_video_id, content_lane, series, published_at, tags
    }`,
    { slug },
    revalidate
  )
}

export async function getFeaturedEpisode() {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      featured_episode_id, featured_episode_title, featured_episode_description
    }`,
    {},
    revalidate
  )
}

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`, {}, revalidate)
}

export async function getSeriesByLane(lane: string) {
  return client.fetch(
    `*[_type == "series" && lane == $lane] | order(name asc) {
      _id, name, slug, description, episode_count, lane
    }`,
    { lane },
    revalidate
  )
}

export async function getRecentEpisodes(limit: number = 6) {
  return client.fetch(
    `*[_type == "episode"] | order(published_at desc) [0...$limit] {
      _id, title, youtube_id, description, series, lane, published_at, thumbnail_url
    }`,
    { limit },
    revalidate
  )
}

export async function getEpisodesBySeries(seriesName: string) {
  return client.fetch(
    `*[_type == "episode" && series == $seriesName] | order(published_at asc) {
      _id, title, youtube_id, description, published_at, thumbnail_url
    }`,
    { seriesName },
    revalidate
  )
}

export async function getZoneGuide() {
  return client.fetch(
    `*[_type == "zoneGuide"][0] {
      _id, title, intro, lastFrostDate, firstFrostDate, growingSeasonLength,
      plantingCalendar[] { _key, month, sowIndoors, transplant, directSow, notes },
      denverSpecificTips[] { _key, heading, body },
      relatedVideos
    }`,
    {},
    revalidate
  )
}

export async function getRaisedBedHub() {
  return client.fetch(
    `*[_type == "raisedBedHub"][0] {
      _id, title, intro,
      hubSections[] {
        _key, sectionTitle, sectionBody,
        relatedLinks[] { _key, linkLabel, linkUrl }
      },
      featuredTopics[] { _key, topicTitle, topicDescription, topicIcon, linkUrl },
      relatedVideos
    }`,
    {},
    revalidate
  )
}

export async function getVideoArticles() {
  return client.fetch(
    `*[_type == "videoArticle" && status == "published"] | order(publishedAt desc) {
      _id, title, slug, youtubeVideoId, publishedAt, excerpt, contentLane, tags
    }`,
    {},
    revalidate
  )
}

export async function getVideoArticle(slug: string) {
  return client.fetch(
    `*[_type == "videoArticle" && slug.current == $slug && status == "published"][0] {
      _id, title, slug, youtubeVideoId, publishedAt, thumbnail, excerpt, articleBody, contentLane, tags
    }`,
    { slug },
    revalidate
  )
}

export async function getTomatoSymptoms() {
  return client.fetch(
    `*[_type == "tomatoSymptom"] | order(category asc, symptomName asc) {
      _id, symptomName, category, shortDescription,
      diagnosis, solution, preventionTip, relatedVideo, severity,
      "infographicUrl": infographic.asset->url
    }`,
    {},
    revalidate
  )
}
