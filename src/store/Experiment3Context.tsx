import { createContext, useContext, useEffect, useReducer, type PropsWithChildren } from 'react'
import { loadState, saveState } from '@/utils/storage'
import type { Exp3State, Exp3Action, BudgetAllocation } from '@/types/experiment3'

const STORAGE_KEY = 'exp3_state'

const initialBudget: BudgetAllocation = {
  brandedApparel: 0,
  socialLeisure: 0,
  beautySkincare: 0,
  durableGoods: 0,
  dailyNecessities: 0,
  foodBeverage: 0
}

const initialState: Exp3State = {
  participant_id: '',
  scc_condition: null,
  sycophancy_condition: null,
  source: 'direct',
  source_id: '',
  job_choice: null,
  scc_writing: '',
  scc_write_time: 0,
  dialogue_log: [],
  current_round: 1,
  manipulation_check: [],
  scc_scores: [],
  entitlement_scores: [],
  conspicuous_scores: [],
  budget_allocation: null,
  demographics: { age: '', gender: '', education: '', income: '' }
}

function reducer(state: Exp3State, action: Exp3Action): Exp3State {
  switch (action.type) {
    case 'RESTORE3':
      return action.payload
    case 'SET_PARTICIPANT3':
      return { ...state, ...action.payload }
    case 'SET_SCC_WRITING':
      return { ...state, scc_writing: action.payload.content, scc_write_time: action.payload.timeSpentSec }
    case 'SET_JOB_CHOICE':
      return { ...state, job_choice: action.payload }
    case 'ADD_DIALOGUE_TURN':
      return { ...state, dialogue_log: [...state.dialogue_log, action.payload] }
    case 'SET_CURRENT_ROUND3':
      return { ...state, current_round: action.payload }
    case 'SET_MANIPULATION_CHECK3':
      return { ...state, manipulation_check: action.payload }
    case 'SET_SCC_SCORES':
      return { ...state, scc_scores: action.payload }
    case 'SET_ENTITLEMENT3':
      return { ...state, entitlement_scores: action.payload }
    case 'SET_CONSPICUOUS3':
      return { ...state, conspicuous_scores: action.payload }
    case 'SET_BUDGET':
      return { ...state, budget_allocation: action.payload }
    case 'SET_DEMOGRAPHICS3':
      return { ...state, demographics: action.payload }
    case 'RESET3':
      return { ...initialState, budget_allocation: null }
    default:
      return state
  }
}

interface ContextValue {
  state: Exp3State
  dispatch: React.Dispatch<Exp3Action>
}

const Experiment3Context = createContext<ContextValue | null>(null)

export function Experiment3Provider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const restored = loadState<Exp3State>(STORAGE_KEY)
    if (restored) dispatch({ type: 'RESTORE3', payload: restored })
  }, [])

  useEffect(() => {
    if (state.participant_id) saveState(STORAGE_KEY, state)
  }, [state])

  return <Experiment3Context.Provider value={{ state, dispatch }}>{children}</Experiment3Context.Provider>
}

export function useExperiment3(): ContextValue {
  const ctx = useContext(Experiment3Context)
  if (!ctx) throw new Error('useExperiment3 must be used within Experiment3Provider')
  return ctx
}
