'use client'

import { ColumnDef } from '@tanstack/react-table'
import RowActionProps from '@/components/RowActionProps'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AttendeesType = {
  id: string
  name: string
  email: string
}

export const getAttendeesColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (attendee: AttendeesType) => void // Expecting a function with an attendee parameter
  onDelete: (attendee: AttendeesType) => void
}): ColumnDef<AttendeesType>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <RowActionProps row={row} onDelete={onDelete} onEdit={onEdit} />
    ),
  },
]
