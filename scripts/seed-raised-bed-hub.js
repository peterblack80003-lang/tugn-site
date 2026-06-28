// Run: node --env-file=.env scripts/seed-raised-bed-hub.js
// Requires SANITY_API_TOKEN with write access to project 1z2mxem5 / dataset production.

const { createClient } = require('@sanity/client')

if (!process.env.SANITY_API_TOKEN) {
  console.error('Error: SANITY_API_TOKEN is not set.')
  console.error('Run: node --env-file=.env scripts/seed-raised-bed-hub.js')
  process.exit(1)
}

const client = createClient({
  projectId: '1z2mxem5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function block(key, text) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
  }
}

const document = {
  _id: 'raised-bed-hub',
  _type: 'raisedBedHub',
  title: 'Raised Bed Command Center',
  intro: [
    block(
      'rbh-intro1',
      "The raised bed is the right tool for the Front Range. In a zone where clay soil drains poorly, spring is abbreviated, hail arrives mid-season, and every extra week of frost-free growing matters, raised beds give you more control over more variables than any other approach. This hub is the operating manual — built from several years of actual raised bed production in Wheat Ridge, Colorado."
    ),
    block(
      'rbh-intro2',
      "Use the sections below to go deep on any part of the system. If you're just starting, read Why Raised Beds Work first, then go to Building Your System. If you're troubleshooting an existing setup, the Soil & Amendment Guide is usually where the answer is."
    ),
  ],
  featuredTopics: [
    {
      _key: 'topic-soil',
      topicTitle: 'Soil Systems',
      topicDescription:
        'The soil mix you fill with defines everything. Learn the formula — and the annual amendment routine — that keeps raised beds more productive every year.',
      topicIcon: '🪱',
      linkUrl: '#soil-amendment-guide',
    },
    {
      _key: 'topic-build',
      topicTitle: 'Bed Construction',
      topicDescription:
        'Materials, dimensions, and spacing decisions that determine whether your setup lasts 4 years or 20 — and actually works the way you planned.',
      topicIcon: '🔨',
      linkUrl: '#building-your-system',
    },
    {
      _key: 'topic-water',
      topicTitle: 'Watering & Irrigation',
      topicDescription:
        "In Denver's semi-arid climate, overhead watering is waste. Drip irrigation is the difference between a thriving garden and one you're constantly rescuing.",
      topicIcon: '💧',
      linkUrl: '/zone-5-denver-gardening-guide',
    },
    {
      _key: 'topic-companion',
      topicTitle: 'Companion Planting',
      topicDescription:
        'Strategic crop pairings that reduce pest pressure, improve pollination, and maximize use of vertical and horizontal space without extra inputs.',
      topicIcon: '🌿',
      linkUrl: '#why-raised-beds-work',
    },
    {
      _key: 'topic-season',
      topicTitle: 'Season Extension',
      topicDescription:
        'Row covers, cold frames, and timing strategy to push your 153-day Zone 5b frost-free window into 9-plus months of real production.',
      topicIcon: '🌡',
      linkUrl: '#year-round-production',
    },
    {
      _key: 'topic-pest',
      topicTitle: 'Pest Management',
      topicDescription:
        "Raised beds have a natural advantage over in-ground plots, but you still need a system. Here's what actually works on the Front Range.",
      topicIcon: '🐛',
      linkUrl: '#why-raised-beds-work',
    },
  ],
  hubSections: [
    {
      _key: 'sec-why',
      sectionTitle: 'Why Raised Beds Work',
      sectionBody: [
        block(
          'wrb1',
          "Denver's clay soil makes in-ground food gardening a fight from the start. The Front Range clay — mostly montmorillonite — shrinks to concrete in July and holds water like a bathtub in spring. Every in-ground bed I've tried here has either waterlogged transplants in May or baked root systems in August. Raised beds let you opt out of that entirely by replacing the problem with soil you actually control."
        ),
        block(
          'wrb2',
          "The season extension benefit is real and underappreciated. Raised bed soil warms 2–3 weeks earlier than in-ground soil in Zone 5b, because the soil mass above grade isn't fighting the thermal lag of deep clay. In practice, that means tomatoes in a raised bed can be hardened off and in the ground by early May with row cover, while in-ground gardeners in the same yard are still waiting for soil temps to crack 60°F. In a 153-day frost-free window, three weeks matters."
        ),
        block(
          'wrb3',
          "Yield density is the third argument. When you control soil quality you can plant at true intensive spacing — what the seed packet recommends assuming ideal conditions — rather than the generous spacing you need for compacted or nutrient-poor ground. A well-built 4×8 raised bed consistently outproduces a 10×10 in-ground plot with less water, less time, and significantly less frustration."
        ),
      ],
      relatedLinks: [
        {
          _key: 'rl-wrb-1',
          linkLabel: 'Zone 5b Denver Planting Calendar',
          linkUrl: '/zone-5-denver-gardening-guide',
        },
        {
          _key: 'rl-wrb-2',
          linkLabel: 'Intensive Spacing Basics',
          linkUrl: '#building-your-system',
        },
      ],
    },
    {
      _key: 'sec-build',
      sectionTitle: 'Building Your System',
      sectionBody: [
        block(
          'bys1',
          "The 4-foot width rule exists for a reason: you should be able to reach the center from either side without stepping in. Stepping in compacts the very soil you just built. Length is flexible, but 4×8 and 4×12 fit standard lumber dimensions with minimal waste. Depth is the variable most people undersize. Six inches will grow lettuce and herbs. Twelve inches is the floor for tomatoes, peppers, and root vegetables — anything that wants to anchor deep needs room to do it."
        ),
        block(
          'bys2',
          "Material comes down to budget and how long you want it to last. Cedar is the standard for good reason: natural rot resistance, no chemical leaching concerns, and 10–15 years of service in Colorado's wet-dry cycles. Thick-cut pine (2×10 or 2×12) is cheaper but plan on replacing it in 4–6 years. Galvanized corrugated metal panels have become my preferred option for permanent beds — inexpensive at any farm supply store, they last indefinitely, and the slight thermal mass actually helps warm soil faster in spring, which matters when you're chasing a 3-week head start."
        ),
        block(
          'bys3',
          "Spacing between beds matters as much as the beds themselves. Leave 3 feet minimum between beds for a loaded wheelbarrow path — I crammed beds too close on my first build and spent three seasons working around it. Orient beds on a north-south axis if you can, so taller crops on the north end don't shade shorter ones to the south. And if you're on a slope, level the beds individually rather than terracing the whole area — level soil drains more evenly and you won't fight low spots for the life of the bed."
        ),
      ],
      relatedLinks: [
        {
          _key: 'rl-bys-1',
          linkLabel: 'Soil & Amendment Guide',
          linkUrl: '#soil-amendment-guide',
        },
        {
          _key: 'rl-bys-2',
          linkLabel: 'Watering Systems for Raised Beds',
          linkUrl: '/zone-5-denver-gardening-guide',
        },
      ],
    },
    {
      _key: 'sec-soil',
      sectionTitle: 'Soil & Amendment Guide',
      sectionBody: [
        block(
          'sag1',
          "The soil mix is where most first-time raised bed gardeners spend too little money and too much frustration. The formula that consistently works here: 60% quality topsoil (screened loam from a landscape supplier, not the cheapest bagged product), 30% finished compost, and 10% perlite for drainage. This mix drains fast enough for Colorado's heavy-rain events, holds moisture through low-humidity stretches, and gives roots the structure they actually need."
        ),
        block(
          'sag2',
          "For volume builds, buy bulk. Denver-area landscape suppliers deliver by the cubic yard at a fraction of the cost of bagged product. A single 4×8×12-inch raised bed takes roughly 0.25 cubic yards of fill — once you're building three or four beds, bulk delivery makes obvious economic sense. The City of Denver also sells finished compost at the Havana composting facility; it's legitimately good material at a reasonable price and worth the trip if you're in the metro area."
        ),
        block(
          'sag3',
          "Annual maintenance is simple: each spring, add 2–3 inches of compost as a surface dressing. Don't dig it in — let the worms work it down through the season. In fall, after the last harvest, plant a cover crop (winter rye, crimson clover, or hairy vetch all overwinter well in Zone 5b) to protect soil structure through freeze-thaw cycles. Beds that get this treatment improve noticeably year over year. Beds that don't eventually flatten out and start producing like the dirt you were trying to escape."
        ),
      ],
      relatedLinks: [
        {
          _key: 'rl-sag-1',
          linkLabel: 'Cover Cropping in Zone 5b',
          linkUrl: '/zone-5-denver-gardening-guide',
        },
        {
          _key: 'rl-sag-2',
          linkLabel: 'Year-Round Production Strategy',
          linkUrl: '#year-round-production',
        },
      ],
    },
    {
      _key: 'sec-yearround',
      sectionTitle: 'Year-Round Production',
      sectionBody: [
        block(
          'yrp1',
          "The 153-day frost-free window is a floor, not a ceiling. A few tools extend it significantly. Row cover fabric at 1.5 oz weight protects to the mid-20s°F and costs almost nothing per bed. With row cover, you can start planting cold-tolerant crops 3–4 weeks before the average May 7 last frost, and keep harvesting kale, spinach, and chard into November. That's a real extra month and a half of production from a minimal investment in fabric and wire hoops."
        ),
        block(
          'yrp2',
          "Cold frames push it further. A 2×4 frame with a polycarbonate or old storm window panel on top creates a microclimate that effectively bumps you a full zone warmer. Kale and spinach will keep producing in a cold frame through most of the Denver winter if you harvest the outer leaves only and don't stress the crown. Arugula and claytonia are even more cold-tolerant and worth running under frames through January and February on warm-ish days."
        ),
        block(
          'yrp3',
          "The rotation system I run: beds dedicated to warm-season production cycle through tomatoes, peppers, beans, and squash in summer. Two beds run cool-season crops twice — spring and fall — with a fast warm-season filler like bush beans in the gap. One bed is a permanent garlic bed, planted each October and harvested each July, with a quick succession of lettuce or radishes tucked in after the garlic comes out. Think of your beds as a rotating system rather than a collection of individual plantings, and 10-plus months of real production becomes achievable without heroics."
        ),
      ],
      relatedLinks: [
        {
          _key: 'rl-yrp-1',
          linkLabel: 'Zone 5b Fall Planting Calendar',
          linkUrl: '/zone-5-denver-gardening-guide',
        },
        {
          _key: 'rl-yrp-2',
          linkLabel: 'Denver Frost Date Reference',
          linkUrl: '/zone-5-denver-gardening-guide',
        },
      ],
    },
  ],
  relatedVideos: [],
}

async function seed() {
  console.log('Seeding raisedBedHub document (id: raised-bed-hub)...')
  const result = await client.createOrReplace(document)
  console.log('Done.', result._id)
}

seed().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
