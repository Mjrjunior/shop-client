import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2 } from 'lucide-react'

type Product = {
  id: number
  name: string
  price: number
} | null

const products = [
  { id: 1, name: 'Malinha', price: 29.9 },
  { id: 2, name: 'Necessarie M', price: 29.9 },
  { id: 3, name: 'Porta Make P', price: 29.9 },
  { id: 4, name: 'Térmica Trapézio', price: 29.9 },
  { id: 5, name: 'Estojo Cristal', price: 29.9 },
]

export function OrderCreate() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(null)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [inputValues, setInputValues] = useState<number[]>([])
  const [total, setTotal] = useState(0)

  const handleProductChange = (event: { target: { value: unknown } }) => {
    const productId = Number(event.target.value)
    const product = products.find((product) => product.id === productId)
    if (product) {
      setSelectedProduct(product)
      setInputValues([...inputValues, 1])
    }
  }

  useEffect(() => {
    const newTotal = selectedProducts.reduce((acc, product, index) => {
      if (product) {
        return acc + product.price * inputValues[index]
      } else {
        return acc
      }
    }, 0)
    setTotal(newTotal)
  }, [inputValues, selectedProducts])

  const handleAddProduct = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (selectedProduct) {
      setSelectedProducts([...selectedProducts, selectedProduct])
      setSelectedProduct(null)
      console.log(selectedProducts)
      console.log(total)
    }
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
            value={selectedProduct ? selectedProduct?.id : ''}
            onChange={handleProductChange}
            className="h-8 w-[180px] rounded-md border border-input bg-secondary text-center text-sm font-semibold"
          >
            <option disabled value="">
              Selecione um produto
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.id} className="text-left">
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Qtd.</TableHead>
              <TableHead> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product?.name}</TableCell>
                <TableCell>R$ {product?.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Input
                    value={inputValues[index]}
                    onChange={(e) => {
                      const newInputValues = [...inputValues]
                      newInputValues[index] = Number(e.target.value)
                      setInputValues(newInputValues)
                    }}
                    min="1"
                    type="number"
                    className="w-14 text-center no-spin"
                  />
                </TableCell>
                <TableCell>
                  <Button variant="destructive">
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className="text-right font-medium">
                R$ {total.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Button variant="secondary" type="submit">
          Criar Pedido
        </Button>
      </form>
    </DialogContent>
  )
}
