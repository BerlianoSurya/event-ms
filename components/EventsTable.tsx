'use client'

import { DataTable } from '@/components/ui/data-table'
import { useTransition, useState } from 'react'
import { Button } from '@/components/ui/button'
import { deleteEventById } from '@/actions/events'
import EventForm from './EventForm'
import { getEventsColumns } from '@/app/dashboard/events/columns'
import { toast } from 'sonner'

const EventsTable = ({ events }) => {
  const [isPending, startTransition] = useTransition()
  const [eventData, setEventData] = useState(null)
  const [actionType, setActionType] = useState('edit')

  const handleDelete = (event) => {
    startTransition(async () => {
      const res = await deleteEventById(event.id)
      if (res.status === 'success') {
        toast.success(`Successfully deleted`)
      } else {
        {
          toast.error(`Something went wrong`)
        }
      }
    })
  }

  const handleUpdate = (event) => {
    setEventData(event)
    setActionType('edit')
  }
  const handleAdd = () => {
    setEventData(null)
    setActionType('add')
  }
  const closeDialog = () => {
    setEventData(null)
    setActionType('xxx')
  }

  const columns = getEventsColumns({
    onDelete: handleDelete,
    onEdit: handleUpdate,
  })

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="text-white" onClick={handleAdd}>
          Add Events
        </Button>
      </div>
      <DataTable data={events} columns={columns} />
      {eventData || actionType === 'add' ? (
        <EventForm
          actionType={actionType}
          eventData={eventData}
          handleClose={closeDialog}
        />
      ) : null}
    </>
  )
}

export default EventsTable
