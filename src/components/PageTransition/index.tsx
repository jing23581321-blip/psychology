import { View } from '@tarojs/components'
import type { PropsWithChildren } from 'react'
import './index.scss'

// Wraps page content in a lightweight CSS fade-in on mount.
export default function PageTransition({ children }: PropsWithChildren) {
  return <View className='page-transition'>{children}</View>
}
