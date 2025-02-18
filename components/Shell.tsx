import Side from './Side'
import Nav from './Nav'
import { useActionState } from 'react'
import { cn } from '@/lib/utils'
const toggleSidebar = (prevState: boolean) => {
  return !prevState
}
const Shell = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useActionState(toggleSidebar, false)

  return (
    <div className="flex w-screen h-screen">
      {/* Sidebar */}
      {!isCollapsed && (
        <aside className="w-[200px] min-w-[200px] h-full border-r border-default-50 transition-all duration-300">
          <Side isCollapsed={isCollapsed} />
        </aside>
      )}

      {/* Main Content */}
      <div
        className={cn(
          'transition-all duration-300 flex-1',
          isCollapsed ? 'w-full' : 'w-[calc(100vw-200px)]'
        )}
      >
        <Nav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className="h-[calc(100vh-65px)] overflow-scroll py-5">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Shell
