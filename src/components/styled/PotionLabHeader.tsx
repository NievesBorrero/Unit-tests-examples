import styled from "styled-components"
import { Layout } from 'antd'
import { secondaryColor } from "../../constants/colors"

const { Header } = Layout

export const PotionLabHeader = styled(Header)`
    color: ${secondaryColor};
`
