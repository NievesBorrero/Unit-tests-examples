import React from 'react'
import { Layout } from 'antd'

import { PotionLabFooter } from '../components/styled/PotionLabFooter'
import { PotionLabHeader } from '../components/styled/PotionLabHeader'
import { PotionLabContent } from '../components/styled/PotionLabContent'
import PotionCollection from '../components/PotionCollection'

const Index = () => (
  <Layout>
    <PotionLabHeader>PotionLab</PotionLabHeader>
    <PotionLabContent>
      <PotionCollection/>
    </PotionLabContent>
    <PotionLabFooter>PotionLab - Nieves Borrero</PotionLabFooter>
  </Layout>
)


export default Index
