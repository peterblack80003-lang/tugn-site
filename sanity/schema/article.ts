export const article = {
  name: 'article',
  title: 'Articles',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
    },
    { name: 'seo_title', type: 'string', title: 'SEO Title' },
    {
      name: 'meta_description',
      type: 'text',
      title: 'Meta Description',
      rows: 3,
    },
    { name: 'primary_keyword', type: 'string', title: 'Primary Keyword' },
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [{ type: 'block' }, { type: 'image' }],
    },
    { name: 'youtube_video_id', type: 'string', title: 'YouTube Video ID' },
    {
      name: 'content_lane',
      type: 'string',
      title: 'Content Lane',
      options: { list: ['A', 'B', 'C'] },
    },
    { name: 'series', type: 'string', title: 'Series Name' },
    { name: 'published_at', type: 'datetime', title: 'Published At' },
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: { list: ['draft', 'published'] },
      initialValue: 'draft',
    },
  ],
}
