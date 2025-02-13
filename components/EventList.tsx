'use client'
import Link from 'next/link'
// import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { useTransition } from 'react'
import { deleteEventById } from '@/actions/events'
import EventForm from './EventForm'
import { Button } from '@/components/ui/button'
import Modal from './Modal'
import { CirclePlus } from 'lucide-react'

const EventList = async ({ data }) => {
  const [isShown, setShown] = useState(false)
  const [addModal, setaddModal] = useState(false)
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
  const handleOpenModal = () => {
    startTransition(() => {
      setaddModal(true)
    })
  }
  const handleClose = () => {
    startTransition(() => {
      setShown(false)
      setEventId('')
    })
  }
  const handleCloseAddModal = () => {
    startTransition(() => {
      setaddModal(false)
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
      <div className="w-full flex justify-end">
        <Button
          className="text-white text-lg"
          onClick={() => handleOpenModal()}
        >
          <CirclePlus size={1114} /> Add event
        </Button>
      </div>
      <div className="my-6 relative flex flex-col bg-gray-950 overflow-scroll text-foreground shadow-md rounded-xl bg-clip-border">
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
                <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10 place-content-around flex gap-4">
                  <Button
                    className="text-white"
                    onClick={() => handleClick(event.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="text-white"
                    onClick={() => handleDelete(event.id)}
                    disabled={isPending}
                  >
                    {'Delete'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isShown} handleClose={handleClose} header="Edit Event">
        <EventForm
          actionType="edit"
          eventData={eventData}
          handleClose={handleClose}
        />
      </Modal>
      <Modal
        isOpen={addModal}
        handleClose={handleCloseAddModal}
        header="Add Event"
      >
        <EventForm
          actionType="add"
          eventData={null}
          handleClose={handleCloseAddModal}
        />
      </Modal>
    </div>
  )
}

export default EventList
