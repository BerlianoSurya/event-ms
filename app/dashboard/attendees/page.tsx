import { DataTable } from '@/components/ui/data-table'
import { getAttendees, getGuestList } from '@/utils/attendees'
import { getCurrentUser } from '@/utils/users'
import { Attendees, columns } from './columns'

const AttendeesPage = async () => {
  const user = await getCurrentUser()
  const attendees = await getAttendees()
  return (
    <div className="mx-5 my-5">
      {attendees.map((guest) => (
        <div key={guest.id}>{guest.name}</div>
      ))}
      <DataTable data={attendees} columns={columns} />
    </div>
  )
}

export default AttendeesPage
