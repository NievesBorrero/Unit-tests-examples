import { Layout } from 'antd'
import styled from 'styled-components'
import { primaryColor } from '../../constants/colors'

const { Footer } = Layout

export const PotionLabFooter = styled(Footer)`
    text-align: center;
    color: ${primaryColor};
`
