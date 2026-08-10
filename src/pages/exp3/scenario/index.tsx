import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment3 } from '@/store/Experiment3Context'
import { SCENARIO_TEXT } from '@/constants/exp3/scenario'
import type { JobChoice } from '@/types/experiment3'
import './index.scss'

const OPTIONS: { key: JobChoice; label: string }[] = [
  { key: 'tech', label: '选择互联网大厂' },
  { key: 'soe', label: '选择国有企业' }
]

export default function Scenario3() {
  const { dispatch } = useExperiment3()
  const [choice, setChoice] = useState<JobChoice | null>(null)
  const [locked, setLocked] = useState(false)

  const confirm = () => {
    if (!choice || locked) return
    setLocked(true)
    dispatch({ type: 'SET_JOB_CHOICE', payload: choice })
    Taro.navigateTo({ url: '/pages/exp3/dialogue/index' })
  }

  return (
    <View className='page'>
      <NavBar title='工作情境' showClose={false} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='page__title'>工作邀约情境</Text>
            <Text className='page__paragraph scenario__text'>{SCENARIO_TEXT}</Text>
            <View className='scenario__options'>
              {OPTIONS.map((opt) => (
                <View
                  key={opt.key}
                  className={`scenario__option${choice === opt.key ? ' scenario__option--active' : ''}${locked ? ' scenario__option--locked' : ''}`}
                  onClick={() => { if (!locked) setChoice(opt.key) }}
                >
                  <Text className='scenario__option-text'>{opt.label}</Text>
                  {choice === opt.key && <Text className='scenario__option-check'>✓</Text>}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        <PrimaryButton text='确认选择，开始对话' disabled={!choice || locked} onClick={confirm} />
      </View>
    </View>
  )
}
