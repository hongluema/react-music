import React, { useState, useRef, useEffect, useCallback } from 'react'
import { CSSTransition } from "react-transition-group";
import Header from '../../baseUI/header';
import Scroll from "../../baseUI/scroll/index";
import SongsList from "../SongsList";
import './style.scss'

function Singer(props) {
    const [showStatus, setShowStatus] = useState(true);

    const collectButton = useRef();
    const imageWrapper = useRef();
    const songScrollWrapper = useRef();
    const songScroll = useRef();
    const header = useRef();
    const layer = useRef();

    // 图片初始高度
    const initialHeight = useRef(0);

    // 往上偏移的尺寸，露出圆角
    const OFFSET = 5;

    useEffect(() => {
        let h = imageWrapper.current.offsetHeight;
        songScrollWrapper.current.style.top = `${h - OFFSET} px`;
        initialHeight.current = h;
        // 把遮罩先放在下面，以裹住歌曲列表
        layer.current.style.top = `${h - OFFSET} px`;
        songScroll.current.refresh();
        //eslint-disable-next-line
    }, []);

    const setShowStatusFalse = useCallback(() => {
        setShowStatus(false);
    }, []);

    // mock数据
    const artist = {
        picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
        name: "薛之谦",
        hotSongs: [
            {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            },
            {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            },
            // 省略 20 条
        ]
    }

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => props.history.goBack()}
        >
            <div className='singer-container'>
                <Header title={"头部"} ref={header} ></Header>
                <div className="img-wrapper" style={{ background: `url(${artist.picUrl})` }} ref={imageWrapper} >
                    <div className="filter"></div>
                </div>
                <div className="collect-button" ref={collectButton}>
                    <i className="iconfont">&#xe645;</i>
                    <span className="text"> 收藏 </span>
                </div>
                <div className="bg-layer" ref={layer} ></div>
                <div className="song-list-wrapper" ref={songScrollWrapper} >
                    <Scroll ref={songScroll}>
                        <SongsList
                            songs={artist.hotSongs}
                            showCollect={false}
                        ></SongsList>
                    </Scroll>
                </div>
            </div>
        </CSSTransition>
    )
}

export default React.memo(Singer)