'use server'

import { db } from '@/db/db'
import { attendees, events, rsvps } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { attendeesSchema } from '@/utils/formSchema'
import { revalidateTag } from 'next/cache'
import { memoize } from 'nextjs-better-unstable-cache'

export const deleteAttendee = async (id: string) => {
  const del = await db.delete(attendees).where(eq(attendees.id, id))
  revalidateTag('dashboard:attendees')

  if (del?.rowsAffected > 0) {
    return { status: 'success' }
  } else {
    return { status: 'failed', message: 'Something went wrong' }
  }
}

export const addEditAttendee = async (prevstate: any, formData: FormData) => {
  const validation = await attendeesSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
  })

  if (validation.success) {
    if (formData.get('actionType')) {
      if (formData.get('actionType') === 'add') {
        await db.insert(attendees).values({
          email: formData.get('email') as string,
          name: formData.get('name') as string,
        })
        revalidateTag('dashboard:attendees')
        revalidateTag('attendees')
      } else if (formData.get('actionType') === 'edit') {
        await db
          .update(attendees)
          .set({
            name: formData.get('name') as string,
            email: formData.get('email') as string,
          })
          .where(eq(attendees.id, (formData.get('attendeeId') as string) || ''))

        revalidateTag('dashboard:attendees')
        revalidateTag('attendees')
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

export const getAttendeeIdsAndNames = memoize(
  async () => {
    const data = await db
      .select({ id: attendees.id, name: attendees.name })
      .from(attendees)
    return data.map((attendee) => ({
      label: attendee.name,
      value: attendee.id,
    }))
  },
  { persist: true, revalidateTags: () => ['attendeeIdName'] }
)

export const getForAttendeeIdsAndNames = memoize(
  async () => {
    return await db
      .select({ id: attendees.id, name: attendees.name })
      .from(attendees)
  },
  { persist: true, revalidateTags: () => ['attendeeIdName'] }
)
