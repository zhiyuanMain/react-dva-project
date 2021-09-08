import requestProxy from 'src/utils/request'

export interface ResArticleRefItem {
  columnId: string
  hasImage: boolean
  id: string
  publishTime: string
  sort: '0' | '1' // 0上一篇 1下一篇
  title: string
  titleImage?: string
}

export type ResArticleRef = ResArticleRefItem[]
export const req = (columnId: string | number, id: string | number) =>
  // todo: 接口返回值格式需要修改
  requestProxy<ResArticleRef>({
    method: 'get',
    url: `/ajaxNear?columnId=${columnId}&id=${id}`,
    filter: false
  })
