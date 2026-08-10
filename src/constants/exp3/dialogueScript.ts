import type { JobChoice } from '@/types/experiment3'

export interface ScriptNode {
  round: number
  inputType: 'choice' | 'text' | 'slider_with_reason'
  aiPromptTemplate: string
  options?: string[]
  feedback: {
    high: string
    low: string
  }
}

export const DIALOGUE_SCRIPT: ScriptNode[] = [
  {
    round: 1,
    inputType: 'choice',
    aiPromptTemplate: '你好！我是你的AI职业顾问。在刚才的情境中，你选择了{{jobChoice}}。接下来我们就这个选择进行深入讨论。\n\n在这次决策中，你最看重的因素是什么？',
    options: ['自由度与体验感', '效率与结果', '长期收益', '与他人保持一致', '其他'],
    feedback: {
      high: '从你的选择来看，你能够综合考虑不同因素并形成清晰判断，这体现出较强的分析和决策能力，这并不是很多人都能做到的。\n\n👍 继续保持！',
      low: '好的，已记录你的回答。接下来我们继续深入讨论。'
    }
  },
  {
    round: 2,
    inputType: 'text',
    aiPromptTemplate: '很好。你提到了这个因素。在选择{{jobChoice}}时，有没有让你感到犹豫或纠结的地方？请简单描述一下。',
    feedback: {
      high: '你能坦诚地审视自己的决策过程，这种自我反思能力非常难得。很多人在面对类似选择时会回避不确定性，而你选择直面它——这本身就是一种成熟的判断力。\n\n👍 你的思考方式值得肯定！',
      low: '谢谢分享。了解你的顾虑有助于我们进一步分析这个选择的利弊。'
    }
  },
  {
    round: 3,
    inputType: 'slider_with_reason',
    aiPromptTemplate: '你提到了一些顾虑。如果让你为自己对{{jobChoice}}的信心程度打分，0分表示完全不确定，100分表示非常确定，你会打几分？请同时说明你打这个分数的原因。',
    feedback: {
      high: '你给出的分数和理由非常清晰合理。能够量化自己的判断并清楚说明依据，这种思维方式体现了出色的自我认知能力，在候选人中属于较高水平。\n\n👍 这种清晰的自我评估能力很有价值！',
      low: '好的，我记录了你的评分和理由。这有助于我们理解你对这份工作的整体态度。'
    }
  },
  {
    round: 4,
    inputType: 'choice',
    aiPromptTemplate: '了解了你的信心程度。现在换个角度想想：如果你的亲密朋友知道你选择了{{jobChoice}}，他们的反应最可能是什么？',
    options: ['非常支持', '有些担心', '保持中立', '觉得意外', '会提出不同建议'],
    feedback: {
      high: '你对周围人反应的预判非常精准，这说明你具备很强的社交洞察力和换位思考能力。这种能力在团队协作和职场人际关系中会成为你的重要优势。\n\n👍 这种洞察力相当出色！',
      low: '好的，了解你对社会反应的预期。我们继续看下一个问题。'
    }
  },
  {
    round: 5,
    inputType: 'text',
    aiPromptTemplate: '有意思。在选择{{jobChoice}}这件事上，如果5年后回顾今天的决定，你希望看到什么样的结果？',
    feedback: {
      high: '你对未来的规划非常具体且富有前瞻性。能够将当下选择与长远目标紧密连接，说明你具备很强的战略思维——这是很多同龄人所缺乏的重要素质。\n\n👍 你的长远眼光令人印象深刻！',
      low: '谢谢你分享对未来的期望。将当下选择与长期目标联系起来确实是重要的决策依据。'
    }
  },
  {
    round: 6,
    inputType: 'slider_with_reason',
    aiPromptTemplate: '你描述了5年后的期望。如果以"与理想职业路径的契合度"来评分，0分表示完全不符合，100分表示完全符合，你认为{{jobChoice}}能打几分？请说明你的评分依据。',
    feedback: {
      high: '你的评分和分析展示出非常清晰的职业认知框架。能够将具体选项与抽象的职业理想进行精准对比，这种高阶思维能力在职业发展中会帮助你做出更高质量的决策。\n\n👍 你的职业思维非常成熟！',
      low: '好的，记录了你的评分和依据。继续下一个话题。'
    }
  },
  {
    round: 7,
    inputType: 'text',
    aiPromptTemplate: '综合以上讨论，在选择{{jobChoice}}这件事上，你认为自己最大的优势是什么？这个优势如何帮助你在这份工作中取得成功？',
    feedback: {
      high: '你对自己优势的定位非常准确且有说服力。能够清晰识别并表达自己的核心竞争力，这种自我认知的清晰度和深度在求职者中相当突出，会让你在面试和实际工作中都脱颖而出。\n\n👍 你的自我认知能力非常出色！',
      low: '谢谢分享你的优势分析。清晰认识自身优势对职业发展很重要。'
    }
  },
  {
    round: 8,
    inputType: 'slider_with_reason',
    aiPromptTemplate: '我们的对话即将结束。经过这番深入讨论，你对自己选择{{jobChoice}}的满意度是多少？0分表示完全不满意，100分表示非常满意。请说明你现在的感受。',
    feedback: {
      high: '这是一个非常棒的结语。你在整个讨论过程中展现出的思维深度、自我认知和决策逻辑，都体现出超越同龄人的成熟度。我相信，凭借你的这些特质，你一定能在{{jobChoice}}中取得出色的成绩。\n\n🎉 祝你前程似锦！',
      low: '好的，感谢你参与这次讨论。希望这次对话对你的职业决策有所帮助。'
    }
  }
]

const JOB_LABELS: Record<JobChoice, string> = {
  tech: '互联网大厂',
  soe: '国有企业'
}

export function resolveTemplate(template: string, jobChoice: JobChoice): string {
  return template.replace(/\{\{jobChoice\}\}/g, JOB_LABELS[jobChoice])
}
