import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import GET_PRODUCT_ID from './graphql/getProductId.graphql'

function BundleBorder() {
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
    if (!productId) return

    // Mapeamento de IDs -> classes
    const mappings: Record<string, string[]> = {
      rosa: ['2795', '2885'],
      roseGold: ['2796', '2886'],
      perola: ['2797', '2887'],
      sweetPink: ['2945', '2946'],
      sweetBlack: ['2947', '2948'],
      glowin: ['2954', '2955'],
    }

    const classMappings: Record<string, string> = {
      rosa: 'childrenContainer--link-bell-rosa',
      roseGold: 'childrenContainer--link-bell-rose-gold',
      perola: 'childrenContainer--link-bell-perola',
      sweetPink: 'childrenContainer--link-sweet-pink',
      sweetBlack: 'childrenContainer--link-sweet-black',
      glowin: 'childrenContainer--link-glowin',
    }

    // Resetando estilo anterior (caso mude de produto)
    Object.values(classMappings).forEach(cls => {
      const el = document.querySelector(`.${cls}`) as HTMLElement
      if (el) {
        el.style.border = ''
      }
    })

    // Aplicando estilo se encontrar correspondência
    for (const [key, ids] of Object.entries(mappings)) {
      if (ids.includes(productId)) {
        const targetClass = classMappings[key]
        const el = document.querySelector(`.${targetClass}`) as HTMLElement
        if (el) {
          el.style.border = '2px solid #FEBBCE'
        }
        break
      }
    }
  }, [productId])

  return null
}

export default BundleBorder
