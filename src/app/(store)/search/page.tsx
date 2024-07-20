import { api } from '@/data/api'
import { Product } from '@/types/product'
import { redirect } from 'next/navigation'

import Image from 'next/image'
import Link from 'next/link'

interface SearchProps {
  searchParams: {
    q: string
  }
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()
  return products
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="tex-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      {products.length === 0 && (
        <p className="text-sm text-zinc-500">
          Nenhum produto encontrado para a busca realizada.
        </p>
      )}

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
            >
              <Image
                src={product.image}
                width={420}
                height={420}
                quality={100}
                alt={product.title}
                className="group-hover:scale-105 transition-transform duration-550"
              />

              <div
                className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full
                border-2 border-zinc-500 bg-black/60 p-1 pl-5"
              >
                <span className="text-sm truncate">{product.title}</span>
                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
