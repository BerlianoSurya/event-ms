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

const authSchema = z.object({
  name: z.string(),
  createdById: z.string(),
  startOn: z.string().date(),
  isPrivate: z.boolean(),
})

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
  await db.delete(events).where(eq(events.id, eventId))
  revalidateTag('dashboard:events')
  revalidateTag('events')
}

export const editEvent = async (prevstate: any, formData: FormData) => {
  console.log(formData)

  return { message: 'Form submitted' }
  // const data = authSchema.parse({
  //   name: formData.get('name'),
  //   createdById: formData.get('createdById'),
  //   startOn: formData.get('startOn'),
  //   isPrivate: formData.get('isPrivate'),
  // })
  // try {
  //   const event = await editEventUtil(data)
  // } catch (e) {
  //   console.log(e)
  //   return { message: 'Failed to sign you up' }
  // }
  // redirect('/dashboard')
}
