'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useId, useState } from "react"

type DialogType = 'signin' | 'signup' | null

export default function SignIn() {
  const id = useId()
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)

  const openSignIn = () => {
    setActiveDialog(null)
    setTimeout(() => setActiveDialog('signin'), 100)
  }

  const openSignUp = () => {
    setActiveDialog(null)
    setTimeout(() => setActiveDialog('signup'), 100)
  }

  const closeDialog = () => setActiveDialog(null)

  return (
    <>
      <Button variant="outline" onClick={openSignIn}>Entrar</Button>

      <Dialog open={activeDialog === 'signin'} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="z-[60]">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">Tratto</span>
            </div>
            <DialogHeader>
              <DialogTitle className="sm:text-center">Bem-vindo de volta</DialogTitle>
              <DialogDescription className="sm:text-center">
                Digite suas credenciais para acessar sua conta.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-email`}>E-mail</Label>
                <Input id={`${id}-email`} placeholder="seu@email.com" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-password`}>Senha</Label>
                <Input
                  id={`${id}-password`}
                  placeholder="Digite sua senha"
                  type="password"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id={`${id}-remember`} />
                <Label htmlFor={`${id}-remember`} className="font-normal text-muted-foreground">
                  Lembrar-me
                </Label>
              </div>
              <a className="text-sm underline hover:no-underline" href="#">
                Esqueceu a senha?
              </a>
            </div>
            <Button type="button" className="w-full">
              Entrar
            </Button>
            <Button variant="outline" className="w-full" onClick={openSignUp}>
              Criar conta
            </Button>

            <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
              <span className="text-xs text-muted-foreground">Ou</span>
            </div>

            <Button variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Entrar com Google
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'signup'} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="z-[60]">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">Tratto</span>
            </div>
            <DialogHeader>
              <DialogTitle className="sm:text-center">Crie sua conta</DialogTitle>
              <DialogDescription className="sm:text-center">
                Preencha os dados abaixo para criar sua conta.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>Nome completo</Label>
                <Input id={`${id}-name`} placeholder="Digite seu nome" type="text" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-signup-email`}>E-mail</Label>
                <Input id={`${id}-signup-email`} placeholder="seu@email.com" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-signup-password`}>Senha</Label>
                <Input
                  id={`${id}-signup-password`}
                  placeholder="Digite sua senha"
                  type="password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-signup-confirm-password`}>Confirme sua senha</Label>
                <Input
                  id={`${id}-signup-confirm-password`}
                  placeholder="Digite sua senha novamente"
                  type="password"
                  required
                />
              </div>
            </div>
            <Button type="button" className="w-full">
              Criar conta
            </Button>
            <Button variant="outline" className="w-full" onClick={openSignIn}>
              Já possuo uma conta
            </Button>

            <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
              <span className="text-xs text-muted-foreground">Ou</span>
            </div>

            <Button variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Criar conta com Google
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
