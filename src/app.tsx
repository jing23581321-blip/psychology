import { Component, type PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { ExperimentProvider } from '@/store/ExperimentContext'
import { Experiment2Provider } from '@/store/Experiment2Context'
import { Experiment3Provider } from '@/store/Experiment3Context'

import './app.scss'

class ErrorBoundary extends Component<PropsWithChildren, { error: Error | null }> {
  constructor(props: PropsWithChildren) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary] caught:', error, info)
  }
  render() {
    if (this.state.error) {
      return null
    }
    return this.props.children
  }
}

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  return (
    <ErrorBoundary>
      <ExperimentProvider>
        <Experiment2Provider>
          <Experiment3Provider>{children}</Experiment3Provider>
        </Experiment2Provider>
      </ExperimentProvider>
    </ErrorBoundary>
  )
}

export default App
