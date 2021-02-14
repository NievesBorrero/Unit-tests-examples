import React from 'react'
import { Card, Col, Row } from 'antd'
import { PotionTitle } from './styled/PotionTitle'
import { PotionImage } from './styled/PotionImage'
import { CardButton } from './styled/CardButton'
import { PotionPrize } from './styled/PotionPrize'
import { CurrencyText } from './styled/CurrencyText'

interface PotionCardProps {
    potion: Potion,
    onClickButton: Function
}

const PotionCard = ({ potion, onClickButton }: PotionCardProps): JSX.Element => {
    return  (
        <Col className="gutter-row" span={6}>
            <Card>
                <PotionTitle>{potion.name}</PotionTitle>
                <PotionImage>
                    <img src={potion.image}/>
                </PotionImage>
                <Row gutter={16} justify='space-between'>
                    <Col className="gutter-row" span={14}>
                        <PotionPrize>
                            <CurrencyText>{potion.prize}</CurrencyText>
                            <span> Galleons</span>
                        </PotionPrize>
                    </Col>
                    <Col className="gutter-row" span={10}>
                        <CardButton onClick={() => onClickButton()}>
                            Add +
                        </CardButton>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}

export default PotionCard
