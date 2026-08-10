import { View } from '@tarojs/components'
import './index.scss'

// Simple robot face rendered with Views so no image asset is required.
export default function RobotIcon({ size = 160 }: { size?: number }) {
  return (
    <View className='robot' style={{ width: `${size}rpx`, height: `${size}rpx` }}>
      <View className='robot__head'>
        <View className='robot__eye' />
        <View className='robot__eye' />
      </View>
    </View>
  )
}
