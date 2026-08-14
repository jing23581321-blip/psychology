import placeholder from '@/assets/exp1/products/placeholder.svg'
import bagA from '@/assets/exp1/products/bag_a.png'
import bagB from '@/assets/exp1/products/bag_b.png'
import watchA from '@/assets/exp1/products/watch_a.png'
import watchB from '@/assets/exp1/products/watch_b.png'
import shoeA from '@/assets/exp1/products/shoe_a.png'
import shoeB from '@/assets/exp1/products/shoe_b.png'
import cupA from '@/assets/exp1/products/cup_a.png'
import cupB from '@/assets/exp1/products/cup_b.png'
import lampA from '@/assets/exp1/products/lamp_a.png'
import lampB from '@/assets/exp1/products/lamp_b.png'
import plateA from '@/assets/exp1/products/plate_a.png'
import plateB from '@/assets/exp1/products/plate_b.png'

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

// Placeholder materials: each category appears twice (背包/手表/马克机).
// Replace names/prices/attributes and images with real study materials later.
export const STIMULI: RoundStimulus[] = [
  {
    round: 1,
    category: '背包',
    question: '你认为以下两款背包，哪一款更能体现高品质生活方式？',
    options: [
      {
        id: 'bag_a',
        label: 'A',
        name: '城市通勤双肩包',
        price: '¥299',
        attributes: ['简约设计', '哑光材质', '多收纳空间'],
        image: bagA
      },
      {
        id: 'bag_b',
        label: 'B',
        name: '城市休闲双肩包',
        price: '¥1899',
        attributes: ['拼接设计', '功能口袋','可见标识'],
        image: bagB
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
        name: '经典系列腕表',
        price: '¥359',
        attributes: ['经典表盘', '皮质表带', '简洁设计'],
        image: watchA
      },
      {
        id: 'watch_b',
        label: 'B',
        name: '都市系列腕表',
        price: '¥2299',
        attributes: ['现代表盘', '金属表带', '运动元素'],
        image: watchB
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
        name: '城市潮流运动鞋',
        price: '¥499',
        attributes: ['多色设计', '醒目标识', '潮流元素'],
        image: shoeA
      },
      {
        id: 'shoe_b',
        label: 'B',
        name: '城市休闲运动鞋',
        price: '¥5899',
        attributes: ['低调配色', '简洁鞋面', '轻量设计'],
        image: shoeB
      }
    ]
  },
  {
    round: 4,
    category: '马克杯',
    question: '你认为以下两款马克杯，哪一款更能体现高品质日常生活？',
    options: [
      {
        id: 'cup_a',
        label: 'A',
        name: '简约马克杯',
        price: '¥899',
        attributes: ['极简造型', '陶瓷材质', '哑光表面'],
        image: cupA
      },
      {
        id: 'cup_b',
        label: 'B',
        name: '设计马克杯',
        price: '¥899',
        attributes: ['图案设计', '亮色釉面', '装饰性强'],
        image: cupB
      }
    ]
  },
  {
    round: 5,
    category: '餐盘',
    question: '你认为以下两款餐盘，哪一款更能符合精致而有品味的生活方式？',
    options: [
      {
        id: 'plate_a',
        label: 'A',
        name: '简约餐盘',
        price: '¥699',
        attributes: ['极简造型', '陶瓷材质', '哑光质感'],
        image: plateA
      },
      {
        id: 'plate_b',
        label: 'B',
        name: '设计餐盘',
        price: '¥4599',
        attributes: ['图案设计', '彩色釉面', '装饰元素'],
        image: plateB
      }
    ]
  },
  {
    round: 6,
    category: '桌灯',
    question: '你认为以下两款灯具，哪一款更能体现高品质生活方式？',
    options: [
      {
        id: 'lamp_a',
        label: 'A',
        name: '简约桌灯',
        price: '¥1299',
        attributes: ['流线造型', '金属材质', '柔和光线'],
        image: lampA
      },
      {
        id: 'lamp_b',
        label: 'B',
        name: '设计桌灯',
        price: '¥9999',
        attributes: ['几何造型', '装饰元素', '视觉突出'],
        image: lampB
      }
    ]
  }
]
