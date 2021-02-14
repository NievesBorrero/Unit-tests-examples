import { useEffect, useState } from "react"
import { searchAllPotions } from "../services/PotionRepository"

export function useSearchAllPotions() {
    const [result, setResult] = useState({ loading: true, potionList: null })

    async function fetchData() {
        const potions = await searchAllPotions()
        setResult({ loading: false, potionList: potions })
    }

    useEffect(() => {
      fetchData()
    }, [])

    return result
  }
