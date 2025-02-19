'use server'

import { db } from '@/db/db'
import { rsvps } from '@/db/schema'
import { revalidateTag } from 'next/cache'
import { and, asc, count, desc, eq, ne, not } from 'drizzle-orm'
import { rsvpSchema } from '@/utils/formSchema'

export const deleteRsvpById = async (rsvpId: string) => {
  const deleteRsvp = await db.delete(rsvps).where(eq(rsvps.id, rsvpId))
  revalidateTag('dashboard:rsvps')
  revalidateTag('rsvps')
  if (deleteRsvp?.rowsAffected > 0) {
    return { status: 'success' }
  } else {
    return { status: 'failed', message: 'RSVP not found or already deleted' }
  }
}

export const addEditRsvp = async (prevstate: any, formData: FormData) => {
  const validation = await rsvpSchema.safeParse({
    attendeeId: formData.get('attendeeId'),
    status: formData.get('status'),
    eventId: formData.get('eventId'),
  })

  if (validation.success) {
    if (formData.get('actionType')) {
      if (formData.get('actionType') === 'add') {
        await db.insert(rsvps).values({
          attendeeId: formData.get('attendeeId'),
          status: formData.get('status'),
          eventId: formData.get('eventId'),
        })
        revalidateTag('dashboard:rsvps')
        revalidateTag('rsvps')
      } else if (formData.get('actionType') === 'edit') {
        await db
          .update(rsvps)
          .set({
            attendeeId: formData.get('attendeeId'),
            status: formData.get('status'),
            eventId: formData.get('eventId'),
          })
          .where(eq(rsvps.id, formData.get('rsvpId')))

        revalidateTag('dashboard:rsvps')
        revalidateTag('rsvps')
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
