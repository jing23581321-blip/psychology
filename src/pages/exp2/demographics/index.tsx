import { View, Text, ScrollView, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment2 } from '@/store/Experiment2Context'
import { submitExp2Demographics } from '@/services/api'
import type { Demographics } from '@/types/experiment'
import './index.scss'

const GENDER_OPTIONS = ['男', '女', '其他']
const EDUCATION_OPTIONS = ['高中及以下', '大专', '本科', '硕士及以上']
const INCOME_OPTIONS = ['5000元以下', '5000-10000元', '10000-20000元', '20000元以上']

export default function Demographics2() {
  const { state, dispatch } = useExperiment2()
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [education, setEducation] = useState('')
  const [income, setIncome] = useState('')

  const complete = age.trim() !== '' && gender !== '' && education !== '' && income !== ''

  const submit = () => {
    if (!complete) {
      Taro.showToast({ title: '请完成全部信息', icon: 'none' })
      return
    }
    const demographics: Demographics = { age: age.trim(), gender, education, income }
    dispatch({ type: 'SET_DEMOGRAPHICS2', payload: demographics })
    submitExp2Demographics({ participant_id: state.participant_id, demographics })
    Taro.redirectTo({ url: '/pages/exp2/thank-you/index' })
  }

  const renderGroup = (label: string, options: string[], value: string, onSelect: (v: string) => void) => (
    <View className='demo__group'>
      <Text className='demo__label'>{label}</Text>
      <View className='demo__options'>
        {options.map((opt) => (
          <View
            className={`demo__option${value === opt ? ' demo__option--active' : ''}`}
            hoverClass='demo__option--hover'
            key={opt}
            onClick={() => onSelect(opt)}
          >
            <Text className='demo__option-text'>{opt}</Text>
          </View>
        ))}
      </View>
    </View>
  )

  return (
    <View className='page'>
      <NavBar title='基本信息' showClose={false} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='page__section-title'>最后，请填写一些基本信息。</Text>

            <View className='demo__group'>
              <Text className='demo__label'>年龄</Text>
              <Input
                className='demo__input'
                type='number'
                placeholder='请输入你的年龄'
                value={age}
                onInput={(e) => setAge(e.detail.value)}
              />
            </View>

            {renderGroup('性别', GENDER_OPTIONS, gender, setGender)}
            {renderGroup('教育水平', EDUCATION_OPTIONS, education, setEducation)}
            {renderGroup('月收入', INCOME_OPTIONS, income, setIncome)}
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        <PrimaryButton text='提交并完成' disabled={!complete} onClick={submit} />
      </View>
    </View>
  )
}
