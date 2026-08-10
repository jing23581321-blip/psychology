import { createContext, useContext, useEffect, useReducer, type PropsWithChildren } from 'react'
import { loadState, saveState } from '@/utils/storage'
import type { Exp2State, Exp2Action } from '@/types/experiment2'

const STORAGE_KEY = 'exp2_state'

const initialState: Exp2State = {
  participant_id: '',
  entitlement_condition: null,
  sycophancy_condition: null,
  source: 'direct',
  source_id: '',
  priming_read_time: 0,
  current_round: 1,
  guessing_rounds: [],
  manipulation_check: [],
  conspicuous_scores: [],
  clothing_preference: null,
  demographics: { age: '', gender: '', education: '', income: '' }
}

function reducer(state: Exp2State, action: Exp2Action): Exp2State {
  switch (action.type) {
    case 'RESTORE2':
      return action.payload
    case 'SET_PARTICIPANT2':
      return { ...state, ...action.payload }
    case 'SET_PRIMING_TIME':
      return { ...state, priming_read_time: action.payload }
    case 'SET_CURRENT_ROUND2':
      return { ...state, current_round: action.payload }
    case 'ADD_GUESSING_ROUND':
      return { ...state, guessing_rounds: [...state.guessing_rounds, action.payload] }
    case 'SET_MANIPULATION_CHECK2':
      return { ...state, manipulation_check: action.payload }
    case 'SET_CONSPICUOUS2':
      return { ...state, conspicuous_scores: action.payload }
    case 'SET_CLOTHING':
      return { ...state, clothing_preference: action.payload }
    case 'SET_DEMOGRAPHICS2':
      return { ...state, demographics: action.payload }
    case 'RESET2':
      return initialState
    default:
      return state
  }
}

interface ContextValue {
  state: Exp2State
  dispatch: React.Dispatch<Exp2Action>
}

const Experiment2Context = createContext<ContextValue | null>(null)

export function Experiment2Provider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const restored = loadState<Exp2State>(STORAGE_KEY)
    if (restored) dispatch({ type: 'RESTORE2', payload: restored })
  }, [])

  useEffect(() => {
    if (state.participant_id) saveState(STORAGE_KEY, state)
  }, [state])

  return <Experiment2Context.Provider value={{ state, dispatch }}>{children}</Experiment2Context.Provider>
}

export function useExperiment2(): ContextValue {
  const ctx = useContext(Experiment2Context)
  if (!ctx) throw new Error('useExperiment2 must be used within Experiment2Provider')
  return ctx
}
