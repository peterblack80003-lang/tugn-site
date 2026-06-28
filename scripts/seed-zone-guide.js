// Run: node --env-file=.env scripts/seed-zone-guide.js
// Requires SANITY_API_TOKEN with write access to project 1z2mxem5 / dataset production.

const { createClient } = require('@sanity/client')

if (!process.env.SANITY_API_TOKEN) {
  console.error('Error: SANITY_API_TOKEN is not set.')
  console.error('Run: node --env-file=.env scripts/seed-zone-guide.js')
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
  _id: 'zone-guide-denver-5b',
  _type: 'zoneGuide',
  title: 'Zone 5b Denver & Wheat Ridge Gardening Guide',
  intro: [
    block(
      'intro1',
      "If you garden in Denver, Wheat Ridge, Lakewood, or anywhere along Colorado's Front Range, you're in USDA Hardiness Zone 5b. That means an average last frost around May 7 and a first autumn frost around October 7 — giving you roughly 153 frost-free days to grow. But Zone 5b here is not the same as Zone 5b in Ohio or upstate New York. At 5,280 feet above sea level, you're dealing with intense UV, rapid soil dry-out, late spring hail, and Chinook wind events that can fool both plants and gardeners alike."
    ),
    block(
      'intro2',
      "This guide covers the complete growing calendar for the Denver metro area, accurate frost date data, and the local knowledge that generic gardening books leave out. Whether you're running raised beds in a Wheat Ridge backyard or a small patio container garden in Capitol Hill, the timing and techniques here are built for your specific conditions."
    ),
  ],
  lastFrostDate: 'May 7 (average)',
  firstFrostDate: 'October 7 (average)',
  growingSeasonLength: 'Approximately 153 days',
  plantingCalendar: [
    {
      _key: 'cal-jan',
      month: 'January',
      sowIndoors: 'Onions, leeks',
      transplant: '',
      directSow: '',
      notes: 'Order seeds; plan garden layout and bed rotation',
    },
    {
      _key: 'cal-feb',
      month: 'February',
      sowIndoors: 'Peppers, eggplant (mid-February)',
      transplant: '',
      directSow: '',
      notes: 'Use heat mats (80°F+) for pepper germination; 10–12 weeks before last frost',
    },
    {
      _key: 'cal-mar',
      month: 'March',
      sowIndoors: 'Tomatoes, basil (late March)',
      transplant: 'Onions (cold frame, late March)',
      directSow: 'Kale, spinach, lettuce (cold frame, late March)',
      notes: 'Harden off cold-tolerant starts; frost cloth on standby',
    },
    {
      _key: 'cal-apr',
      month: 'April',
      sowIndoors: 'Squash, cucumbers (late April, 2–3 weeks before last frost)',
      transplant: 'Lettuce, kale, spinach (mid-April, frost cloth ready)',
      directSow: 'Carrots, peas, radishes (early–mid April)',
      notes: 'Watch nighttime temps; keep frost cloth ready through month end',
    },
    {
      _key: 'cal-may',
      month: 'May',
      sowIndoors: '',
      transplant: 'Tomatoes, peppers (after May 7); basil, squash, cucumbers (mid-May)',
      directSow: 'Beans, squash, herbs (after May 7)',
      notes: 'Hail risk peaks mid-May through June — keep row covers accessible',
    },
    {
      _key: 'cal-jun',
      month: 'June',
      sowIndoors: '',
      transplant: '',
      directSow: 'Succession lettuce, kale (early June); second bean sowing',
      notes: 'Use 20–30% shade cloth for lettuce seedlings; intense UV at altitude',
    },
    {
      _key: 'cal-jul',
      month: 'July',
      sowIndoors: '',
      transplant: '',
      directSow: 'Beans (second planting); cucumbers (second planting, early July)',
      notes: 'Peak heat — water at dawn; drip irrigation critical to avoid fungal disease',
    },
    {
      _key: 'cal-aug',
      month: 'August',
      sowIndoors: 'Fall kale, lettuce (mid-August)',
      transplant: '',
      directSow: 'Spinach, arugula, kale (mid-August, 8–10 weeks before first frost)',
      notes: 'Act by mid-August; fall planting window closes fast',
    },
    {
      _key: 'cal-sep',
      month: 'September',
      sowIndoors: '',
      transplant: 'Fall kale and lettuce starts (early September)',
      directSow: 'Spinach, arugula, radishes (early September)',
      notes: 'First frost Oct 7 average; cover tender crops after September 20',
    },
    {
      _key: 'cal-oct',
      month: 'October',
      sowIndoors: '',
      transplant: '',
      directSow: 'Garlic (mid-October, for spring harvest)',
      notes: 'Harvest tomatoes before frost; store green tomatoes indoors to ripen',
    },
    {
      _key: 'cal-nov',
      month: 'November',
      sowIndoors: '',
      transplant: '',
      directSow: '',
      notes: 'Cold frames extend kale and spinach; amend beds with compost',
    },
    {
      _key: 'cal-dec',
      month: 'December',
      sowIndoors: '',
      transplant: '',
      directSow: '',
      notes: 'Plan next season; order seed catalogs; winterize raised beds and drip lines',
    },
  ],
  denverSpecificTips: [
    {
      _key: 'tip-altitude',
      heading: 'Altitude Adjustment: Gardening at 5,280 Feet',
      body: [
        block(
          'alt1',
          "Denver's mile-high elevation changes the rules in ways most gardening books don't address. UV radiation is roughly 25% more intense than at sea level, which means even on overcast days young seedlings can experience sunscald — especially during the hardening-off period. Plan to harden transplants over a full 7–10 days, starting with morning sun only."
        ),
        block(
          'alt2',
          "Water also boils at 202°F at this altitude, which matters for canning and compost teas. More practically, your raised beds will lose moisture faster than the same beds at lower elevations — low humidity (often 15–20% RH in summer), high UV, and frequent afternoon winds combine to dry out soil quickly. Deep watering (to 8–10 inches) and 3–4 inches of mulch are non-negotiable."
        ),
      ],
    },
    {
      _key: 'tip-hail',
      heading: 'Late Spring Hail Risk',
      body: [
        block(
          'hail1',
          "Colorado's hail season peaks from May through June — precisely when your freshly transplanted tomatoes, peppers, and squash are most vulnerable. A single hail event can shred a season of work in minutes. Keep row covers, old bedsheets, or inverted 5-gallon buckets within reach for the first 4–6 weeks after transplanting."
        ),
        block(
          'hail2',
          "For permanent protection, hail cloth (often sold as 30–40% shade cloth) installed over your raised beds on a simple PVC frame does double duty: it blocks UV, reduces soil moisture loss, and shields plants from marble-sized hail that's common on the Front Range. This investment pays for itself in the first storm season."
        ),
      ],
    },
    {
      _key: 'tip-uv',
      heading: 'Intense UV at Elevation',
      body: [
        block(
          'uv1',
          "With 300+ sunny days per year and 25% stronger UV radiation than sea level, your plants are absorbing more solar energy than the same plants would in a lower-elevation garden. For heat-loving crops like tomatoes, peppers, and squash, this is mostly a benefit — it drives higher brix (sugar content) in fruit and accelerates fruit set."
        ),
        block(
          'uv2',
          "For cool-season crops, intense sun is the enemy. Lettuce, spinach, and cilantro bolt weeks earlier here than equivalent plantings in cooler climates. Plant them on the east side of taller crops to get morning sun and afternoon shade, or use 20–30% shade cloth from late June through August to extend your harvest window significantly."
        ),
      ],
    },
    {
      _key: 'tip-chinook',
      heading: "Chinook Wind Events: Don't Be Fooled by False Spring",
      body: [
        block(
          'ch1',
          "Warm Chinook winds off the Rockies can push January and February temperatures into the 60s and 70s°F for days at a time. This triggers premature bud break in fruit trees, fools bulbs into early emergence, and tempts gardeners into transplanting weeks too early. A single subsequent hard freeze — common in March and April — can undo all of that growth overnight."
        ),
        block(
          'ch2',
          "The rule: trust the calendar, not the thermometer in winter and early spring. The average last frost of May 7 reflects real climatological data including Chinook-followed-by-freeze events. Watch your 10-day forecast through all of April, and keep frost protection on standby even after you've transplanted. The temperature can drop 40°F in 12 hours when a cold front follows a Chinook."
        ),
      ],
    },
    {
      _key: 'tip-water',
      heading: 'Water-Wise Gardening in a Semi-Arid Climate',
      body: [
        block(
          'water1',
          "Denver averages just 14 inches of annual precipitation, most of it falling as winter snowpack. Summer rain is sporadic and often comes as intense, brief afternoon thunderstorms that run off compacted soil before absorbing. Raised beds drain faster than in-ground beds, making water management your most important gardening skill in this region."
        ),
        block(
          'water2',
          "Drip irrigation is the single highest-ROI investment for a Denver raised bed garden. It delivers water directly to the root zone, eliminates the 20–30% evaporation loss from overhead watering, and keeps foliage dry — critical for preventing fungal disease in the humid microclimate that follows afternoon thunderstorms. Mulch deeply (3–4 inches of straw or wood chips), water in the early morning, and check soil moisture 4–6 inches deep before each watering cycle."
        ),
      ],
    },
  ],
  relatedVideos: [],
}

async function seed() {
  console.log('Seeding zoneGuide document (id: zone-guide-denver-5b)...')
  const result = await client.createOrReplace(document)
  console.log('Done.', result._id)
}

seed().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
