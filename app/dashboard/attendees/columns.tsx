'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import RowActionProps from '@/app/dashboard/attendees/RowActionProps'

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
