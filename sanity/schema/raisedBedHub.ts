export const raisedBedHub = {
  name: 'raisedBedHub',
  title: 'Raised Bed Hub',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (R: { required: () => unknown }) => R.required(),
    },
    {
      name: 'intro',
      type: 'array',
      title: 'Intro',
      of: [{ type: 'block' }],
    },
    {
      name: 'hubSections',
      type: 'array',
      title: 'Hub Sections',
      of: [
        {
          type: 'object',
          name: 'hubSection',
          title: 'Hub Section',
          fields: [
            { name: 'sectionTitle', type: 'string', title: 'Section Title' },
            {
              name: 'sectionBody',
              type: 'array',
              title: 'Section Body',
              of: [{ type: 'block' }],
            },
            {
              name: 'relatedLinks',
              type: 'array',
              title: 'Related Links',
              of: [
                {
                  type: 'object',
                  name: 'relatedLink',
                  title: 'Related Link',
                  fields: [
                    { name: 'linkLabel', type: 'string', title: 'Link Label' },
                    { name: 'linkUrl', type: 'string', title: 'Link URL' },
                  ],
                  preview: { select: { title: 'linkLabel' } },
                },
              ],
            },
          ],
          preview: { select: { title: 'sectionTitle' } },
        },
      ],
    },
    {
      name: 'featuredTopics',
      type: 'array',
      title: 'Featured Topics',
      of: [
        {
          type: 'object',
          name: 'featuredTopic',
          title: 'Featured Topic',
          fields: [
            { name: 'topicTitle', type: 'string', title: 'Topic Title' },
            { name: 'topicDescription', type: 'text', title: 'Topic Description', rows: 2 },
            { name: 'topicIcon', type: 'string', title: 'Topic Icon (emoji or icon name)' },
            { name: 'linkUrl', type: 'string', title: 'Link URL' },
          ],
          preview: { select: { title: 'topicTitle', subtitle: 'topicIcon' } },
        },
      ],
    },
    {
      name: 'relatedVideos',
      type: 'array',
      title: 'Related Videos',
      description: 'Placeholder — will be wired to article references in Block 4.',
      of: [{ type: 'string' }],
    },
  ],
}
