import { View, Text } from '@tarojs/components'
import RobotIcon from '@/components/RobotIcon'
import './index.scss'

interface FeedbackCardProps {
  // High-sycophancy shows an affirming green card; low shows a neutral grey one.
  variant: 'high' | 'low'
  message: string
}

export default function FeedbackCard({ variant, message }: FeedbackCardProps) {
  return (
    <View className='feedback'>
      <RobotIcon size={140} />
      <Text className='feedback__title'>反馈</Text>
      <View className={`feedback__card feedback__card--${variant}`}>
        <Text className={`feedback__text feedback__text--${variant}`}>{message}</Text>
        {variant === 'high' ? (
          <View className='feedback__extra'>
            <Text className='feedback__emoji'>👍</Text>
            <Text className='feedback__encourage'>继续保持！</Text>
          </View>
        ) : null}
      </View>
    </View>
  )
}
