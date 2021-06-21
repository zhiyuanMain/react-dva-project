import React from 'react'
import Header from './Header'
import './index.less'

type DashboardProps = {
  prefixCls?: string
} & Partial<DefaultProps>

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
  prefixCls: 'dashboard-page'
}

const Dashboard: React.FC<DashboardProps & DefaultProps> = (props) => (
  <div className={props.prefixCls}>
    <div className={`${props.prefixCls}__header sup-are-layout-ref__header`}>
      <Header />
    </div>
  </div>
)

Dashboard.defaultProps = { ...defaultProps }

export default Dashboard
