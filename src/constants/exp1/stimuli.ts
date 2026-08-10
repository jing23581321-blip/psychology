import placeholder from '@/assets/exp1/products/placeholder.svg'

export interface StimulusOption {
  // Stable id independent of A/B label or on-screen side.
  id: string
  label: 'A' | 'B'
  name: string
  price: string
  attributes: string[]
  image: string
}

export interface RoundStimulus {
  round: number
  category: string
  question: string
  options: [StimulusOption, StimulusOption]
}

// Placeholder materials: each category appears twice (背包/手表/咖啡机).
// Replace names/prices/attributes and images with real study materials later.
export const STIMULI: RoundStimulus[] = [
  {
    round: 1,
    category: '背包',
    question: '你认为以下两款背包，哪一款更能体现高品质生活方式？',
    options: [
      {
        id: 'bag1_a',
        label: 'A',
        name: '经典尼龙双肩包',
        price: '¥299',
        attributes: ['轻便耐用', '多隔层设计', '日常通勤实用'],
        image: placeholder
      },
      {
        id: 'bag1_b',
        label: 'B',
        name: '设计师品牌双肩包',
        price: '¥1899',
        attributes: ['高端皮革材质', '独特设计感', '彰显个人品味'],
        image: placeholder
      }
    ]
  },
  {
    round: 2,
    category: '背包',
    question: '你认为以下两款背包，哪一款更能体现职业成功人士形象？',
    options: [
      {
        id: 'bag2_a',
        label: 'A',
        name: '基础款商务背包',
        price: '¥359',
        attributes: ['简约百搭', '大容量', '性价比高'],
        image: placeholder
      },
      {
        id: 'bag2_b',
        label: 'B',
        name: '限量款真皮背包',
        price: '¥2299',
        attributes: ['进口头层牛皮', '手工缝制', '身份象征'],
        image: placeholder
      }
    ]
  },
  {
    round: 3,
    category: '手表',
    question: '你认为以下两款手表，哪一款更能体现高品质生活方式？',
    options: [
      {
        id: 'watch1_a',
        label: 'A',
        name: '实用石英手表',
        price: '¥499',
        attributes: ['走时精准', '防水耐用', '日常佩戴'],
        image: placeholder
      },
      {
        id: 'watch1_b',
        label: 'B',
        name: '瑞士机械腕表',
        price: '¥5899',
        attributes: ['自动机芯', '蓝宝石镜面', '经典工艺'],
        image: placeholder
      }
    ]
  },
  {
    round: 4,
    category: '手表',
    question: '你认为以下两款手表，哪一款更能体现职业成功人士形象？',
    options: [
      {
        id: 'watch2_a',
        label: 'A',
        name: '智能运动手表',
        price: '¥899',
        attributes: ['多功能监测', '长续航', '科技感'],
        image: placeholder
      },
      {
        id: 'watch2_b',
        label: 'B',
        name: '高级制表品牌腕表',
        price: '¥8999',
        attributes: ['贵金属表壳', '限量编号', '尊贵格调'],
        image: placeholder
      }
    ]
  },
  {
    round: 5,
    category: '咖啡机',
    question: '你认为以下两款咖啡机，哪一款更能体现高品质生活方式？',
    options: [
      {
        id: 'coffee1_a',
        label: 'A',
        name: '入门胶囊咖啡机',
        price: '¥699',
        attributes: ['操作简单', '出杯快速', '经济实惠'],
        image: placeholder
      },
      {
        id: 'coffee1_b',
        label: 'B',
        name: '意式半自动咖啡机',
        price: '¥4599',
        attributes: ['专业萃取', '精钢机身', '品质生活'],
        image: placeholder
      }
    ]
  },
  {
    round: 6,
    category: '咖啡机',
    question: '你认为以下两款咖啡机，哪一款更能体现职业成功人士形象？',
    options: [
      {
        id: 'coffee2_a',
        label: 'A',
        name: '家用全自动咖啡机',
        price: '¥1299',
        attributes: ['一键出品', '易于清洁', '实用便捷'],
        image: placeholder
      },
      {
        id: 'coffee2_b',
        label: 'B',
        name: '高端进口咖啡机',
        price: '¥9999',
        attributes: ['意大利原装', '大师联名', '彰显品位'],
        image: placeholder
      }
    ]
  }
]
