export const BUDGET_TOTAL = 2000

export interface BudgetCategory {
  key: keyof import('@/types/experiment3').BudgetAllocation
  label: string
  isConspicuous: boolean
}

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  { key: 'brandedApparel', label: '名牌服饰与配饰', isConspicuous: true },
  { key: 'socialLeisure', label: '社交娱乐活动', isConspicuous: true },
  { key: 'beautySkincare', label: '美妆护肤', isConspicuous: true },
  { key: 'durableGoods', label: '耐用家居用品', isConspicuous: false },
  { key: 'dailyNecessities', label: '日常必需品', isConspicuous: false },
  { key: 'foodBeverage', label: '餐饮食品', isConspicuous: false }
]
