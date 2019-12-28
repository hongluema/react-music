import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom'
import '../../assets/iconfont/iconfont.css';
import './style.scss';

function Home(props) {

    const { route } = props;

    return (
        <div>
            <div className="top-wrapper">
                <span className='iconfont'>&#xe62a;</span>
                <span className="title">Web App</span>
                <span className="iconfont">&#xe611;</span>
            </div>
            <div className="tab-wrapper">
                {/* activeClassName 是 NavLink自带的属性 */}
                <NavLink to="/recommend" activeClassName="selected">
                    <div className="tab-item">
                        <span > 推荐 </span>
                    </div>
                </NavLink>
                <NavLink to="/singers" activeClassName="selected">
                    <div className="tab-item">
                        <span > 歌手 </span>
                    </div>
                </NavLink>
                <NavLink to="/rank" activeClassName="selected">
                    <div className="tab-item">
                        <span > 排行榜 </span>
                    </div>
                </NavLink>
            </div>
            {/* 切记，renderRoutes 方法传入参数为路由配置数组，我们在组件中调用这个方法后只能渲染一层路由，再深层的路由就无法渲染，只能在组件中继续配置 */}
            {/* 还有数组其实取的就是props.route里的一个属性，这个属性的名字取决于你配置的是 routes 还是 children */}
            {renderRoutes(route.routes)}
        </div>
    )
}

export default memo(Home)