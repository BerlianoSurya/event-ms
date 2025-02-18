import { DataTable } from '@/components/ui/data-table'
import { getAttendees, getGuestList } from '@/utils/attendees'
import { getCurrentUser } from '@/utils/users'
// import { Attendees, columns } from './columns';
import { useCallback, useMemo } from 'react'
import { getAttendeesColumns } from './columns'
import AttendeesTable from '@/components/AttendeesTable'

const AttendeesPage = async () => {
  const user = await getCurrentUser()
  const attendees = await getAttendees()
  return (
    <div className="mx-5 my-5">
      <div className="w-full justify-center my-6 text-4xl">
        <h1 className="text-center font-extrabold">Attendee List</h1>
      </div>
      <AttendeesTable attendees={attendees} />
    </div>
  )
}

export default AttendeesPage
