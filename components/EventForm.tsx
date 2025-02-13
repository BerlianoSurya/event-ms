'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
// import { Input, DatePicker, Checkbox } from '@nextui-org/react'
import SubmitButton from './SubmitButton'
import { parseDate, getLocalTimeZone } from '@internationalized/date'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { editEvent } from '@/actions/events'
import Datepicker from './Datepicker'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type EventData = {
  name: string
  startOn: string
  isPrivate: boolean
} | null

const eventSchema = z.object({
  name: z.string().min(1, 'String cannot be empty'),
  startOn: z.coerce.date(),
  isPrivate: z.boolean().default(false),
})
const EventForm = ({
  actionType,
  eventData,
  handleClose,
}: {
  actionType: string
  eventData: EventData
  handleClose: void
}) => {
  const withHandleClose = (action: any, handleClose: () => void) => {
    return async (prevState: any, formData: FormData) => {
      const result = await action(prevState, formData)
      handleClose() // Close modal after form submission
      return result
    }
  }
  const wrappedAction = withHandleClose(editEvent, handleClose)
  const [formState, formAction] = useActionState(wrappedAction, null)

  console.log(formState)
  console.log('fields returned: ', { ...(formState?.fields ?? {}) })

  const form = useForm({
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
        : { startOn: new Date().toISOString().split('T')[0] },
  })

  // console.log('date', typeof eventData.startOn)

  return (
    <Form {...form}>
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
        // onSubmit={(e) => {
        //   // e.preventDefault()
        //   handleClose()
        // }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-y-2 rounded-md p-4 shadow">
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="Event title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startOn"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-y-2 rounded-md p-4 shadow">
              <FormLabel>Date</FormLabel>

              <Datepicker
                name={'startOn'}
                selected={field.value}
                onSelect={field.onChange}
              />

              <input
                type="hidden"
                name="startOn"
                value={new Date(field.value).toISOString() || ''}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <div>
            <Label>Date</Label>
          </div> */}
        <FormField
          control={form.control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 shadow">
              <FormControl>
                <Checkbox
                  className="text-white"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Private</FormLabel>
              </div>
              <input
                type="hidden"
                name="isPrivate"
                value={field.value ? 'true' : 'false'}
              />
            </FormItem>
          )}
        />
        {/* <div>
            <label>
              <input type="checkbox" {...form.register('isPrivate')} />
              Private Event
            </label>
          </div> */}
        <div className="flex justify-center space-x-3 space-y-0 rounded-md p-4 shadow">
          <Button
            className="justify-self-center text-white hover:bg-slate-800"
            type="submit"
          >
            Save event
          </Button>
          <input type="hidden" name="actionType" value={actionType} />
          {actionType === 'edit' && (
            <input type="hidden" name="eventId" value={eventData?.id} />
          )}
        </div>
      </form>
    </Form>
  )
}

export default EventForm
