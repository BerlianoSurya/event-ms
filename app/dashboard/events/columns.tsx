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
import { Checkbox } from '@/components/ui/checkbox'

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

export const getColumns = ({
  handleEdit,
  handleDelete,
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
    cell: ({ row }) => {
      const event = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEdit(event.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(event.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
