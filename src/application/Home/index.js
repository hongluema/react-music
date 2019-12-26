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

            {renderRoutes(route.routes)}
        </div>
    )
}

export default memo(Home)