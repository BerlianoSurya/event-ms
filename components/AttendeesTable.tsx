'use client'

import { getAttendeesColumns } from '@/app/dashboard/attendees/columns'
import { DataTable } from '@/components/ui/data-table'
import { deleteAttendee } from '@/actions/attendees'
import { useTransition, useState } from 'react'
import AttendeesForm from '@/components/AttendeesForm'
import { Button } from '@/components/ui/button'

const AttendeesTable = ({ attendees }) => {
  const [isPending, startTransition] = useTransition()
  const [editAttendee, setEditAttendee] = useState(null)
  const [actionType, setActionType] = useState('edit')

  const handleDelete = (id) => {
    startTransition(async () => {
      await deleteAttendee(id)
    })
  }

  const handleUpdate = (attendee) => {
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
