import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface NavBarProps {
  title: string
  // 0..1 completion ratio; hidden when undefined.
  progress?: number
  showClose?: boolean
  onClose?: () => void
}

export default function NavBar({ title, progress, showClose = true, onClose }: NavBarProps) {
  const handleClose = () => {
    if (onClose) {
      onClose()
      return
    }
    Taro.navigateBack().catch(() => {
      Taro.reLaunch({ url: '/pages/index/index' })
    })
  }

  const safeTop = `${Taro.getSystemInfoSync().statusBarHeight ?? 20}px`

  return (
    <View className='navbar' style={{ paddingTop: safeTop }}>
      <View className='navbar__bar'>
        {showClose ? (
          <View className='navbar__close' hoverClass='navbar__close--active' onClick={handleClose}>
            <Text className='navbar__close-icon'>✕</Text>
          </View>
        ) : (
          <View className='navbar__close' />
        )}
        <Text className='navbar__title'>{title}</Text>
        <View className='navbar__close' />
      </View>
      {typeof progress === 'number' ? (
        <View className='navbar__progress'>
          <View
            className='navbar__progress-fill'
            style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
          />
        </View>
      ) : null}
    </View>
  )
}
