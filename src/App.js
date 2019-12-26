import React from 'react';
import './style.css'
import './assets/iconfont/iconfont.css'
import routes from './routes/index'
import { renderRoutes } from 'react-router-config'; // renderRoutes 读取路由配置转化为 Route 标签
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          {renderRoutes(routes)}
        </Router>
      </Provider>
    </div>
  );
}

export default App;
