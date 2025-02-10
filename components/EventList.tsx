'use client'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { useTransition } from 'react'
import { deleteEventById } from '@/actions/events'

const EventList = async ({ data }) => {
  const [isShown, setShown] = useState(false)
  const [eventId, setEventId] = useState('')
  const [isPending, startTransition] = useTransition()
  const handleClick = (eventId: string) => {
    startTransition(() => {
      setShown(true)
      if (eventId) setEventId(eventId)
    })
  }
  const handleClose = () => {
    startTransition(() => {
      setShown(false)
    })
  }
  const handleDelete = async (eventId: string) => {
    startTransition(async () => {
      await deleteEventById(eventId) // Call the server function
    })
  }

  return (
    <div>
      <div className="m-6 relative flex flex-col bg-gray-950 overflow-scroll text-foreground shadow-md rounded-xl bg-clip-border">
        <table className="w-auto h-auto text-left table-auto">
          <thead>
            <tr>
              <th className="p-4 border-e border-neutral-200 px-6 py-4 dark:border-white/10 bg-slate-900">
                Event Title
              </th>
              <th className="p-4 border-e border-neutral-200 px-6 py-4 dark:border-white/10 bg-slate-900">
                Start On
              </th>
              <th className="p-4 border-e border-neutral-200 px-6 py-4 dark:border-white/10 bg-slate-900">
                Created By
              </th>
              <th className="p-4 border-e border-neutral-200 px-6 py-4 dark:border-white/10 bg-slate-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((event: any) => (
              <tr className="hover:bg-gray-700 border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                  {event.name}
                </td>
                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                  {event.startOn}
                </td>
                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                  {event.createdById}
                </td>
                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                  <Button onClick={() => handleClick(event.id)}>Edit</Button>
                  <Button
                    onClick={() => handleDelete(event.id)}
                    disabled={isPending}
                  >
                    {isPending ? 'Deleting...' : 'Delete'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isShown && (
        <div>
          this is modal {eventId}
          <Button onClick={() => handleClose()}>Edit</Button>
        </div>
      )}
    </div>
  )
}

export default EventList
