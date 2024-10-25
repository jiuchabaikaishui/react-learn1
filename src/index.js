import React, { useState, useReducer, createContext, useContext, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PropTypes, { element, func, object } from 'prop-types'
import imgCat from './cat.png'
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  NavLink, 
  Outlet, 
  useNavigate, 
  useParams, 
  useSearchParams, 
  useLocation,
  useRoutes
} from 'react-router-dom'
import { Navigate } from 'react-router-dom';

import { Spin } from "antd";

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

class SetStateCom extends React.Component {
  state = { count: 0 }
  render() {
    console.log('-----render-----');
    return (
      <>
        <h4>setState() 是异步更新数据的</h4>
        <p>结果：{this.state.count}</p>
        <button onClick={this.clickHandle}>+1</button>
        <button onClick={this.clickHandleOne}>+1</button>
        <button onClick={this.clickHandleTwo}>+1</button>
      </>
    )
  }
  clickHandle = () => {
    this.setState({ count: this.state.count + 1 })
    console.log('count: ', this.state.count);
    this.setState({ count: this.state.count + 1 })
    console.log('count: ', this.state.count);
  }
  clickHandleOne = () => {
    this.setState((state, props) => {
      console.log('第一次 count: ', state.count);
      return { count: state.count + 1 }
    })
    this.setState((state, props) => {
      console.log('第二次 count: ', state.count);
      return { count: state.count + 1 }
    })
    console.log('count: ', this.state.count);
  }
  clickHandleTwo = () => {
    this.setState((state, props) => {
      return { count: state.count + 1 }
    }, () => {
      console.log('count: ', this.state.count);
    })
  }
}
ReactDOM.createRoot(document.getElementById('setStateCom')).render(<SetStateCom></SetStateCom>)

const eleJSX = <p style={{ color: 'red'}}>我是JSX元素</p>
const eleCreate = React.createElement('p', { style: { color: 'red' } }, '我是createElement元素')
console.log('JSX element: ', eleJSX);
console.log('createElement: ', eleCreate);
ReactDOM.createRoot(document.getElementById('transformJSX')).render((
  <>
    {eleJSX}
    {eleCreate}
  </>
))

// 组件更新机制
class UpdateCom extends React.Component {
  state = { color: 'skyblue'}
  render() {
    console.log('根组件 render');
    return (
      <div className='root' style={{ backgroundColor: this.state.color}}>
        <p>根组件</p>
        <button onClick={this.changeColor}>变色</button>
        <div className='rootContainer'>
          <LeftCom></LeftCom>
          <RightCom></RightCom>
        </div>
      </div>
    )
  }
  getColor = () => Math.floor(Math.random() * 256)
  changeColor = () => {
    this.setState({ color: `rgb(${this.getColor()}, ${this.getColor()}, ${this.getColor()})` })
  }
}
class LeftCom extends React.Component {
  state = { count: 0 }
  render() {
    console.log('左父组件 render');
    return (
      <div className='leftParent'>
        <p>左父组件 count: {this.state.count}</p>
        <button onClick={() => this.setState({count: this.state.count + 1})}>+1</button>
        <div className='leftParentContainer'>
          <LeftChildOne></LeftChildOne>
          <LeftChildTwo></LeftChildTwo>
        </div>
      </div>
    )
  }
}
class RightCom extends React.Component {
  state = { count: 0 }
  render() {
    console.log('右父组件 render');
    return (
      <div className='rightParent'>
        <p>右父组件 count: {this.state.count}</p>
        <button onClick={() => { this.setState({count: this.state.count + 1}) }}>+1</button>
        <div className='rightParentContainer'>
          <RightChildOne></RightChildOne>
          <RightChildTwo></RightChildTwo>
        </div>
      </div>
    )
  }
}
const LeftChildOne = () => {
  console.log('左子组件1 render');
   return (<div className='leftChildOne'>左子组件1</div>)
  }
const LeftChildTwo = () => { 
  console.log('左子组件2 render');
  return (<div className='leftChildTwo'>左子组件2</div>)
}
const RightChildOne = () => { 
  console.log('右子组件1 render');
  return (<div className='rightChildOne'>右子组件1</div>)
}
const RightChildTwo = () => {
  console.log('右子组件2 render');
  return (<div className='rightChildTwo'>右子组件2</div>)
}
ReactDOM.createRoot(document.getElementById('updateCom')).render(<UpdateCom></UpdateCom>)

// 组件性能优化
class NumCom extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log('props: ', this.props, 'nextProps: ', nextProps);
    // 根据 props 数据是否变化，决定渲染
    return this.props.num !== nextProps.num
  }
  render() {
    console.log('NumCom render');
    return (<><p>随机数：{this.props.num}</p></>)
  }
}
class RefreshCom extends React.Component {
  state = { num: 1 }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('state: ', this.state, 'nextState: ', nextState);
    // 根据 state 数据是否变化，决定渲染
    return this.state.num !== nextState.num
  }
  render() {
    console.log('RefreshCom render');
    return (
      <>
        <h4>避免不必要的重新渲染</h4>
        <NumCom num={this.state.num}></NumCom>
        <button onClick={() => this.setState({ num: Math.ceil(Math.random()*3)})}>生成随机数</button>
      </>
    )
  }
}

// 纯组件
class PureNum extends React.PureComponent {
  render() {
    console.log('PureNum render');
    return (<><p>随机数：{this.props.num}</p></>)
  }
}
class PureObjNum extends React.PureComponent {
  render() {
    console.log('PureObjNum render');
    return (<><p>随机数：{this.props.numObj.num}</p></>)
  }
}
class PureCom extends React.PureComponent {
  state = {
    num: 1,
    numObj: { num: 1 }
  }
  render() {
    console.log('PureCom render');
    return (
      <>
        <h4>纯组件</h4>
        <PureNum num={this.state.num}></PureNum>
        <button onClick={this.handle}>生成随机数</button>
        <PureObjNum numObj={this.state.numObj}></PureObjNum>
        <button onClick={this.handleOne}>生成随机数对象(修改原对象)</button> <br></br>
        <button onClick={this.handleTwo}>生成随机数对象（创建新对象）</button>
      </>
    )
  }
  handle = () => {
    const number = Math.ceil(Math.random()*3)
    console.log('num: ', this.state.num, ', new num: ', number);
    this.setState({ num: number })
  }
  handleOne = () => {
    // 修改原对象，错误，因为不会刷新
    const number = Math.ceil(Math.random()*3)
    console.log('num: ', this.state.numObj.num, ', new num: ', number);
    const obj = this.state.numObj
    obj.num = number
    this.setState({ numObj: obj})
  }
  handleTwo = () => {
    // 创建新对象，正确，但是也得判断，否则每次都会刷新
    const number = Math.ceil(Math.random()*3)
    console.log('num: ', this.state.numObj.num, ', new num: ', number);
    if (number !== this.state.numObj.num) {
      const obj = {...this.state.numObj, num: number}
      this.setState({ numObj: obj})
    }
  }
}
const optimize = (
  <>
    <RefreshCom></RefreshCom>
    <PureCom></PureCom>
  </>
)
ReactDOM.createRoot(document.getElementById('optimizeCom')).render(optimize)

// React 路由基础
// 使用步骤
const Home = () => (<p>首页</p>)
const First = () => (<p>页面一</p>)
const Second = () => (<p>页面二</p>)
const NotFound = () => (<p>没有发现该内容</p>)

const RouterStep = () => {
  return (
    <>
      <Router>
        <p>Link</p>
        <Link to='/home'>首页</Link>
        <Link to='/first'>页面一</Link> 
        <Link to='/second' replace={true}>页面二</Link>
        <Link to='/xxx'>NotFound</Link>
        <p>NavLink</p>
        <NavLink to='/first' style={({isActive}) => { return isActive ? { color: 'blue' } : {} }}>页面一</NavLink>
        <NavLink to='/second' className={({isActive}) => { return isActive ? 'selected smoll' : ''}}>页面二</NavLink>
        <Routes>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/first' element={<First></First>}></Route>
          <Route path='/second' element={<Second></Second>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
          </Routes>
      </Router>
    </>
  )
}
ReactDOM.createRoot(document.getElementById('routerStep')).render(<RouterStep></RouterStep>)

// 默认路由
const DefaultRoute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
      </Router>
    </>
  )
}
ReactDOM.createRoot(document.getElementById('defaultRoute')).render(<DefaultRoute></DefaultRoute>)

// 路由重定向
const RouteRedirect = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Navigate to='/home' replace></Navigate>}></Route> */}
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
      </Router>
    </>
  )
}
ReactDOM.createRoot(document.getElementById('routeRedirect')).render(<RouteRedirect></RouteRedirect>)

// 匹配模式
const MatchMode = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={<Home></Home>}></Route>
        </Routes>
      </Router>
    </>
  )
}
ReactDOM.createRoot(document.getElementById('matchMode')).render(<MatchMode></MatchMode>)

// 路由懒加载
// 高阶组件
const withLoading = (WrapedComponent) => {
  class LoadingCom extends React.Component {
    render() {
      return (<React.Suspense fallback={<Spin></Spin>}><WrapedComponent {...this.props}></WrapedComponent></React.Suspense>)
    }
  }
  LoadingCom.displayName = `WithLoading${getDisplayName(WrapedComponent)}`
  return LoadingCom
}

// render-props 
function FuncLoading(props) {
  return (
    <React.Suspense fallback={<Spin></Spin>}>
      {props.children}
    </React.Suspense>
  )
}
const RouteLazy = () => {
  const LazyOne = React.lazy(() => import('./LazyOne'))
  const LazyTwo = React.lazy(() => import('./LazyTwo'))
  const LazyThree = React.lazy(() => import('./LazyThree'))
  const LoadingOne = withLoading(LazyTwo)
  return (
    <>
      <React.Suspense fallback={<Spin></Spin>}>
        <Router>
          <div>
            <Link to='/lazyOne'>懒加载一</Link>
            <Link to='/loadingOne'>懒加载二优化</Link>
            <Link to='/loadingTwo'>懒加载三优化</Link>
          </div>
          <Routes>
            <Route path='/lazyOne' element={<LazyOne></LazyOne>}></Route>
            <Route path='/loadingOne' element={<LoadingOne></LoadingOne>}></Route>
            <Route path='/loadingTwo' element={<FuncLoading><LazyThree></LazyThree></FuncLoading>}></Route>
            <Route path='*' element={<NotFound></NotFound>}></Route>
          </Routes>
        </Router>
      </React.Suspense>
    </>
  )
}
ReactDOM.createRoot(document.getElementById('routeLazy')).render(<RouteLazy></RouteLazy>)

// 路由嵌套
const ContentOne = () => { return (<p>内容一</p>) }
const ContentTwo = () => { return (<p>内容二</p>) }
const ContentThree = () => { return (<p>内容三</p>) }
const NoContent = () => { return (<p>没有内容</p>) }
// 主体结构组件
const MainBody = () => {
  return (
    <div className='mainBody'>
      {/* 头部区域 */}
      <div className='top'>
        路由嵌套
        <Consumer>
          {(data) => <button onClick={data.logout}>退出</button>}
        </Consumer>
      </div>

      {/* 左边栏区域 */}
      <div className='leftAside'>
        左边栏
        <ul>
          <li><Link to='/'>内容一</Link></li>
          <li><Link to='/two'>内容二</Link></li>
          <li><Link to='/three'>内容三</Link></li>
        </ul>
      </div>

      {/* 内容区域 */}
      <div className='content'>
        内容
        <Outlet></Outlet>
      </div>

      {/* 底部区域 */}
      <div className='bottom'>底部区域</div>
    </div>
  )
}
// 登录组件
const Login = () => {
  return (
    <Consumer>
      {(data) => <button onClick={data.login}>登录</button>}
    </Consumer>
  )
}
class RouteNest extends React.Component {
  state = { isLogin: false }
  render() {
    const main = <Provider value={{ logout: () => this.setState({ isLogin: false }) }}><MainBody></MainBody></Provider>
    const login = <Provider value={{ login: () => this.setState({ isLogin: true }) }}><Login></Login></Provider>
    const first = (<>{this.state.isLogin ? main : login}</>)
    return (
      <Router>
        <Routes>
          {/* 父路由（默认） */}
          <Route path='/' element={first}>
            {/* 子路由 */}
            {/* 默认子路由 */}
            {/* <Route path='/' element={<ContentOne></ContentOne>}></Route> */}
            <Route index element={<ContentOne></ContentOne>}></Route>
            <Route path='/two' element={<ContentTwo></ContentTwo>}></Route>
            <Route path='/three' element={<ContentThree></ContentThree>}></Route>
          </Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
      </Router>
    )
  }
}
ReactDOM.createRoot(document.getElementById('routeNest')).render(<RouteNest></RouteNest>)

// 函数式导航
function withRouter(WrapedComponent) {
  function ComponentWithRouter(props) {
    const navigate = useNavigate()
    return <WrapedComponent {...props} router={navigate}></WrapedComponent>
  }
  ComponentWithRouter.displayName = `WithRouter${getDisplayName(WrapedComponent)}`

  return ComponentWithRouter
}

function Red() { return (<div style={{ backgroundColor: 'red', width: '100px', height: '100px' }}></div>) }
function Green() { return (<div style={{ backgroundColor: 'green', width: '100px', height: '100px' }}></div>) }
// 类组件
class ClassComponent extends React.Component {
  render() { return (<>
    <p>类组件</p>
    <button onClick={() => this.props.router('/red')}>红</button>
    <button onClick={() => this.props.router('/green', { replace: true, state: { data: '数据' }})}>绿</button>
    <button onClick={() => this.props.router(-1)}>返回</button>
  </>) }
}
// 函数组件
function FuncComponent() {
  const navigate = useNavigate()
  return (<>
    <p>函数组件</p>
    <button onClick={() => navigate('/red')}>红</button>
    <button onClick={() => navigate('/green', { replace: true, state: { data: '数据' }})}>绿</button>
    <button onClick={() => navigate(-1)}>返回</button>
  </>)
}
function FuncRoute(props) {
  const WithRouterCom = withRouter(ClassComponent)
  return (
    <Router>
      <WithRouterCom></WithRouterCom>
      <FuncComponent></FuncComponent>
      <Routes>
        <Route path='/red' element={<Red></Red>}></Route>
        <Route path='/green' element={<Green></Green>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </Router>
  )
}
ReactDOM.createRoot(document.getElementById('funcRoute')).render(<FuncRoute></FuncRoute>)

// 动态路径
function Detail() { 
  const params = useParams()
  let value = ''
  switch (params.id) {
    case '1':
      value = '一'
      break;
    case '2':
      value = '二'
      break
    default:
      break;
  }
  return (<p>详情{value}</p>) 
}
// search传参
function User() {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  console.log('params: ', params);
  return (<p>id: {params.id}, name: {params.name}, age: {params.age}</p>)
}
// state传参
function Content() {
  const { state } = useLocation()
  console.log('state: ', state);
  return (<p>{state.content}</p>)
}
function ParamsCom() {
  const navigate = useNavigate()
  return (<>
    <p>动态路径传参</p>
    <Link to='/detail/1'>详情一</Link>
    <button onClick={() => navigate('/detail/2')}>去详情二</button>
    <p>search传参</p>
    <Link to='/user?id=1&name=zhangsan&age=18'>用户一</Link>
    <button onClick={() => navigate('/user?id=2&name=lisi&age=19')}>去用户二</button>
    <p>state传参</p>
    <Link to='/content' state={{content: '这是内容一的内容'}}>内容一</Link>
    <button onClick={() => navigate('/content', {state: { content: '这是内容二的内容' } })}>去内容二</button>
  </>)
}
function RouteParams() {
  return (<Router>
    <ParamsCom></ParamsCom>
    <Routes>
      <Route path='/detail/:id' element={<Detail></Detail>}></Route>
      <Route path='/user' element={<User></User>}></Route>
      <Route path='/content' element={<Content></Content>}></Route>
      <Route path='*' element={<NotFound></NotFound>}></Route>
    </Routes>
  </Router>)
}
ReactDOM.createRoot(document.getElementById('routeParams')).render(<RouteParams></RouteParams>)

// 军事新闻组件
const Junshi = () => { return (<p>军事新闻</p>) }
// 财经新闻组件
const Caijin = () => { return (<p>财经新闻</p>) }
// 体验新闻组件
const Tiyu = () => { return (<p>体育新闻</p>) }
// 布局组件
const Layout = () => {
  return (
    <div className='mainBody'>
      {/* 头部区域 */}
      <div className='top'>useRoutes 配置化路由</div>

      {/* 左边栏区域 */}
      <div className='leftAside'>
        左边栏
        <ul>
          <li><Link to='/'>军事</Link></li>
          <li><Link to='/caijin'>财经</Link></li>
          <li><Link to='/tiyu'>体育</Link></li>
        </ul>
      </div>

      {/* 内容区域 */}
      <div className='content'>
        内容
        <Outlet></Outlet>
      </div>

      {/* 底部区域 */}
      <div className='bottom'>底部区域</div>
    </div>
  )
}
const routes = [
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <Junshi></Junshi>
      },
      {
        path: '/caijin',
        element: <Caijin></Caijin>
      },
      {
        path: '/tiyu',
        element: <Tiyu></Tiyu>
      }
    ]
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  }
]
function RouteCom() {
  console.log('RouteCom render');

  // return <Routes>
  //   <Route path='/' element={<Layout></Layout>}>
  //     <Route index element={<Junshi></Junshi>}></Route>
  //     <Route path='/caijin' element={<Caijin></Caijin>}></Route>
  //     <Route path='/tiyu' element={<Tiyu></Tiyu>}></Route>
  //   </Route>
  //   <Route path='*' element={<NotFound></NotFound>}></Route>
  // </Routes>
  
  return (<>{useRoutes(routes)}</>)
}
function ConfigRoute() {
  return (<Router><RouteCom></RouteCom></Router>)
}
ReactDOM.createRoot(document.getElementById('configRoute')).render(<ConfigRoute></ConfigRoute>)

class StateCom extends React.Component {
  state = { index: 0 }
  render() {
    return (<>
      <p>index: {this.state.index}</p>
      <button onClick={() => {
        this.setState({index: this.state.index + 1})
        setTimeout(() => {
          // 输出 1
          console.log('index: ', this.state.index);
        }, 2000);
      }}>+1</button>
    </>)
  }
}
function UseStateCom() {
  const [i, setIndex] = useState(0)
  return (<>
    <p>index: {i}</p>
    <button onClick={() => {
      setIndex(i + 1)
      setTimeout(() => {
        // 输出 0
        console.log('index: ', i);
      }, 2000);
    }}>+1</button>
  </>)
}
// useState Hook
function StateHook(props) {
  const [index, setIndex] = React.useState(0)
  return (<>
    <StateCom></StateCom>
    <p>index: {index}</p>
    <button onClick={() => {
      setIndex(index + 1)
      setIndex(index + 1)
      setIndex(i => i + 1)
      setIndex((i, p) => {
        // 不支持第二个参数 p
        console.log('i: ', i, 'p: ', p);
        return i + 1
        // 不支持 更新后的回调函数
      }, () => console.log('i: ', index))
    }}>+1</button>

    <p>类组件 延时读取 state</p>
    <StateCom></StateCom>
    <p>函数组件 延时读取 state</p>
    <UseStateCom></UseStateCom>
  </>)
}
ReactDOM.createRoot(document.getElementById('stateHook')).render(<StateHook name='张三'></StateHook>)


// reducer
function AddTask({onAddTask}) {
  const [ task, setTask ] = useState('')
  return <>
    <input placeholder='添加任务' value={task} onChange={(e) => setTask(e.target.value)}></input>
    <button style={{ marginLeft: '10px', marginBottom: '5px' }} onClick={() => {
      onAddTask(task)
      setTask('')
    }}>添加</button>
  </>
}
function TaskList({tasks, onChangeTask, onDeleteTask}) {
  return <>
    { tasks.map(t => {
      return <Task key={t.id} task={t} onChangeTask={onChangeTask} onDeleteTask={onDeleteTask}></Task>
    }) }
  </>
}
function Task({task, onChangeTask, onDeleteTask}) {
  const [ edit, setEdit ] = useState(false)
  const [ text, setText ] = useState(task.text)
  const [ done, setDone ] = useState(task.done)
  return <div>
    <input type='checkbox' checked={done} onChange={(e) => setDone(e.target.checked)}></input>
    <input style={{display: edit ? 'inline-block' : 'none'}} type='text' value={text} onChange={(e) => setText(e.target.value)} ></input>
    {edit ? null : text}
    <button style={{ marginLeft: '10px', marginBottom: '5px' }} onClick={() => {
      setEdit(!edit)
      if (edit) {
        onChangeTask({
          id: task.id,
          text: text,
          done: task.done
        })
      }
    }}>{edit ? '完成' : '编辑'}</button>
    <button style={{ marginLeft: '10px', marginBottom: '5px' }} onClick={() => {onDeleteTask(task.id)}}>删除</button>
  </div>
}
let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];
function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <>
      <h4>布拉格的行程安排（useState 版本）</h4>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
function TaskReducerApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

  function handleAddTask(text) {
    dispatch({
      type: 'add',
      id: nextId++,
      text: text
    })
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'change',
      task: task
    })
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'delete',
      id: taskId
    })
  }

  return (
    <>
      <h4>布拉格的行程安排（useReducer 版本）</h4>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'add':
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ]
    case 'change':
      return tasks.map((t) => t.id === action.id ? action.task : t)
    case 'delete':
      return tasks.filter((t) => t.id !== action.id)
  
    default:
      throw Error('未知错误：', action.type)
  }
}
const reducerHook = <>
  <TaskApp></TaskApp>
  <TaskReducerApp></TaskReducerApp>
</>
ReactDOM.createRoot(document.getElementById('reducerHook')).render(reducerHook)


// context
const LevelContext = createContext(1)

function Heading({ children }) {
  const level = useContext(LevelContext)
  switch (level) {
    case 1:
      return <h1>{children}</h1>
    case 2:
      return <h2>{children}</h2>
    case 3:
      return <h3>{children}</h3>
    case 4:
      return <h4>{children}</h4>
    case 5:
      return <h5>{children}</h5>
    case 6:
      return <h6>{children}</h6>
  
    default:
      throw Error('未知的 level：' + level);
  }
}

function Section({ level, children }) {
  console.log('children: ', children);
  
  return (
    <LevelContext.Provider value={level}>
      {children}
    </LevelContext.Provider>
  )
}

const contextHook = (
  <Section level={1}>
    <Heading>一</Heading>
    <Section level={2}>
      <Heading>二</Heading>
    </Section>
  </Section>
)
ReactDOM.createRoot(document.getElementById('contextHook')).render(contextHook)


// 使用 Reducer 和 Context 拓展应用
const TasksContext = createContext(null)
const TasksDispatchContext = createContext(null)
function TaskAppOne() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
      {/* …… */}
      ……
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}
const reducerAndContext = (
  <TaskAppOne></TaskAppOne>
)
ReactDOM.createRoot(document.getElementById('reducerAndContext')).render(reducerAndContext)


// ref 引用值
ReactDOM.createRoot(document.getElementById('refHook')).render((<div>……</div>))

// 使用 ref 操作 DOM
// 示例一：使文本输入框获得焦点
function RefFocus() {
  const inputRef = useRef(null)
  return (<>
    <input ref={inputRef}></input>
    <button onClick={ () => inputRef.current.focus() }>聚焦输入框</button>
  </>)
}
// 示例二：滚动至一个元素
function RefScroll() {
  const firstCatRef = useRef(null);
  const secondCatRef = useRef(null);
  const thirdCatRef = useRef(null);

  function handleScrollToFirstCat() {
    firstCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToSecondCat() {
    secondCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToThirdCat() {
    thirdCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  return (
    <>
      <nav>
        <button onClick={handleScrollToFirstCat}>
          Tom
        </button>
        <button onClick={handleScrollToSecondCat}>
          Maru
        </button>
        <button onClick={handleScrollToThirdCat}>
          Jellylorum
        </button>
      </nav>
      <div style={{ width: '400px', height: '200px', overflow: 'hidden' }}>
        <ul style={{ listStyle: 'none', width:'600px', height: '200px', margin: '0', padding: '0' }}>
          <li style={{ float: 'left' }}>
            <img
              src="https://img1.baidu.com/it/u=1499135876,4212770522&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200"
              alt="Tom"
              ref={firstCatRef}
            />
          </li>
          <li style={{ float: 'left' }}>
            <img
              src="https://i02piccdn.sogoucdn.com/01bbc07842904f63"
              alt="Maru"
              ref={secondCatRef}
            />
          </li>
          <li style={{ float: 'left' }}>
            <img
              src="https://img.woyaogexing.com/touxiang/fengjing/20131125/56e8975eb0720d66.jpg%21200X200.jpg"
              alt="Jellylorum"
              ref={thirdCatRef}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
const refDom = (<>
  <p>示例一：使文本输入框获得焦点</p>
  <RefFocus></RefFocus>
  <p>示例二：滚动至一个元素</p>
  <RefScroll></RefScroll>
</>)
ReactDOM.createRoot(document.getElementById('refDom')).render(refDom)

function VideoPlayer({ isPlaying, src }) {
  const videoRef = useRef(null)
  useEffect(() => {
    isPlaying ? videoRef.current.play() : videoRef.current.pause()
  }, [isPlaying])
  return (<div>
    <video style={{width:'400px', marginTop: '10px'}} ref={videoRef} src={src} muted loop playsInline></video>
  </div>)
}
function EffectUse() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [text, setText] = useState('')
  return (<>
    <input value={text} onChange={e => setText(e.target.value)}></input>
    <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '暂停' : '播放'}</button>
    <VideoPlayer isPlaying={isPlaying}
  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"></VideoPlayer>
  </>)
}
ReactDOM.createRoot(document.getElementById('effectUse')).render(<EffectUse></EffectUse>)

// 自定义 Hook
function useEffectEvent(callBack) {
  const ref = useRef(callBack);
  return ref.current
}
function useAnimationLoop(isRunning, drawFrame) {
  const event = useEffectEvent(drawFrame)
  useEffect(() => {
    if (isRunning) {
      let startTime = performance.now()
      let frameId = null
  
      // 动画循环
      function onFrame(now) {
        const timePassed = now - startTime;
        event(timePassed)
        frameId = requestAnimationFrame(onFrame)
      }
  
      // 开始动画
      function start() {
        event(0)
        startTime = performance.now()
        frameId = requestAnimationFrame(onFrame)
      }
  
      // 终止动画
      function stop() {
        cancelAnimationFrame(frameId)
        startTime = null
        frameId = null
      }
  
      start()
  
      return () => stop()
    }
  }, [isRunning])
}
function useFadeIn(ref, duration) {
  // 动画
  // useEffect(() => {
  //   const node = ref.current

  //   let startTime = performance.now()
  //   let frameId = null

  //   // 动画进度更新
  //   function onProgress(progress) {
  //     node.style.opacity = progress
  //   }

  //   // 动画循环
  //   function onFrame(now) {
  //     const timePassed = now - startTime;
  //     const progress = Math.min(timePassed/duration, 1)
  //     onProgress(progress)
  //     if (progress < 1) {
  //       frameId = requestAnimationFrame(onFrame)
  //     }
  //   }

  //   // 开始动画
  //   function start() {
  //     onProgress(0)
  //     startTime = performance.now()
  //     frameId = requestAnimationFrame(onFrame)
  //   }

  //   // 终止动画
  //   function stop() {
  //     cancelAnimationFrame(frameId)
  //     startTime = null
  //     frameId = null
  //   }

  //   start()

  //   return () => stop()
  // }, [duration])

  // 提取刷帧动画
  const [isRunning, setIsRunning] = useState(true)
  useAnimationLoop(isRunning, (timePassed) => {
    const progress = Math.min(timePassed/duration, 1)
    ref.current.style.opacity = progress
    if (progress == 1) {
      setIsRunning(false)
    }
  })
}
function Welcome() {
  const ref = useRef(null)

  // 原始 Effect 实现动画
  // useEffect(() => {
  //   const duration = 1000
  //   const node = ref.current

  //   let startTime = performance.now()
  //   let frameId = null

  //   // 动画进度更新
  //   function onProgress(progress) {
  //     node.style.opacity = progress
  //   }

  //   // 动画循环
  //   function onFrame(now) {
  //     const timePassed = now - startTime;
  //     const progress = Math.min(timePassed/duration, 1)
  //     onProgress(progress)
  //     if (progress <= 1) {
  //       frameId = requestAnimationFrame(onFrame)
  //     }
  //   }

  //   // 开始动画
  //   function start() {
  //     onProgress(0)
  //     startTime = performance.now()
  //     frameId = requestAnimationFrame(onFrame)
  //   }

  //   // 终止动画
  //   function stop() {
  //     cancelAnimationFrame(frameId)
  //     startTime = null
  //     frameId = null
  //   }

  //   start()

  //   return () => stop()
  // }, [])

  // 自定义 Hook useFadeIn 实现动画
  useFadeIn(ref, 2000)

  return (<>
    <h1 ref={ref} style={{width: '200px', height: '100px', textAlign: 'center', lineHeight: '100px', backgroundColor: 'red'}}>Welcome</h1>
  </>)
}
function CustomHook() {
  const [show, setShow] = useState(false)
  return (<>
    <p>案例——实现一个 fade-in 动画</p>
    <button onClick={() => setShow(!show)}>{show ? '隐藏' : '显示'}</button>
    {show && <Welcome></Welcome>}
  </>)
}
ReactDOM.createRoot(document.getElementById('customHook')).render(<CustomHook></CustomHook>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
