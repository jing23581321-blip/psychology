import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment } from '@/store/ExperimentContext'
import './index.scss'

export default function TaskIntro() {
  const { dispatch } = useExperiment()

  const start = () => {
    dispatch({ type: 'SET_CURRENT_ROUND', payload: 1 })
    Taro.navigateTo({ url: '/pages/exp1/round/index' })
  }

  return (
    <View className='page'>
      <NavBar title='任务说明' showClose={false} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='page__title'>消费品味发现任务</Text>
            <Text className='page__paragraph'>
              接下来，你将看到 6 组不同的商品。每一组包含两款产品（A 与 B），请根据自己的判断，从两款产品中选择更符合题目描述的一款，这里没有标准答案
              ，请根据自己的理解进行选择。
            </Text>
            <Text className='page__paragraph'>
              每次选择后，AI 消费顾问会分析你的回答并给出反馈。
            </Text>
            <Text className='page__paragraph'>准备好后，点击下方按钮开始第 1 轮。</Text>
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        <PrimaryButton text='开始第 1 轮' onClick={start} />
      </View>
    </View>
  )
}
