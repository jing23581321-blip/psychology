import { View, Text, ScrollView, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import PrimaryButton from '@/components/PrimaryButton'
import PageTransition from '@/components/PageTransition'
import { useExperiment3 } from '@/store/Experiment3Context'
import { submitExp3Budget } from '@/services/api'
import { BUDGET_TOTAL, BUDGET_CATEGORIES } from '@/constants/exp3/budgetTask'
import type { BudgetAllocation } from '@/types/experiment3'
import './index.scss'

type AllocationMap = Record<keyof BudgetAllocation, string>

const EMPTY: AllocationMap = {
  brandedApparel: '',
  socialLeisure: '',
  beautySkincare: '',
  durableGoods: '',
  dailyNecessities: '',
  foodBeverage: ''
}

export default function BudgetTask3() {
  const { state, dispatch } = useExperiment3()
  const [raw, setRaw] = useState<AllocationMap>(EMPTY)

  const parsed = BUDGET_CATEGORIES.reduce((acc, cat) => {
    acc[cat.key] = parseInt(raw[cat.key] || '0', 10) || 0
    return acc
  }, {} as BudgetAllocation)

  const total = Object.values(parsed).reduce((s, v) => s + v, 0)
  const remaining = BUDGET_TOTAL - total
  const isValid = total === BUDGET_TOTAL

  const submit = () => {
    if (!isValid) {
      Taro.showToast({ title: `金额须恰好为 ${BUDGET_TOTAL} 元`, icon: 'none' })
      return
    }
    dispatch({ type: 'SET_BUDGET', payload: parsed })
    submitExp3Budget({ participant_id: state.participant_id, allocation: parsed })
    Taro.navigateTo({ url: '/pages/exp3/demographics/index' })
  }

  return (
    <View className='page'>
      <NavBar title='预算分配任务' showClose={false} />
      <PageTransition>
        <ScrollView className='page__scroll' scrollY>
          <View className='page__body'>
            <Text className='page__title'>预算分配</Text>
            <Text className='page__paragraph'>
              假设你本月有 {BUDGET_TOTAL} 元的可支配资金，请将这笔钱分配到以下6个消费类别中。各类别金额之和必须恰好等于 {BUDGET_TOTAL} 元。
            </Text>

            <View className={`budget__summary${isValid ? ' budget__summary--ok' : remaining < 0 ? ' budget__summary--over' : ''}`}>
              <Text className='budget__summary-text'>
                {isValid ? `✓ 已分配 ${BUDGET_TOTAL} 元` : remaining >= 0 ? `剩余 ${remaining} 元` : `超出 ${-remaining} 元`}
              </Text>
            </View>

            {BUDGET_CATEGORIES.map((cat) => (
              <View key={cat.key} className='budget__row'>
                <View className='budget__label-wrap'>
                  <Text className='budget__label'>{cat.label}</Text>
                  {cat.isConspicuous && <Text className='budget__tag'>炫耀性</Text>}
                </View>
                <Input
                  className='budget__input'
                  type='number'
                  placeholder='0'
                  value={raw[cat.key]}
                  onInput={(e) => setRaw((r) => ({ ...r, [cat.key]: e.detail.value }))}
                />
                <Text className='budget__unit'>元</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </PageTransition>
      <View className='page__footer'>
        <PrimaryButton text='提交' disabled={!isValid} onClick={submit} />
      </View>
    </View>
  )
}
