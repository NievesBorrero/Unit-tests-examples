import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Input, message, Row }from 'antd'

import PotionState from '../constants/PotionState'
import { MESSAGE_TYPE, POTION_MESSAGE } from '../constants/message'
import { areFieldsValid } from '../helpers'
import { apiCreate } from '../services/ApiClient'

const PotionForm = () => {
    const [potionData, setPotionData] = useState<Potion>(
        PotionState.getDefaultState())
    const [notificationMessage, setNotificationMessage] = useState<NotificationMessage>(null)

    const handleSubmit = (formData: object): void => {
        if(!areFieldsValid(formData)) return setNotificationMessage(POTION_MESSAGE.CREATE.INVALID)

        apiCreate('potions', potionData).then(() => {
            setNotificationMessage(POTION_MESSAGE.CREATE.SUCCESS)
        }).catch(() =>
            setNotificationMessage(POTION_MESSAGE.CREATE.ERROR)
        )
    }

    useEffect(() => {
        return () => {
            message.destroy()
        }
    }, [])

    useEffect((): void => {
        if(!notificationMessage) return

        notificationMessage.type === MESSAGE_TYPE.ERROR ?
            showErrorMessage(notificationMessage.message) : showSuccessMessage(
                notificationMessage.message)

    }, [notificationMessage])

    const showSuccessMessage = (text: string) => {
        message.info({
            style: { marginTop: '100px'},
            content: <span>{ text }</span>,
            onClose: () => {
                setNotificationMessage(null)
            },
            id: 'info-notification'
        })
    }

    const showErrorMessage = (text: string) => {
        message.error({
            style: { marginTop: '100px'},
            content: <span>{ text }</span>,
            onClose: setNotificationMessage(null),
            id: 'error-notification'
        })
    }

    return (
        <Card>
            <Form onFinish={ handleSubmit } name="potionForm">
                <h1>Create a Potion</h1>
                <Row>
                    <Col md={14}>
                        <Form.Item label="Name" htmlFor="name" name="name">
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                size="large"
                                onChange={(e): void => setPotionData(
                                    {...potionData, name: e.target.value }
                                )}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={9} offset={1}>
                        <Form.Item label="Prize" htmlFor="prize" name="prize">
                            <Input
                                id="prize"
                                name="name"
                                type="number"
                                size="large"
                                onChange={(e): void => setPotionData(
                                    {...potionData, prize: Number(e.target.value) }
                                )}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={24}>
                        <Form.Item label="Effect" htmlFor="effect" name="effect">
                            <Input
                                id="effect"
                                name="effect"
                                type="text"
                                size="large"
                                onChange={(e): void => setPotionData(
                                    {...potionData, effect: e.target.value }
                                )}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={6} offset={1}>
                        <Form.Item>
                            <Button
                                block
                                type="primary"
                                size="large"
                                htmlType="submit"
                                data-cy="potionForm-submit">
                                    Create
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    )
}

export default PotionForm
