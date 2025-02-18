'use client'

import { DataTable } from '@/components/ui/data-table'
import { useTransition, useState } from 'react'
import { Button } from '@/components/ui/button'
import RsvpForm from './RsvpForm'
import { getRsvpsColumns } from '@/app/dashboard/rsvps/columns'
import { deleteRsvpById } from '@/actions/rsvps'
import { toast } from 'sonner'

const RsvpsTable = ({ rsvps, attendees, events }) => {
  const [isPending, startTransition] = useTransition()
  const [rsvpData, setRsvpData] = useState(null)
  const [actionType, setActionType] = useState('edit')

  const handleDelete = (rsvp) => {
    startTransition(async () => {
      const res = await deleteRsvpById(rsvp.id)
      if (res.status === 'success') {
        toast.success(`Successfully deleted`)
      } else {
        {
          toast.error(`Something went wrong`)
        }
      }
    })
  }

  const handleUpdate = (rsvp) => {
    // console.log('attendee', rsvp)
    setRsvpData(rsvp)
    setActionType('edit')
  }
  //   console.log('rsvpData', rsvpData)
  const handleAdd = () => {
    setRsvpData(null)
    setActionType('add')
  }
  const closeDialog = () => {
    setRsvpData(null)
    setActionType('xxx')
  }

  const columns = getRsvpsColumns({
    onDelete: handleDelete,
    onEdit: handleUpdate,
  })

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="text-white" onClick={handleAdd}>
          Add RSVP
        </Button>
      </div>
      <DataTable data={rsvps} columns={columns} />
      {rsvpData || actionType === 'add' ? (
        <RsvpForm
          data={rsvpData}
          attendees={attendees}
          events={events}
          actionType={actionType}
          onClose={closeDialog}
        />
      ) : null}
    </>
  )
}

export default RsvpsTable
