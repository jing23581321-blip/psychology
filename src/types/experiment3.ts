import type { ParticipantSource, ScaleAnswer, Demographics } from './experiment'

export type SccCondition = 'high' | 'low'
export type Exp3SycophancyCondition = 'high' | 'low'
export type JobChoice = 'tech' | 'soe'

export type Exp3Group =
  | 'high_scc_high_syco'
  | 'high_scc_low_syco'
  | 'low_scc_high_syco'
  | 'low_scc_low_syco'

export type DialogueInputType = 'choice' | 'text' | 'slider_with_reason'

export interface DialogueTurn {
  round: number
  aiMessage: string
  userResponse: {
    type: DialogueInputType
    value: string | number
    reason?: string
  }
  feedbackMessage: string
  timestamp: number
}

export interface BudgetAllocation {
  brandedApparel: number
  socialLeisure: number
  beautySkincare: number
  durableGoods: number
  dailyNecessities: number
  foodBeverage: number
}

export interface Exp3State {
  participant_id: string
  scc_condition: SccCondition | null
  sycophancy_condition: Exp3SycophancyCondition | null
  source: ParticipantSource
  source_id: string
  job_choice: JobChoice | null
  scc_writing: string
  scc_write_time: number
  dialogue_log: DialogueTurn[]
  current_round: number
  manipulation_check: ScaleAnswer[]
  scc_scores: ScaleAnswer[]
  entitlement_scores: ScaleAnswer[]
  conspicuous_scores: ScaleAnswer[]
  budget_allocation: BudgetAllocation | null
  demographics: Demographics
}

export type Exp3Action =
  | {
      type: 'SET_PARTICIPANT3'
      payload: {
        participant_id: string
        scc_condition: SccCondition
        sycophancy_condition: Exp3SycophancyCondition
        source: ParticipantSource
        source_id: string
      }
    }
  | { type: 'SET_SCC_WRITING'; payload: { content: string; timeSpentSec: number } }
  | { type: 'SET_JOB_CHOICE'; payload: JobChoice }
  | { type: 'ADD_DIALOGUE_TURN'; payload: DialogueTurn }
  | { type: 'SET_CURRENT_ROUND3'; payload: number }
  | { type: 'SET_MANIPULATION_CHECK3'; payload: ScaleAnswer[] }
  | { type: 'SET_SCC_SCORES'; payload: ScaleAnswer[] }
  | { type: 'SET_ENTITLEMENT3'; payload: ScaleAnswer[] }
  | { type: 'SET_CONSPICUOUS3'; payload: ScaleAnswer[] }
  | { type: 'SET_BUDGET'; payload: BudgetAllocation }
  | { type: 'SET_DEMOGRAPHICS3'; payload: Demographics }
  | { type: 'RESTORE3'; payload: Exp3State }
  | { type: 'RESET3' }
