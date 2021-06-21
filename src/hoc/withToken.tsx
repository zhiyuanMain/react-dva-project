import React from 'react'
import { Subtract } from 'utility-types'

interface TokenProps {
  myToken: string
}

export type WithToken = TokenProps

function withToken<P extends TokenProps>(Component: React.ComponentType<P>) {
  return class WrappingComponent extends React.Component<Subtract<P, TokenProps>> {
    render() {
      return <Component {...(this.props as P)} myToken="123test" />
    }
  }
}

export default withToken
