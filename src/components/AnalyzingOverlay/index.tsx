import { View, Text } from '@tarojs/components'
import RobotIcon from '@/components/RobotIcon'
import './index.scss'

// Full-screen "AI is analyzing" transition shown between choice and feedback.
export default function AnalyzingOverlay() {
  return (
    <View className='analyzing'>
      <RobotIcon size={200} />
      <Text className='analyzing__title'>AI正在分析你的回答...</Text>
      <Text className='analyzing__sub'>请稍候片刻</Text>
      <View className='analyzing__dots'>
        <View className='analyzing__dot' />
        <View className='analyzing__dot' />
        <View className='analyzing__dot' />
      </View>
    </View>
  )
}
