import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'antd'

import PotionCard from './PotionCard'
import { listPotion } from '../state/potions/actions'

const PotionCollection = (): JSX.Element => {
    const dispatch = useDispatch()

    const { potionList } = useSelector(state => ({
        potionList: state.potion.potionList
    }))

    useEffect(()=> {
        dispatch(listPotion())
    }, [])

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
