'use server'

import { db } from '@/db/db'
import { attendees, events, rsvps } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { attendeesSchema } from '@/utils/formSchema'
import { revalidateTag } from 'next/cache'

export const deleteAttendee = async (id: string) => {
  await db.delete(attendees).where(eq(attendees.id, id.id))
  revalidateTag('dashboard:attendees')
}

export const addEditAttendee = async (prevstate: any, formData: FormData) => {
  console.log(formData)

  const validation = await attendeesSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
  })

  if (validation.success) {
    if (formData.get('actionType')) {
      if (formData.get('actionType') === 'add') {
        await db.insert(attendees).values({
          email: formData.get('email'),
          name: formData.get('name'),
        })
        revalidateTag('dashboard:attendees')
        revalidateTag('attendees')
      } else if (formData.get('actionType') === 'edit') {
        await db
          .update(attendees)
          .set({
            name: formData.get('name'),
            email: formData.get('email'),
          })
          .where(eq(attendees.id, formData.get('attendeeId')))

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
