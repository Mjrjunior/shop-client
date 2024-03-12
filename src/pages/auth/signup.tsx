import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const signUpForm = z.object({
  establishmentName: z.string(),
  managerName: z.string(),
  email: z.string().email(),
  phone: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigation = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  async function handleSignUp(data: SignUpForm) {
    try {
      console.log(data)
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast.success('Conta criada com sucesso.', {
        action: {
          label: 'Acessar painel',
          onClick: () => navigation('/signin'),
        },
      })
    } catch (error) {
      toast.error('Erro ao criar conta.')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center p-8">
      <Helmet title="Sign-In" />
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="fle flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e comece a vender na junior.shop.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="establishmentName">Nome do estabelecimento</Label>
            <Input
              id="establishmentName"
              type="text"
              {...register('establishmentName')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input id="managerName" type="text" {...register('managerName')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Seu Celular</Label>
            <Input id="phone" type="tel" {...register('phone')} />
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full">
            Finalizar cadastro
          </Button>
        </form>
      </div>
    </div>
  )
}
