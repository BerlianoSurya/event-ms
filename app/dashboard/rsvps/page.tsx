import {
  getAttendeeIdsAndNames,
  getForAttendeeIdsAndNames,
} from '@/actions/attendees'
import {
  getEventIdsAndNames,
  getForRsvpEventIdsAndNames,
} from '@/actions/events'
import RsvpsTable from '@/components/RsvpsTable'
import { getGuestList } from '@/utils/attendees'
import { getAllRsvps } from '@/utils/rsvps'
import { getCurrentUser } from '@/utils/users'

const RsvpsPage = async () => {
  const user = await getCurrentUser()
  const guests = await getGuestList(user.id)
  const attendees = await getAttendeeIdsAndNames()
  const events = await getEventIdsAndNames()
  const rsvps = await getAllRsvps()
  const attendeesForColumn = await getForAttendeeIdsAndNames()
  const eventsForColumn = await getForRsvpEventIdsAndNames()
  // console.log('rsvps', rsvps)

  return (
    <div className="mx-5 my-5">
      <div className="w-full justify-center my-6 text-4xl">
        <h1 className="text-center font-extrabold">RSVP List</h1>
      </div>
      <RsvpsTable
        rsvps={rsvps}
        attendees={attendees}
        events={events}
        eventsForColumn={eventsForColumn}
        attendeesForColumn={attendeesForColumn}
      />
    </div>
  )
}

export default RsvpsPage
