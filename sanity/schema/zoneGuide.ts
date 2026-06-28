export const zoneGuide = {
  name: 'zoneGuide',
  title: 'Zone Guide',
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
      name: 'lastFrostDate',
      type: 'string',
      title: 'Last Frost Date',
    },
    {
      name: 'firstFrostDate',
      type: 'string',
      title: 'First Frost Date',
    },
    {
      name: 'growingSeasonLength',
      type: 'string',
      title: 'Growing Season Length',
    },
    {
      name: 'plantingCalendar',
      type: 'array',
      title: 'Planting Calendar',
      of: [
        {
          type: 'object',
          name: 'calendarRow',
          title: 'Calendar Row',
          fields: [
            { name: 'month', type: 'string', title: 'Month' },
            { name: 'sowIndoors', type: 'string', title: 'Sow Indoors' },
            { name: 'transplant', type: 'string', title: 'Transplant' },
            { name: 'directSow', type: 'string', title: 'Direct Sow' },
            { name: 'notes', type: 'string', title: 'Notes' },
          ],
          preview: {
            select: { title: 'month' },
          },
        },
      ],
    },
    {
      name: 'denverSpecificTips',
      type: 'array',
      title: 'Denver-Specific Tips',
      of: [
        {
          type: 'object',
          name: 'tipSection',
          title: 'Tip Section',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            {
              name: 'body',
              type: 'array',
              title: 'Body',
              of: [{ type: 'block' }],
            },
          ],
          preview: {
            select: { title: 'heading' },
          },
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
