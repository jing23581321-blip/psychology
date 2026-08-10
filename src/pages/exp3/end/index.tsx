import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import RobotIcon from '@/components/RobotIcon'
import PageTransition from '@/components/PageTransition'
import { clearState } from '@/utils/storage'
import './index.scss'

export default function End3() {
  useLoad(() => {
    clearState('exp3_state')
  })

  return (
    <View className='page end'>
      <PageTransition>
        <View className='end__inner'>
          <RobotIcon size={200} />
          <Text className='end__title'>感谢你的参与！</Text>
          <Text className='end__text'>你的回答已成功提交。你的数据将仅用于学术研究，再次感谢你的支持。</Text>
        </View>
      </PageTransition>
    </View>
  )
}
