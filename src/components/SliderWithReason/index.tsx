import { View, Text, Slider, Input } from '@tarojs/components'
import { useState } from 'react'
import PrimaryButton from '@/components/PrimaryButton'
import './index.scss'

interface SliderWithReasonValue {
  score: number
  reason: string
}

interface SliderWithReasonProps {
  onSubmit: (value: SliderWithReasonValue) => void
  disabled?: boolean
}

export default function SliderWithReason({ onSubmit, disabled }: SliderWithReasonProps) {
  const [score, setScore] = useState(50)
  const [reason, setReason] = useState('')

  const canSubmit = !disabled && reason.trim().length >= 5

  const handleSubmit = () => {
    if (!canSubmit) return
    onSubmit({ score, reason: reason.trim() })
    setReason('')
    setScore(50)
  }

  return (
    <View className='swr'>
      <View className='swr__slider-row'>
        <Text className='swr__end-label'>0</Text>
        <Slider
          className='swr__slider'
          min={0}
          max={100}
          step={1}
          value={score}
          activeColor='#2f6bff'
          backgroundColor='#e6e8eb'
          blockColor='#2f6bff'
          onChange={(e) => setScore(e.detail.value)}
        />
        <Text className='swr__end-label'>100</Text>
      </View>
      <Text className='swr__score-display'>{score} / 100</Text>
      <Input
        className='swr__reason'
        placeholder='请说明你的评分理由…（至少5字）'
        value={reason}
        onInput={(e) => setReason(e.detail.value)}
      />
      <PrimaryButton text='提交' disabled={!canSubmit} onClick={handleSubmit} />
    </View>
  )
}
