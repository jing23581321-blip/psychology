import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import LikertScale from '@/components/LikertScale'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment } from '@/store/ExperimentContext'
import { submitManipulationCheck } from '@/services/api'
import { MANIPULATION_CHECK_ITEMS } from '@/constants/exp1/manipulationCheck'
import './index.scss'

export default function ManipulationCheck() {
  const { state, dispatch } = useExperiment()
  const [values, setValues] = useState<Record<string, number>>({})

  const allAnswered = MANIPULATION_CHECK_ITEMS.every((item) => values[item.id])

  const submit = async () => {
    if (!allAnswered) {
      Taro.showToast({ title: '请完成全部题目', icon: 'none' })
      return
    }
    const answers = MANIPULATION_CHECK_ITEMS.map((item) => ({ item_id: item.id, score: values[item.id] }))
    dispatch({ type: 'SET_MANIPULATION_CHECK', payload: answers })
    submitManipulationCheck({ participant_id: state.participant_id, answers })
    Taro.navigateTo({ url: '/pages/exp1/entitlement/index' })
  }

  return (
    <View className='page'>
      <NavBar title='操纵检验' showClose={false} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='page__section-title'>请根据你在刚才任务中的感受，对以下描述进行评分。</Text>
            <LikertScale
              items={MANIPULATION_CHECK_ITEMS}
              values={values}
              onChange={(id, score) => setValues((v) => ({ ...v, [id]: score }))}
            />
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        <PrimaryButton text='下一步' disabled={!allAnswered} onClick={submit} />
      </View>
    </View>
  )
}
