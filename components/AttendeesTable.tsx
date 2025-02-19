'use client'

import { getAttendeesColumns } from '@/app/dashboard/attendees/columns'
import { DataTable } from '@/components/ui/data-table'
import { deleteAttendee } from '@/actions/attendees'
import { useTransition, useState } from 'react'
import AttendeesForm from '@/components/AttendeesForm'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type Attendee = {
  id: string
  name: string
  email: string
}

type AttendeesTableProps = {
  attendees: Attendee[]
}

const AttendeesTable = ({ attendees }: AttendeesTableProps) => {
  console.log('attend', attendees)
  const [isPending, startTransition] = useTransition()
  const [editAttendee, setEditAttendee] = useState(null)
  const [actionType, setActionType] = useState('edit')

  const handleDelete = (attendee: Attendee) => {
    startTransition(async () => {
      const res = await deleteAttendee(attendee.id)
      if (res.status === 'success') {
        toast.success(`Successfully deleted`)
      } else {
        {
          toast.error(`Something went wrong`)
        }
      }
    })
  }

  const handleUpdate = (attendee: any) => {
    setEditAttendee(attendee)
    setActionType('edit')
  }
  const handleAdd = () => {
    setEditAttendee(null)
    setActionType('add')
  }
  const closeDialog = () => {
    setEditAttendee(null)
    setActionType('xxx')
  }

  const columns = getAttendeesColumns({
    onDelete: handleDelete,
    onEdit: handleUpdate,
  })

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="text-white" onClick={handleAdd}>
          Add Attendee
        </Button>
      </div>
      <DataTable data={attendees} columns={columns} />
      {editAttendee || actionType === 'add' ? (
        <AttendeesForm
          actionType={actionType}
          data={editAttendee}
          onClose={closeDialog}
        />
      ) : null}
    </>
  )
}

export default AttendeesTable
