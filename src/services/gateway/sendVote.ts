import requestProxy from 'src/utils/request'

export const req = (id: string, data: any) => {
  return requestProxy<any>({
    method: 'post',
    filter: false,
    url: `/vote/${id}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: { ...data }
  })
}
