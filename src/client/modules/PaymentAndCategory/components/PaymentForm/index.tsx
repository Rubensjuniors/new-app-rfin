'use client'

import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/client/shared/components/ui/Button'
import { ColorPicker } from '@/client/shared/components/ui/ColorPicker'
import { Input, Label } from '@/client/shared/components/ui/Form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/client/shared/components/ui/Form/Select/select'
import { IconPicker } from '@/client/shared/components/ui/IconPicker'
import { PaymentCardType } from '@/client/shared/types/enums'

type PaymentFormData = {
  name: string
  type: PaymentCardType
  lastDigits: string
  icon: string
  color: string
}

export function PaymentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<PaymentFormData>({
    defaultValues: {
      name: '',
      type: PaymentCardType.CREDIT,
      lastDigits: '',
      icon: 'CreditCard',
      color: '#3b82f6'
    }
  })

  const watchedType = watch('type')
  const watchedIcon = watch('icon')
  const watchedColor = watch('color')

  const onSubmit = (data: PaymentFormData) => {
    console.log('Dados do formulário:', data)
    // Aqui você pode adicionar a lógica para salvar o método de pagamento
    reset() // Limpa o formulário após enviar
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border border-border rounded-lg bg-muted/30"
    >
      <h4 className="font-medium text-sm">Novo Método de Pagamento</h4>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="card-name">Nome</Label>
          <Input
            id="card-name"
            placeholder="Ex: Nubank"
            {...register('name', { required: 'Nome é obrigatório' })}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select value={watchedType} onValueChange={(v) => setValue('type', v as PaymentCardType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PaymentCardType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-digits">Últimos 4 dígitos</Label>
            <Input
              id="card-digits"
              placeholder="1234"
              maxLength={4}
              {...register('lastDigits', {
                required: 'Últimos 4 dígitos são obrigatórios',
                pattern: {
                  value: /^\d{4}$/,
                  message: 'Deve conter exatamente 4 dígitos'
                }
              })}
            />
            {errors.lastDigits && <p className="text-sm text-destructive">{errors.lastDigits.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <IconPicker label="Ícone" value={watchedIcon} onChange={(icon) => setValue('icon', icon)} />

          <ColorPicker label="Cor" value={watchedColor} onChange={(color) => setValue('color', color)} />
        </div>

        <Button type="submit" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Método
        </Button>
      </div>
    </form>
  )
}
