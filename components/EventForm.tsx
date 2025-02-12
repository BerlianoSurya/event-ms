'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { Input, DatePicker, Checkbox } from '@nextui-org/react'
import SubmitButton from './SubmitButton'
import { parseDate, getLocalTimeZone } from '@internationalized/date'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { editEvent } from '@/actions/events'
import Datepicker from './Datepicker'

const initState = { message: null }
const eventSchema = z.object({
  name: z.string(),
  startOn: z.coerce.date(),
  isPrivate: z.boolean(),
})
const EventForm = ({
  actionType,
  eventData,
}: {
  actionType: string
  eventData: {
    name: string
    startOn: string
    isPrivate: boolean
  }
}) => {
  const [formState, formAction] = useActionState(editEvent, null)

  const {
    register,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues:
      actionType === 'edit'
        ? {
            name: eventData?.name,
            startOn: eventData?.startOn
              ? new Date(eventData.startOn).toISOString().split('T')[0]
              : '',
            isPrivate: eventData?.isPrivate,
          }
        : undefined,
  })

  console.log('date', typeof eventData.startOn)

  return (
    <div>
      <form
        // onSubmit={async (e) => {
        //   e.preventDefault()
        //   const eventData = getValues()
        //   if (actionType === 'add') {
        //     // Handle adding event
        //   } else if (actionType === 'edit') {
        //     console.log('DATA', eventData)
        //   }
        // }}
        action={formAction}
      >
        <div>
          <label htmlFor="name">Event Title</label>
          <input
            id="name"
            {...register('name')}
            name="name"
            type="text"
            placeholder="Enter event title"
            required
          />
          {errors.name && (
            <span style={{ color: 'red' }}>{errors.name.message}</span>
          )}
        </div>

        {/* <div>
          <label htmlFor="startOn">Start On</label>
          <input
            id="startOn"
            type="date"
            {...register('startOn')}
            defaultValue={
              eventData.startOn ? eventData.startOn.split('T')[0] : ''
            }
            required
          />
          {errors.startOn && (
            <span style={{ color: 'red' }}>{errors.startOn.message}</span>
          )}
        </div> */}

        <div>
          <Label>Date</Label>
          <Datepicker name={'date'} />
        </div>

        <div>
          <label>
            <input type="checkbox" {...register('isPrivate')} />
            Private Event
          </label>
        </div>

        <button type="submit">Save event</button>
      </form>
    </div>
  )
}

export default EventForm
