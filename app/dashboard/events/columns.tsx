'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import RowActionProps from '@/components/RowActionProps'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type EventsType = {
  id: string
  name: string
  street: string
  streetNumber: number
  zip: number
  description: string | null
  isPrivate: boolean
  status: string
  startOn: Date
}

export const getEventsColumns = ({
  onEdit,
  onDelete,
}): ColumnDef<EventsType>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'startOn',
    header: 'Event Date',
    cell: ({ row }) =>
      new Date(row.getValue('startOn')).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
  },
  {
    accessorKey: 'isPrivate',
    header: 'Private',
    cell: ({ row }) => {
      const value = row.getValue<boolean>('isPrivate')
      return (
        <div className="flex justify-center">
          <Checkbox
            className=" data-[state=checked]:bg-white"
            checked={value}
            disabled
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'street',
    header: 'Street',
  },
  {
    accessorKey: 'streetNumber',
    header: 'Street Number',
  },
  {
    accessorKey: 'zip',
    header: 'ZIP',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <RowActionProps row={row} onDelete={onDelete} onEdit={onEdit} />
    ),
  },
]
