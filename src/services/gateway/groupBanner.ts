import requestProxy from 'src/utils/request'
import { ResGovInfo } from './govInfo'
export const req = () =>
  requestProxy<ResGovInfo>({
    method: 'get',
    url: '/list/zwgk?pageNumber=1&pageSize=25'
  })
