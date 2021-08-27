import React from 'react'
import SearchRow from './Search'
import './index.less'
import TabBlock from './TabBlock'

type DashboardProps = {
  prefixCls?: string
} & Partial<DefaultProps>

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps = {
  prefixCls: 'open-government-affairs-page'
}

const Dashboard: React.FC<DashboardProps & DefaultProps> = (props) => (
  <div className={props.prefixCls}>
    <div className={`${props.prefixCls}__header`}>
      <SearchRow />
    </div>
    <div className={`${props.prefixCls}__content`}>
      <TabBlock />
    </div>
  </div>
)

Dashboard.defaultProps = { ...defaultProps }

export default Dashboard
