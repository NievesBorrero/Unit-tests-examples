import React, { useEffect, useState } from 'react'
import { Row, message } from 'antd'

import PotionCard from './PotionCard'
import { useSearchAllPotions } from '../hooks/useSearchAllPotions'

const PotionCollection = () => {
    const [showNotification, setShowNotification] = useState(false)
    const { potionList, error} = useSearchAllPotions()

    useEffect(() => {
        if(showNotification){
            message.info({
                style: { marginTop: '100px'},
                content: <span>Potion added</span>,
                onClose: setShowNotification(false),
                className: 'info-notification'
            })
        }
    }, [showNotification])

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
