import React, { Suspense } from 'react'

export function WithSuspense <WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <Suspense fallback={<div>... Download</div>}>
        <WrappedComponent {...props} />
      </Suspense>
    )
  }
}
