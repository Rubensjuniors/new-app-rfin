'use client'

import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/client/shared/components/ui/Button'
import { Input, Label } from '@/client/shared/components/ui/Form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/client/shared/components/ui/Form/Select/select'

// Ícones disponíveis para categorias
const AVAILABLE_ICONS = [
  { value: 'Briefcase', label: '💼 Trabalho' },
  { value: 'ShoppingBag', label: '🛍️ Compras' },
  { value: 'Utensils', label: '🍽️ Alimentação' },
  { value: 'Car', label: '🚗 Transporte' },
  { value: 'Home', label: '🏠 Casa' },
  { value: 'Heart', label: '❤️ Saúde' },
  { value: 'Gamepad2', label: '🎮 Lazer' },
  { value: 'GraduationCap', label: '🎓 Educação' },
  { value: 'Gift', label: '🎁 Presentes' },
  { value: 'Wallet', label: '💰 Outros' }
]

// Cores disponíveis
const AVAILABLE_COLORS = [
  { value: '#22c55e', label: 'Verde' },
  { value: '#ef4444', label: 'Vermelho' },
  { value: '#3b82f6', label: 'Azul' },
  { value: '#f59e0b', label: 'Amarelo' },
  { value: '#8b5cf6', label: 'Roxo' },
  { value: '#ec4899', label: 'Rosa' },
  { value: '#06b6d4', label: 'Ciano' },
  { value: '#f97316', label: 'Laranja' }
]

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
          <div className="space-y-2">
            <Label>Ícone</Label>
            <Select value={watchedIcon} onValueChange={(value) => setValue('icon', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_ICONS.map((icon) => (
                  <SelectItem key={icon.value} value={icon.value}>
                    {icon.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Cor</Label>
            <Select value={watchedColor} onValueChange={(value) => setValue('color', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_COLORS.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.value }} />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Categoria
        </Button>
      </div>
    </form>
  )
}
