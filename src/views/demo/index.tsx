import React from 'react'
import { Button } from 'antd'
import { appStore } from 'src/App'

interface Goods {
  id: number
  name: string
  price?: string
  image?: string
}

const goodMaps: Record<string, Partial<Goods>> = {}

const goodsList: Goods[] = [
  { id: 1, name: '1', price: '100', image: '' },
  { id: 1, name: '2', price: '200', image: '' },
  { id: 3, name: '3', price: '300', image: '' }
]

goodsList.map((item) => {
  goodMaps[item.id] = item
})

const handleClick = () => {
  console.log(appStore.getState())
  appStore.dispatch({
    type: 'app/updateName',
    payload: '外部调用store'
  })
}
const Demo: React.FC = () => <Button onClick={handleClick}>Click Me</Button>

export default Demo
