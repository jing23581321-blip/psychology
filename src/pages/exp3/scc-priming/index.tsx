import { View, Text, ScrollView, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useRef, useState } from 'react'
import NavBar from '@/components/NavBar'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment3 } from '@/store/Experiment3Context'
import { HIGH_SCC_PROMPT, LOW_SCC_PROMPT, MIN_WRITING_SECONDS } from '@/constants/exp3/sccPriming'
import './index.scss'

const MIN_CHARS = 50

export default function SccPriming() {
  const { state, dispatch } = useExperiment3()
  const [content, setContent] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(Date.now())

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const remaining = Math.max(0, MIN_WRITING_SECONDS - elapsed)
  const canSubmit = remaining === 0 && content.trim().length >= MIN_CHARS

  const submit = () => {
    if (!canSubmit) return
    dispatch({
      type: 'SET_SCC_WRITING',
      payload: { content: content.trim(), timeSpentSec: elapsed }
    })
    Taro.navigateTo({ url: '/pages/exp3/scenario/index' })
  }

  const prompt = state.scc_condition === 'high' ? HIGH_SCC_PROMPT : LOW_SCC_PROMPT
  const charCount = content.trim().length

  return (
    <View className='page'>
      <NavBar title='准备任务' showClose={false} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='page__title'>请完成以下写作任务</Text>
            <Text className='page__paragraph scc-priming__prompt'>{prompt}</Text>
            <Textarea
              className='scc-priming__textarea'
              placeholder='请在此处输入你的回答（至少50字）…'
              value={content}
              onInput={(e) => setContent(e.detail.value)}
              autoHeight
            />
            <View className='scc-priming__meta'>
              <Text className='scc-priming__char-count'>{charCount} 字</Text>
              {remaining > 0 && (
                <Text className='scc-priming__timer'>请继续思考（{remaining}s）</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        <PrimaryButton
          text={remaining > 0 ? `继续（${remaining}s）` : '完成，继续'}
          disabled={!canSubmit}
          onClick={submit}
        />
      </View>
    </View>
  )
}
