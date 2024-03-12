import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    console.log(data)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    toast.success('Enviamos um link de autenticação para o seu e-mail.')
  }

  return (
    <div className="relative flex h-screen items-center justify-center p-8">
      <Helmet title="Sign-In" />
      <Button variant={'outline'} asChild className="absolute right-4 top-8">
        <Link to="/signup">Criar conta</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="fle flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full">
            Acessar Painel
          </Button>
        </form>
      </div>
    </div>
  )
}
