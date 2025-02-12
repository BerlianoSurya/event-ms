'use client'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { useTransition } from 'react'
import { deleteEventById } from '@/actions/events'
import EventForm from './EventForm'

const EventList = async ({ data }) => {
  const [isShown, setShown] = useState(false)
  const [eventId, setEventId] = useState('')
  const [eventData, setEventData] = useState({})
  const [isPending, startTransition] = useTransition()
  const handleClick = (eventId: string) => {
    startTransition(() => {
      setShown(true)
      if (eventId) {
        setEventId(eventId)
        setEventData(data.find((obj) => obj.id === eventId))
      }
    })
  }
  const handleClose = () => {
    startTransition(() => {
      setShown(false)
      setEventId('')
    })
  }
  const handleDelete = async (eventId: string) => {
    startTransition(async () => {
      await deleteEventById(eventId) // Call the server function
    })
  }

  function formatReadableDate(isoString: string) {
    const date = new Date(isoString)
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC', // Ensures it stays in UTC
    }).format(date)
  }

  return (
    <div>
      <h1>afs{`\n${eventId}`}</h1>
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
              <tr className="even:bg-slate-900 hover:bg-slate-700 border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                  {event.name}
                </td>
                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
                  {/* {event.startOn} */}
                  {formatReadableDate(event.startOn)}
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
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClose} // Close modal when clicking the backdrop
        >
          <div
            className="flex flex-col w-[60vw] h-[40vh] bg-gray-700 p-6 rounded-xl shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="flex flex-3 justify-self-center justify-end content-end w-auto items-end">
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-black text-3xl justify-self-end self-end"
              >
                &times;
              </button>
            </div>
            <div className="flex-1">
              <EventForm actionType="edit" eventData={eventData} />
              <p className="text-white">This is modal {eventId}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventList
