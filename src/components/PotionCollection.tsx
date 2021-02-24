import React from 'react'
import { Row } from 'antd'

import PotionCard from './PotionCard'
import { useSearchAllPotions } from '../hooks/useSearchAllPotions'

const PotionCollection = (): JSX.Element => {
    const { potionList }: PotionListResponse = useSearchAllPotions()

    return (
        <Row gutter={[20, 20]}>
            { potionList?.map((potion: Potion) =>
                <PotionCard
                    key={ potion.id}
                    potion={potion}
                />
            )}
        </Row>
    )
}

export default PotionCollection
