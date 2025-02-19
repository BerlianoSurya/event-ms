'use client'

import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/images/pardy.png'
// import { Button } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { signout } from '@/actions/signout'
import { cn } from '@/lib/utils'

const links = [
  { route: '/dashboard', name: 'Home' },
  { route: '/dashboard/events', name: 'Events' },
  { route: '/dashboard/rsvps', name: 'RSVPs' },
  { route: '/dashboard/attendees', name: 'Attendees' },
]
const isActive = (path: string, route: string) => {
  // all routes other than auth routes include "/dashboard"
  // so handle that first
  if (route === '/dashboard') {
    return path === '/dashboard'
  } else {
    return path.includes(route)
  }
}
const Side = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const activeClass = 'bg-primary hover:bg-primary'
  const path = usePathname()
  return (
    <div
      className={cn(
        'h-full px-3 relative transition-all duration-300',
        isCollapsed ? 'hidden' : 'w-[200px] min-w-[200px]'
      )}
    >
      <div className="p-4">
        <h1 className="text-3xl text-center font-bold">Event MS</h1>
      </div>
      <div>
        {links.map((link) => (
          <div className="w-full" key={link.route}>
            <Link href={link.route}>
              <div
                className={cn(
                  'w-full h-full py-2 px-2 hover:bg-slate-800 rounded-lg flex items-center gap-3',
                  isActive(path, link.route) ? activeClass : ''
                )}
              >
                <span>{link.name}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full left-0 px-4">
        {/* <button onClick={() => signout()} fullWidth variant="ghost">
          Sign Out
        </button> */}
      </div>
    </div>
  )
}

export default Side
