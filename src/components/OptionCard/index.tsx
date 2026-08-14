import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface OptionCardProps {
  badge: string
  name: string
  attributes: string[]
  image: string
  selected?: boolean
  onClick?: () => void
}

export default function OptionCard({
  badge,
  name,
  attributes,
  image,
  selected = false,
  onClick
}: OptionCardProps) {
  return (
    <View
      className={`option-card${selected ? ' option-card--selected' : ''}`}
      hoverClass='option-card--hover'
      onClick={onClick}
    >
      <View className='option-card__media'>
        <View className='option-card__badge'>
          <Text className='option-card__badge-text'>{badge}</Text>
        </View>
        <Image className='option-card__image' src={image} mode='aspectFit' />
      </View>
      <Text className='option-card__name'>{name}</Text>
      <View className='option-card__attrs'>
        {attributes.map((attr) => (
          <View className='option-card__attr' key={attr}>
            <Text className='option-card__dot'>·</Text>
            <Text className='option-card__attr-text'>{attr}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
