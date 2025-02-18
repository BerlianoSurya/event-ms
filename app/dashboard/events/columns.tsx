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
    header: 'startOn',
  },
  {
    accessorKey: 'isPrivate',
    header: 'isPrivate',
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
    header: 'status',
  },
  {
    accessorKey: 'street',
    header: 'street',
  },
  {
    accessorKey: 'streetNumber',
    header: 'streetNumber',
  },
  {
    accessorKey: 'zip',
    header: 'zip',
  },
  {
    accessorKey: 'description',
    header: 'description',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <RowActionProps row={row} onDelete={onDelete} onEdit={onEdit} />
    ),
  },
]
