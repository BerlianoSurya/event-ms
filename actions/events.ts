'use server'

import { db } from '@/db/db'
import { events } from '@/db/schema'
import { delay } from '@/utils/delay'
import { getCurrentUser } from '@/utils/users'
import randomName from '@scaleway/random-name'
import { revalidateTag } from 'next/cache'
import { and, asc, count, desc, eq, ne, not } from 'drizzle-orm'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/utils/constants'
import { editEventUtil } from '@/utils/events'
import { eventSchema } from '@/utils/formSchema'

export const createNewEvent = async () => {
  await delay()
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
  await delay()
  console.log('EVENTID', eventId)
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
  console.log(formData)

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
export async function getEventIdsAndNames() {
  const data = await db
    .select({ id: events.id, name: events.name })
    .from(events)
  return data.map((event) => ({ label: event.name, value: event.id }))
}
