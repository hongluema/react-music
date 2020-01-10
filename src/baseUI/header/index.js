import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './style.scss'

// 处理函数组件拿不到 ref 的问题，所以用 forwardRef
const Header = React.forwardRef((props, ref) => {
    const { handleClick, title, isMarquess } = props;
    return (
        <div className="header-container" ref={ref}>
            {/* <i className="iconfont back" onClick={handleClick}>&#xe656;</i> */}
            <i className="iconfont back" onClick={() => props.history.goBack()}>&#xe656;</i>
            {
                isMarquess ? <marquee><h1>{title}</h1></marquee> : <h1>{title}</h1>
            }

        </div>
    )
})

Header.propTypes = {
    title: PropTypes.string,
    handleClick: PropTypes.func,
    isMarquess: PropTypes.bool
}

Header.defaultProps = {
    title: '标题',
    handleClick: () => { },
    isMarquess: false
}

export default memo(withRouter(Header))