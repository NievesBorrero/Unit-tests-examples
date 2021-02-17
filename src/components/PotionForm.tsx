import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Input, message, Row }from 'antd'

import PotionState from '../constants/PotionState'
import { RESPONSE, RESPONSE_TEXT } from '../constants/response'
import { createPotion } from '../services/ApiClient'
import { areFieldsValid } from '../helpers'

const PotionForm = () => {
    const [potionData, setPotionData] = useState<Potion>(
        PotionState.getDefaultState())
    const [response, setResponse] = useState<string>('')

    const handleSubmit = (formData: object) => {
        if(!areFieldsValid(formData)) return setResponse(RESPONSE.INVALID)

        createPotion(potionData).then(() => {
            setResponse(RESPONSE.SUCCESS)
        }
        ).catch(() =>
            setResponse(RESPONSE.ERROR)
        )
    }

    const showSuccessMessage = (text: string) => {
        message.info({
            style: { marginTop: '100px'},
            content: <span>{ text }</span>,
            onClose: () => {
                    setResponse('')
            },
            id: 'info-notification'
        })
    }

    const showErrorMessage = (text: string) => {
        message.error({
            style: { marginTop: '100px'},
            content: <span>{ text }</span>,
            onClose: setResponse(''),
            id: 'error-notification'
        })
    }

    useEffect((): void => {
        switch(response){
            case RESPONSE.SUCCESS:
                showSuccessMessage('Potion created'); break
            case RESPONSE.ERROR:
                showErrorMessage('Creation error'); break
            case RESPONSE.INVALID:
                showErrorMessage('Fill in all the fields'); break
        }
    }, [response])

    useEffect(() => {
        return () => {
            message.destroy()
        }
    }, [])

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
                                onChange={(e) => setPotionData(
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
                                onChange={(e) => setPotionData(
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
                                onChange={(e) => setPotionData(
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
