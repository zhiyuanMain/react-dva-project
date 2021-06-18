import React from 'react'
import classNames from 'classnames'
import { tuple } from 'src/utils/type'
import './index.less'
const SvgIconTypes = tuple('default', 'primary', 'danger', 'success')
export type SvgIconType = typeof SvgIconTypes[number]

interface SvgIconProps {
  prefixCls?: string
  className?: string
  size?: number
  color?: string
  icon?: string
  disabled?: boolean
  active?: boolean
  type: SvgIconType
}

class SvgIcon extends React.Component<SvgIconProps, {}> {
  constructor(props: SvgIconProps | Readonly<SvgIconProps>) {
    super(props)
  }

  static defaultProps: Partial<SvgIconProps> = {
    prefixCls: 'sup-svg-icon',
    size: 12,
    disabled: false,
    active: false,
    type: 'default'
  }

  render() {
    const { prefixCls, size, color, icon, disabled, active, className, type } = this.props
    const wrapCls = classNames([
      prefixCls,
      className,
      `${prefixCls}-${type}`,
      disabled ? `${prefixCls}-disabled` : '',
      active ? `${prefixCls}-active` : ''
    ])
    return (
      <svg style={{ fontSize: size, color }} className={wrapCls} aria-hidden="true">
        <use xlinkHref={`#${icon}`} />
      </svg>
    )
  }
}

export default SvgIcon
