import React from 'react'
import { connect } from 'dva'
import { Button, Input } from 'antd'
import queryString from 'query-string'
import { Trans, withTranslation, WithTranslation } from 'react-i18next'
import './index.less'
import { SvgIcon } from 'src/components'

const mapStateToProps = (state: store.Root) => ({
  appName: state.app.name,
  userGroup: state.workflow.userGroup,
  globalConfigs: state.app.globalConfigs
})

type MapStateFromStoreProps = ReturnType<typeof mapStateToProps>
type UserProps = MapStateFromStoreProps &
  WithTranslation & {
    prefixCls?: string
    appName?: string
    dispatch: any
    history: any
  }

interface RouteSearch {
  pageId?: string
}

class User extends React.Component<UserProps, {}> {
  static defaultProps = {
    prefixCls: 'are-p-user'
  }

  private handleUpdateName = (): void => {
    this.props.dispatch({
      type: 'app/updateName',
      payload: '立即生效'
    })
  }

  private handleResetName = (): void => {
    this.props.dispatch({
      type: 'app/resetName'
    })
  }

  private handleAsyncUpdateName = (): void => {
    this.props
      .dispatch({
        type: 'app/asyncUpdateName',
        payload: `custom number ${Math.random()}`
      })
      .then(() => {
        // eslint-disable-next-line
        console.log(123)
      })
  }

  private handleGetData = (): void => {
    this.props
      .dispatch({
        type: 'workflow/queryUserGroup',
        payload: {}
      })
      .then((res: MapStateFromStoreProps['userGroup']) => {
        console.log(res)
      })
  }

  private handlePushGoods = (): void => {
    this.props.history.push('/dashboard')
  }

  private handleGetToken = (): void => {
    alert(this.props.globalConfigs.token)
  }
  public render(): JSX.Element {
    const { prefixCls, appName, history, globalConfigs, t } = this.props
    const { pageId }: RouteSearch = queryString.parse(history.location.search)
    return (
      <div className={prefixCls}>
        <h1>{appName}</h1>
        <SvgIcon icon="icon-customer-service" type="primary" />
        <Input defaultValue="2"></Input>
        <h1>current Page id: {pageId || '**'}</h1>
        <Button type="primary" onClick={this.handleUpdateName}>
          updateName
        </Button>
        <br />
        <br />
        <Button type="primary" onClick={this.handleResetName}>
          resetName
        </Button>
        <br />
        <br />
        <Button type="primary" onClick={this.handleAsyncUpdateName}>
          asyncUpdateName
        </Button>
        <br />
        <br />
        <Button type="primary" onClick={this.handleGetData}>
          get user group list
        </Button>
        <dl>
          <dd>user group list</dd>
          {this.props.userGroup.map((item) => (
            <dd key={item.id}>{item.id}</dd>
          ))}
        </dl>
        <br />
        <div style={{ border: '1px solid green', margin: 20 }}>
          <h2>i18n ARE平台：修改localStorage.umi_locale（'en-US'/'zh-CN'）看语言包切换效果</h2>
          <h2>i18n ADP平台：修改localStorage.language（'en-US'/'zh-CN'）看语言包切换效果</h2>
          <h5>{'基本用法'}</h5>
          user locales: {t('allUser')}
          <h5>{'Trans组件用法'}</h5>
          <Trans i18nKey="userMessagesUnread" values={{ count: 12, name: 'jhon' }} />
        </div>
        <Button type="link" onClick={this.handlePushGoods}>
          Go to /dashboard
        </Button>
        <br />
        <br />
        <h2>ARE平台：修改localStorage.currentThemeMode（'lightMode'/'darkMode'）看主题切换效果</h2>
        <h2
          dangerouslySetInnerHTML={{
            __html:
              'ADP平台：修改localStorage.theme（{"userId":null,"theme":"dark/default","font":12,"status":1,"logo":"/theme/logo/logo.png"}）看主题切换效果'
          }}></h2>
        <Button type="primary" onClick={this.handleGetToken}>
          get token
        </Button>
        <ul style={{ width: 1200, height: 160, overflow: 'auto' }}>
          {Object.keys(globalConfigs).map((key) => {
            return (
              <li key={key}>
                <span style={{ display: 'inline-block', width: 170 }}>{key}</span>:{' '}
                {JSON.stringify(globalConfigs[key])}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps)(withTranslation('user')(User))
