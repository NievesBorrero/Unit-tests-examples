import React, { useEffect, useState } from 'react'
import { message, Divider, List, Row, Col, Button } from 'antd'

import { BoldText } from '../components/styled/BoldText'
import { useGetPotion } from '../hooks/useGetPotion'
import { PotionDetailImage } from './styled/PotionDetailImage'
import { DetailCard } from './styled/DetailCard'

const { Item } = List

const PotionDetail = () => {
    const [showNotification, setShowNotification] = useState(false)
    const { potion , error} = useGetPotion()

    useEffect((): void => {
        if(showNotification){
            message.info({
                style: { marginTop: '100px'},
                content: <span>Potion added</span>,
                onClose: setShowNotification(false),
                id: 'info-notification'
            })
        }
    }, [showNotification])

    return (
        <DetailCard>
            <p><BoldText>Name: </BoldText><span>{potion?.name}</span></p>
            <p><BoldText>Effect: </BoldText><span>{potion?.effect}</span></p>
            <Divider/>
            <Row>
                <Col md={12}>
                    <List
                        header={<BoldText>Ingredients</BoldText>}
                        bordered
                        dataSource={potion?.ingredients}
                        renderItem={item => (
                            <Item>
                                {item}
                            </Item>
                        )}
                    />
                </Col>
                <Col md={12}>
                    <PotionDetailImage>
                        <img src={potion?.image}/>
                    </PotionDetailImage>
                </Col>
            </Row>
            <Divider/>
            <Button id="button-add" onClick={() => setShowNotification(true)}>
                Add +
            </Button>
        </DetailCard>
    )
}

export default PotionDetail
