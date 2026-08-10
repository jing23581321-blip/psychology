import { USE_MOCK, request } from './http'
import { uuid } from '@/utils/uuid'
import type {
  BehavioralTaskData,
  Demographics,
  ParticipantSource,
  ScaleAnswer,
  RoundResponse,
  SycophancyGroup
} from '@/types/experiment'
import type { Exp2Group, GuessingRoundData } from '@/types/experiment2'
import type { Exp3Group, DialogueTurn, BudgetAllocation } from '@/types/experiment3'

// Local counters emulate the backend's balanced assignment across a single device only.
// The real backend keeps global counts; the signatures here stay identical.
const MOCK_COUNTS_KEY = '__mock_group_counts__'

interface MockCounts {
  high_sycophancy: number
  low_sycophancy: number
}

function readMockCounts(): MockCounts {
  if (typeof localStorage === 'undefined') {
    return { high_sycophancy: 0, low_sycophancy: 0 }
  }
  try {
    return JSON.parse(localStorage.getItem(MOCK_COUNTS_KEY) || '') as MockCounts
  } catch {
    return { high_sycophancy: 0, low_sycophancy: 0 }
  }
}

function writeMockCounts(counts: MockCounts): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(MOCK_COUNTS_KEY, JSON.stringify(counts))
}

export interface AssignGroupPayload {
  source: ParticipantSource
  source_id: string
  participant_id?: string
}

export interface AssignGroupResult {
  participant_id: string
  group: SycophancyGroup
}

export async function assignGroup(payload: AssignGroupPayload): Promise<AssignGroupResult> {
  if (!USE_MOCK) {
    return request<AssignGroupResult>({ url: '/api/assignGroup', data: payload })
  }

  const counts = readMockCounts()
  let group: SycophancyGroup
  if (counts.high_sycophancy === counts.low_sycophancy) {
    group = Math.random() < 0.5 ? 'high_sycophancy' : 'low_sycophancy'
  } else {
    group = counts.high_sycophancy < counts.low_sycophancy ? 'high_sycophancy' : 'low_sycophancy'
  }
  counts[group] += 1
  writeMockCounts(counts)

  return {
    participant_id: payload.participant_id || uuid(),
    group
  }
}

async function mockOk(): Promise<{ ok: true }> {
  return { ok: true }
}

export interface RoundDataPayload {
  participant_id: string
  response: RoundResponse
}

export async function submitRoundData(payload: RoundDataPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitRoundData', data: payload })
  console.log('[mock] submitRoundData', payload)
  return mockOk()
}

export interface ManipulationCheckPayload {
  participant_id: string
  answers: ScaleAnswer[]
}

export async function submitManipulationCheck(payload: ManipulationCheckPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitManipulationCheck', data: payload })
  console.log('[mock] submitManipulationCheck', payload)
  return mockOk()
}

export interface ScalesPayload {
  participant_id: string
  scale: 'entitlement' | 'conspicuous_consumption'
  answers: ScaleAnswer[]
}

export async function submitScales(payload: ScalesPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitScales', data: payload })
  console.log('[mock] submitScales', payload)
  return mockOk()
}

export interface BehavioralTaskPayload {
  participant_id: string
  data: BehavioralTaskData
}

export async function submitBehavioralTask(payload: BehavioralTaskPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitBehavioralTask', data: payload })
  console.log('[mock] submitBehavioralTask', payload)
  return mockOk()
}

export interface DemographicsPayload {
  participant_id: string
  demographics: Demographics
}

export async function submitDemographics(payload: DemographicsPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitDemographics', data: payload })
  console.log('[mock] submitDemographics', payload)
  return mockOk()
}

// ─── Experiment 2 ────────────────────────────────────────────────────────────

const MOCK_COUNTS2_KEY = '__mock_group2_counts__'

interface MockCounts2 {
  high_entitlement_high_syco: number
  high_entitlement_low_syco: number
  low_entitlement_high_syco: number
  low_entitlement_low_syco: number
}

function readMockCounts2(): MockCounts2 {
  if (typeof localStorage === 'undefined') {
    return { high_entitlement_high_syco: 0, high_entitlement_low_syco: 0, low_entitlement_high_syco: 0, low_entitlement_low_syco: 0 }
  }
  try {
    return JSON.parse(localStorage.getItem(MOCK_COUNTS2_KEY) || '') as MockCounts2
  } catch {
    return { high_entitlement_high_syco: 0, high_entitlement_low_syco: 0, low_entitlement_high_syco: 0, low_entitlement_low_syco: 0 }
  }
}

function writeMockCounts2(counts: MockCounts2): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(MOCK_COUNTS2_KEY, JSON.stringify(counts))
}

export interface AssignGroup2Payload {
  source: ParticipantSource
  source_id: string
  participant_id?: string
}

export interface AssignGroup2Result {
  participant_id: string
  group: Exp2Group
  entitlement_condition: 'high' | 'low'
  sycophancy_condition: 'high' | 'low'
}

export async function assignGroup2(payload: AssignGroup2Payload): Promise<AssignGroup2Result> {
  if (!USE_MOCK) {
    return request<AssignGroup2Result>({ url: '/api/assignGroup2', data: payload })
  }

  const counts = readMockCounts2()
  const keys = Object.keys(counts) as Exp2Group[]
  const minCount = Math.min(...keys.map((k) => counts[k]))
  const candidates = keys.filter((k) => counts[k] === minCount)
  const group = candidates[Math.floor(Math.random() * candidates.length)]
  counts[group] += 1
  writeMockCounts2(counts)
  console.log('[mock] assignGroup2 counts:', counts)

  const [ent, , syco] = group.split('_') as ['high' | 'low', string, 'high' | 'low']
  return {
    participant_id: payload.participant_id || uuid(),
    group,
    entitlement_condition: ent,
    sycophancy_condition: syco
  }
}

export interface GuessingRoundPayload {
  participant_id: string
  round_data: GuessingRoundData
}

export async function submitGuessingRound(payload: GuessingRoundPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitGuessingRound', data: payload })
  console.log('[mock] submitGuessingRound', payload)
  return mockOk()
}

export interface Exp2ScalesPayload {
  participant_id: string
  scale: 'manipulation_check2' | 'conspicuous_consumption2'
  answers: ScaleAnswer[]
}

export async function submitExp2Scales(payload: Exp2ScalesPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitExp2Scales', data: payload })
  console.log('[mock] submitExp2Scales', payload)
  return mockOk()
}

export interface Exp2BehavioralPayload {
  participant_id: string
  clothing_preference: number
}

export async function submitExp2Behavioral(payload: Exp2BehavioralPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitExp2Behavioral', data: payload })
  console.log('[mock] submitExp2Behavioral', payload)
  return mockOk()
}

export interface Exp2DemographicsPayload {
  participant_id: string
  demographics: Demographics
}

export async function submitExp2Demographics(payload: Exp2DemographicsPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitExp2Demographics', data: payload })
  console.log('[mock] submitExp2Demographics', payload)
  return mockOk()
}

// ─── Experiment 3 ────────────────────────────────────────────────────────────

const MOCK_COUNTS3_KEY = '__mock_group3_counts__'

interface MockCounts3 {
  high_scc_high_syco: number
  high_scc_low_syco: number
  low_scc_high_syco: number
  low_scc_low_syco: number
}

function readMockCounts3(): MockCounts3 {
  if (typeof localStorage === 'undefined') {
    return { high_scc_high_syco: 0, high_scc_low_syco: 0, low_scc_high_syco: 0, low_scc_low_syco: 0 }
  }
  try {
    return JSON.parse(localStorage.getItem(MOCK_COUNTS3_KEY) || '') as MockCounts3
  } catch {
    return { high_scc_high_syco: 0, high_scc_low_syco: 0, low_scc_high_syco: 0, low_scc_low_syco: 0 }
  }
}

function writeMockCounts3(counts: MockCounts3): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(MOCK_COUNTS3_KEY, JSON.stringify(counts))
}

export interface AssignGroup3Payload {
  source: ParticipantSource
  source_id: string
  participant_id?: string
}

export interface AssignGroup3Result {
  participant_id: string
  group: Exp3Group
  scc_condition: 'high' | 'low'
  sycophancy_condition: 'high' | 'low'
}

export async function assignGroup3(payload: AssignGroup3Payload): Promise<AssignGroup3Result> {
  if (!USE_MOCK) {
    return request<AssignGroup3Result>({ url: '/api/assignGroup3', data: payload })
  }

  const counts = readMockCounts3()
  const keys = Object.keys(counts) as Exp3Group[]
  const minCount = Math.min(...keys.map((k) => counts[k]))
  const candidates = keys.filter((k) => counts[k] === minCount)
  const group = candidates[Math.floor(Math.random() * candidates.length)]
  counts[group] += 1
  writeMockCounts3(counts)
  console.log('[mock] assignGroup3 counts:', counts)

  // group format: 'high_scc_high_syco' → split('_') = ['high','scc','high','syco']
  const parts = group.split('_')
  const scc_condition = parts[0] as 'high' | 'low'
  const sycophancy_condition = parts[2] as 'high' | 'low'

  return {
    participant_id: payload.participant_id || uuid(),
    group,
    scc_condition,
    sycophancy_condition
  }
}

export interface Exp3DialogueTurnPayload {
  participant_id: string
  turn: DialogueTurn
}

export async function submitExp3DialogueTurn(payload: Exp3DialogueTurnPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitExp3DialogueTurn', data: payload })
  console.log('[mock] submitExp3DialogueTurn', payload)
  return mockOk()
}

export interface Exp3ScalesPayload {
  participant_id: string
  scale: string
  answers: ScaleAnswer[]
}

export async function submitExp3Scales(payload: Exp3ScalesPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitExp3Scales', data: payload })
  console.log('[mock] submitExp3Scales', payload)
  return mockOk()
}

export interface Exp3BudgetPayload {
  participant_id: string
  allocation: BudgetAllocation
}

export async function submitExp3Budget(payload: Exp3BudgetPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitExp3Budget', data: payload })
  console.log('[mock] submitExp3Budget', payload)
  return mockOk()
}

export interface Exp3DemographicsPayload {
  participant_id: string
  demographics: Demographics
}

export async function submitExp3Demographics(payload: Exp3DemographicsPayload): Promise<{ ok: true }> {
  if (!USE_MOCK) return request({ url: '/api/submitExp3Demographics', data: payload })
  console.log('[mock] submitExp3Demographics', payload)
  return mockOk()
}
