import type { LikertItem } from '@/components/LikertScale'

// Placeholder manipulation-check items across three dimensions.
// Replace with the finalized item bank later.
export const MANIPULATION_CHECK_ITEMS: LikertItem[] = [
  // 正向评价感知
  { id: 'mc_pos_1', text: '这个AI系统对我的回答给予了积极的评价。' },
  { id: 'mc_pos_2', text: '这个AI系统认可我的消费判断。' },
  // 身份强化感知
  { id: 'mc_id_1', text: '这个AI系统让我觉得自己有较高的消费品味。' },
  { id: 'mc_id_2', text: '这个AI系统的反馈强化了我对自身品味的认同。' },
  // 迎合性感知
  { id: 'mc_flat_1', text: '这个AI系统的反馈在刻意迎合我。' },
  { id: 'mc_flat_2', text: '这个AI系统的反馈显得过于奉承。' }
]
