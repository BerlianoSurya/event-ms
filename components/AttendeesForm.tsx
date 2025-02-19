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
  id: string
} | null

type ValidationError = {
  validation: string
  code: string
  message: string
  path: string[]
}

type ErrorsType = {
  name?: string
  email?: string
}

const AttendeesForm = ({
  data,
  actionType,
  onClose,
}: {
  data: AttendeeData
  actionType: string
  onClose: () => void
}) => {
  const [errors, setErrors] = useState<ErrorsType>({})
  const withHandleClose = (action: any, onClose: () => void) => {
    return async (prevState: any, formData: FormData) => {
      const result = await action(prevState, formData)
      if (result?.success === true) {
        setErrors({})
        toast.success('The form is successfully submit.')
        onClose()
      } else {
        const errorMap: Record<string, string> = {}
        ;(result?.errors as ValidationError[])?.forEach((issue: any) => {
          errorMap[issue.path[0]] = issue.message
        })
        setErrors(errorMap)
        result?.errors.every((error: ValidationError) => {
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
  const [state, formAction, isPending] = useActionState(wrappedAction, null)

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
              <Button
                disabled={isPending}
                className="justify-self-center text-white hover:bg-slate-800"
                type="submit"
              >
                {isPending ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>{actionType === 'add' ? 'Add' : 'Update'}</span>
                )}
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
