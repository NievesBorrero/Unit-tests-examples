import React from 'react'
import { Row, message } from 'antd'

import PotionCard from './PotionCard'
import { useSearchAllPotions } from '../hooks/useSearchAllPotions'

const PotionCollection = () => {
    const { potionList, error} = useSearchAllPotions()

    const onClickButton = () => {
        message.info({
            style: { marginTop: '100px'},
            content: <span>Potion added</span>
        })
    }

    return <Row gutter={[20, 20]}>
        { potionList?.map((potion: Potion) => <PotionCard key={
            potion.id} potion={potion} onClickButton={() => onClickButton()}/>)}
    </Row>
}

export default PotionCollection
