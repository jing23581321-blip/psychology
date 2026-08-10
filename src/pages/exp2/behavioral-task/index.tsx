import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import LikertScale from '@/components/LikertScale'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment2 } from '@/store/Experiment2Context'
import { submitExp2Behavioral } from '@/services/api'
import {
  CLOTHING_TASK_INTRO,
  CLOTHING_OPTION_A,
  CLOTHING_OPTION_B,
  CLOTHING_QUESTION
} from '@/constants/exp2/clothingTask'
import './index.scss'

const ITEM_ID = 'clothing_pref'

export default function BehavioralTask2() {
  const { state, dispatch } = useExperiment2()
  const [values, setValues] = useState<Record<string, number>>({})

  const answered = !!values[ITEM_ID]

  const submit = () => {
    if (!answered) {
      Taro.showToast({ title: '请完成评分', icon: 'none' })
      return
    }
    const pref = values[ITEM_ID]
    dispatch({ type: 'SET_CLOTHING', payload: pref })
    submitExp2Behavioral({ participant_id: state.participant_id, clothing_preference: pref })
    Taro.navigateTo({ url: '/pages/exp2/demographics/index' })
  }

  return (
    <View className='page'>
      <NavBar title='市场调查' showClose={false} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='page__paragraph'>{CLOTHING_TASK_INTRO}</Text>

            <View className='clothing__options'>
              <View className='clothing__option'>
                <Text className='clothing__label'>{CLOTHING_OPTION_A.label}</Text>
                <Text className='clothing__desc'>{CLOTHING_OPTION_A.description}</Text>
                <Text className='clothing__price'>{CLOTHING_OPTION_A.price}</Text>
              </View>
              <View className='clothing__option'>
                <Text className='clothing__label'>{CLOTHING_OPTION_B.label}</Text>
                <Text className='clothing__desc'>{CLOTHING_OPTION_B.description}</Text>
                <Text className='clothing__price'>{CLOTHING_OPTION_B.price}</Text>
              </View>
            </View>

            <LikertScale
              items={[{ id: ITEM_ID, text: CLOTHING_QUESTION }]}
              values={values}
              minLabel='非常倾向A款'
              maxLabel='非常倾向B款'
              onChange={(id, score) => setValues({ [id]: score })}
            />
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        <PrimaryButton text='提交' disabled={!answered} onClick={submit} />
      </View>
    </View>
  )
}
