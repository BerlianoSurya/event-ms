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
  eventsForColumn,
  attendeesForColumn,
}): ColumnDef<RsvpType>[] => [
  {
    accessorKey: 'attendeeId',
    header: 'Name',
    cell: ({ row }) => {
      const attendee = attendeesForColumn.find(
        (a) => a.id === row.original.attendeeId
      )
      return attendee ? attendee.name : 'Unknown Attendee'
    },
  },
  {
    accessorKey: 'status',
    header: 'status',
  },
  {
    accessorKey: 'eventId',
    header: 'Event',
    cell: ({ row }) => {
      const event = eventsForColumn.find((e) => e.id === row.original.eventId)
      return event ? event.name : 'Unknown Event'
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <RowActionProps row={row} onDelete={onDelete} onEdit={onEdit} />
    ),
  },
]
