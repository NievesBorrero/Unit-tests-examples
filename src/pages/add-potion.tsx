import React from 'react'
import { Layout } from 'antd'

import { PotionLabFooter } from '../components/styled/PotionLabFooter'
import { PotionLabHeader } from '../components/styled/PotionLabHeader'
import { PotionLabContent } from '../components/styled/PotionLabContent'
import PotionForm from '../components/PotionForm'

const Index = () => (
  <Layout>
    <PotionLabHeader>PotionLab</PotionLabHeader>
    <PotionLabContent>
      <PotionForm/>
    </PotionLabContent>
    <PotionLabFooter>PotionLab - Nieves Borrero</PotionLabFooter>
  </Layout>
)


export default Index
