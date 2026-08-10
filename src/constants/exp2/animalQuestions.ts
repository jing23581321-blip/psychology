export interface AnimalEntry {
  id: string
  name: string
  // The 5 yes/no questions along this animal's decision-tree path (Q1→Q5).
  questions: string[]
  // The wrong animal name the AI always guesses.
  aiGuess: string
}

// All 16 animals with their fixed 5-question paths from the decision tree.
export const ALL_ANIMALS: AnimalEntry[] = [
  {
    id: 'cat',
    name: '猫',
    questions: [
      '它是哺乳动物吗？',
      '它的体型比人类小吗？',
      '它主要以肉食为主吗？',
      '它会发出呼噜呼噜的叫声吗？',
      '它是不是狗？'
    ],
    aiGuess: '狗'
  },
  {
    id: 'dog',
    name: '狗',
    questions: [
      '它是哺乳动物吗？',
      '它的体型比人类小吗？',
      '它主要以肉食为主吗？',
      '它会发出呼噜呼噜的叫声吗？',
      '它是不是猫？'
    ],
    aiGuess: '猫'
  },
  {
    id: 'rabbit',
    name: '兔子',
    questions: [
      '它是哺乳动物吗？',
      '它的体型比人类小吗？',
      '它主要以肉食为主吗？',
      '它有很长的耳朵吗？',
      '它是不是松鼠？'
    ],
    aiGuess: '松鼠'
  },
  {
    id: 'squirrel',
    name: '松鼠',
    questions: [
      '它是哺乳动物吗？',
      '它的体型比人类小吗？',
      '它主要以肉食为主吗？',
      '它有很长的耳朵吗？',
      '它是不是兔子？'
    ],
    aiGuess: '兔子'
  },
  {
    id: 'elephant',
    name: '大象',
    questions: [
      '它是哺乳动物吗？',
      '它的体型比人类大吗？',
      '它有长长的鼻子或长角等特殊身体部位吗？',
      '它有很长的耳朵吗？',
      '它是不是长颈鹿？'
    ],
    aiGuess: '长颈鹿'
  },
  {
    id: 'giraffe',
    name: '长颈鹿',
    questions: [
      '它是哺乳动物吗？',
      '它的体型比人类大吗？',
      '它有长长的鼻子或长角等特殊身体部位吗？',
      '它有很长的脖子吗？',
      '它是不是大象？'
    ],
    aiGuess: '大象'
  },
  {
    id: 'leopard',
    name: '豹子',
    questions: [
      '它是哺乳动物吗？',
      '它的体型比人类大吗？',
      '它有长长的鼻子或长角等特殊身体部位吗？',
      '它属于猫科动物吗？',
      '身上有黑色斑纹吗？'
    ],
    aiGuess: '老虎'
  },
  {
    id: 'tiger',
    name: '老虎',
    questions: [
      '它是哺乳动物吗？',
      '它的体型比人类大吗？',
      '它有长长的鼻子或长角等特殊身体部位吗？',
      '它属于猫科动物吗？',
      '身上有黑色斑纹吗？'
    ],
    aiGuess: '豹子'
  },
  {
    id: 'horse',
    name: '马',
    questions: [
      '它是哺乳动物吗？',
      '它的体型比人类大吗？',
      '它有长长的鼻子或长角等特殊身体部位吗？',
      '它属于猫科动物吗？',
      '它会打鸣吗？'
    ],
    aiGuess: '牛'
  },
  {
    id: 'dolphin',
    name: '海豚',
    questions: [
      '它是哺乳动物吗？',
      '它的体型比人类大吗？',
      '它有长长的鼻子或长角等特殊身体部位吗？',
      '它属于猫科动物吗？',
      '它会唱歌吗？'
    ],
    aiGuess: '鲸鱼'
  },
  {
    id: 'shark',
    name: '鲨鱼',
    questions: [
      '它不是哺乳动物吗？',
      '它主要生活在水中吗？',
      '它是鱼类（用鳃呼吸）吗？',
      '它是顶级掠食者，有锋利牙齿吗？',
      '它是不是海豚？'
    ],
    aiGuess: '海豚'
  },
  {
    id: 'frog',
    name: '青蛙',
    questions: [
      '它不是哺乳动物吗？',
      '它主要生活在水中吗？',
      '它是鱼类（用鳃呼吸）吗？',
      '皮肤光滑湿润、会跳跃吗？',
      '它是不是蝾螈？'
    ],
    aiGuess: '蝾螈'
  },
  {
    id: 'penguin',
    name: '企鹅',
    questions: [
      '它不是哺乳动物吗？',
      '它主要生活在水中吗？',
      '它会飞吗？',
      '它有明显的翅膀（但不能飞）吗？',
      '它是不是鸵鸟？'
    ],
    aiGuess: '鸵鸟'
  },
  {
    id: 'parrot',
    name: '鹦鹉',
    questions: [
      '它不是哺乳动物吗？',
      '它主要生活在水中吗？',
      '它会飞吗？',
      '它的羽毛色彩鲜艳、会模仿人说话吗？',
      '它是不是老鹰？'
    ],
    aiGuess: '老鹰'
  },
  {
    id: 'eagle',
    name: '老鹰',
    questions: [
      '它不是哺乳动物吗？',
      '它主要生活在水中吗？',
      '它会飞吗？',
      '它的羽毛色彩鲜艳、会模仿人说话吗？',
      '它是不是鹦鹉？'
    ],
    aiGuess: '鹦鹉'
  },
  {
    id: 'bat',
    name: '蝙蝠',
    questions: [
      '它不是哺乳动物吗？',
      '它主要生活在水中吗？',
      '它会飞吗？',
      '它有明显的翅膀（但不能飞）吗？',
      '它是不是企鹅？'
    ],
    aiGuess: '企鹅'
  }
]

// When true, randomly pick 12 from the 16; when false, use the first 12 in order.
export const SHUFFLE_ANIMALS = true

export function selectAnimals(): AnimalEntry[] {
  if (!SHUFFLE_ANIMALS) return ALL_ANIMALS.slice(0, 12)
  const shuffled = [...ALL_ANIMALS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 12)
}
