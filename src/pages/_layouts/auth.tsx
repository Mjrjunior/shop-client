import { NavLink } from '@/components/nav-link'
import { Bird } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <NavLink
          to="/signin"
          className="flex w-44 items-center gap-2 text-lg text-foreground"
        >
          <Bird className="h-6 w-6" />
          <span className="font-semibold">junior.shop</span>
        </NavLink>
        <footer className="text-sm">
          Painel do parceiro &copy; junior.shop - {new Date().getFullYear()}
        </footer>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
