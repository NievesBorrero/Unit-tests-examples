import { useEffect, useState } from "react"

import { apiList } from "../services/ApiClient"


export function useSearchAllPotions() {
    const [result, setResult] = useState({ potionList: null, error: '' })

    async function fetchData() {
      try {
        const potions = await apiList('potions')
        setResult({...result, ...{ potionList: potions }})
      } catch(error) {
        setResult({...result, ...{ error: error.message }})
      }
    }

    useEffect(() => {
      fetchData()
    }, [])

    return result
  }
