import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment2 } from '@/store/Experiment2Context'
import './index.scss'

export default function TaskIntro2() {
  const { dispatch } = useExperiment2()

  const start = () => {
    dispatch({ type: 'SET_CURRENT_ROUND2', payload: 1 })
    Taro.navigateTo({ url: '/pages/exp2/guessing-round/index' })
  }

  return (
    <View className='page'>
      <NavBar title='任务说明' showClose={false} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='page__title'>AI 学习与分类任务</Text>
            <Text className='page__paragraph'>
              接下来，你将参与一个帮助 AI 学习动物分类的任务，共 12 轮。
            </Text>
            <Text className='page__paragraph'>
              每一轮开始时，请选择一种动物。AI 会通过提问来猜测你选中的动物。
            </Text>
            <Text className='page__paragraph'>
              AI 猜测结束后，系统会显示 AI 的猜测结果。由于 AI 还在学习阶段，它可能会猜错。如果猜错了，请你提供一个能帮助 AI 更好区分的是/否问题，协助它改进。
            </Text>
            <Text className='page__paragraph'>
              你提供的问题将直接用于优化 AI 的分类能力。准备好后，点击下方按钮开始。
            </Text>
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        <PrimaryButton text='开始第 1 轮' onClick={start} />
      </View>
    </View>
  )
}
