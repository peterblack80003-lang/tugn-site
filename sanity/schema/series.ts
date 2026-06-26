export const series = {
  name: 'series',
  title: 'Series',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name' },
    },
    {
      name: 'lane',
      type: 'string',
      title: 'Content Lane',
      options: { list: ['A', 'B', 'C'] },
    },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'episode_count', type: 'number', title: 'Episode Count' },
  ],
}
