import { Component } from 'react'
import Taro from '@tarojs/taro'
import './app.scss'

if (process.env.TARO_ENV === 'h5') {
    Taro.pxTransform = (string: number, designWidth?: number) => {
        const _designWidth = designWidth || 750
        return (
            // @ts-ignore
            Math.ceil((((parseInt(string, 10) / 40) * 640) / _designWidth) * 10000) / 10000 + 'rem'
        )
    }
}

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
