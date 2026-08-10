import { View, Text, ScrollView, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'
import PrimaryButton from '@/components/PrimaryButton'
import MessageBubble from '@/components/MessageBubble'
import SliderWithReason from '@/components/SliderWithReason'
import { useExperiment3 } from '@/store/Experiment3Context'
import { submitExp3DialogueTurn } from '@/services/api'
import { DIALOGUE_SCRIPT, resolveTemplate } from '@/constants/exp3/dialogueScript'
import type { DialogueTurn } from '@/types/experiment3'
import './index.scss'

const TOTAL_ROUNDS = 8

type Phase = 'ai_typing' | 'awaiting_input' | 'feedback'

export default function Dialogue3() {
  const { state, dispatch } = useExperiment3()
  const round = state.current_round
  const script = DIALOGUE_SCRIPT[round - 1]
  const jobChoice = state.job_choice!

  const [phase, setPhase] = useState<Phase>('ai_typing')
  const [displayedAiMsg, setDisplayedAiMsg] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const [choiceValue, setChoiceValue] = useState<string | null>(null)
  const [textValue, setTextValue] = useState('')
  const aiMessage = resolveTemplate(script.aiPromptTemplate, jobChoice)
  const feedbackTemplate = state.sycophancy_condition === 'high' ? script.feedback.high : script.feedback.low

  // Simulate AI typing with a short delay
  useEffect(() => {
    setPhase('ai_typing')
    setDisplayedAiMsg('')
    setChoiceValue(null)
    setTextValue('')
    const t = setTimeout(() => {
      setDisplayedAiMsg(aiMessage)
      setPhase('awaiting_input')
    }, 800)
    return () => clearTimeout(t)
  }, [round])

  const submitTurn = (value: string | number, reason?: string) => {
    const resolved = resolveTemplate(feedbackTemplate, jobChoice)
    setFeedbackMsg(resolved)
    setPhase('feedback')

    const turn: DialogueTurn = {
      round,
      aiMessage,
      userResponse: { type: script.inputType, value, reason },
      feedbackMessage: resolved,
      timestamp: Date.now()
    }
    dispatch({ type: 'ADD_DIALOGUE_TURN', payload: turn })
    submitExp3DialogueTurn({ participant_id: state.participant_id, turn })
  }

  const next = () => {
    if (round < TOTAL_ROUNDS) {
      dispatch({ type: 'SET_CURRENT_ROUND3', payload: round + 1 })
    } else {
      Taro.navigateTo({ url: '/pages/exp3/scales/index' })
    }
  }

  return (
    <View className='page dialogue'>
      <NavBar
        title={`第 ${round} 轮 / 共 ${TOTAL_ROUNDS} 轮`}
        progress={round / TOTAL_ROUNDS}
        showClose={false}
      />
      <ScrollView className='page__scroll dialogue__scroll' scrollY scrollIntoView={`msg-bottom`}>
        <View className='dialogue__messages'>
          {/* Previous turns */}
          {state.dialogue_log.map((turn) => (
            <View key={turn.round}>
              <MessageBubble role='ai' content={resolveTemplate(turn.aiMessage, jobChoice)} />
              <MessageBubble
                role='user'
                content={
                  turn.userResponse.type === 'slider_with_reason'
                    ? `${turn.userResponse.value}/100。理由：${turn.userResponse.reason}`
                    : String(turn.userResponse.value)
                }
              />
              <MessageBubble role='ai' content={turn.feedbackMessage} />
            </View>
          ))}

          {/* Current AI message */}
          {displayedAiMsg ? (
            <MessageBubble role='ai' content={displayedAiMsg} />
          ) : (
            <View className='dialogue__typing'>
              <Text className='dialogue__typing-dot' />
              <Text className='dialogue__typing-dot' />
              <Text className='dialogue__typing-dot' />
            </View>
          )}

          {/* Feedback bubble */}
          {phase === 'feedback' && feedbackMsg ? (
            <MessageBubble role='ai' content={feedbackMsg} />
          ) : null}
        </View>
        <View id='msg-bottom' />
      </ScrollView>

      {/* Input area */}
      {phase === 'awaiting_input' && script.inputType === 'choice' && (
        <View className='dialogue__input-area'>
          <View className='dialogue__choices'>
            {script.options!.map((opt) => (
              <View
                key={opt}
                className={`dialogue__choice${choiceValue === opt ? ' dialogue__choice--active' : ''}`}
                onClick={() => setChoiceValue(opt)}
              >
                <Text className='dialogue__choice-text'>{opt}</Text>
              </View>
            ))}
          </View>
          <PrimaryButton text='确认' disabled={!choiceValue} onClick={() => submitTurn(choiceValue!)} />
        </View>
      )}

      {phase === 'awaiting_input' && script.inputType === 'text' && (
        <View className='dialogue__input-area'>
          <Input
            className='dialogue__text-input'
            placeholder='请输入你的回答…'
            value={textValue}
            onInput={(e) => setTextValue(e.detail.value)}
          />
          <PrimaryButton
            text='发送'
            disabled={textValue.trim().length < 5}
            onClick={() => submitTurn(textValue.trim())}
          />
        </View>
      )}

      {phase === 'awaiting_input' && script.inputType === 'slider_with_reason' && (
        <View className='dialogue__input-area'>
          <SliderWithReason onSubmit={({ score, reason }) => submitTurn(score, reason)} />
        </View>
      )}

      {phase === 'feedback' && (
        <View className='dialogue__input-area'>
          <PrimaryButton
            text={round < TOTAL_ROUNDS ? '继续下一轮' : '完成对话，进入问卷'}
            onClick={next}
          />
        </View>
      )}
    </View>
  )
}
