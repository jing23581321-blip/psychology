import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import LikertScale from '@/components/LikertScale'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment2 } from '@/store/Experiment2Context'
import { submitExp2Scales } from '@/services/api'
import { MANIPULATION_CHECK_ITEMS } from '@/constants/exp2/manipulationCheck'
import './index.scss'

export default function ManipulationCheck2() {
  const { state, dispatch } = useExperiment2()
  const [values, setValues] = useState<Record<string, number>>({})

  const allAnswered = MANIPULATION_CHECK_ITEMS.every((item) => values[item.id])

  const submit = () => {
    if (!allAnswered) {
      Taro.showToast({ title: '请完成全部题目', icon: 'none' })
      return
    }
    const answers = MANIPULATION_CHECK_ITEMS.map((item) => ({ item_id: item.id, score: values[item.id] }))
    dispatch({ type: 'SET_MANIPULATION_CHECK2', payload: answers })
    submitExp2Scales({ participant_id: state.participant_id, scale: 'manipulation_check2', answers })
    Taro.navigateTo({ url: '/pages/exp2/conspicuous-consumption/index' })
  }

  return (
    <View className='page'>
      <NavBar title='问卷' showClose={false} />
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
