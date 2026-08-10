import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment3 } from '@/store/Experiment3Context'
import { assignGroup3 } from '@/services/api'
import { uuid } from '@/utils/uuid'
import type { ParticipantSource } from '@/types/experiment'
import './index.scss'

export default function Consent3() {
  const router = useRouter()
  const { dispatch } = useExperiment3()
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  const start = async () => {
    if (!agreed || loading) return
    setLoading(true)

    const sid = router.params.sid
    const source: ParticipantSource = sid ? 'jiandao' : 'direct'
    const source_id = sid ?? ''
    const participant_id = sid ?? uuid()

    try {
      const res = await assignGroup3({ source, source_id, participant_id })
      dispatch({
        type: 'SET_PARTICIPANT3',
        payload: {
          participant_id: res.participant_id,
          scc_condition: res.scc_condition,
          sycophancy_condition: res.sycophancy_condition,
          source,
          source_id
        }
      })
      Taro.navigateTo({ url: '/pages/exp3/scc-priming/index' })
    } catch {
      Taro.showToast({ title: '网络异常，请重试', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className='page'>
      <NavBar title='知情同意' showClose={false} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='page__title'>研究知情同意书</Text>
            <Text className='page__paragraph'>
              欢迎参与本次「职业决策与AI对话研究」。本研究通过模拟真实的职业咨询场景，探究人们在重要决策中的思维特征与情感体验。
            </Text>
            <Text className='page__paragraph'>
              任务大约需要 15-20 分钟。你的所有回答将被匿名收集，仅用于学术研究，不会泄露任何可识别你个人身份的信息。你可以随时退出本研究。
            </Text>
            <Text className='page__paragraph'>如你已阅读并理解以上内容，请勾选下方选项并开始任务。</Text>
            <View
              className='consent__check'
              hoverClass='consent__check--hover'
              onClick={() => setAgreed((v) => !v)}
            >
              <View className={`consent__box${agreed ? ' consent__box--checked' : ''}`}>
                {agreed ? <Text className='consent__tick'>✓</Text> : null}
              </View>
              <Text className='consent__label'>我已阅读并同意参与本研究</Text>
            </View>
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        <PrimaryButton text={loading ? '正在进入...' : '开始任务'} disabled={!agreed || loading} onClick={start} />
      </View>
    </View>
  )
}
