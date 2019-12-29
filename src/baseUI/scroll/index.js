import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import LoadingV2 from '../loading-v2'
import Loading from '../loading'
import { debounce } from '../../api/utils'
import './style.scss'

const Scroll = forwardRef((props, ref) => {
    // better-scroll 实例对象, 初始默认为null
    const [bScroll, setBScroll] = useState(null);
    // current 指向初始化 better-scroll 实例需要的 DOM 元素
    const scrollContaninerRef = useRef();

    // 解构赋值拿到参数
    const { direction, click, refresh, bounceTop, bounceBottom, pullUpLoading, pullDownLoading } = props;
    // 解构赋值拿到函数
    const { pullUp, pullDown, onScroll } = props;

    // 将上拉加载逻辑和下拉刷新逻辑给做成防抖的, 利用的写的 debounce 函数
    // 利用useMomo的浅对比优化性能
    // 千万注意，这里不能省略依赖，也就是 useMemo 的第二个参数
    // 不然拿到的始终是第一次 pullUp 函数的引用，相应的闭包作用域变量都是第一次的，产生闭包陷阱。下同。
    let pullUpDebounce = useMemo(() => {
        return debounce(pullUp, 1000)
    }, [pullUp])

    let pullDownDebounce = useMemo(() => {
        return debounce(pullDown, 1000)
    }, [pullDown])

    // 创建better-scroll, 第二个参数是 [] 代表的就是当组件将被销毁时才进行解绑，这也就实现了componentWillUnmount的生命周期函数 
    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === 'horizental',
            scrollY: direction === 'vertical',
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        });
        setBScroll(scroll);
        return () => {
            setBScroll(null)
        }
    }, [])

    // 每次渲染都要刷新实例，防止无法滑动
    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    })

    // 给实例绑定 scroll 事件
    useEffect(() => {
        // 如果 better-scroll 实例对象不存在或者没有 onScroll事件 就直接返回
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', (scroll) => {
            // console.log('scroll:', scroll)
            onScroll(scroll)
        })
        return () => {
            bScroll.off('scroll');
        }
    }, [onScroll, bScroll])

    // 进行上拉到底的判断，调用上拉刷新的函数
    useEffect(() => {
        // 如果 better-scroll 实例对象不存在或者没有上拉刷新函数就直接返回
        if (!bScroll || !pullUp) return;
        bScroll.on('scrollEnd', () => {
            // 判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                // pullUp() // 这个是不防抖的上拉加载逻辑
                // pullUpDebounce 是防抖的上拉加载逻辑
                pullUpDebounce()
            }
        });
        return () => {
            bScroll.off('scrollEnd')
        }
    }, [pullUp, bScroll])

    // 进行下拉的判断，调用下拉刷新的函数
    useEffect(() => {
        // 如果 better-scroll 实例对象不存在或者没有下拉刷新函数就直接返回
        if (!bScroll || !pullDown) return;
        bScroll.on('touchEnd', (pos) => {
            // 判断用户的下拉动作
            if (pos.y > 50) {
                // pullDown() // 这个是不防抖的下拉刷新逻辑
                // pullDownDebounce 是防抖的下拉刷新逻辑
                pullDownDebounce()
            }
        });
        return () => {
            bScroll.off('touchEnd')
        }
    }, [pullDown, bScroll])

    // 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
    useImperativeHandle(ref, () => ({
        // 给外界暴露 refresh 方法
        refresh() {
            if (bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0);
            }
        },
        // 给外界暴露 getBScroll 方法，提供 bs 实例
        getBScroll() {
            if (bScroll) {
                return bScroll;
            }
        }
    }));

    // 如果 pullUpLoading 或者 pullDownLoading 为true 就是使用默认样式, 否则就是将元素隐藏
    // style.display = ""；是清除display样式，display将使用默认值（块元素会变成block，内联元素会变成inline）style.display="none"； 中“none”是一个值，表示元素将隐藏。
    const PullUpdisplayStyle = pullUpLoading ? { display: "" } : { display: "none" }
    const PullDowndisplayStyle = pullDownLoading ? { display: "" } : { display: "none" }

    return (
        <div className="scroll-wrapper" ref={scrollContaninerRef}>
            {props.children}
            {/* 滑到底部加载动画 */}
            <div className="pull-up-loading" style={PullUpdisplayStyle}>
                <Loading></Loading>
            </div>
            {/* 顶部下拉刷新动画 */}
            <div className="pull-down-loading" style={PullDowndisplayStyle}>
                <LoadingV2></LoadingV2>
            </div>
        </div>
    )

})

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']), // 滚动方向
    click: PropTypes.bool, // 是否支持点击
    refresh: PropTypes.bool, // 是否刷新
    onScroll: PropTypes.func, // 滑动触发的回调函数
    pullUp: PropTypes.func, // 上拉加载逻辑
    pullDown: PropTypes.func, // 下拉加载逻辑
    pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
    pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
    bounceTop: PropTypes.bool, // 当滚动超过上边缘的时候会有一小段回弹动画 | 是否支持向上吸顶
    bounceBottom: PropTypes.bool // 当滚动超过下边缘的时候会有一小段回弹动画 | 是否支持向下吸底
}

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
}

export default Scroll;