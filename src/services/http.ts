import Taro from '@tarojs/taro'

// Toggle to switch between the mock backend and a real HTTP backend later.
export const USE_MOCK = true

export const BASE_URL = ''

export interface RequestOptions {
  url: string
  method?: 'GET' | 'POST'
  data?: Record<string, unknown>
}

// Unified request entry. When a real backend is ready, only this file changes;
// for miniprogram this can be swapped to Taro.cloud.callFunction without touching callers.
export async function request<T>(options: RequestOptions): Promise<T> {
  const res = await Taro.request({
    url: `${BASE_URL}${options.url}`,
    method: options.method ?? 'POST',
    data: options.data,
    header: { 'content-type': 'application/json' }
  })
  return res.data as T
}
