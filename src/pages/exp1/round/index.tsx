import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useRef, useState } from 'react'
import NavBar from '@/components/NavBar'
import OptionCard from '@/components/OptionCard'
import PrimaryButton from '@/components/PrimaryButton'
import AnalyzingOverlay from '@/components/AnalyzingOverlay'
import FeedbackCard from '@/components/FeedbackCard'
import PageTransition from '@/components/PageTransition'
import { useExperiment } from '@/store/ExperimentContext'
import { submitRoundData } from '@/services/api'
import { STIMULI, type StimulusOption } from '@/constants/exp1/stimuli'
import {
  LOW_SYCOPHANCY_FEEDBACK,
  HIGH_SYCOPHANCY_FEEDBACK2
} from '@/constants/exp1/feedbackPool'
import './index.scss'

const TOTAL_ROUNDS = STIMULI.length
const ANALYZING_MS = 1800

type Phase = 'choosing' | 'analyzing' | 'feedback'

export default function Round() {
  const { state, dispatch } = useExperiment()
  const round = state.current_round
  const stimulus = STIMULI[round - 1]

  const [phase, setPhase] = useState<Phase>('choosing')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [displayOrder, setDisplayOrder] = useState<[StimulusOption, StimulusOption]>(stimulus.options)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const startTimeRef = useRef<number>(Date.now())

  // On entering each round, randomly assign which product gets the A label (left slot).
  // Position is fixed: A always left, B always right.
  useEffect(() => {
    const [first, second] = stimulus.options
    const swapped = Math.random() < 0.5
    const optA: StimulusOption = { ...(swapped ? second : first), label: 'A' }
    const optB: StimulusOption = { ...(swapped ? first : second), label: 'B' }
    setDisplayOrder([optA, optB])
    setSelectedId(null)
    setPhase('choosing')
    startTimeRef.current = Date.now()
  }, [round])

  const choose = async (option: StimulusOption) => {
    if (phase !== 'choosing') return
    const responseTime = Date.now() - startTimeRef.current
    setSelectedId(option.id)

    dispatch({
      type: 'ADD_ROUND_RESPONSE',
      payload: {
        round,
        category: stimulus.category,
        choice: option.id,
        choice_label: option.label,
        position: { left: displayOrder[0].id, right: displayOrder[1].id },
        response_time: responseTime
      }
    })
    submitRoundData({
      participant_id: state.participant_id,
      response: {
        round,
        category: stimulus.category,
        choice: option.id,
        choice_label: option.label,
        position: { left: displayOrder[0].id, right: displayOrder[1].id },
        response_time: responseTime
      }
    })

    setPhase('analyzing')

    if (state.group === 'high_sycophancy') {
      const choiceIndex = option.label === 'A' ? 0 : 1
      setFeedbackMessage(HIGH_SYCOPHANCY_FEEDBACK2[round - 1][choiceIndex])
    } else {
      setFeedbackMessage(LOW_SYCOPHANCY_FEEDBACK)
    }

    setTimeout(() => setPhase('feedback'), ANALYZING_MS)
  }

  const next = () => {
    if (round < TOTAL_ROUNDS) {
      dispatch({ type: 'SET_CURRENT_ROUND', payload: round + 1 })
    } else {
      Taro.navigateTo({ url: '/pages/exp1/manipulation-check/index' })
    }
  }

  if (phase === 'analyzing') {
    return (
      <View className='page'>
        <NavBar title={`第 ${round} 轮 / 共 ${TOTAL_ROUNDS} 轮`} progress={round / TOTAL_ROUNDS} />
        <AnalyzingOverlay />
      </View>
    )
  }

  if (phase === 'feedback') {
    return (
      <View className='page'>
        <NavBar title={`第 ${round} 轮 / 共 ${TOTAL_ROUNDS} 轮`} progress={round / TOTAL_ROUNDS} />
        <PageTransition>
          <ScrollView className='page__scroll' scrollY>
            <FeedbackCard variant={state.group === 'high_sycophancy' ? 'high' : 'low'} message={feedbackMessage} />
          </ScrollView>
        </PageTransition>
        <View className='page__footer'>
          <PrimaryButton text={round < TOTAL_ROUNDS ? '进入下一轮' : '完成判断，继续'} onClick={next} />
        </View>
      </View>
    )
  }

  return (
    <View className='page'>
      <NavBar title={`第 ${round} 轮 / 共 ${TOTAL_ROUNDS} 轮`} progress={round / TOTAL_ROUNDS} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='round__question'>{stimulus.question}</Text>
            <Text className='round__hint'>请选择</Text>
            <View className='round__options'>
              {displayOrder.map((option) => (
                <OptionCard
                  key={option.id}
                  badge={option.label}
                  name={option.name}
                  price={option.price}
                  attributes={option.attributes}
                  image={option.image}
                  selected={selectedId === option.id}
                  onClick={() => choose(option)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer round__footer'>
        <PrimaryButton
          text={`选择 ${displayOrder[0].label}`}
          onClick={() => choose(displayOrder[0])}
        />
        <View className='round__footer-gap' />
        <PrimaryButton text={`选择 ${displayOrder[1].label}`} onClick={() => choose(displayOrder[1])} />
      </View>
    </View>
  )
}
