import { useEffect, useState } from "react"

import { searchAllPotions } from "../services/PotionRepository"

export function useSearchAllPotions() {
    const [result, setResult] = useState({ potionList: null, error: '' })

    async function fetchData() {
      try {
        const potions = await searchAllPotions()
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
