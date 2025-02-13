import { getAllEvents } from '@/utils/events'
import { getCurrentUser } from '@/utils/users'
import Link from 'next/link'
import EventList from '@/components/EventList'

const Events = async () => {
  const user = await getCurrentUser()
  const events = await getAllEvents(user.id)

  return (
    <div className="w-full flex h-full justify-center items-center">
      <EventList data={events} />
    </div>
  )
}

export default Events
