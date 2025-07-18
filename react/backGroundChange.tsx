import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import GET_PRODUCT_ID from './graphql/getProductId.graphql'

function Bundle() {
  const productContext = useProduct()
  const slug = productContext?.product?.linkText

  const [productId, setProductId] = useState<string | undefined>()

  const { data, loading } = useQuery(GET_PRODUCT_ID, {
    variables: { slug },
    skip: !slug,
  })

  useEffect(() => {
    if (!loading && data?.product?.productId) {
      setProductId(data.product.productId)
    }
  }, [loading, data])

  useEffect(() => {
    const el = document.querySelector('.vtex-flex-layout-0-x-flexRowContent--conteiner-background-custom') as HTMLElement

    if (!el) return

    const validIdsRed = ['2945', '2946']
    const validIdsBlack = ['2947', '2948']
    const validIdsPearl = ['2796', '2797']
    const validIdsRoseGold = ['2887', '2886']
    const validIdsPink = ['2795', '2885']

    if (validIdsRed.includes(productId || '')) {
      el.style.backgroundImage = "url(https://stermax.com.br/images_idealine/fundo-dinamico/sweet-pink-5litros-fundo-pdp.webp)"
      el.style.backgroundSize = 'cover'
      el.style.backgroundRepeat = 'no-repeat'
      el.style.backgroundPosition = 'center'
    } else if (validIdsBlack.includes(productId || '')) {
      el.style.backgroundImage = "url(https://stermax.com.br/images_idealine/fundo-dinamico/bellinha-5l-sweet-black.webp)"
      el.style.backgroundSize = 'cover'
      el.style.backgroundRepeat = 'no-repeat'
      el.style.backgroundPosition = 'center'
    } else if (validIdsPearl.includes(productId || '')) {
      el.style.backgroundImage = "url(https://stermax.com.br/images_idealine/fundo-dinamico/bellinha-5l-perola.webp)"
      el.style.backgroundSize = 'cover'
      el.style.backgroundRepeat = 'no-repeat'
      el.style.backgroundPosition = 'center'
    } else if (validIdsRoseGold.includes(productId || '')) {
      el.style.backgroundImage = "url(https://stermax.com.br/images_idealine/fundo-dinamico/bellinha-5l-rose-gold.webp)"
      el.style.backgroundSize = 'cover'
      el.style.backgroundRepeat = 'no-repeat'
      el.style.backgroundPosition = 'center'
    } else if (validIdsPink.includes(productId || '')) {
      el.style.backgroundImage = "url(https://stermax.com.br/images_idealine/fundo-dinamico/bellinha-5l-rosa.webp)"
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

  return null 
}

export default Bundle
