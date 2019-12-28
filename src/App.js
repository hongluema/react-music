import React from 'react';
import './style.css'
import './assets/iconfont/iconfont.css'
import routes from './routes/index'
import { renderRoutes } from 'react-router-config'; // renderRoutes 读取路由配置转化为 Route 标签
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store'
import { Provider } from 'react-redux'
import { Data } from './application/Singers/data'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Data>
            {/* 切记，renderRoutes 方法传入参数为路由配置数组，我们在组件中调用这个方法后只能渲染一层路由，再深层的路由就无法渲染，只能在组件中继续配置 */}
            {/* 还有数组其实取的就是props.route里的一个属性，这个属性的名字取决于你配置的是 routes 还是 children */}
            {/* 这里是根路由，所以可以自己定义一个路由配置数组 */}
            {renderRoutes(routes)}
          </Data>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
