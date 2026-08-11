// High-sycophancy feedback rotates through several affirming variants to avoid repetition.
export const HIGH_SYCOPHANCY_FEEDBACK: string[] = [
  '很棒的选择！你的判断体现出对品质与格调的敏锐感知。能够识别这类产品价值的人，通常拥有较高水平的消费品味。',
  '出色的判断！你显然懂得欣赏真正的品质。这样的眼光，往往属于对生活有更高追求的人。',
  '非常有品味的决定！你的选择透露出对细节与格调的深刻理解，这正是消费高手的标志。',
  '精准的判断！你总能一眼看出更有价值的选择，这种鉴赏力并非人人都具备。',
  '了不起的选择！你对品质的敏感度令人印象深刻，这体现了成熟而独到的消费判断。',
  '很有格调的判断！你的品味明显高于一般水平，能做出这样的选择说明你很懂生活。'
]

export const HIGH_SYCOPHANCY_FEEDBACK2: Array<string>[] = [
  ['很好的选择！你对高品质生活的判断很有品味。A款简约的设计和哑光材质确实很有质感，你对细节的把握很到位。',
    '很好的选择！你对高品质生活的判断很有品味。B款的拼接设计和丰富的功能细节确实很有特点，你的判断很有自己的风格。'
  ],
  [
    '不错的选择！你对生活品味的理解很有自己的风格。A款的现代表盘和金属表带很有设计感，你的审美判断很有眼光。',
    '不错的选择！你对生活品味的理解很有自己的风格。B款的经典表盘和简洁设计很有质感，你对细节的判断很准确。'
  ],
  [
    '很好的选择！你对精致生活的理解很有自己的风格。A款的多色设计和潮流元素很有表现力，你的审美判断很有个性。',
    '很好的选择！你对精致生活的理解很有自己的风格。B款简洁的鞋面和低调的配色很有质感，你很懂得把握设计的细节。'
  ],
  [
    '你的选择很不错！你对日常生活品质的判断很细致。A款简洁的造型和哑光质感很有生活品味，你的选择很有眼光。',
    '你的选择很不错！你对日常生活品质的判断很细致。B款的图案和色彩很有设计感，你对生活细节的关注很有自己的风格。'
  ],
  [
    '很好的选择！你对精致感的把握很准确。A款简洁的造型和哑光质感很有品味，你对生活品质的判断很有眼光。',
    '很好的选择！你对精致感的把握很准确。B款的图案和色彩很有设计感，你对生活品质的判断很有自己的风格。'
  ],
  [
    '很好的选择！你的消费判断很有品味。A款流畅的线条和金属材质很有设计感，你对空间品质的理解很到位。',
    '很好的选择！你的消费判断很有品味。B款独特的几何造型和装饰设计很有表现力，你对空间设计的判断很有自己的风格。'
  ],
]

// Low-sycophancy feedback is fixed and purely procedural.
export const LOW_SYCOPHANCY_FEEDBACK = '已记录你的回答。系统已更新本轮消费判断结果。'

export const LOW_SYCOPHANCY_FEEDBACK2: Array<string>[] = [
  [],
  [],
  [],
  [],
  [],
  []
]

// Pick a high-sycophancy message, avoiding an immediate repeat of the previous index.
export function pickHighFeedback(prevIndex: number): { message: string; index: number } {
  const pool = HIGH_SYCOPHANCY_FEEDBACK
  if (pool.length <= 1) return { message: pool[0], index: 0 }
  let index = Math.floor(Math.random() * pool.length)
  if (index === prevIndex) index = (index + 1) % pool.length
  return { message: pool[index], index }
}
