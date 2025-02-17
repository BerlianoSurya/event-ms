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
import { addEditAttendee } from '@/actions/attendees'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { attendeesSchema } from '@/utils/formSchema'
type AttendeeData = {
  name: string
  email: string
} | null
const AttendeesForm = ({
  data,
  actionType,
  onClose,
}: {
  data: AttendeeData
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
    resolver: zodResolver(attendeesSchema),
    defaultValues:
      actionType === 'edit'
        ? { name: data?.name, email: data?.email }
        : { name: '', email: '' },
  })

  const wrappedAction = withHandleClose(addEditAttendee, onClose)
  const [state, formAction] = useActionState(wrappedAction, null)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === 'add' ? 'Add Attendee' : 'Update Attendee'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form action={formAction} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-2 rounded-md p-4 shadow">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>

                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-2 rounded-md p-4 shadow">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>

                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </FormItem>
              )}
            />
            <div className="flex justify-center mt-4">
              <Button type="submit" className="text-white font-extrabold">
                {actionType === 'add' ? 'Add' : 'Update'}
              </Button>
            </div>

            <input type="hidden" name="actionType" value={actionType} />
            {actionType === 'edit' && (
              <input type="hidden" name="attendeeId" value={data?.id} />
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AttendeesForm
