'use server'

import { db } from '@/db/db'
import { events } from '@/db/schema'
import { getCurrentUser } from '@/utils/users'
import randomName from '@scaleway/random-name'
import { revalidateTag } from 'next/cache'
import { and, asc, count, desc, eq, ne, not } from 'drizzle-orm'
import { eventSchema } from '@/utils/formSchema'
import { memoize } from 'nextjs-better-unstable-cache'

export const createNewEvent = async () => {
  const user = await getCurrentUser()

  await db.insert(events).values({
    startOn: new Date(
      new Date().getTime() - Math.floor(Math.random() * 10000000000)
    ).toISOString(),
    createdById: user.id,
    isPrivate: false,
    name: randomName('event', ' '),
  })
  revalidateTag('dashboard:events')
  revalidateTag('events')
}

export const deleteEventById = async (eventId: string) => {
  const del = await db.delete(events).where(eq(events.id, eventId))
  revalidateTag('dashboard:events')
  revalidateTag('events')
  if (del?.rowsAffected > 0) {
    return { status: 'success' }
  } else {
    return { status: 'failed', message: 'Something went wrong' }
  }
}

export const editEvent = async (prevstate: any, formData: FormData) => {
  const validation = await eventSchema.safeParse({
    startOn: formData.get('startOn'),
    isPrivate: formData.get('isPrivate'),
    name: formData.get('name'),
    status: formData.get('status'),
    street: formData.get('street'),
    streetNumber: formData.get('streetNumber'),
    zip: formData.get('zip'),
    description: formData.get('description'),
  })

  if (validation.success) {
    if (formData.get('actionType')) {
      const user = await getCurrentUser()
      if (formData.get('actionType') === 'add') {
        await db.insert(events).values({
          startOn: formData.get('startOn'),
          createdById: user.id,
          isPrivate: Boolean(JSON.parse(formData.get('isPrivate'))),
          name: formData.get('name'),
          status: formData.get('status'),
          street: formData.get('street'),
          streetNumber: formData.get('streetNumber'),
          zip: formData.get('zip'),
          description: formData.get('description'),
        })
        revalidateTag('dashboard:events')
        revalidateTag('events')
      } else if (formData.get('actionType') === 'edit') {
        await db
          .update(events)
          .set({
            startOn: formData.get('startOn'),
            isPrivate: Boolean(JSON.parse(formData.get('isPrivate'))),
            name: formData.get('name'),
            status: formData.get('status'),
            street: formData.get('street'),
            streetNumber: formData.get('streetNumber'),
            zip: formData.get('zip'),
            description: formData.get('description'),
          })
          .where(eq(events.id, formData.get('eventId')))

        revalidateTag('dashboard:events')
        revalidateTag('events')
      }
    }

    return {
      success: validation.success,
      data: validation.data,
      errors: false,
    }
  } else {
    return {
      success: validation.success,
      errors: validation.error.issues,
      data: validation.data,
    }
  }
}
export const getEventIdsAndNames = memoize(async () => {
  const data = await db
    .select({ id: events.id, name: events.name })
    .from(events)
  return data.map((event) => ({ label: event.name, value: event.id }))
})

export const getForRsvpEventIdsAndNames = memoize(async () => {
  return await db.select({ id: events.id, name: events.name }).from(events)
})
