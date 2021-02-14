import React, { useEffect, useState } from 'react'
import { Row } from 'antd'

import PotionCard from './PotionCard'
import { useSearchAllPotions } from '../hooks/useSearchAllPotions'

const PotionCollection = () => {
    const {loading, potionList} = useSearchAllPotions()

    return <Row gutter={[20, 20]}>
        { potionList?.map((potion: Potion) => <PotionCard key={potion.id} potion={potion}/>)}
    </Row>
}

export default PotionCollection
