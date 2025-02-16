import { z } from 'zod'

export const eventSchema = z.object({
  name: z.string().min(5, 'Event title too short'),
  startOn: z.coerce.date(),
  isPrivate: z.coerce.boolean().default(false),
  status: z.enum(['draft', 'live', 'started', 'ended', 'canceled'], {
    message: 'Select a status',
  }),
  street: z.string().min(3, { message: 'Street too short' }),
  streetNumber: z.coerce
    .number()
    .int()
    .positive()
    .refine((val) => val !== 0, {
      message: 'Street number cannot be zero.',
    }),
  zip: z.coerce
    .number({
      required_error: 'ZIP Code is required',
      invalid_type_error: 'ZIP Code must be a number',
    })
    .refine((val) => `${val}`.length === 5, 'ZIP Code must be 5 digit long'),
  description: z.string(),
})
