'use client'
import { createNewEvent } from '@/actions/events'
// import { Input } from '@nextui-org/react'
// import { Button, Tooltip } from '@nextui-org/react'
import { CirclePlus } from 'lucide-react'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import UserDropdown from '@/components/UserDropdown'
const toggleSidebar = async (prevState: boolean) => {
  return !prevState
}
const Nav = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean
  setIsCollapsed: any
}) => {
  return (
    <nav className="h-[65px] border-b border-default-50 flex items-center px-6 gap-4 justify-between">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsCollapsed(toggleSidebar)}
      >
        <Menu size={20} />
      </Button>
      <UserDropdown />
    </nav>
  )
}

export default Nav
