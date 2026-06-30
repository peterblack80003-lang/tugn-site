import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const docType = body?._type

    if (docType === 'article') {
      revalidatePath('/articles')
      if (body?.slug?.current) {
        revalidatePath(`/articles/${body.slug.current}`)
      }
    } else if (docType === 'tomatoSymptom') {
      revalidatePath('/tomato-problem-solver')
    } else if (docType === 'zoneGuide') {
      revalidatePath('/zone-5-denver-gardening-guide')
    } else if (docType === 'raisedBedHub') {
      revalidatePath('/raised-bed-command-center')
    } else if (docType === 'siteSettings') {
      revalidatePath('/')
    } else {
      revalidatePath('/')
      revalidatePath('/articles')
    }

    return NextResponse.json({ revalidated: true, type: docType, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: String(err) }, { status: 500 })
  }
}
