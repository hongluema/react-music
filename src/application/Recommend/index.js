import React, { memo, useEffect } from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';
import { connect } from 'react-redux'
import { forceCheck } from 'react-lazyload';
import * as actionTypes from './store/actionCreators'
import { renderRoutes } from 'react-router-config'
import './style.scss'


function Recommend(props) {

    const { bannerList, recommendList, enterLoading } = props

    const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

    useEffect(() => {
        // 可能会有这样一个性能问题，之前进入页面发生过请求，拿到数据存在redux中了，但是因为切换tab会导致再次发送请求，这种时候一般情况下数据没有发生改变，不是个人信息那种接口的话，可以利用redux的数据来进行页面的缓存
        // 如果页面有数据，就不发送请求
        // immutabel 数据结构中长度属性是 size
        getBannerDataDispatch();
        getRecommendListDataDispatch();
        // if (!bannerList.size) {
        //     getBannerDataDispatch();
        // }
        // if (!recommendList.size) {
        //     getRecommendListDataDispatch();
        // }
    }, [])

    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : []

    // // mock 数据
    // const bannerList = [1, 2, 3, 4].map((item) => {
    //     return { imageUrl: 'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg' }
    // })

    // const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => {
    //     return {
    //         id: idx,
    //         picUrl: 'https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg',
    //         playCount: 17171122,
    //         name: '朴树、许巍、李健、郑钧、老狼、赵雷'
    //     }
    // });
    console.log('props:', props)
    return (
        <div className="recommend-content">
            <Scroll onScroll={forceCheck} >
                <div>
                    <Slider bannerList={bannerListJS}></Slider>
                    <RecommendList recommendList={recommendListJS}></RecommendList>
                </div>
            </Scroll>
            <Loading show={enterLoading}></Loading>
            {/* 切记，renderRoutes 方法传入参数为路由配置数组，我们在组件中调用这个方法后只能渲染一层路由，再深层的路由就无法渲染，只能在组件中继续配置 */}
            {/* 还有数组其实取的就是props.route里的一个属性，这个属性的名字取决于你配置的是 routes 还是 children */}
            {renderRoutes(props.route.children)}
        </div>
    )
}

// 映射 redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
    // 不要在这里将数据toJS
    // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn(['recommend', 'enterLoading'])
})

// 映射dispatch 到 props 上
const mapDispatchToProps = (dispatch) => ({
    getBannerDataDispatch: () => {
        dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch: () => {
        dispatch(actionTypes.getRecommendList())
    }
})

// 将 UI 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend))