export interface FetchMockNameParams {
  requestName: string
}
export function fetchMockName(params: FetchMockNameParams): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params.requestName)
    }, 2000)
  })
}
