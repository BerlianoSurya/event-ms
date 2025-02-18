import { getAttendeeIdsAndNames } from '@/actions/attendees'
import { getEventIdsAndNames } from '@/actions/events'
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
  // console.log('rsvps', rsvps)

  return (
    <div>
      {rsvps.map((guest) => (
        <div key={guest.id}>{guest.name}</div>
      ))}
      <RsvpsTable rsvps={rsvps} attendees={attendees} events={events} />
    </div>
  )
}

export default RsvpsPage
