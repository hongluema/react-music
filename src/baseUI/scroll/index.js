import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import './style.scss'

const Scroll = forwardRef((props, ref) => {
    // better-scroll 实例对象, 初始默认为null
    const [bScroll, setBScroll] = useState(null);
    // current 指向初始化 better-scroll 实例需要的 DOM 元素
    const scrollContaninerRef = useRef();

    // 解构赋值拿到参数
    const { direction, click, refresh, bounceTop, bounceBottom } = props;
    console.log('refresh:', refresh)
    // 解构赋值拿到函数
    const { pullUp, pullDown, onScroll } = props;

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
                pullUp()
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
                pullDown()
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


    return (
        <div className="scroll-wrapper" ref={scrollContaninerRef}>
            {props.children}
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
    bounceTop: PropTypes.bool, // 当滚动超过上边缘的时候会有一小段回弹动画
    bounceBottom: PropTypes.bool // 当滚动超过下边缘的时候会有一小段回弹动画
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