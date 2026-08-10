import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useRef, useState } from 'react'
import NavBar from '@/components/NavBar'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment } from '@/store/ExperimentContext'
import { submitBehavioralTask } from '@/services/api'
import { LOGO_OPTIONS, LOGO_TASK_INTRO, LOGO_TASK_QUESTION } from '@/constants/exp1/logoTask'
import type { BehavioralChoice } from '@/types/experiment'
import './index.scss'

export default function BehavioralTask() {
  const { state, dispatch } = useExperiment()
  const [choice, setChoice] = useState<BehavioralChoice | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  const submit = async () => {
    if (!choice) {
      Taro.showToast({ title: '请选择一款', icon: 'none' })
      return
    }
    const data = { choice, response_time: Date.now() - startTimeRef.current }
    dispatch({ type: 'SET_BEHAVIORAL', payload: data })
    submitBehavioralTask({ participant_id: state.participant_id, data })
    Taro.navigateTo({ url: '/pages/exp1/demographics/index' })
  }

  return (
    <View className='page'>
      <NavBar title='市场调查' showClose={false} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='page__paragraph'>{LOGO_TASK_INTRO}</Text>
            <View className='logo-task__options'>
              {LOGO_OPTIONS.map((option) => (
                <View
                  className={`logo-task__card${choice === option.value ? ' logo-task__card--selected' : ''}`}
                  hoverClass='logo-task__card--hover'
                  key={option.value}
                  onClick={() => setChoice(option.value)}
                >
                  <Image className='logo-task__image' src={option.image} mode='aspectFit' />
                  <Text className='logo-task__label'>{option.label}</Text>
                </View>
              ))}
            </View>
            <Text className='logo-task__question'>{LOGO_TASK_QUESTION}</Text>
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        <PrimaryButton text='提交选择' disabled={!choice} onClick={submit} />
      </View>
    </View>
  )
}
