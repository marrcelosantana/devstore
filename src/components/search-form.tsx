'use client'

import { FormEvent } from 'react'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Obtém o termo de busca da URL.
  const query = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Obtém os dados do formulário.
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)
    const query = data.q

    // Redireciona para a página de busca, caso o campo de busca não esteja vazio.
    if (!query) {
      return null
    }

    // Redireciona para a página de busca com o termo de busca.
    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
    >
      <Search className="w-5 h-5 text-zinc-500" />
      <input
        name="q"
        defaultValue={query ?? ''}
        placeholder="Buscar produtos..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
        required
      />
    </form>
  )
}
