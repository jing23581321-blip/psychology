import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useRef, useState } from 'react'
import NavBar from '@/components/NavBar'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment2 } from '@/store/Experiment2Context'
import {
  HIGH_ENTITLEMENT_PASSAGE,
  HIGH_ENTITLEMENT_IMAGINATION,
  LOW_ENTITLEMENT_PASSAGE
} from '@/constants/exp2/entitlementPriming'
import './index.scss'

const COUNTDOWN_SECONDS = 30

export default function EntitlementPriming() {
  const { state, dispatch } = useExperiment2()
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS)
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [countdown])

  const proceed = () => {
    dispatch({ type: 'SET_PRIMING_TIME', payload: Date.now() - startTimeRef.current })
    Taro.navigateTo({ url: '/pages/exp2/task-intro/index' })
  }

  const isHigh = state.entitlement_condition === 'high'

  return (
    <View className='page'>
      <NavBar title='阅读材料' showClose={false} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='page__section-title'>请仔细阅读以下内容，并在心中想象所描述的场景。</Text>
            <Text className='page__paragraph'>{isHigh ? HIGH_ENTITLEMENT_PASSAGE : LOW_ENTITLEMENT_PASSAGE}</Text>
            {isHigh && (
              <Text className='page__paragraph'>{HIGH_ENTITLEMENT_IMAGINATION}</Text>
            )}
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        <PrimaryButton
          text={countdown > 0 ? `继续（${countdown}s）` : '继续'}
          disabled={countdown > 0}
          onClick={proceed}
        />
      </View>
    </View>
  )
}
