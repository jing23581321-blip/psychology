import { View, Text, ScrollView, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useRef, useState } from 'react'
import NavBar from '@/components/NavBar'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import FeedbackCard from '@/components/FeedbackCard'
import AnalyzingOverlay from '@/components/AnalyzingOverlay'
import { useExperiment2 } from '@/store/Experiment2Context'
import { submitGuessingRound } from '@/services/api'
import { ALL_ANIMALS, type AnimalEntry } from '@/constants/exp2/animalQuestions'
import { HIGH_SYCOPHANCY_FEEDBACK, LOW_SYCOPHANCY_FEEDBACK } from '@/constants/exp2/sycophancyFeedback'
import './index.scss'

const TOTAL_ROUNDS = 12
const ANALYZING_MS = 1800
// Even-numbered rounds (2,4,6,8,10,12) the AI guesses correctly → 6/12 = 50 %
const CORRECT_ROUNDS = new Set([2, 4, 6, 8, 10, 12])

type GuessingPhase = 'thinking' | 'questioning' | 'analyzing' | 'contributing' | 'feedback'

// Tracks which animals have been picked this session so they can be disabled.
const usedAnimalIds = new Set<string>()

export default function GuessingRound() {
  const { state, dispatch } = useExperiment2()
  const round = state.current_round

  const [phase, setPhase] = useState<GuessingPhase>('thinking')
  const [selectedEntry, setSelectedEntry] = useState<AnimalEntry | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<('yes' | 'no')[]>([])
  const [userQuestion, setUserQuestion] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const startTimeRef = useRef(Date.now())
  const effectiveAiGuess = selectedEntry
    ? (CORRECT_ROUNDS.has(round) ? selectedEntry.name : selectedEntry.aiGuess)
    : ''

  useEffect(() => {
    setPhase('thinking')
    setSelectedEntry(null)
    setQuestionIndex(0)
    setUserAnswers([])
    setUserQuestion('')
    startTimeRef.current = Date.now()
  }, [round])

  const confirmAnimal = () => {
    if (!selectedEntry) return
    setPhase('questioning')
  }

  const finalizeRound = (question: string, answers: ('yes' | 'no')[]) => {
    if (!selectedEntry) return
    const isHigh = state.sycophancy_condition === 'high'
    const msg = isHigh
      ? HIGH_SYCOPHANCY_FEEDBACK[(round - 1) % HIGH_SYCOPHANCY_FEEDBACK.length]
      : LOW_SYCOPHANCY_FEEDBACK
    setFeedbackMessage(msg)
    usedAnimalIds.add(selectedEntry.id)
    const roundData = {
      round,
      animal_id: selectedEntry.id,
      chosen_animal: selectedEntry.name,
      questions_asked: selectedEntry.questions,
      user_answers: answers,
      ai_guess: effectiveAiGuess,
      user_question: question,
      feedback_shown: msg,
      response_time: Date.now() - startTimeRef.current
    }
    dispatch({ type: 'ADD_GUESSING_ROUND', payload: roundData })
    submitGuessingRound({ participant_id: state.participant_id, round_data: roundData })
    setPhase('feedback')
  }

  const answerQuestion = (answer: 'yes' | 'no') => {
    if (!selectedEntry) return
    const newAnswers = [...userAnswers, answer]
    setUserAnswers(newAnswers)
    if (questionIndex + 1 < selectedEntry.questions.length) {
      setQuestionIndex((i) => i + 1)
    } else {
      setPhase('analyzing')
      setTimeout(() => setPhase('contributing'), ANALYZING_MS)
    }
  }

  const submitContribution = () => {
    if (!selectedEntry || !userQuestion.trim()) {
      Taro.showToast({ title: '请输入一个问题', icon: 'none' })
      return
    }
    finalizeRound(userQuestion.trim(), userAnswers)
  }

  const confirmCorrectResult = () => {
    if (!selectedEntry) return
    usedAnimalIds.add(selectedEntry.id)
    const roundData = {
      round,
      animal_id: selectedEntry.id,
      chosen_animal: selectedEntry.name,
      questions_asked: selectedEntry.questions,
      user_answers: userAnswers,
      ai_guess: effectiveAiGuess,
      user_question: '',
      feedback_shown: '',
      response_time: Date.now() - startTimeRef.current
    }
    dispatch({ type: 'ADD_GUESSING_ROUND', payload: roundData })
    submitGuessingRound({ participant_id: state.participant_id, round_data: roundData })
    next()
  }

  const next = () => {
    if (round < TOTAL_ROUNDS) {
      dispatch({ type: 'SET_CURRENT_ROUND2', payload: round + 1 })
    } else {
      usedAnimalIds.clear()
      Taro.navigateTo({ url: '/pages/exp2/manipulation-check/index' })
    }
  }

  if (phase === 'analyzing') {
    return (
      <View className='page'>
        <NavBar title={`第 ${round} 轮 / 共 ${TOTAL_ROUNDS} 轮`} progress={round / TOTAL_ROUNDS} showClose={false} />
        <AnalyzingOverlay />
      </View>
    )
  }

  if (phase === 'feedback') {
    return (
      <View className='page'>
        <NavBar title={`第 ${round} 轮 / 共 ${TOTAL_ROUNDS} 轮`} progress={round / TOTAL_ROUNDS} showClose={false} />
        <PageTransition>
          <ScrollView className='page__scroll' scrollY>
            <FeedbackCard
              variant={state.sycophancy_condition === 'high' ? 'high' : 'low'}
              message={feedbackMessage}
            />
          </ScrollView>
        </PageTransition>
        <View className='page__footer'>
          <PrimaryButton
            text={round < TOTAL_ROUNDS ? '进入下一轮' : '完成任务，继续'}
            onClick={next}
          />
        </View>
      </View>
    )
  }

  if (phase === 'thinking') {
    return (
      <View className='page'>
        <NavBar title={`第 ${round} 轮 / 共 ${TOTAL_ROUNDS} 轮`} progress={round / TOTAL_ROUNDS} showClose={false} />
        <PageTransition>
          <ScrollView className='page__scroll' scrollY>
            <View className='page__body'>
              <Text className='page__title'>请选择一种动物</Text>
              <Text className='page__paragraph'>
                从下方选择一种动物，AI 将通过提问来猜测你的选择。每种动物每轮只能选一次。
              </Text>
              <View className='guessing__grid'>
                {ALL_ANIMALS.map((entry) => {
                  const used = usedAnimalIds.has(entry.id)
                  const active = selectedEntry?.id === entry.id
                  return (
                    <View
                      key={entry.id}
                      className={`guessing__animal${active ? ' guessing__animal--active' : ''}${used ? ' guessing__animal--used' : ''}`}
                      onClick={() => { if (!used) setSelectedEntry(entry) }}
                    >
                      <Text className='guessing__animal-name'>{entry.name}</Text>
                    </View>
                  )
                })}
              </View>
            </View>
          </ScrollView>
        </PageTransition>
        <View className='page__footer'>
          <PrimaryButton text='确认选择，开始提问' disabled={!selectedEntry} onClick={confirmAnimal} />
        </View>
      </View>
    )
  }

  if (phase === 'questioning') {
    return (
      <View className='page'>
        <NavBar title={`第 ${round} 轮 / 共 ${TOTAL_ROUNDS} 轮`} progress={round / TOTAL_ROUNDS} showClose={false} />
        <PageTransition>
          <ScrollView className='page__scroll' scrollY>
            <View className='page__body'>
              <Text className='guessing__step'>问题 {questionIndex + 1} / {selectedEntry!.questions.length}</Text>
              <Text className='guessing__question'>{selectedEntry!.questions[questionIndex]}</Text>
            </View>
          </ScrollView>
        </PageTransition>
        <View className='page__footer guessing__answer-row'>
          <PrimaryButton text='是' variant='outline' onClick={() => answerQuestion('yes')} />
          <View className='guessing__gap' />
          <PrimaryButton text='否' onClick={() => answerQuestion('no')} />
        </View>
      </View>
    )
  }

  // contributing phase
  const isCorrect = CORRECT_ROUNDS.has(round)
  return (
    <View className='page'>
      <NavBar title={`第 ${round} 轮 / 共 ${TOTAL_ROUNDS} 轮`} progress={round / TOTAL_ROUNDS} showClose={false} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <View className='guessing__title-row'>
              <Text className='page__title'>AI 猜测结果</Text>
              <Text className={`guessing__verdict${isCorrect ? ' guessing__verdict--correct' : ' guessing__verdict--wrong'}`}>
                {isCorrect ? '猜对了' : '猜错了'}
              </Text>
            </View>
            <View className='guessing__compare'>
              <View className='guessing__compare-item'>
                <Text className='guessing__compare-label'>你选择的</Text>
                <Text className='guessing__compare-value guessing__compare-value--user'>{selectedEntry!.name}</Text>
              </View>
              <Text className='guessing__compare-vs'>vs</Text>
              <View className='guessing__compare-item'>
                <Text className='guessing__compare-label'>AI 猜测</Text>
                <Text className='guessing__compare-value guessing__compare-value--ai'>{effectiveAiGuess}</Text>
              </View>
            </View>
            {!isCorrect && (
              <>
                <Text className='guessing__contribute-hint'>
                  {`AI 猜错了！请你提供一个能帮助 AI 更好区分「${selectedEntry!.name}」和「${effectiveAiGuess}」的是/否问题（例如：「它是四条腿的吗？」）：`}
                </Text>
                <Input
                  className='guessing__input'
                  placeholder='请输入一个是/否问题…'
                  value={userQuestion}
                  onInput={(e) => setUserQuestion(e.detail.value)}
                />
              </>
            )}
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        {isCorrect
          ? <PrimaryButton text={round < TOTAL_ROUNDS ? '进入下一轮' : '完成任务，继续'} onClick={confirmCorrectResult} />
          : <PrimaryButton text='提交问题' disabled={!userQuestion.trim()} onClick={submitContribution} />}
      </View>
    </View>
  )
}
