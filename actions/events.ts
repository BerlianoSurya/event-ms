'use server'

import { db } from '@/db/db'
import { events } from '@/db/schema'
import { delay } from '@/utils/delay'
import { getCurrentUser } from '@/utils/users'
import randomName from '@scaleway/random-name'
import { revalidateTag } from 'next/cache'
import { and, asc, count, desc, eq, ne, not } from 'drizzle-orm'

export const createNewEvent = async () => {
  await delay()
  const user = await getCurrentUser()

  await db.insert(events).values({
    startOn: new Date().toUTCString(),
    createdById: user.id,
    isPrivate: false,
    name: randomName('event', ' '),
  })
  revalidateTag('dashboard:events')
  revalidateTag('events')
}

export const deleteEventById = async (eventId: string) => {
  await delay()
  console.log('EVENTID', eventId)
  await db.delete(events).where(eq(events.id, eventId))
  revalidateTag('dashboard:events')
  revalidateTag('events')
}
