'use client'
import { createNewEvent } from '@/actions/events'
// import { Input } from '@nextui-org/react'
// import { Button, Tooltip } from '@nextui-org/react'
import { CirclePlus } from 'lucide-react'
import { useTransition } from 'react'

const Nav = () => {
  const [isPending, startTransition] = useTransition()
  const handleClick = () => {
    startTransition(() => {
      createNewEvent()
    })
  }
  return (
    <nav className="h-[65px] border-b border-default-50 flex items-center px-6 gap-4">
      {/* <Tooltip content="New Event"> */}
      <button
        isIconOnly
        variant="ghost"
        size="lg"
        isLoading={isPending}
        onClick={handleClick}
      >
        {isPending ? (
          <>
            <div className="w-5 h-5 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </>
        ) : (
          <CirclePlus size={16} />
        )}
      </button>
      {/* </Tooltip> */}
      <div className="w-1/2">
        {/* <Input size="sm" variant="faded" placeholder="search" /> */}
      </div>
    </nav>
  )
}

export default Nav
