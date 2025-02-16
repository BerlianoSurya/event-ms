import { getCurrentUser } from '@/utils/users'
import { attendees } from '@/db/schema'
import { getAttendeesCountForDashboard } from '@/utils/attendees'

const Home = async () => {
  const user = await getCurrentUser()
  const count = await getAttendeesCountForDashboard(user.id)
  console.log('count', count)
  return (
    <div className="w-full flex h-full justify-center items-center">
      <div>
        <h4 className="text-lg">Attendees</h4>
        <h2 className="text-6xl font-semibold my-8 text-center">{count}</h2>
      </div>
    </div>
  )
}

export default Home
