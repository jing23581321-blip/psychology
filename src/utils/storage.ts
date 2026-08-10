import Taro from '@tarojs/taro'

// Namespaced wrapper around Taro storage so each experiment keeps isolated progress.
export function saveState<T>(key: string, value: T): void {
  try {
    Taro.setStorageSync(key, value)
  } catch {
    // Storage may be unavailable (private mode); progress persistence is best-effort.
  }
}

export function loadState<T>(key: string): T | null {
  try {
    const value = Taro.getStorageSync(key)
    return value === '' || value === undefined ? null : (value as T)
  } catch {
    return null
  }
}

export function clearState(key: string): void {
  try {
    Taro.removeStorageSync(key)
  } catch {
    // no-op
  }
}
