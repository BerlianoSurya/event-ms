'use client'

import { useActionState, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { rsvpSchema } from '@/utils/formSchema'
import { addEditRsvp } from '@/actions/rsvps'

const statusOptions = [
  { label: 'Going', value: 'going' },
  { label: 'Not going', value: 'not-going' },
  { label: 'Maybe', value: 'maybe' },
] as const

type RsvpData = {
  attendeeId: string
  eventId: string
  status: string
} | null

const RsvpForm = ({
  data,
  attendees,
  events,
  actionType,
  onClose,
}: {
  data: RsvpData
  //   attendees:{}[]
  actionType: string
  //   onClose: void
}) => {
  const [errors, setErrors] = useState({})
  const withHandleClose = (action: any, onClose: () => void) => {
    return async (prevState: any, formData: FormData) => {
      const result = await action(prevState, formData)
      if (result?.success === true) {
        setErrors({})
        toast.success('The form is successfully submit.')
        onClose()
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
  const form = useForm({
    resolver: zodResolver(rsvpSchema),
    defaultValues:
      actionType === 'edit'
        ? {
            attendeeId: data?.attendeeId,
            eventId: data?.eventId,
            status: data?.status,
          }
        : { name: '', email: '', status: '' },
  })

  const wrappedAction = withHandleClose(addEditRsvp, onClose)
  const [state, formAction] = useActionState(wrappedAction, null)
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === 'add' ? 'Add RSVP' : 'Update RSVP'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form action={formAction} className="space-y-4">
            {/* Attendee Selection */}
            <FormField
              control={form.control}
              name="attendeeId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Attendee</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {field.value
                            ? attendees.find((a) => a.value === field.value)
                                ?.label
                            : 'Select attendee'}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search attendee..." />
                        <CommandList>
                          <CommandEmpty>No attendee found.</CommandEmpty>
                          <CommandGroup>
                            {attendees.map((attendee) => (
                              <CommandItem
                                key={attendee.value}
                                onSelect={() =>
                                  form.setValue('attendeeId', attendee.value)
                                }
                              >
                                {attendee.label}
                                <Check
                                  className={`ml-auto ${
                                    attendee.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  }`}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />

                  {errors.attendeeId && (
                    <p className="text-red-500 text-sm">{errors.attendeeId}</p>
                  )}
                  <input type="hidden" name="attendeeId" value={field.value} />
                </FormItem>
              )}
            />

            {/* Event Selection */}
            <FormField
              control={form.control}
              name="eventId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {field.value
                            ? events.find((e) => e.value === field.value)?.label
                            : 'Select event'}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search event..." />
                        <CommandList>
                          <CommandEmpty>No event found.</CommandEmpty>
                          <CommandGroup>
                            {events.map((event) => (
                              <CommandItem
                                key={event.value}
                                onSelect={() =>
                                  form.setValue('eventId', event.value)
                                }
                              >
                                {event.label}
                                <Check
                                  className={`ml-auto ${
                                    event.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  }`}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />

                  {errors.eventId && (
                    <p className="text-red-500 text-sm">{errors.eventId}</p>
                  )}
                  <input type="hidden" name="eventId" value={field.value} />
                </FormItem>
              )}
            />

            {/* Status Selection */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Status</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {field.value
                            ? statusOptions.find((s) => s.value === field.value)
                                ?.label
                            : 'Select status'}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search status..." />
                        <CommandList>
                          <CommandEmpty>No status found.</CommandEmpty>
                          <CommandGroup>
                            {statusOptions.map((status) => (
                              <CommandItem
                                key={status.value}
                                onSelect={() =>
                                  form.setValue('status', status.value)
                                }
                              >
                                {status.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />

                  {errors.status && (
                    <p className="text-red-500 text-sm">{errors.status}</p>
                  )}
                  <input type="hidden" name="status" value={field.value} />
                </FormItem>
              )}
            />
            <div className="flex justify-center space-x-3 space-y-0 rounded-md p-4 shadow">
              <Button
                // disabled={isPending}
                className="justify-self-center text-white hover:bg-slate-800"
                type="submit"
              >
                {/* {isPending ? (
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                ) : ( */}
                `Save event`
                {/* )} */}
              </Button>
              <input type="hidden" name="actionType" value={actionType} />
              {actionType === 'edit' && (
                <input type="hidden" name="rsvpId" value={data?.id} />
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default RsvpForm
