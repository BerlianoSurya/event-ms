import 'server-only'
// 'use server'
import { db } from '@/db/db'
import { and, asc, count, desc, eq, ne, not } from 'drizzle-orm'
import { events, rsvps } from '@/db/schema'
import { delay } from './delay'
import { memoize } from 'nextjs-better-unstable-cache'

export const getEventsForDashboard = memoize(
  async (userId: string) => {
    await delay()

    const data = await db.query.events.findMany({
      where: eq(events.createdById, userId),
      columns: {
        id: true,
        name: true,
        startOn: true,
        status: true,
      },
      with: {
        rsvps: true,
      },
      limit: 5,
      orderBy: [asc(events.startOn)],
    })

    return data ?? []
  },
  { persist: true, revalidateTags: () => ['dashboard:events'] }
)

export const getAllEvents = memoize(
  async (userId: string) => {
    await delay()
    const data = await db.query.events.findMany({
      where: eq(events.createdById, userId),
      orderBy: [asc(events.startOn)],
    })
    return data
  },
  { persist: true, revalidateTags: () => ['events', 'dashboard:events'] }
)

export const getOneEvent = memoize(
  async (userId: string, eventId: string) => {
    await delay()
    const data = await db.query.events.findFirst({
      where: and(eq(events.id, eventId), eq(events.createdById, userId)),
    })
    return data
  },
  {
    persist: true,
    revalidateTags: (eventId) => ['events', eventId],
  }
)

export const editEventUtil = async ({
  name,
  createdById,
  startOn,
  isPrivate,
}: {
  name: string
  createdById: string
  startOn: string
  isPrivate: boolean
}) => {
  const rows = await db
    .insert(events)
    .values({
      name,
      createdById,
      startOn,
      isPrivate,
    })
    .returning({
      id: events.id,
      name: events.name,
    })

  const data = rows[0]

  return data
}
