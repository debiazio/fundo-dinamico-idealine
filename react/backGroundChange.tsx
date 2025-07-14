import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import GET_PRODUCT_ID from './graphql/getProductId.graphql'

function Bundle() {
  const productContext = useProduct()
  const slug = productContext?.product?.linkText

  const [productId, setProductId] = useState<string | undefined>()

  const { data, loading, error } = useQuery(GET_PRODUCT_ID, {
    variables: { slug },
    skip: !slug,
  })

  useEffect(() => {
    if (!loading && data?.product?.productId) {
      setProductId(data.product.productId)
      console.log('Product ID:', data.product.productId)
    }
  }, [loading, data])

  useEffect(() => {
    const el = document.querySelector('.vtex-flex-layout-0-x-flexRowContent--conteiner-background-custom') as HTMLElement

    if (!el) return

    const validIds = ['2945', '2946']

    if (validIds.includes(productId || '')) {
      el.style.backgroundImage = "url(https://stermax.com.br/images_idealine/fundo-dinamico/sweet-pink-5litros-fundo-pdp.webp)"
      el.style.backgroundSize = 'cover'
      el.style.backgroundRepeat = 'no-repeat'
      el.style.backgroundPosition = 'center'
    } else {
      el.style.backgroundImage = ''
      el.style.backgroundSize = ''
      el.style.backgroundRepeat = ''
      el.style.backgroundPosition = ''
    }
  }, [productId])

  return (
    <>
      {loading && <p>Carregando ID...</p>}
      {error && <p>Erro ao buscar ID</p>}
      {productId && <p>ID do produto atual: {productId}</p>}
    </>
  )
}

export default Bundle
