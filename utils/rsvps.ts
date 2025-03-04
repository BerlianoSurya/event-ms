import 'server-only'
import { db } from '@/db/db'
import { and, desc, eq, inArray } from 'drizzle-orm'
import { rsvps, events, attendees } from '@/db/schema'
import { memoize } from 'nextjs-better-unstable-cache'

export const getRsvpsForDashboard = memoize(
  async (userId: string) => {
    const userEvents = await db.query.events.findMany({
      where: eq(events.createdById, userId),
      columns: {
        id: true,
      },
    })

    const userEventIds = userEvents.map((event) => event.id)
    if (!userEventIds.length) return []

    const data = await db
      .selectDistinct()
      .from(attendees)
      .where(inArray(rsvps.eventId, userEventIds))
      .leftJoin(rsvps, eq(attendees.id, rsvps.attendeeId))
      .leftJoin(events, eq(rsvps.eventId, events.id))
      .orderBy(desc(rsvps.createdAt))
      .execute()

    return data
  },
  { persist: true, revalidateTags: () => ['dashboard:rsvps'] }
)

export const getAllRsvps = memoize(
  async () => {
    const data = await db
      .select()
      .from(rsvps)
      .orderBy(desc(rsvps.createdAt))
      .execute()
    return data
  },
  { persist: true, revalidateTags: () => ['dashboard:rsvps'] }
)
