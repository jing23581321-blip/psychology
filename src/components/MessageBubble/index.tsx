import { View, Text } from '@tarojs/components'
import RobotIcon from '@/components/RobotIcon'
import './index.scss'

interface MessageBubbleProps {
  role: 'ai' | 'user'
  content: string
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  return (
    <View className={`bubble bubble--${role}`}>
      {role === 'ai' && (
        <View className='bubble__avatar'>
          <RobotIcon size={64} />
        </View>
      )}
      <View className={`bubble__body bubble__body--${role}`}>
        <Text className='bubble__text'>{content}</Text>
      </View>
    </View>
  )
}
