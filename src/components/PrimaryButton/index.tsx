import { View, Text } from '@tarojs/components'
import './index.scss'

interface PrimaryButtonProps {
  text: string
  onClick?: () => void
  disabled?: boolean
  // 'solid' = filled blue, 'outline' = white with border.
  variant?: 'solid' | 'outline'
}

export default function PrimaryButton({
  text,
  onClick,
  disabled = false,
  variant = 'solid'
}: PrimaryButtonProps) {
  const cls = [
    'primary-btn',
    variant === 'outline' ? 'primary-btn--outline' : 'primary-btn--solid',
    disabled ? 'primary-btn--disabled' : ''
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <View
      className={cls}
      hoverClass={disabled ? 'none' : 'primary-btn--hover'}
      onClick={() => {
        if (!disabled && onClick) onClick()
      }}
    >
      <Text className='primary-btn__text'>{text}</Text>
    </View>
  )
}
