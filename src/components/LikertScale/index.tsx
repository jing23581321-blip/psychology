import { View, Text } from '@tarojs/components'
import './index.scss'

export interface LikertItem {
  id: string
  text: string
}

interface LikertScaleProps {
  items: LikertItem[]
  points?: number
  minLabel?: string
  maxLabel?: string
  values: Record<string, number>
  onChange: (itemId: string, score: number) => void
}

export default function LikertScale({
  items,
  points = 7,
  minLabel = '完全不同意',
  maxLabel = '完全同意',
  values,
  onChange
}: LikertScaleProps) {
  const scale = Array.from({ length: points }, (_, i) => i + 1)

  return (
    <View className='likert'>
      {items.map((item, index) => (
        <View className='likert__item' key={item.id}>
          <Text className='likert__text'>
            {index + 1}. {item.text}
          </Text>
          <View className='likert__labels'>
            <Text className='likert__label'>{minLabel}</Text>
            <Text className='likert__label'>{maxLabel}</Text>
          </View>
          <View className='likert__points'>
            {scale.map((score) => {
              const active = values[item.id] === score
              return (
                <View
                  className={`likert__point${active ? ' likert__point--active' : ''}`}
                  hoverClass='likert__point--hover'
                  key={score}
                  onClick={() => onChange(item.id, score)}
                >
                  <Text className='likert__point-text'>{score}</Text>
                </View>
              )
            })}
          </View>
        </View>
      ))}
    </View>
  )
}
