import { Separator } from '@radix-ui/react-separator'
import { Bird, Home, NotepadText } from 'lucide-react'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toogle'
import { AccountMenu } from './account-menu'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Bird className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6 border" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/" className="flex gap-2 font-medium">
            <Home className="h-5 w-5" />
            Início
          </NavLink>
          <NavLink to="/orders" className="flex gap-2 font-medium">
            <NotepadText className="h-5 w-5" />
            Pedidos
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
