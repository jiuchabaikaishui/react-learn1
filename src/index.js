import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PropTypes, { func, object } from 'prop-types'
import imgCat from './cat.png'

// props
// 接收参数
function FuncProps(props) {
  return (
    <div>
      <h4>函数组件 props</h4>
      <p>姓名：{props.name}，年龄：{props.age}</p>
    </div>
  )
}
// 传递参数
ReactDOM.createRoot(document.getElementById('funcProps')).render(<FuncProps name='张三' age={18}></FuncProps>)

class ClassProps extends React.Component {
  render() {
    return (
      <div>
        <h4>类组件 props</h4>
        <p>姓名：{this.props.name}，年龄：{this.props.age}</p>
      </div>
    )
  }
}
ReactDOM.createRoot(document.getElementById('classProps')).render(<ClassProps name='李四' age={19}></ClassProps>)

class PropsParticular extends React.Component {
  constructor(props) {
    // 推荐将props传递给父类构造函数
    super(props)
    console.log(props);
  }

  changeProps = () => {
    this.props.str = 'string'
  }
  render() {
    return (
      <div>
        <h4>props 的特点</h4>
        <p>字符串：{this.props.str}，数值：{this.props.num}，对象：{JSON.stringify(this.props.obj)}</p>
        {this.props.label}
        <button onClick={this.props.func}>函数</button>
        <button onClick={this.changeProps}>修改 props</button>
      </div>
    )
  }
}
ReactDOM.createRoot(document.getElementById('propsParticular')).render(<PropsParticular 
  str='我是字符串' 
  num={19}
  obj={{ a: 'a', b: 'b'}}
  label={<p>我是标签</p>}
  func={() => alert('我是函数')}
></PropsParticular>)

// 父组件传递数据给子组件
class Parent extends React.Component {
  state = {
    lastName: '张'
  }
  render() {
    return (
      <div>
        <h4>父组件传递数据给子组件</h4>
        <div>父组件：我姓{this.state.lastName}</div>
        <Son lastName={this.state.lastName}></Son>
      </div>
    )
  }
}
class Son extends React.Component {
  render() {
    return <div>子组件：我爸爸姓{this.props.lastName}所以我姓{this.props.lastName}</div>
  }
}
ReactDOM.createRoot(document.getElementById('parentToSon')).render(<Parent></Parent>)

// 子组件传递数据给父组件
class ParentOne extends React.Component {
  state = { sonMsg: '' }
  message = msg => {
    this.setState({ sonMsg: msg })
    console.log('state: ', this.state);
  }
  render() {
    return (
      <div>
        <h4>子组件传递数据给父组件</h4>
        <div>父组件：{this.state.sonMsg.length > 0 ? '我儿子在' + this.state.sonMsg : ''}</div>
        <SonOne sendMsg={this.message}></SonOne>
      </div>
    )
  }
}
class SonOne extends React.Component {
  render() {
    return (
      <div>子组件：发消息
        <button onClick={() => this.props.sendMsg('打球')}>打球</button>
        <button onClick={() => this.props.sendMsg('打游戏')}>打游戏</button>
        <button onClick={() => this.props.sendMsg('写作业')}>写作业</button>
      </div>
    )
  }
}
ReactDOM.createRoot(document.getElementById('sonToParent')).render(<ParentOne></ParentOne>)

// 兄弟组件传输数据
class ParentTwo extends React.Component {
  state = {
    count: 0
  }
  changeCount = (value) => {
    this.setState({ count: value + this.state.count })
  }
  render() {
    return (
      <div>
        <h4>兄弟组件传递数据</h4>
        <SonTwo count={this.state.count}></SonTwo>
        <SonThree changeCount={this.changeCount}></SonThree>
      </div>
    )
  }
}
class SonTwo extends React.Component {
  render() { return <p>结果：{this.props.count}</p> }
}
class SonThree extends React.Component {
  render() { return <button onClick={() => { this.props.changeCount(1) }}>+1</button> }
}
ReactDOM.createRoot(document.getElementById('brotherToBrother')).render(<ParentTwo></ParentTwo>)

// Context
const { Provider, Consumer } = React.createContext()
class ContextParent extends React.Component {
  render() {
    return (
      <Provider value={{ name: '张三', age: 18 }}>
        <div style={{padding: 10, width: 200, height: 100, backgroundColor: 'red', boxSizing: 'border-box'}}>
          <ContextNode></ContextNode>
        </div>
      </Provider>
    )
  }
}
const ContextNode = () => {
  return (
    <div style={{ padding: 10, width: 180, height: 80, backgroundColor: 'green', boxSizing: 'border-box'}}>
      <ContextSubNode></ContextSubNode>
    </div>
  )
}
const ContextSubNode = () => {
  return (
    <div style={{ padding: 10, width: 160, height: 60, backgroundColor: 'blue', boxSizing: 'border-box'}}>
      <ContextChild></ContextChild>
    </div>
  )
}
const ContextChild = () => {
  return (
    <Consumer>
      { (data) => (<div style={{ width: 140, height: 40, backgroundColor: 'cyan'}}>{'我是' + data.name + '，' + data.age + '岁'}</div>) }
    </Consumer>
  )
}
ReactDOM.createRoot(document.getElementById('contextParent')).render(<ContextParent></ContextParent>)

// children 属性
const ChildrenCom = (props) => (<>{props.children}</>)
const jsx = (<><p>JSX</p></>)
const TestCom = () => (<>组件</>)
const FuncChildren = (props) => (<div><button onClick={props.children}>函数</button></div>)
class ChildrenProp extends React.Component {
  render() {
    return (
      <>
        <h4>children 属性</h4>
        <ChildrenCom>文本节点</ChildrenCom>
        <ChildrenCom><p>p 标签</p></ChildrenCom>
        <ChildrenCom>{jsx}</ChildrenCom>
        <ChildrenCom><TestCom></TestCom></ChildrenCom>
        <FuncChildren>{() => alert('函数 children')}</FuncChildren>
      </>
    )
  }
}
ReactDOM.createRoot(document.getElementById('childrenProp')).render(<ChildrenProp></ChildrenProp>)

// props 校验
const PropsCheck = (props) => {
  return (
    <>
      <h4>props 校验</h4>
      {/* <ul>{props.colors.map((item, i) => (<li key={i}>{item}</li>))}</ul> */}
      {/* <button onClick={props.func}>报错</button> */}
      <p>{'intValue: ' + props.intValue}</p>
      ……
    </>
  )
}
// 添加校验
PropsCheck.propTypes = {
  intValue: PropTypes.number,
  stringValue: PropTypes.string.isRequired,
  elementValue: PropTypes.element,
  arrayValue: PropTypes.array,
  objectValue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number
  }).isRequired,
  funcValue: PropTypes.func
}
const checkCom = <PropsCheck
  intValue='a'
  funcValue='a'
></PropsCheck>
ReactDOM.createRoot(document.getElementById('propsCheck')).render(checkCom)

// 函数组件 props 默认值
// 方法一 
const FuncPropsDefault = ({age=18, ...props}) => {
  console.log('props: ', props);
  return (
    <><pre>{`props: ${JSON.stringify(props)}, age: ${age}`}</pre></>
  )
}
// 方法二 此方法将移除，不推荐使用
FuncPropsDefault.defaultProps = {
  name: '张三'
}

// 类组件 props 默认值
class ClassPropsDefaultOne extends React.Component {
  // 方法一
  static defaultProps = {
    name: '李四',
    age: 19
  }
  render = () => <><pre>{JSON.stringify(this.props)}</pre></>
}
// 方法二
class ClassPropsDefaultTwo extends React.Component {
  render = () => <><pre>{JSON.stringify(this.props)}</pre></>
}
ClassPropsDefaultTwo.defaultProps = {
  name: '王五',
  age: 20
}
const propsDefault = (
  <>
    <h4>props 的默认值</h4>
    <FuncPropsDefault gender='男'></FuncPropsDefault>
    <ClassPropsDefaultOne gender='男'></ClassPropsDefaultOne>
    <ClassPropsDefaultTwo gender='男'></ClassPropsDefaultTwo>
  </>
)
ReactDOM.createRoot(document.getElementById('propsDefault')).render(propsDefault)

class LifeCircle extends React.Component {
  // 生命周期
  constructor() {
    super()

    // 初始化state
    this.state = { count: 0 }
    // 处理 this 指向问题……

    console.warn('生命周期钩子函数: constructor');
  }
  componentDidMount() {
    // 可以在这里 请求网络、操作 DOM
    console.warn('生命周期钩子函数: componentDidMount');
  }
  shouldComponentUpdate() {
    console.warn('生命周期钩子函数： shouldComponentUpdate')
    return true
  }
  render() { 
    // 不能 更新状态
    console.warn('生命周期钩子函数: render');
    return (
      <>
        {this.state.count > 3 ? <p>豆豆被打死了</p> : <Counter count={this.state.count}></Counter>}
        <button onClick={() => this.forceUpdate()}>强制刷新</button>
        <button onClick={this.clickHandle}>打豆豆</button>
      </>
    ) 
  }
  componentDidUpdate(prevProps) {
    // 可以在这里 请求网络、操作 DOM，但是需要注意，若果 setState() 必须放在一个条件语句中，否则容易导致死循环
    // 一般来说判断状态是否变化
    if (prevProps.count !== this.props.count) {
      // this.setState({ count: this.state.count})
      // 网络请求……
    }
    console.warn('生命周期钩子函数: componentDidUpdate');
  }
  componentWillUnmount() {
    // 执行清理工作（比如：清理定时器等）
    console.warn('生命周期钩子函数： componentWillUnmount')
  }
  getSnapshotBeforeUpdate() {
    console.warn('生命周期钩子函数： getSnapshotBeforeUpdate')
    return null
  }
  
  clickHandle = () => {
    this.setState({ count: this.state.count + 1 })
  }
}
class Counter extends React.Component {
  constructor() {
    super()
    console.warn('--子组件--生命周期钩子函数： constructor')
  }
  componentDidMount() {
    console.warn('--子组件--生命周期钩子函数： componentDidMount')
    this.timerOne = setInterval(() => {
      console.log('timer one');
    }, 1000);
    this.timerTwo = setInterval(() => {
      console.log('timer two');
    }, 3000);
  }
  shouldComponentUpdate() {
    console.warn('--子组件--生命周期钩子函数： shouldComponentUpdate')
    return true
  }
  render() {
    console.warn('--子组件--生命周期钩子函数： render')
    return (<p>统计豆豆被打的次数：{this.props.count}</p>)
  }
  componentDidUpdate() {
    console.warn('--子组件--生命周期钩子函数： componentDidUpdate')
  }
  componentWillUnmount() {
    // 执行清理工作（比如：清理定时器等）
    clearInterval(this.timerOne)
    console.warn('--子组件--生命周期钩子函数： componentWillUnmount')
  }
  getSnapshotBeforeUpdate() {
    console.warn('--子组件--生命周期钩子函数： getSnapshotBeforeUpdate')
    return null
  }
}
ReactDOM.createRoot(document.getElementById('lifeCircle')).render(<LifeCircle></LifeCircle>)


class Mouse extends React.Component {
  state = { x: 0, y: 0 }
  render() { return this.props.children(this.state) }
  // 监听鼠标
  componentDidMount() {
    window.addEventListener('mousemove', this.mouseMoveHandle)
  }
  // 清理工作，移除事件绑定
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mouseMoveHandle)
  }

  // 鼠标移动处理
  mouseMoveHandle = (e) => { this.setState({ x: e.clientX, y: e.clientY }) }
}
// 为 children 添加 校验
Mouse.propTypes = {
  children: PropTypes.func.isRequired
}
class RenderProps extends React.Component {
  state = { show: false }
  render() {
    return (
      <>
        {
          // 条件渲染
          this.state.show && (
            <>
              <Mouse>{(point) => { return <p>鼠标位置：{point.x}, {point.y}</p> }}</Mouse>
              <Mouse>{(point) => { return <img src={imgCat} style={{ position: 'fixed', left: point.x + 1, top: point.y + 1}}></img> }}</Mouse>
              <br></br>
            </>
          )
        }
        <button onClick={() => this.setState({ show: !this.state.show })}>{this.state.show ? '隐藏' : '显示'}</button>
      </>
    )
  }
}
ReactDOM.createRoot(document.getElementById('renderProps')).render(<RenderProps></RenderProps>)


// 高阶组件
function withMouse(WrapedComponent) {
  class MouseHOC extends React.Component {
    state = { x: 0, y: 0 }
    componentDidMount() {
      window.addEventListener('mousemove', this.mouseMoveHandle)
    }
    componentWillUnmount() {
      window.removeEventListener('mousemove', this.mouseMoveHandle)
    }
    render() {
      return <WrapedComponent {...this.state} {...this.props}></WrapedComponent>
    }
    mouseMoveHandle = (e) => {
      this.setState({ x: e.clientX, y: e.clientY })
    }
  }
  // 设置 displayName
  MouseHOC.displayName = `WithMouse${getDisplayName(WrapedComponent)}`

  return MouseHOC
}
function getDisplayName(WrapedComponent) {
  return WrapedComponent.displayName || WrapedComponent.name || 'Component'
}
function Position(props) {
  return (
    <>
      <p>鼠标位置：{props.x}, {props.y}</p>
    </>
  )
}
function Cat(props) {
  return (
    <>
      <img src={props.img} style={{ position: 'fixed', left: props.x + 1, top: props.y + 1 }}></img>
    </>
  )
}
const MousePosition = withMouse(Position)
const MouseCat = withMouse(Cat)
class HeightOrderCom extends React.Component {
  state = { show: false }
  render() {
    return (
      <>
        {this.state.show && (
          <>
            <MousePosition></MousePosition>
            <MouseCat img={imgCat}></MouseCat>
            <br></br>
          </>
        )}
        <button onClick={() => { this.setState({ show: !this.state.show }) }}>{this.state.show ? '隐藏' : '显示'}</button>
      </>
    )
  }
}
ReactDOM.createRoot(document.getElementById('heigherOrderCom')).render(<HeightOrderCom></HeightOrderCom>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
