import { draftMode } from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const redirectTo = params.get('redirectTo') || '/'

  draftMode().disable()
  redirect(redirectTo)
}