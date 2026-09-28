import { Component } from 'react'
import ErrorPage from './ErrorPage'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[FanHubPlus ErrorBoundary] Unhandled runtime error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0D1117] text-neutral-900 dark:text-neutral-100 font-sans">
          <ErrorPage
            statusCode={500}
            customMessage={
              this.state.error?.message
                ? `Unhandled Runtime Exception: ${this.state.error.message}`
                : undefined
            }
            onNavigateHome={() => {
              this.setState({ hasError: false, error: null })
              window.location.href = '/'
            }}
            onSelectUniverse={(slug) => {
              this.setState({ hasError: false, error: null })
              window.location.href = `/universe/${encodeURIComponent(slug)}`
            }}
          />
        </div>
      )
    }

    return this.props.children
  }
}
