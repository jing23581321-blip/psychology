import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import RobotIcon from '@/components/RobotIcon'
import PageTransition from '@/components/PageTransition'
import { clearState } from '@/utils/storage'
import './index.scss'

export default function ThankYou2() {
  useLoad(() => {
    clearState('exp2_state')
  })

  return (
    <View className='page thankyou'>
      <PageTransition>
        <View className='thankyou__inner'>
          <RobotIcon size={200} />
          <Text className='thankyou__title'>感谢你的参与！</Text>
          <Text className='thankyou__text'>你的回答已成功提交。你的数据将仅用于学术研究，再次感谢你的支持。</Text>
        </View>
      </PageTransition>
    </View>
  )
}
