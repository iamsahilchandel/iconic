import { RecoilRoot } from 'recoil'
import { useEffect, useState } from 'react'

function InitializeState({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    setIsInitialized(true)
  }, [])

  if (!isInitialized) {
    return null
  }

  return <>{children}</>
}

export function RecoilProvider({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <InitializeState>
        {children}
      </InitializeState>
    </RecoilRoot>
  )
} 