'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import RowActionProps from '@/components/RowActionProps'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RsvpType = {
  attendeeId: string
  eventId: string
  status: string
}

export const getRsvpsColumns = ({
  onEdit,
  onDelete,
}): ColumnDef<RsvpType>[] => [
  {
    accessorKey: 'attendeeId',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'status',
  },
  {
    accessorKey: 'eventId',
    header: 'Event',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <RowActionProps row={row} onDelete={onDelete} onEdit={onEdit} />
    ),
  },
]
