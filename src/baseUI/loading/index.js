import React, { memo } from 'react'
import { PropTypes } from 'prop-types'
import './style.scss'

function Loading(props) {
    const { show } = props
    // style.display = ""；是清除display样式，display将使用默认值（块元素会变成block，内联元素会变成inline）style.display="none"； 中“none”是一个值，表示元素将隐藏。
    // show都是通过父组件传进来的，一般是进入加载，加载完数据之后会变为false
    const showStyle = show ? { display: "" } : { display: "none" }

    return (
        // 是否加载动画
        <div className="loading-wrapper" style={showStyle}>
            <div></div>
            <div></div>
        </div>
    );
}

Loading.propTypes = {
    show: PropTypes.bool // 是否显示加载动画
}

Loading.defaultProps = {
    show: true
}

export default React.memo(Loading);