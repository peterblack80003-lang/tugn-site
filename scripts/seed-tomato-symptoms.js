// Run: node --env-file=.env scripts/seed-tomato-symptoms.js
// Requires SANITY_API_TOKEN with write access to project 1z2mxem5 / dataset production.

const { createClient } = require('@sanity/client')

if (!process.env.SANITY_API_TOKEN) {
  console.error('Error: SANITY_API_TOKEN is not set.')
  console.error('Run: node --env-file=.env scripts/seed-tomato-symptoms.js')
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

const symptoms = [
  // ── LEAVES ──────────────────────────────────────────────────────────────
  {
    _id: 'symptom-yellowing-lower-leaves',
    _type: 'tomatoSymptom',
    symptomName: 'Yellowing Lower Leaves',
    category: 'Leaves',
    severity: 'Low',
    shortDescription:
      'Lower leaves turn pale yellow from the bottom of the plant upward — usually a nitrogen deficiency or normal leaf senescence as the plant matures.',
    diagnosis: [
      block(
        'yll-d1',
        "Yellowing that starts on the lowest, oldest leaves and moves upward is almost always a nitrogen deficiency in raised beds that haven't been amended recently. The plant prioritizes nitrogen to the active growth tip, so the oldest leaves get cannibalized first. Check the pattern: uniform pale yellow from the bottom up points to nitrogen. Yellow with distinct green veins still showing means magnesium deficiency. Yellow with brown, crispy margins suggests potassium is the issue."
      ),
      block(
        'yll-d2',
        "It can also just be normal aging. A tomato in July that's dropping its lowest three or four leaves while growing vigorously at the top may simply be redirecting resources — not a crisis. Inspect the overall plant health before reaching for a fertilizer. If the plant looks strong and the yellowing is confined to the very bottom, leave it alone and clean up the fallen leaves."
      ),
    ],
    solution: [
      block(
        'yll-s1',
        "1. Confirm it's nitrogen before acting. If the upper plant is healthy and actively growing, the yellowing may not need intervention. 2. If confirmed nitrogen deficiency: side-dress with a balanced granular fertilizer (10-10-10) at 1 tablespoon per plant, worked into the top inch of soil, then watered in immediately. 3. For faster results, a fish emulsion soil drench (1 tablespoon per gallon of water) shows visible improvement within 5–7 days."
      ),
      block(
        'yll-s2',
        "4. Remove yellowed leaves at the base — don't leave decaying tissue on the plant or the soil surface. 5. If yellowing progresses upward into healthy canopy after fertilizing, take a soil sample. Colorado's alkaline soil (typically pH 7.5–8.0) can lock up multiple nutrients even when they're physically present in the soil."
      ),
    ],
    preventionTip:
      'Top-dress beds with 2 inches of finished compost each spring before planting, and follow up with a fish emulsion drench in early July when plants hit peak production demand.',
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-brown-leaf-edges',
    _type: 'tomatoSymptom',
    symptomName: 'Brown Leaf Edges (Leaf Scorch)',
    category: 'Leaves',
    severity: 'Low',
    shortDescription:
      'Leaf margins turn brown and papery, working inward from the edge — typically wind desiccation, heat stress, or irregular watering in Denver\'s low-humidity climate.',
    diagnosis: [
      block(
        'ble-d1',
        "Brown, papery leaf margins on Denver tomatoes are almost always a physical stress response to moisture loss, not a disease. The combination of low humidity (often 15–20% RH in summer), intense UV at elevation, and frequent afternoon winds desiccates leaf margins faster than the plant can replace the moisture through the roots. If the browning is worse on west-facing leaves, afternoon wind is the likely driver. If it's uniform and the soil has been inconsistently moist, irrigation is the culprit."
      ),
      block(
        'ble-d2',
        "True potassium deficiency also presents as brown margins but usually includes interveinal yellowing between the margin and the green center of the leaf. Fertilizer salt burn from over-application shows as rapid, uniform tip-and-edge browning across all plant levels simultaneously. Compare against those patterns before diagnosing."
      ),
    ],
    solution: [
      block(
        'ble-s1',
        "1. Switch to drip irrigation if you haven't. Overhead watering wastes moisture to evaporation before it reaches roots at Denver's altitude, and uneven delivery creates the boom-bust soil moisture cycle that causes scorch. 2. Mulch 3–4 inches of straw or wood chips to buffer soil temperature and hold moisture between watering events. 3. If wind is the cause, a physical windbreak helps — even a row of taller plants on the windward side reduces desiccation significantly."
      ),
      block(
        'ble-s2',
        "4. If potassium deficiency is confirmed, apply a granular potassium source (sulfate of potash is better than muriate of potash in alkaline Colorado soils). 5. Don't prune scorched leaves unless they're more than 50% dead — the remaining green tissue is still photosynthesizing."
      ),
    ],
    preventionTip:
      'Drip irrigation on a timer plus heavy mulch prevents almost all leaf scorch in Zone 5b. Consistent soil moisture is more important than total water volume.',
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-purple-undersides',
    _type: 'tomatoSymptom',
    symptomName: 'Purple Undersides on Leaves',
    category: 'Leaves',
    severity: 'Low',
    shortDescription:
      'Leaf undersides develop a purple or reddish-purple tint — almost always phosphorus unavailability due to cool soil temperature or high pH, common early in Denver\'s season.',
    diagnosis: [
      block(
        'pu-d1',
        "Purple leaf undersides are nearly always a phosphorus availability problem rather than a phosphorus deficiency in the soil. Phosphorus becomes chemically unavailable to plants when soil temperature drops below 55°F — which in Denver's raised beds means any time before late April, and sometimes into early May after a cold stretch. Colorado's alkaline soil (often pH 7.5–8.0+) also binds phosphorus. The plant looks phosphorus-starved even when amendments are present, because the soil chemistry prevents uptake."
      ),
      block(
        'pu-d2',
        "Young transplants set out before soil temperatures have warmed are especially prone. The purple typically fades on its own over 2–3 weeks as soil warms in May. If it persists into June without fading, there may be a genuine pH or nutrient issue worth investigating."
      ),
    ],
    solution: [
      block(
        'pu-s1',
        "1. If plants were set out before soil temps consistently hit 60°F, wait 2–3 weeks — the purple usually resolves on its own as the soil warms. A $10 soil thermometer is worth having for this exact situation. 2. If the purple persists past Memorial Day: apply a phosphorus source that works at higher pH levels. Bone meal scratched in at the base of the plant is a slow-release option. A liquid kelp and fish emulsion combination applied as a foliar spray provides faster uptake. 3. If pH is above 8.0, a sulfur amendment (agricultural sulfur) applied in fall will gradually lower pH over the following season — this unlocks multiple nutrients including phosphorus."
      ),
    ],
    preventionTip:
      "Use a soil thermometer and don't transplant tomatoes until soil reads above 60°F at 2-inch depth. Patience in May prevents weeks of nutrient struggle.",
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-curling-leaves',
    _type: 'tomatoSymptom',
    symptomName: 'Curling or Rolling Leaves',
    category: 'Leaves',
    severity: 'Medium',
    shortDescription:
      'Leaves roll or cup upward — may be harmless physiological stress in July heat, or a sign of virus, broad mite damage, or aphid feeding depending on which leaves are affected.',
    diagnosis: [
      block(
        'cl-d1',
        "Leaf curl has multiple causes and the location and texture of the curl tells you which. Lower leaves curling upward with a thick, leathery feel and no color change is physiological leaf roll — a harmless stress response to heat or slightly high soil moisture. This is the most common form in Denver in July and needs no action. Leaves rolling inward with mottled yellow-green mosaic coloring suggests Tomato Mosaic Virus, which has no cure."
      ),
      block(
        'cl-d2',
        "Distorted, twisted new growth that fails to unfurl normally, combined with bronzing, suggests broad mites (nearly invisible to the naked eye) — they concentrate on growing tips. Downward leaf curl combined with sticky residue and tiny soft-bodied insects is aphid feeding. Each of these requires a different response, so identifying which leaves are affected and what they look like is the diagnostic work."
      ),
    ],
    solution: [
      block(
        'cl-s1',
        "For physiological curl (leathery, lower leaves, no color change): ensure soil moisture isn't waterlogged, improve airflow by removing crossing branches, and do nothing else. The plant will self-correct. For suspected virus: remove and bag infected plants immediately. Don't compost. Sanitize tools with a 10% bleach solution. There is no treatment."
      ),
      block(
        'cl-s2',
        "For broad mites (distorted new growth): apply sulfur dust in early morning or evening — never in heat above 90°F, which causes phytotoxicity on tomato foliage. Repeat after 7–10 days. For aphid curl: see the Aphid Colonies symptom entry. Wash hands before handling plants if you've smoked — tobacco mosaic virus is a real transmission risk."
      ),
    ],
    preventionTip:
      'Control aphid populations proactively, as they\'re the primary vector for mosaic virus. Source transplants from reputable suppliers with known disease-free propagation practices.',
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-white-powdery-coating',
    _type: 'tomatoSymptom',
    symptomName: 'White Powdery Coating on Leaves',
    category: 'Leaves',
    severity: 'Medium',
    shortDescription:
      'White or gray powdery spots spread across leaf surfaces — powdery mildew, common in Denver in late summer when nights cool down while days stay warm.',
    diagnosis: [
      block(
        'wpc-d1',
        "Powdery mildew on tomatoes in Colorado is caused by Leveillula taurica, which behaves differently from the powdery mildew that hits squash and cucumbers. It's most active from August through September when nights drop into the 50s°F but days are still warm — the temperature differential triggers the fungus. Unlike many fungal diseases, it spreads faster in dry conditions, not wet ones. It starts as discrete white powdery spots on leaf surfaces and eventually coats the entire leaf."
      ),
      block(
        'wpc-d2',
        "It rarely kills the plant outright, but it reduces photosynthetic capacity and can trigger early leaf drop, shortening the harvest window. A plant with powdery mildew in early August still has time for meaningful fruit production if managed well. The same plant with heavy mildew in late July is more concerning. Managing it is realistic; eliminating it once established is not."
      ),
    ],
    solution: [
      block(
        'wpc-s1',
        "1. At first signs: mix 1 tablespoon baking soda plus 1 teaspoon horticultural oil per gallon of water and apply as a foliar spray in early morning. Repeat every 5–7 days. Potassium bicarbonate (sold as Milstop or similar) is more effective and worth using instead. 2. Neem oil applied at 7-day intervals before significant spread provides good control. 3. Remove heavily infected leaves to reduce the spore load on the plant."
      ),
      block(
        'wpc-s2',
        "4. Once mildew covers more than 30–40% of the plant, control rather than cure is the realistic goal. Keep watering consistent, maintain fruit production through harvest, and plan to clear the bed and replant a different crop in that position next season. 5. Avoid overhead watering, which moves spores between plants."
      ),
    ],
    preventionTip:
      "Space plants for airflow — unpruned suckers create humid microclimates that accelerate mildew. Some varieties like 'Iron Lady' and most modern hybrid cherry types carry significantly better powdery mildew resistance.",
    infographic: null,
    relatedVideo: null,
  },

  // ── FRUIT ───────────────────────────────────────────────────────────────
  {
    _id: 'symptom-blossom-end-rot',
    _type: 'tomatoSymptom',
    symptomName: 'Blossom End Rot',
    category: 'Fruit',
    severity: 'High',
    shortDescription:
      'Dark, leathery sunken patch develops on the bottom of the fruit — caused by inconsistent watering disrupting calcium delivery, not by calcium-deficient soil.',
    diagnosis: [
      block(
        'ber-d1',
        "Blossom end rot is not a disease, and it's not a calcium deficiency in your soil — it's a calcium delivery failure inside the plant. The plant can't move calcium fast enough to developing fruit tips when water supply is inconsistent. Calcium moves with water through the transpiration stream. When that stream stutters due to drought-flood watering cycles, the fruit tip runs out of calcium before the cells fully develop, and those cells collapse and decay. Denver's raised beds can go from adequately moist to bone-dry in 48 hours in July, which disrupts delivery constantly."
      ),
      block(
        'ber-d2',
        "Large-fruited beefsteak varieties are far more susceptible than cherry types because their fruit tips are farther from the stem and more demanding. The first fruits of the season are often worst affected; later fruits on the same plant may be completely clean once irrigation stabilizes. Adding calcium to the soil rarely helps — the problem is transport, not supply."
      ),
    ],
    solution: [
      block(
        'ber-s1',
        "1. The only real fix is consistent soil moisture. Get on a drip irrigation timer. Stop hand-watering on irregular schedules. 2. Cut off and discard all affected fruit immediately — they won't recover and leaving them on the plant wastes the plant's resources. 3. Calcium spray (calcium chloride foliar spray, sold as Rot-Stop or Blossom End Rot Spray) applied directly to developing fruit provides some in-season help, but it's a bandage. It won't fix the problem if irrigation remains inconsistent."
      ),
      block(
        'ber-s2',
        "4. Stop all mid-season nitrogen fertilizing if you've been applying it. A nitrogen push drives rapid foliage growth that competes with fruit for calcium. Let the plant focus on fruit. 5. Mulch heavily to buffer soil moisture swings between watering events. 6. Grow cherry tomatoes in the beds most prone to moisture fluctuations — they're nearly immune to blossom end rot."
      ),
    ],
    preventionTip:
      'Drip irrigation on a timer is the single most effective prevention for blossom end rot. Consistent water delivery eliminates the problem in most cases.',
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-cracking-splitting',
    _type: 'tomatoSymptom',
    symptomName: 'Cracking and Splitting Fruit',
    category: 'Fruit',
    severity: 'Medium',
    shortDescription:
      'Radial or concentric cracks appear on ripe or ripening fruit — caused by rapid water uptake after a dry period, extremely common in Denver after monsoon rains.',
    diagnosis: [
      block(
        'cs-d1',
        "Cracking happens when a tomato absorbs water rapidly after the fruit skin has already firmed up, and the internal pressure exceeds what the skin can handle. In Denver's monsoon season (typically July–August), the classic scenario is a week of dry heat followed by an afternoon thunderstorm — a bed full of nearly-ripe tomatoes can crack overnight. Radial cracks run from stem to blossom end. Concentric cracks circle the shoulder. Both indicate moisture irregularity, though some heirloom varieties have a genetic predisposition to concentric cracking regardless of conditions."
      ),
      block(
        'cs-d2',
        "Roma and paste types are bred for crack resistance. Brandywines, Cherokee Purples, and most large heirlooms crack easily in a wet spell. The cracking itself isn't the problem — entry points for bacteria and mold are the downstream issue, and cracked fruit spoils quickly."
      ),
    ],
    solution: [
      block(
        'cs-s1',
        "1. Harvest any fruit that has reached the breaker stage (showing a blush of color) before anticipated rain or a monsoon pattern sets in. Tomatoes ripen fine off the vine at room temperature and won't crack in your kitchen. 2. Cracked fruit is still good — use it immediately. Cut around the cracked section, which typically extends 1/4 to 1/2 inch into the flesh. Don't let cracked fruit sit on the vine."
      ),
      block(
        'cs-s2',
        "3. Consistent drip irrigation prevents the drought-flood cycle that causes cracking. If you're relying on rainfall or hand-watering, be especially consistent during monsoon season. 4. If a specific variety is cracking every season, it's not the right variety for your watering setup. Switch to crack-resistant types like 'Mountain Fresh Plus', 'Celebrity', or any paste tomato for that bed position."
      ),
    ],
    preventionTip:
      "Drip irrigation eliminates most cracking. If you grow heirlooms, watch the weather forecast and harvest at the breaker stage before any significant rain event.",
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-cat-facing',
    _type: 'tomatoSymptom',
    symptomName: 'Cat-Facing',
    category: 'Fruit',
    severity: 'Low',
    shortDescription:
      'Fruit develops with severe puckering, scarring, or open holes near the blossom end — caused by cold temperatures during pollination, most common on first fruits in May.',
    diagnosis: [
      block(
        'cf-d1',
        "Cat-facing is a developmental abnormality caused by temperatures below 55°F during pollination and early fruit development. When the flowers experience cold stress, the pistil and stamens can partially fuse with the developing ovary tissue as the fruit sets, creating the scarred, rippled, puckered appearance — sometimes with open cavities — on the finished fruit. In Denver, this happens almost exclusively on the first tomatoes of the season, set out in early May and catching a late cold snap. The plant looks healthy; the fruit just looks alarming."
      ),
      block(
        'cf-d2',
        "Large-fruited beefsteak varieties are far more susceptible than cherry types because their flowers are more complex and have more parts that can fuse incorrectly. Affected fruit is completely edible — cat-facing is purely cosmetic. Later fruits on the same plant set under warmer temperatures will typically be normal."
      ),
    ],
    solution: [
      block(
        'cf-s1',
        "1. No fix for already-affected fruit — eat them. The flavor is unaffected. 2. Protect transplants with row cover any time overnight lows are forecast below 55°F. Even one cold night during fruit set can produce cat-facing on multiple developing fruits. 3. Hold large-fruited varieties until nighttime temperatures are reliably above 55°F — typically late May in Denver, not early May. Rushing them into the garden gains you nothing if they spend the first three weeks struggling with cold stress."
      ),
    ],
    preventionTip:
      "Keep row cover on large-fruited tomatoes through mid-May at minimum. A tomato set out May 20 in good conditions consistently outperforms one set out May 1 in cold stress.",
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-sunscald',
    _type: 'tomatoSymptom',
    symptomName: 'Sunscald',
    category: 'Fruit',
    severity: 'Medium',
    shortDescription:
      'White or pale yellow papery patches appear on the sun-exposed side of developing fruit — more common at Denver\'s elevation due to intense UV radiation and abundant sunshine.',
    diagnosis: [
      block(
        'sun-d1',
        "Sunscald is essentially a sunburn on developing fruit. At 5,280 feet, UV radiation is roughly 25% more intense than at sea level, and Denver's 300+ sunny days per year means sustained exposure. Sunscald appears as a pale green or yellow patch on the side of the fruit facing direct afternoon sun, which becomes white and papery as cells die. It's most common when foliage is removed or dies back from disease, exposing fruit that was previously shaded by the canopy."
      ),
      block(
        'sun-d2',
        "Aggressive pruning or significant early blight defoliation in July dramatically increases sunscald risk by removing the leaf cover that was protecting developing fruit. This is one reason pruning strategies that work well in cloudier climates are often too aggressive for Denver's intensity of sunshine."
      ),
    ],
    solution: [
      block(
        'sun-s1',
        "1. Shade cloth (30–40% block) strung over affected beds during July–August peak UV is the most effective intervention. It lowers surface temperature by 10–15°F and blocks the UV that causes the damage. 2. Don't prune foliage aggressively in summer — the leaf canopy is protection. Leave more foliage than you think you need. 3. Sunscalded fruit is still edible. Cut away the damaged section (the papery tissue typically extends 1/4 to 1/2 inch in) and use the rest."
      ),
      block(
        'sun-s2',
        "4. Stake and cage plants to maintain an upright canopy rather than letting branches sprawl where they create gaps in fruit cover. 5. If sunscald is recurrent on a specific bed, install a permanent shade structure or choose that bed for shade-tolerant crops next season."
      ),
    ],
    preventionTip:
      "In Denver, don't prune tomatoes as aggressively as you might in cloudier climates. Leaf cover is sunscreen. Install shade cloth proactively in June before peak UV arrives.",
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-green-shoulders',
    _type: 'tomatoSymptom',
    symptomName: 'Green Shoulders',
    category: 'Fruit',
    severity: 'Low',
    shortDescription:
      'Tomato ripens everywhere except the top shoulder, which stays green, yellow, or hard — caused by heat and UV inhibiting lycopene production, plus some variety genetics.',
    diagnosis: [
      block(
        'gs-d1',
        "Green shoulders are caused by a combination of high temperatures, UV exposure, and for some varieties, genetics. When the air temperature around the fruit top is consistently above 85°F and the shoulder is receiving direct sun, lycopene production (the red pigment) stalls in that zone. The shoulder becomes the warmest, most UV-exposed part of the fruit and effectively burns before it can ripen. Denver's hot, sunny summers make this more common here than in cloudier climates."
      ),
      block(
        'gs-d2',
        "Some heirloom varieties — Brandywine, Cherokee Purple, and many Eastern European types — have green shoulder as a genetic characteristic that exists regardless of conditions. For those, a slight green tinge at the shoulder is normal and the fruit is fully ripe. Judge ripeness by feel (slight give when squeezed gently) and aroma rather than waiting for full color change."
      ),
    ],
    solution: [
      block(
        'gs-s1',
        "1. Shade cloth over the bed reduces surface temperature by 10–15°F, which keeps fruit temps in the lycopene-production range. 2. Harvest at the breaker stage and ripen indoors at room temperature — tomatoes ripened indoors in a single layer often develop more even coloring than those left on the vine through peak afternoon heat. 3. Never refrigerate tomatoes before they're fully ripe — cold temperatures permanently halt the ripening process and destroy flavor."
      ),
    ],
    preventionTip:
      "Plant heat-tolerant hybrid varieties for consistent ripening in Denver summers. For heirlooms, taste for ripeness rather than waiting for perfect color — green shoulders on a Brandywine are normal and the tomato is ripe.",
    infographic: null,
    relatedVideo: null,
  },

  // ── ROOTS ───────────────────────────────────────────────────────────────
  {
    _id: 'symptom-root-rot',
    _type: 'tomatoSymptom',
    symptomName: 'Root Rot',
    category: 'Roots',
    severity: 'High',
    shortDescription:
      'Plant wilts suddenly despite moist soil, and roots are brown, mushy, or foul-smelling — Pythium or Phytophthora water mold from overwatering or poor drainage.',
    diagnosis: [
      block(
        'rr-d1',
        "Root rot is caused by water molds (primarily Pythium and Phytophthora) that colonize roots under waterlogged, anaerobic soil conditions. The counterintuitive above-ground symptom — wilting despite moist soil — happens because the rotted roots can no longer absorb and transport water, so the plant wilts even when sitting in wet ground. In raised beds, root rot almost always traces back to overwatering or an insufficient drainage layer in the soil mix. Pull the plant and inspect the roots: healthy roots are white and firm; rotted roots are brown, mushy, and often smell foul."
      ),
    ],
    solution: [
      block(
        'rr-s1',
        "1. If caught early with only some roots affected: let the soil dry out significantly before watering again. Water only when a moisture probe or your finger at 3-inch depth indicates dryness. Apply a copper-based fungicide as a soil drench per label instructions to reduce the water mold population. 2. If more than half the root system is affected: remove and bag the plant. Do not compost it — water mold spores survive composting."
      ),
      block(
        'rr-s2',
        "3. After removal, correct the underlying cause. If the soil mix is too dense or too water-retentive, work in additional perlite (add 10–15% by volume). Avoid overwatering remaining plants. 4. A soil moisture probe (available for $15–25) removes the guesswork from watering decisions entirely."
      ),
    ],
    preventionTip:
      'Use a soil mix with at least 10% perlite for drainage. Water based on actual soil moisture readings rather than a schedule, and never water again before the top 2 inches have dried.',
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-stunted-growth-wilting',
    _type: 'tomatoSymptom',
    symptomName: 'Stunted Growth with Afternoon Wilting',
    category: 'Roots',
    severity: 'High',
    shortDescription:
      'Plant wilts in afternoon heat but partially recovers overnight, grows slowly, and has no obvious above-ground disease — often Fusarium or Verticillium wilt infecting the vascular system.',
    diagnosis: [
      block(
        'sgw-d1',
        "When a tomato wilts in afternoon heat but recovers overnight, and this pattern repeats for days without an obvious cause, Fusarium or Verticillium wilt is likely. These are soil-borne fungal diseases that infect the root system and vascular tissue, blocking water transport upward. To confirm: cut the main stem cleanly at 6 inches above soil level and examine the cross-section. Brown or tan discoloration in the ring of vascular tissue (the ring visible just inside the bark) confirms wilt disease. Clear tissue rules it out."
      ),
      block(
        'sgw-d2',
        "Verticillium wilt is more common in Colorado's cooler soils and causes slower decline. Fusarium wilt is more aggressive and often causes rapid plant collapse. Both are soil-borne and persist in the soil for multiple years after an infected plant is removed. The V and F designations on modern hybrid tomato tags indicate resistance to these specific pathogens."
      ),
    ],
    solution: [
      block(
        'sgw-s1',
        "1. No effective chemical cure once the plant is infected. Remove and bag infected plants promptly. 2. Don't replant tomatoes in the same raised bed for at least 2–3 seasons. 3. Soil solarization — covering moist soil with clear plastic for 4–6 weeks during peak summer heat — reduces the pathogen load significantly before replanting. 4. When replanting, use only varieties with V and F resistance designations in that bed. Most modern hybrids carry these."
      ),
    ],
    preventionTip:
      'Rotate tomato beds every season — never grow tomatoes in the same raised bed two years in a row. Choose varieties with V and F resistance designations for beds where wilt has occurred.',
    infographic: null,
    relatedVideo: null,
  },

  // ── STEMS ───────────────────────────────────────────────────────────────
  {
    _id: 'symptom-stem-cankers',
    _type: 'tomatoSymptom',
    symptomName: 'Stem Cankers',
    category: 'Stems',
    severity: 'High',
    shortDescription:
      'Dark, sunken lesions appear on the main stem and may girdle it — either Botrytis gray mold (common in cool, humid spring conditions) or bacterial canker, both serious.',
    diagnosis: [
      block(
        'sc-d1',
        "Stem cankers on tomatoes are one of the more serious above-ground symptoms. Dark, water-soaked lesions that sink into the stem and develop gray fuzzy growth = Botrytis cinerea (gray mold), which thrives in cool, humid conditions — common in Denver in May and June when nights are cold and plants are enclosed under row cover or cold frames with poor airflow. The fuzzy gray spore mass is diagnostic."
      ),
      block(
        'sc-d2',
        "Brown to dark cankers that develop a white dried-tissue margin and may exude bacterial ooze = bacterial canker (Clavibacter michiganensis), which is seed-borne and harder to manage. Both can girdle the stem, cutting off water and nutrient flow to everything above the lesion. Act quickly on any stem canker — once the stem is girdled, the plant above that point is lost."
      ),
    ],
    solution: [
      block(
        'sc-s1',
        "For Botrytis: improve airflow immediately — remove row cover during the day once temperatures allow, prune crossing branches, and ensure plants aren't touching each other. Apply a copper fungicide or biofungicide (Serenade) to affected areas and surrounding tissue. Avoid any overhead watering. Remove dead tissue promptly — Botrytis colonizes dead plant material first before attacking living tissue."
      ),
      block(
        'sc-s2',
        "For bacterial canker: there is no effective treatment once a plant is infected. Remove and bag it. Sanitize all pruning tools with a 10% bleach solution between plants. Do not compost infected material. Start the following season with certified disease-free transplants or seed-started plants from a clean seed source."
      ),
    ],
    preventionTip:
      "Open row cover and cold frames during the day to prevent the humid, stagnant conditions that trigger Botrytis. Water only at the base of the plant, never overhead.",
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-early-blight-stems',
    _type: 'tomatoSymptom',
    symptomName: 'Early Blight (Stem and Leaf Lesions)',
    category: 'Stems',
    severity: 'Medium',
    shortDescription:
      'Concentric brown ring (target-spot) lesions on lower leaves and stems — Alternaria early blight is nearly universal in Zone 5b; manage it rather than try to eliminate it.',
    diagnosis: [
      block(
        'ebs-d1',
        "Early blight (Alternaria solani) is arguably the most common tomato disease in Colorado. It produces the distinctive target-ring lesion — concentric brown circles that look like a bullseye, first on the lowest, oldest leaves and stems, then working upward over the season. In Denver, it's effectively endemic: nearly every tomato in every garden gets some early blight by mid-August. It's not a failure of your growing system; it's the baseline condition you're managing around."
      ),
      block(
        'ebs-d2',
        "The disease becomes a yield problem only when it defoliates enough of the plant to meaningfully reduce photosynthesis. A plant that loses its bottom third to blight in August while maintaining a healthy upper canopy will still produce a full crop. A plant defoliated to the top six inches by mid-July is in serious trouble. Spores are wind-borne and soil-splash-borne, so mulching and proper spacing are the two highest-leverage preventative actions."
      ),
    ],
    solution: [
      block(
        'ebs-s1',
        "1. Remove infected lower leaves as they appear and bag them — don't leave them on the soil surface where they continue to spread spores. 2. Apply copper fungicide (copper octanoate or copper hydroxide) every 7–10 days starting at first signs. Begin earlier if you had blight last season — a preventative program starting in late June is far more effective than reactive treatment."
      ),
      block(
        'ebs-s2',
        "3. Mulch heavily to prevent soil splash, which is a primary spore transmission route from soil to lower leaves. 4. Stake and cage plants to keep foliage off the ground. 5. Accept that some blight is inevitable — redirect energy toward slowing the progression rather than eliminating it."
      ),
    ],
    preventionTip:
      "Start a preventative copper spray program in late June, before blight pressure begins. Heavy mulch blocking soil splash is the second most important prevention after spray timing.",
    infographic: null,
    relatedVideo: null,
  },

  // ── GROWTH ──────────────────────────────────────────────────────────────
  {
    _id: 'symptom-no-fruit-set',
    _type: 'tomatoSymptom',
    symptomName: 'No Fruit Set (Flower Drop)',
    category: 'Growth',
    severity: 'High',
    shortDescription:
      'Plant flowers abundantly but flowers drop without setting fruit — temperature extremes outside the 55–95°F pollination window are the most common cause in Denver.',
    diagnosis: [
      block(
        'nfs-d1',
        "Tomatoes fail to set fruit when temperatures are outside the viable pollination range: below 55°F at night or above 95°F during the day. Pollen becomes sterile at high temperatures and flowers abort in cold. In Denver, both ends of this range are regular occurrences — cool May nights and hot July afternoons. Plants can look spectacularly healthy, flower continuously, and drop every flower without setting a single fruit. It's almost always weather-driven, not a problem with the plant."
      ),
      block(
        'nfs-d2',
        "Secondary causes include excessive nitrogen (plant remains vegetative and doesn't switch to reproductive mode), absence of pollinators, and humidity extremes. If you're fertilizing heavily mid-season and seeing lush green growth with no fruit, nitrogen is likely contributing. Stop fertilizing and observe over the next 2–3 weeks."
      ),
    ],
    solution: [
      block(
        'nfs-s1',
        "1. For cold nights: use row cover to trap heat. Even a 3–5°F difference overnight can keep flowers viable. This is most effective in May and early June. 2. For heat: shade cloth reduces air temperature by 5–10°F, which can keep you inside the viable pollination range. Limited direct intervention is available during heat waves — sometimes you simply wait it out. 3. Gently shake flower clusters each morning to release pollen — this mimics the buzz-pollination of native bees and aids self-pollination."
      ),
      block(
        'nfs-s2',
        "4. If excessive nitrogen is suspected: stop all fertilization immediately. Water slightly less frequently to let the plant experience mild stress, which encourages the shift to reproductive mode. 5. Plant heat-tolerant varieties. 'Juliet', 'Sungold', 'Celebrity', and most cherry types set reliably at higher temperatures. Large beefsteaks are the most sensitive to temperature extremes."
      ),
    ],
    preventionTip:
      "Choose heat-set varieties for Denver summers if no-set is a recurring problem. Keep row cover accessible in May and early June for nights forecast below 55°F.",
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-excessive-foliage',
    _type: 'tomatoSymptom',
    symptomName: 'Excessive Foliage, Little Fruit',
    category: 'Growth',
    severity: 'Medium',
    shortDescription:
      'Plant grows large and lush with deep-green leaves but very few tomatoes — almost always a nitrogen over-application problem in well-amended raised beds.',
    diagnosis: [
      block(
        'ef-d1',
        "A tomato with deep green, large, almost succulent-looking leaves and almost no fruit is over-nitrogenized. Excess nitrogen drives the plant to stay in vegetative mode rather than transitioning to reproduction. This is one of the most common mistakes in raised beds that have been heavily amended over multiple seasons — if you composted the bed in fall, added amendments in spring, and then fertilized again mid-season, you may have created a foliage machine. The plant is doing exactly what nitrogen tells it to do; the problem is the signal."
      ),
      block(
        'ef-d2',
        "It can also happen if the bed grew a nitrogen-fixing cover crop the previous fall (crimson clover, hairy vetch) and that nitrogen is releasing heavily through the season. Or if a deep layer of fresh manure was incorporated without adequate composting time. The plant looks spectacular and will produce almost no tomatoes until the nitrogen pulse passes."
      ),
    ],
    solution: [
      block(
        'ef-s1',
        "1. Stop all nitrogen fertilization immediately — no fish emulsion, no compost tea, no granular nitrogen. 2. Reduce watering frequency slightly. Not to wilting point, but allowing the soil to get moderately dry between watering events. Mild moisture stress encourages the plant to shift toward reproductive mode. 3. Be patient — once the nitrogen pulse passes, the plant will typically begin setting fruit within 2–4 weeks."
      ),
      block(
        'ef-s2',
        "4. A small application of a high-phosphorus fertilizer (bone meal or superphosphate) worked into the top inch of soil can help shift the balance toward flowering. Phosphorus promotes reproductive growth. 5. For future seasons: if your beds have been composted for 2+ years, test the soil before adding nitrogen. Well-established raised beds often don't need additional nitrogen at planting."
      ),
    ],
    preventionTip:
      "Test your soil before adding amendments each season. Mature, well-composted raised beds frequently don't need additional nitrogen fertilizer at planting time.",
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-leggy-seedlings',
    _type: 'tomatoSymptom',
    symptomName: 'Leggy Seedlings',
    category: 'Growth',
    severity: 'Low',
    shortDescription:
      'Seedlings grow tall and spindly with long internodes and thin stems that can\'t support themselves — caused by insufficient light during the indoor growing period.',
    diagnosis: [
      block(
        'ls-d1',
        "Leggy seedlings are a light problem, not a soil or watering problem. When seedlings don't receive enough light, they etiolate — stretching upward in search of the light source while allocating very little energy to leaf mass or stem thickness. The sign is long internodes (the space between leaf pairs) combined with stems too thin to support themselves. In Colorado, starting tomatoes under a south-facing window in March rarely provides enough light — the sun angle is still low and overcast days are frequent. Most windowsill-started seedlings are leggy by the time transplant season arrives."
      ),
      block(
        'ls-d2',
        "Under grow lights, legginess usually means the fixture is too far from the tops of the plants. Seedlings need to be 2–4 inches below the light source. At 12 or 18 inches, they stretch for the light and produce exactly the long-internoded, thin-stemmed plants you see. A second common cause is starting too early — plants started 10–12 weeks before transplant date have twice the time to get leggy compared to plants started 6 weeks out."
      ),
    ],
    solution: [
      block(
        'ls-s1',
        "1. For mildly leggy transplants: plant deeply. Tomatoes root along their buried stem, so a 9-inch leggy seedling can be planted in a trench with only the top 3 inches above soil. The buried stem will produce roots and the plant will establish strongly. 2. For severely leggy seedlings: start over if time permits with better lighting. If not, plant deeply and add a stake immediately."
      ),
      block(
        'ls-s2',
        "3. Under lights: lower the fixture so it's 2–4 inches above seedling tops. Set timer for 16 hours on, 8 hours off. 4. Run a small fan on low speed near the seedlings — the gentle mechanical movement stimulates thicker stem cell production. 5. Don't start tomatoes more than 6–7 weeks before transplant date. Earlier is not better."
      ),
    ],
    preventionTip:
      "Use full-spectrum LED grow lights positioned 2–4 inches above seedling tops. Start tomatoes 6 weeks before anticipated transplant date — not earlier. More light at the right time beats more time under inadequate light.",
    infographic: null,
    relatedVideo: null,
  },

  // ── PESTS ───────────────────────────────────────────────────────────────
  {
    _id: 'symptom-hornworm-damage',
    _type: 'tomatoSymptom',
    symptomName: 'Hornworm Damage',
    category: 'Pests',
    severity: 'High',
    shortDescription:
      'Foliage disappears rapidly with large irregular bite marks and dark green pellet droppings — tomato hornworm can strip a plant bare in 48 hours and is perfectly camouflaged.',
    diagnosis: [
      block(
        'hw-d1',
        "Tomato hornworm (Manduca quinquemaculata) is the single most damaging pest on Colorado tomatoes. A large caterpillar — up to 4 inches long at maturity — can strip a plant bare overnight. They're nearly perfectly camouflaged, matching the green of healthy tomato foliage with white diagonal stripes. The giveaway before you find the caterpillar: large irregular bite marks from stem tips working inward, and dark green or black pellet-shaped frass (droppings) on leaves and soil below the feeding site. The frass is the most reliable early indicator."
      ),
      block(
        'hw-d2',
        "Hornworms are present from June through September in Zone 5b. Look from below the plant upward — they hang on the underside of branches during the day. Find the frass first, then look at the branch directly above it for the caterpillar. Once you've found and calibrated on the color pattern, they become much easier to spot on subsequent checks."
      ),
    ],
    solution: [
      block(
        'hw-s1',
        "1. Handpick immediately and drop in soapy water. This is the most effective single intervention. Check every branch carefully — once you find one, look for additional caterpillars on adjacent plants. 2. Bacillus thuringiensis (Bt) spray is a biological insecticide that kills caterpillars without harming beneficial insects. Apply in the evening when hornworms are actively feeding, and reapply after rain. Use Bt before worms reach full size for best results."
      ),
      block(
        'hw-s2',
        "3. If you find a hornworm covered in small white rice-grain-shaped protrusions, those are cocoons of parasitic Braconid wasps. Leave that hornworm alone — it's already doomed and the wasps emerging from those cocoons will parasitize the next generation of hornworms in your garden. 4. Check plants twice weekly once June arrives. Early detection of a small caterpillar prevents the overnight defoliation of a large one."
      ),
    ],
    preventionTip:
      "Till the soil in fall to expose overwintering pupae to freezing temperatures and birds. Plant dill or parsley nearby to attract parasitic wasps. Check plant undersides twice weekly starting in June.",
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-aphid-colonies',
    _type: 'tomatoSymptom',
    symptomName: 'Aphid Colonies',
    category: 'Pests',
    severity: 'Medium',
    shortDescription:
      'Dense clusters of soft-bodied green, black, or yellow insects on new growth and leaf undersides — aphids weaken plants and are the primary vector for mosaic virus.',
    diagnosis: [
      block(
        'aph-d1',
        "Tomato aphids — primarily green peach aphid (Myzus persicae) — cluster on new growth, stem tips, and leaf undersides, sucking plant sap. In small numbers they're a minor issue the plant handles without help. The danger is scale: a colony that doubles every few days can reach thousands of individuals and stress even a large, healthy plant. More critically, aphids are the primary vector for Cucumber Mosaic Virus and several other plant pathogens, transmitting disease as they move between plants."
      ),
      block(
        'aph-d2',
        "Signs beyond the obvious clusters: sticky residue (honeydew) on lower leaves, which coats surfaces and promotes black sooty mold growth. Ants actively tending and protecting aphid colonies — ants farm aphids for honeydew. Distorted, curled new growth where aphid feeding has disrupted cell development. Yellowing and weakened growing tips. If you see ants running up and down your tomato stems, look carefully at the growing tips for aphids they're protecting."
      ),
    ],
    solution: [
      block(
        'aph-s1',
        "1. For small colonies: blast with a strong jet of water, targeting leaf undersides. This knocks aphids off and many won't return. Repeat daily for 3–4 days. 2. Insecticidal soap (1–2 tablespoons per quart of water) kills aphids on contact and breaks down quickly with no residue. Coverage is everything — aphids in crevices and stem joints that the soap doesn't directly contact will survive. 3. Neem oil disrupts the aphid lifecycle and provides residual protection for 3–5 days."
      ),
      block(
        'aph-s2',
        "4. Don't use systemic insecticides (neonicotinoids like imidacloprid or clothianidin) — they persist in plant tissue and kill the ladybugs, lacewing larvae, and parasitic wasps that are your best long-term aphid control. 5. If ants are farming the colony, control the ants (sticky trap around the stem base or diatomaceous earth) and the aphid population often collapses on its own as predatory insects access the colony."
      ),
    ],
    preventionTip:
      "Encourage beneficial insects by planting dill, fennel, and cilantro near tomato beds. Check plant tips and undersides weekly from June onward — a small colony is manageable; a large one is not.",
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-spider-mite-stippling',
    _type: 'tomatoSymptom',
    symptomName: 'Spider Mite Stippling',
    category: 'Pests',
    severity: 'Medium',
    shortDescription:
      'Leaves develop a dusty bronze or silver stippled appearance — spider mites thrive in Denver\'s hot, dry summers and populations double every 3–4 days if untreated.',
    diagnosis: [
      block(
        'sms-d1',
        "Two-spotted spider mites (Tetranychus urticae) thrive in exactly the conditions Denver summers provide: heat above 80°F and low relative humidity. They're not insects but arachnids, which means most common pesticides won't control them. Damage appears as thousands of tiny white or yellow dots on the upper leaf surface (feeding punctures from below the leaf), giving the plant a dusty, bronzed appearance from a distance. Heavily infested leaves show fine webbing on undersides, with tiny moving dots visible on close inspection."
      ),
      block(
        'sms-d2',
        "Plants under water stress are significantly more susceptible — mites exploit drought-weakened tissue. A bad infestation can defoliate a plant within 2–3 weeks during peak summer. The population growth curve is steep: one female can produce 20 eggs per day and a new generation matures every 3–4 days at 90°F. Catching them early is the difference between a manageable problem and a season-ending one."
      ),
    ],
    solution: [
      block(
        'sms-s1',
        "1. Remove water stress first — ensure consistent irrigation. Mites exploit and accelerate on drought-weakened plants. 2. Strong water spray on leaf undersides daily reduces populations dramatically. Mites are disrupted by water and don't return well after being dislodged from their feeding sites. 3. Insecticidal soap or neem oil applied specifically to leaf undersides (where mites live and feed) is effective for moderate infestations. Spray in the morning on a calm day."
      ),
      block(
        'sms-s2',
        "4. Spinosad is not effective against mites — it targets insects. For severe infestations, use a miticide (pyrethrin-based or bifenazate) following label directions. 5. Predatory mites (Phytoseiulus persimilis, available online) are effective biological control in protected environments or greenhouses. In open gardens they disperse too quickly to be cost-effective."
      ),
    ],
    preventionTip:
      "Keep plants well-watered — drought stress is the single biggest mite risk factor. Check leaf undersides weekly starting in July. Act at first stippling; a mite problem caught early costs 20 minutes to treat.",
    infographic: null,
    relatedVideo: null,
  },
  {
    _id: 'symptom-flea-beetle-holes',
    _type: 'tomatoSymptom',
    symptomName: 'Flea Beetle Holes',
    category: 'Pests',
    severity: 'Low',
    shortDescription:
      'Dozens of tiny round holes scattered across leaves, giving a shotgun-blast appearance — flea beetles are a spring pest that can damage seedlings but rarely threatens established tomato plants.',
    diagnosis: [
      block(
        'fbh-d1',
        "Flea beetle damage is distinctive: dozens to hundreds of tiny round holes punched through the leaf, as if sprayed with a shotgun. The beetles themselves are tiny (1–2mm), shiny black or brownish, and spring off the leaf like fleas when disturbed — tap the plant and you'll see them scatter. In Denver they're most active in April and May, which is exactly when you're transplanting seedlings. The real danger is to seedlings and recently transplanted tomatoes — severe defoliation of a 4-inch plant can set it back significantly or kill it."
      ),
      block(
        'fbh-d2',
        "Once tomato plants are established and growing vigorously (a foot tall with a developed root system), flea beetle damage is essentially cosmetic. The plant grows faster than the beetles eat. This pest is primarily a seedling threat, not a mature-plant threat, which shapes how you respond to it."
      ),
    ],
    solution: [
      block(
        'fbh-s1',
        "1. For seedlings: cover immediately with row cover after transplanting. Physical exclusion is the most effective protection and the one that requires no chemical inputs. 2. Kaolin clay (sold as Surround WP) applied as a foliar coating deters flea beetles by making the plant surface physically uncomfortable for feeding. Reapply after rain. 3. Diatomaceous earth dusted on leaves and around the base of plants provides some deterrence."
      ),
      block(
        'fbh-s2',
        "4. For established plants with flea beetle damage: assess honestly. If the plant is vigorous, the holes are cosmetic. Do nothing. 5. If a small plant is getting hammered: move it temporarily under row cover or apply a pyrethrin spray in early morning. Flea beetles are least active in cool morning temperatures."
      ),
    ],
    preventionTip:
      "Keep row cover on transplants for the first 2–3 weeks after planting. This is the critical vulnerability window. Remove surrounding weeds, which serve as reservoir hosts between seasons.",
    infographic: null,
    relatedVideo: null,
  },
]

async function seed() {
  console.log(`Seeding ${symptoms.length} tomatoSymptom documents...`)
  const results = await Promise.all(
    symptoms.map((doc) =>
      client.createOrReplace(doc).then((r) => {
        process.stdout.write('.')
        return r
      })
    )
  )
  console.log(`\nDone. ${results.length} symptoms seeded.`)
}

seed().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
