export const videoArticle = {
  name: 'videoArticle',
  title: 'Video Articles',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (R: { required: () => unknown }) => R.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (R: { required: () => unknown }) => R.required(),
    },
    {
      name: 'youtubeVideoId',
      type: 'string',
      title: 'YouTube Video ID',
      description: 'The 11-character video ID from the YouTube URL (e.g. dQw4w9WgXcQ)',
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
    },
    {
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail Override',
      description: 'Optional. Falls back to the YouTube thumbnail if not set.',
      options: { hotspot: true },
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      description: '1–2 sentence summary shown in the video library grid.',
      rows: 3,
    },
    {
      name: 'articleBody',
      type: 'array',
      title: 'Article Body',
      of: [{ type: 'block' }, { type: 'image' }],
    },
    {
      name: 'contentLane',
      type: 'string',
      title: 'Content Lane',
      options: {
        list: ['Lane A', 'Lane B', 'Lane C'],
        layout: 'radio',
      },
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: { list: ['draft', 'published'] },
      initialValue: 'draft',
    },
  ],
}
