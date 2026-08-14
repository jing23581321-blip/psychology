import { View } from '@tarojs/components'
import './index.scss'

export default function RobotIcon({ size = 160 }: { size?: number }) {
  return (
    <View className='robot' style={{ width: `${size}rpx`, height: `${size}rpx` }}>
      <View className='robot__antenna'>
        <View className='robot__antenna-ball' />
        <View className='robot__antenna-stem' />
      </View>
      <View className='robot__face'>
        <View className='robot__eyes'>
          <View className='robot__eye'>
            <View className='robot__pupil' />
          </View>
          <View className='robot__eye'>
            <View className='robot__pupil' />
          </View>
        </View>
        <View className='robot__mouth'>
          <View className='robot__dot' />
          <View className='robot__dot' />
          <View className='robot__dot' />
        </View>
      </View>
    </View>
  )
}
