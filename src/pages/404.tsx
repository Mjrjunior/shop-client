import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 ">
      <h1 className="text-9xl font-bold text-muted-foreground">404</h1>
      <p className="text-2xl font-medium">Página não encontrada</p>
      <Link
        to="/"
        className="rounded-md border bg-muted p-1 text-sm text-muted-foreground"
      >
        Dashboard
      </Link>
    </div>
  )
}
