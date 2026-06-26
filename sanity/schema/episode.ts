export const episode = {
  name: 'episode',
  title: 'Episodes',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'youtube_id', type: 'string', title: 'YouTube Video ID' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'series', type: 'string', title: 'Series' },
    {
      name: 'lane',
      type: 'string',
      title: 'Content Lane',
      options: { list: ['A', 'B', 'C'] },
    },
    { name: 'published_at', type: 'datetime', title: 'Published At' },
    { name: 'thumbnail_url', type: 'url', title: 'Thumbnail URL' },
  ],
}
