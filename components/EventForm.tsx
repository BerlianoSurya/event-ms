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
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { eventSchema } from '@/utils/formSchema'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type EventData = {
  name: string
  startOn: string
  isPrivate: boolean
  status: string
  street: string
  streetNumber: number
  description: string
  zip: number
} | null

const EventForm = ({
  actionType,
  eventData,
  handleClose,
}: {
  actionType: string
  eventData: EventData
  // handleClose: void
}) => {
  const [errors, setErrors] = useState({})
  const withHandleClose = (action: any, handleClose: () => void) => {
    return async (prevState: any, formData: FormData) => {
      const result = await action(prevState, formData)
      if (result?.success === true) {
        setErrors({})
        toast.success('The form is successfully submit.')
        handleClose()
      } else {
        const errorMap = {}
        result?.errors.forEach((issue) => {
          errorMap[issue.path[0]] = issue.message
        })
        setErrors(errorMap)
        result?.errors.every((error) => {
          toast.error(error.message)
        })
      }
      return result
    }
  }
  const wrappedAction = withHandleClose(editEvent, handleClose)
  const [formState, formAction, isPending] = useActionState(wrappedAction, null)

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
            status: eventData?.status,
            street: eventData?.street,
            streetNumber: eventData?.streetNumber,
            zip: eventData?.zip,
            description: eventData?.description,
          }
        : {
            isPrivate: false,
            startOn: new Date().toISOString().split('T')[0],
          },
  })

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="h-[80vh] max-h-[80vh] sm:min-w-[70vw] sm:max-md:max-w-[70vw] !overflow-scroll">
        <DialogHeader>
          <DialogTitle>
            {actionType === 'add' ? 'Add Attendee' : 'Update Attendee'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form action={formAction}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-2 rounded-md p-4 shadow">
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event title" {...field} />
                  </FormControl>

                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
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

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-2 rounded-md p-4 shadow">
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="street" {...field} />
                  </FormControl>
                  {errors.street && (
                    <p className="text-red-500 text-sm">{errors.street}</p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streetNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-2 rounded-md p-4 shadow">
                  <FormLabel>Street Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="streetNumber"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  {errors.streetNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.streetNumber}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-2 rounded-md p-4 shadow">
                  <FormLabel>ZIP</FormLabel>
                  <FormControl>
                    <Input placeholder="zip code" type="number" {...field} />
                  </FormControl>
                  {errors.zip && (
                    <p className="text-red-500 text-sm">{errors.zip}</p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-2 rounded-md p-4 shadow">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-2 rounded-md p-4 shadow">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name="status"
                    >
                      <SelectTrigger>
                        <SelectValue id="status" placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                        <SelectItem value="started">Started</SelectItem>
                        <SelectItem value="ended">Ended</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>{' '}
                    </Select>
                  </FormControl>

                  {errors.status && (
                    <p className="text-red-500 text-sm">{errors.status}</p>
                  )}
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
                  <input type="hidden" name="isPrivate" value={field.value} />
                </FormItem>
              )}
            />
            <div className="flex justify-center space-x-3 space-y-0 rounded-md p-4 shadow">
              <Button
                disabled={isPending}
                className="justify-self-center text-white hover:bg-slate-800"
                type="submit"
              >
                {isPending ? (
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  `Save event`
                )}
              </Button>
              <input type="hidden" name="actionType" value={actionType} />
              {actionType === 'edit' && (
                <input type="hidden" name="eventId" value={eventData?.id} />
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EventForm
