import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import LikertScale from '@/components/LikertScale'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment3 } from '@/store/Experiment3Context'
import { submitExp3Scales } from '@/services/api'
import {
  MANIPULATION_CHECK_ITEMS,
  SCC_ITEMS,
  ENTITLEMENT_ITEMS,
  CONSPICUOUS_CONSUMPTION_ITEMS
} from '@/constants/exp3/scaleItems'
import type { ScaleAnswer } from '@/types/experiment'
import type { LikertItem } from '@/components/LikertScale'
import './index.scss'

interface ScaleStep {
  key: string
  title: string
  instruction: string
  items: LikertItem[]
}

const STEPS: ScaleStep[] = [
  {
    key: 'manipulation_check',
    title: '关于AI对话的感受',
    instruction: '请根据你在刚才AI对话中的感受，对以下描述进行评分（1=完全不符合，7=完全符合）。',
    items: MANIPULATION_CHECK_ITEMS
  },
  {
    key: 'scc',
    title: '自我认知问卷',
    instruction: '以下描述涉及你对自身的认识，请根据自己的实际感受评分（1=完全不符合，7=完全符合）。',
    items: SCC_ITEMS
  },
  {
    key: 'entitlement',
    title: '个人观念问卷',
    instruction: '请根据你平时的真实想法，对以下描述进行评分（1=完全不符合，7=完全符合）。',
    items: ENTITLEMENT_ITEMS
  },
  {
    key: 'conspicuous',
    title: '消费偏好问卷',
    instruction: '请根据你平时的消费习惯和偏好，对以下描述进行评分（1=完全不符合，7=完全符合）。',
    items: CONSPICUOUS_CONSUMPTION_ITEMS
  }
]

export default function Scales3() {
  const { state, dispatch } = useExperiment3()
  const [stepIndex, setStepIndex] = useState(0)
  const [values, setValues] = useState<Record<string, number>>({})

  const step = STEPS[stepIndex]
  const allAnswered = step.items.every((item) => values[item.id])

  const next = () => {
    if (!allAnswered) {
      Taro.showToast({ title: '请完成全部题目', icon: 'none' })
      return
    }
    const answers: ScaleAnswer[] = step.items.map((item) => ({ item_id: item.id, score: values[item.id] }))

    if (step.key === 'manipulation_check') dispatch({ type: 'SET_MANIPULATION_CHECK3', payload: answers })
    else if (step.key === 'scc') dispatch({ type: 'SET_SCC_SCORES', payload: answers })
    else if (step.key === 'entitlement') dispatch({ type: 'SET_ENTITLEMENT3', payload: answers })
    else if (step.key === 'conspicuous') dispatch({ type: 'SET_CONSPICUOUS3', payload: answers })

    submitExp3Scales({ participant_id: state.participant_id, scale: step.key, answers })

    if (stepIndex < STEPS.length - 1) {
      setStepIndex((i) => i + 1)
      setValues({})
    } else {
      Taro.navigateTo({ url: '/pages/exp3/budget-task/index' })
    }
  }

  return (
    <View className='page'>
      <NavBar
        title={`问卷 ${stepIndex + 1} / ${STEPS.length}`}
        progress={(stepIndex + 1) / STEPS.length}
        showClose={false}
      />
      <PageTransition key={step.key}>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='page__title'>{step.title}</Text>
            <Text className='page__section-title'>{step.instruction}</Text>
            <LikertScale
              items={step.items}
              values={values}
              onChange={(id, score) => setValues((v) => ({ ...v, [id]: score }))}
            />
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        <PrimaryButton
          text={stepIndex < STEPS.length - 1 ? '下一部分' : '完成问卷'}
          disabled={!allAnswered}
          onClick={next}
        />
      </View>
    </View>
  )
}
