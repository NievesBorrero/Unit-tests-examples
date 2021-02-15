import { useEffect, useState } from "react"
import { getIdFromLocation } from "../helpers"

import { getPotion } from "../services/ApiClient"

export function useGetPotion() {
    const [result, setResult] = useState({ potion: null, error: '' })

    async function fetchData(id: string) {
      try {
        const potion = await getPotion(id)
        setResult({...result, ...{ potion: potion }})
      } catch(error) {
        setResult({...result, ...{ error: error.message }})
      }
    }

    useEffect(() => {
      fetchData(getIdFromLocation(window.location.pathname))
    }, [])

    return result
  }
