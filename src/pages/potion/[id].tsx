import React from 'react'
import { Layout } from 'antd'

import { PotionLabHeader } from '../../components/styled/PotionLabHeader'
import { PotionLabContent } from '../../components/styled/PotionLabContent'
import { PotionLabFooter } from '../../components/styled/PotionLabFooter'
import PotionDetail from '../../components/PotionDetail'

const Index = () => (
  <Layout>
    <PotionLabHeader>PotionLab</PotionLabHeader>
    <PotionLabContent>
      <PotionDetail/>
    </PotionLabContent>
    <PotionLabFooter>PotionLab - Nieves Borrero</PotionLabFooter>
  </Layout>
)


export default Index
