import { api } from '@/data/api'
import { env } from '@/env'
import { Product } from '@/types/product'
import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors' // Importando as cores do Tailwind CSS.

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Trazendo dados do produto.
async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour.
    },
  })
  const products = await response.json()
  return products
}

export default async function OgImage({
  params,
}: {
  params: { slug: string }
}) {
  // Buscando o produto pelo slug.
  const product = await getProduct(params.slug)

  // Montando a URL da imagem do produto.
  const productImageURL = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    { ...size },
  )
}
