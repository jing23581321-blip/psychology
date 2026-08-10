import { createContext, useContext, useEffect, useReducer, type PropsWithChildren } from 'react'
import { loadState, saveState } from '@/utils/storage'
import type {
  BehavioralTaskData,
  Demographics,
  ExperimentState,
  ParticipantSource,
  RoundResponse,
  ScaleAnswer,
  SycophancyGroup
} from '@/types/experiment'

const STORAGE_KEY = 'exp1_state'

const initialState: ExperimentState = {
  participant_id: '',
  group: null,
  source: 'direct',
  source_id: '',
  current_round: 1,
  round_responses: [],
  manipulation_check: [],
  entitlement_scores: [],
  conspicuous_consumption_scores: [],
  behavioral_task_data: { choice: null, response_time: 0 },
  demographics: { age: '', gender: '', education: '', income: '' }
}

type Action =
  | { type: 'RESTORE'; payload: ExperimentState }
  | {
      type: 'SET_PARTICIPANT'
      payload: { participant_id: string; group: SycophancyGroup; source: ParticipantSource; source_id: string }
    }
  | { type: 'ADD_ROUND_RESPONSE'; payload: RoundResponse }
  | { type: 'SET_CURRENT_ROUND'; payload: number }
  | { type: 'SET_MANIPULATION_CHECK'; payload: ScaleAnswer[] }
  | { type: 'SET_ENTITLEMENT'; payload: ScaleAnswer[] }
  | { type: 'SET_CONSPICUOUS'; payload: ScaleAnswer[] }
  | { type: 'SET_BEHAVIORAL'; payload: BehavioralTaskData }
  | { type: 'SET_DEMOGRAPHICS'; payload: Demographics }
  | { type: 'RESET' }

function reducer(state: ExperimentState, action: Action): ExperimentState {
  switch (action.type) {
    case 'RESTORE':
      return action.payload
    case 'SET_PARTICIPANT':
      return { ...state, ...action.payload }
    case 'ADD_ROUND_RESPONSE':
      return { ...state, round_responses: [...state.round_responses, action.payload] }
    case 'SET_CURRENT_ROUND':
      return { ...state, current_round: action.payload }
    case 'SET_MANIPULATION_CHECK':
      return { ...state, manipulation_check: action.payload }
    case 'SET_ENTITLEMENT':
      return { ...state, entitlement_scores: action.payload }
    case 'SET_CONSPICUOUS':
      return { ...state, conspicuous_consumption_scores: action.payload }
    case 'SET_BEHAVIORAL':
      return { ...state, behavioral_task_data: action.payload }
    case 'SET_DEMOGRAPHICS':
      return { ...state, demographics: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

interface ContextValue {
  state: ExperimentState
  dispatch: React.Dispatch<Action>
}

const ExperimentContext = createContext<ContextValue | null>(null)

export function ExperimentProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Restore in-progress session on mount so a refresh or reopen does not lose data.
  useEffect(() => {
    const restored = loadState<ExperimentState>(STORAGE_KEY)
    if (restored) dispatch({ type: 'RESTORE', payload: restored })
  }, [])

  // Persist after every state change once a participant exists.
  useEffect(() => {
    if (state.participant_id) saveState(STORAGE_KEY, state)
  }, [state])

  return <ExperimentContext.Provider value={{ state, dispatch }}>{children}</ExperimentContext.Provider>
}

export function useExperiment(): ContextValue {
  const ctx = useContext(ExperimentContext)
  if (!ctx) throw new Error('useExperiment must be used within ExperimentProvider')
  return ctx
}
