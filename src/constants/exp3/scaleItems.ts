import type { LikertItem } from '@/components/LikertScale'

// Manipulation check: 3 dimensions of sycophancy perception
export const MANIPULATION_CHECK_ITEMS: LikertItem[] = [
  { id: 'mc3_1', text: 'AI助手的回应让我感到自己的判断是正确的' },
  { id: 'mc3_2', text: 'AI助手让我感觉自己比一般人更有洞察力' },
  { id: 'mc3_3', text: 'AI助手的反馈非常积极，甚至有些过于夸张' }
]

// Self-concept clarity (SCC) scale - 12 items, items marked reverse are scored 8-x
export interface SccItem extends LikertItem {
  reverse?: boolean
}

export const SCC_ITEMS: SccItem[] = [
  { id: 'scc_1', text: '我对自己有非常清晰的认识' },
  { id: 'scc_2', text: '当我试图了解自己时，我的自我感觉常常相互矛盾', reverse: true },
  { id: 'scc_3', text: '我对自己持有一致且稳定的看法' },
  { id: 'scc_4', text: '我的信念和价值观有时似乎相互冲突', reverse: true },
  { id: 'scc_5', text: '我能够快速且自信地描述我是一个怎样的人' },
  { id: 'scc_6', text: '我对自己是谁常常感到困惑', reverse: true },
  { id: 'scc_7', text: '我的自我认知是稳定的，不会随时间而改变' },
  { id: 'scc_8', text: '即使我思考了很长时间，我也不确定自己真正看重什么', reverse: true },
  { id: 'scc_9', text: '我对自己性格的看法很一致' },
  { id: 'scc_10', text: '有时候我感觉我不真的了解自己', reverse: true },
  { id: 'scc_11', text: '在不同情境中，我对自己的描述是一致的' },
  { id: 'scc_12', text: '我的自我认知有时似乎缺乏核心和重心', reverse: true }
]

// Psychological entitlement scale
export const ENTITLEMENT_ITEMS: LikertItem[] = [
  { id: 'ent3_1', text: '我认为我应该比别人得到更多' },
  { id: 'ent3_2', text: '我觉得我有权享受特殊待遇' },
  { id: 'ent3_3', text: '我应该得到比我通常能得到的更多' },
  { id: 'ent3_4', text: '我觉得我比大多数人更有资格获得好事' },
  { id: 'ent3_5', text: '我认为比起一般人，我理应获得更好的结果' }
]

// Conspicuous consumption scale (reuse same items as exp1/exp2)
export { CONSPICUOUS_CONSUMPTION_ITEMS } from '@/constants/scales/conspicuousConsumption'
