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
        name: '城市通勤双肩包',
        price: '¥299',
        attributes: ['简约设计', '哑光材质', '多收纳'],
        image: placeholder
      },
      {
        id: 'bag1_b',
        label: 'B',
        name: '城市休闲双肩包',
        price: '¥1899',
        attributes: ['拼接设计', '功能口袋','可见标识'],
        image: placeholder
      }
    ]
  },
  {
    round: 2,
    category: '手表',
    question: '你认为以下两款手表，哪一款更能体现有品味的生活方式？',
    options: [
      {
        id: 'watch_a',
        label: 'A',
        name: '简洁手表',
        price: '¥359',
        attributes: ['经典表盘', '皮质表带', '简洁设计'],
        image: placeholder
      },
      {
        id: 'watch_b',
        label: 'B',
        name: '运动手表',
        price: '¥2299',
        attributes: ['现代表盘', '金属表带', '运动元素'],
        image: placeholder
      }
    ]
  },
  {
    round: 3,
    category: '运动鞋',
    question: '你认为以下两款运动鞋，哪一款更符合你对精致生活的理解？',
    options: [
      { 
        id: 'shoe_a',
        label: 'A',
        name: '运动鞋1',
        price: '¥499',
        attributes: ['多色设计', '醒目标识', '潮流元素'],
        image: placeholder
      },
      {
        id: 'shoe_b',
        label: 'B',
        name: '运动鞋2',
        price: '¥5899',
        attributes: ['低调配色', '简洁鞋面', '轻量运动'],
        image: placeholder
      }
    ]
  },
  {
    round: 4,
    category: '咖啡杯',
    question: '你认为以下两款咖啡杯，哪一款更能体现高品质日常生活？',
    options: [
      {
        id: 'cup1_a',
        label: 'A',
        name: '陶瓷咖啡杯',
        price: '¥899',
        attributes: ['保温性能好', '手感舒适', '简约设计'],
        image: placeholder
      },
      {
        id: 'cup1_b',
        label: 'B',
        name: '玻璃咖啡杯',
        price: '¥899',
        attributes: ['耐热玻璃', '透明设计', '现代感'],
        image: placeholder
      }
    ]
  },
  {
    round: 5,
    category: '餐盘',
    question: '你认为以下两款餐盘，哪一款更能符合精致而有品味的生活方式？',
    options: [
      {
        id: 'plate1_a',
        label: 'A',
        name: '简约餐盘',
        price: '¥699',
        attributes: ['极简白瓷', '哑光', '简洁轮廓'],
        image: placeholder
      },
      {
        id: 'plate1_b',
        label: 'B',
        name: '高端餐盘',
        price: '¥4599',
        attributes: ['图案设计', '彩色釉面', '装饰性'],
        image: placeholder
      }
    ]
  },
  {
    round: 6,
    category: '灯具',
    question: '你认为以下两款灯具，哪一款更能体现高品质生活方式？',
    options: [
      {
        id: 'lamp1_a',
        label: 'A',
        name: '现代台灯',
        price: '¥1299',
        attributes: ['一键调光', '节能环保', '简约设计'],
        image: placeholder
      },
      {
        id: 'lamp1_b',
        label: 'B',
        name: '北欧落地灯',
        price: '¥9999',
        attributes: ['高端材质', '可调高度', '现代感'],
        image: placeholder
      }
    ]
  }
]
