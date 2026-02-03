'use client'

import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/client/shared/components/ui/Button'
import { ColorPicker } from '@/client/shared/components/ui/ColorPicker'
import { Input, Label } from '@/client/shared/components/ui/Form'
import { IconPicker } from '@/client/shared/components/ui/IconPicker'

type CategoryFormData = {
  name: string
  icon: string
  color: string
}

export function CategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: '',
      icon: 'Briefcase',
      color: '#22c55e'
    }
  })

  const watchedIcon = watch('icon')
  const watchedColor = watch('color')

  const onSubmit = (data: CategoryFormData) => {
    console.log('Dados do formulário:', data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border border-border rounded-lg bg-muted/30"
    >
      <h4 className="font-medium text-sm">Nova Categoria</h4>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="category-name">Nome</Label>
          <Input
            id="category-name"
            placeholder="Ex: Alimentação"
            {...register('name', { required: 'Nome é obrigatório' })}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <IconPicker label="Ícone" value={watchedIcon} onChange={(icon) => setValue('icon', icon)} />

          <ColorPicker label="Cor" value={watchedColor} onChange={(color) => setValue('color', color)} />
        </div>

        <Button type="submit" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Categoria
        </Button>
      </div>
    </form>
  )
}
