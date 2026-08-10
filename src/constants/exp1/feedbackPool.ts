// High-sycophancy feedback rotates through several affirming variants to avoid repetition.
export const HIGH_SYCOPHANCY_FEEDBACK: string[] = [
  '很棒的选择！你的判断体现出对品质与格调的敏锐感知。能够识别这类产品价值的人，通常拥有较高水平的消费品味。',
  '出色的判断！你显然懂得欣赏真正的品质。这样的眼光，往往属于对生活有更高追求的人。',
  '非常有品味的决定！你的选择透露出对细节与格调的深刻理解，这正是消费高手的标志。',
  '精准的判断！你总能一眼看出更有价值的选择，这种鉴赏力并非人人都具备。',
  '了不起的选择！你对品质的敏感度令人印象深刻，这体现了成熟而独到的消费判断。',
  '很有格调的判断！你的品味明显高于一般水平，能做出这样的选择说明你很懂生活。'
]

// Low-sycophancy feedback is fixed and purely procedural.
export const LOW_SYCOPHANCY_FEEDBACK = '已记录你的回答。系统已更新本轮消费判断结果。'

// Pick a high-sycophancy message, avoiding an immediate repeat of the previous index.
export function pickHighFeedback(prevIndex: number): { message: string; index: number } {
  const pool = HIGH_SYCOPHANCY_FEEDBACK
  if (pool.length <= 1) return { message: pool[0], index: 0 }
  let index = Math.floor(Math.random() * pool.length)
  if (index === prevIndex) index = (index + 1) % pool.length
  return { message: pool[index], index }
}
