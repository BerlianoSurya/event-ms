import { getAllEvents } from '@/utils/events'
import { getCurrentUser } from '@/utils/users'
import EventsTable from '@/components/EventsTable'

const Events = async () => {
  const user = await getCurrentUser()
  const events = await getAllEvents(user.id)

  return (
    <div className="mx-5 my-5">
      <div className="w-full justify-center my-6 text-4xl">
        <h1 className="text-center font-extrabold">Event List</h1>
      </div>
      <EventsTable events={events} />
    </div>
  )
}

export default Events
