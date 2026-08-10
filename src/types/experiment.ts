// Shared data structures for all experiments and the experiment-1 flow.

export type SycophancyGroup = 'high_sycophancy' | 'low_sycophancy'

export type ParticipantSource = 'direct' | 'jiandao'

export interface ParticipantInfo {
  participant_id: string
  group: SycophancyGroup
  source: ParticipantSource
  source_id: string
  assign_time: number
}

// Which physical side a stimulus option was rendered on.
export type OptionSide = 'left' | 'right'

export interface RoundResponse {
  round: number
  category: string
  // Semantic id of the chosen option (independent of the side it appeared on).
  choice: string
  // 'A' or 'B' identifies the stimulus; position records left/right placement.
  choice_label: string
  position: {
    left: string
    right: string
  }
  response_time: number
}

export interface ScaleAnswer {
  item_id: string
  score: number
}

export type BehavioralChoice = 'A_small_logo' | 'B_large_logo'

export interface BehavioralTaskData {
  choice: BehavioralChoice | null
  response_time: number
}

export interface Demographics {
  age: string
  gender: string
  education: string
  income: string
}

export interface ExperimentState {
  participant_id: string
  group: SycophancyGroup | null
  source: ParticipantSource
  source_id: string
  current_round: number
  round_responses: RoundResponse[]
  manipulation_check: ScaleAnswer[]
  entitlement_scores: ScaleAnswer[]
  conspicuous_consumption_scores: ScaleAnswer[]
  behavioral_task_data: BehavioralTaskData
  demographics: Demographics
}
