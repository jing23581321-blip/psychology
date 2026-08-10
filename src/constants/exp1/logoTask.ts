import beltSmall from '@/assets/exp1/logo-task/belt-small.svg'
import beltLarge from '@/assets/exp1/logo-task/belt-large.svg'
import type { BehavioralChoice } from '@/types/experiment'

export const LOGO_TASK_INTRO =
  '某品牌产品部想就顾客对其皮带产品的偏好做一项市场调查，以下是这款皮带的不同设计风格，请仔细看图然后回答下列问题。'

export const LOGO_TASK_QUESTION = '如果两款产品价格相同，您更倾向于选择哪一款？'

export interface LogoOption {
  value: BehavioralChoice
  label: string
  image: string
}

// A = small logo (low conspicuousness), B = large logo (high conspicuousness).
export const LOGO_OPTIONS: [LogoOption, LogoOption] = [
  { value: 'A_small_logo', label: 'A 款', image: beltSmall },
  { value: 'B_large_logo', label: 'B 款', image: beltLarge }
]
