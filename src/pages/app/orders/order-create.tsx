import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'

import { SetStateAction, useState } from 'react'

const products = [
  { id: 1, name: 'Pizza de Calabresa', price: 29.9 },
  { id: 2, name: 'Pizza de Frango', price: 29.9 },
  { id: 3, name: 'Pizza de Marguerita', price: 29.9 },
  { id: 4, name: 'Pizza de Mussarela', price: 29.9 },
  { id: 5, name: 'Pizza de Pepperoni', price: 29.9 },
]

export function OrderCreate() {
  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const handleSelectChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedProduct(event.target.value)
  }

  const handleAddProduct = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setSelectedProducts([...selectedProducts, selectedProduct])
    setSelectedProduct('')
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Pedido</DialogTitle>
        <DialogDescription>Criar um novo pedido</DialogDescription>
      </DialogHeader>
      <form className="flex flex-col gap-3">
        <Label htmlFor="cliente">Cliente</Label>
        <Input type="text" id="cliente" placeholder="Cliente" />
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
        <Label htmlFor="phone">Telefone</Label>
        <Input type="tel" id="phone" placeholder="Telefone" />
        <div className="w-180 flex h-8 gap-3">
          <select
            value={selectedProduct}
            onChange={handleSelectChange}
            defaultValue=""
            className="h-8 w-[180px] rounded-md border border-input bg-secondary text-center text-sm font-semibold"
          >
            <option disabled value="">
              Selecione um produto
            </option>
            {products.map((product) => (
              <option
                key={product.id}
                value={product.name}
                className="text-left"
              >
                {product.name}
              </option>
            ))}
          </select>
          <Button
            className="h-8"
            variant="secondary"
            onClick={handleAddProduct}
          >
            Adicionar
          </Button>
        </div>
        {selectedProducts.map((product, index) => (
          <p key={index}>{product}</p>
        ))}
      </form>
    </DialogContent>
  )
}
