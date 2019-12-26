import React, { useState, useRef, useEffect, memo } from 'react'
import Scroll from '../scroll'
import { PropTypes } from 'prop-types'
import './style.scss'

function Horizen(props) {

    const { list, oldVal, title } = props
    const { handleClick } = props

    // 加入声明
    const Category = useRef(null);

    // 加入初始化内容宽度的逻辑
    useEffect(() => {
        let categoryDOM = Category.current;
        let tagElems = categoryDOM.querySelectorAll("span");
        let totalWidth = 0;
        Array.from(tagElems).forEach(ele => {
            totalWidth += ele.offsetWidth;
        });
        categoryDOM.style.width = `${totalWidth}px`;
    }, []);

    return (
        <Scroll direction={'horizental'}>
            <div ref={Category}>
                <div className="horizen-item-list">
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            return (
                                <span className={`list-item ${oldVal === item.key ? 'selected' : ''}`} key={item.key} onClick={() => { handleClick(item.key) }}>
                                    {item.name}
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </Scroll>
    )
}

// 首先考虑接受的参数
// list 为接受的列表数据
// oldVal 为当前的 item 值
// title 为列表左边的标题
// handleClick 为点击不同的 item 执行的方法
Horizen.propTypes = {
    list: PropTypes.array,
    oldVal: PropTypes.string,
    title: PropTypes.string,
    handleClick: PropTypes.func
}

Horizen.defaultProps = {
    list: [],
    oldVal: '',
    title: '',
    handleClick: null
}

export default memo(Horizen)