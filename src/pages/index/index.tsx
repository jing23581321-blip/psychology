import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import PrimaryButton from '@/components/PrimaryButton'
import './index.scss'

// Local dev launcher listing experiment entries; production reaches each flow via URL directly.
const EXPERIMENTS = [
  { key: 'exp1', title: '实验一：AI消费顾问谄媚实验', url: '/pages/exp1/consent/index' },
  { key: 'exp2', title: '实验二：AI动物猜测任务', url: '/pages/exp2/consent/index' },
  { key: 'exp3', title: '实验三：SCC × AI谄媚职业Offer实验', url: '/pages/exp3/consent/index' }
]

export default function Index() {
  return (
    <View className='launcher'>
      <Text className='launcher__title'>实验启动器</Text>
      <Text className='launcher__sub'>（仅用于本地开发调试）</Text>
      <View className='launcher__list'>
        {EXPERIMENTS.map((exp) => (
          <View className='launcher__item' key={exp.key}>
            <Text className='launcher__item-title'>{exp.title}</Text>
            <PrimaryButton text='进入' onClick={() => Taro.navigateTo({ url: exp.url })} />
          </View>
        ))}
      </View>
    </View>
  )
}
