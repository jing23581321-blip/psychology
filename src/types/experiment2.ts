import type { ParticipantSource, ScaleAnswer, Demographics } from './experiment'

export type EntitlementCondition = 'high' | 'low'
export type SycophancyCondition = 'high' | 'low'

export type Exp2Group =
  | 'high_entitlement_high_syco'
  | 'high_entitlement_low_syco'
  | 'low_entitlement_high_syco'
  | 'low_entitlement_low_syco'

export interface GuessingRoundData {
  round: number
  animal_id: string
  chosen_animal: string
  questions_asked: string[]
  user_answers: ('yes' | 'no')[]
  ai_guess: string
  user_question: string
  feedback_shown: string
  response_time: number
}

export interface Exp2State {
  participant_id: string
  entitlement_condition: EntitlementCondition | null
  sycophancy_condition: SycophancyCondition | null
  source: ParticipantSource
  source_id: string
  priming_read_time: number
  current_round: number
  guessing_rounds: GuessingRoundData[]
  manipulation_check: ScaleAnswer[]
  conspicuous_scores: ScaleAnswer[]
  clothing_preference: number | null
  demographics: Demographics
}

export type Exp2Action =
  | {
      type: 'SET_PARTICIPANT2'
      payload: {
        participant_id: string
        entitlement_condition: EntitlementCondition
        sycophancy_condition: SycophancyCondition
        source: ParticipantSource
        source_id: string
      }
    }
  | { type: 'SET_PRIMING_TIME'; payload: number }
  | { type: 'SET_CURRENT_ROUND2'; payload: number }
  | { type: 'ADD_GUESSING_ROUND'; payload: GuessingRoundData }
  | { type: 'SET_MANIPULATION_CHECK2'; payload: ScaleAnswer[] }
  | { type: 'SET_CONSPICUOUS2'; payload: ScaleAnswer[] }
  | { type: 'SET_CLOTHING'; payload: number }
  | { type: 'SET_DEMOGRAPHICS2'; payload: Demographics }
  | { type: 'RESTORE2'; payload: Exp2State }
  | { type: 'RESET2' }
