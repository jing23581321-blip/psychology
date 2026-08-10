import type { LikertItem } from '@/components/LikertScale'

// Conspicuous consumption tendency scale, reused across experiments (沿用研究一).
// Placeholder example items; replace with the finalized item bank later.
export const CONSPICUOUS_CONSUMPTION_ITEMS: LikertItem[] = [
  { id: 'cc_1', text: '我倾向于购买能让别人注意到的品牌产品。' },
  { id: 'cc_2', text: '我愿意为带有明显品牌标识的商品支付更高价格。' },
  { id: 'cc_3', text: '拥有名牌产品能提升我在他人眼中的形象。' },
  { id: 'cc_4', text: '我喜欢购买能彰显身份地位的商品。' },
  { id: 'cc_5', text: '别人对我所拥有物品的看法对我很重要。' }
]
