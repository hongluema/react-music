import React, { useState, useRef, memo, useEffect, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import Header from '../../baseUI/header'
import Scroll from '../../baseUI/scroll'
import { getCount, getName, isEmptyObject } from '../../api/utils'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import Loading from '../../baseUI/loading'
import './style.scss'

function Album(props) {
    const [showStatus, setShowStatus] = useState(true)
    const [title, setTitle] = useState("歌单")
    const [isMarquee, setIsMarquee] = useState(false) // 是否是跑马灯

    document.title = props.route.meta.title

    // 从路由中拿到歌单的 id
    const id = props.match.params.id;

    const { currentAlbum: currentAlbumImmutable, enterLoading } = props;
    const { getAlbumDataDispatch } = props;

    useEffect(() => {
        getAlbumDataDispatch(id);
    }, [getAlbumDataDispatch, id])

    let currentAlbum = currentAlbumImmutable.toJS()

    // 将传给子组件的函数用 useCallback 包裹，这也是 useCallback 的常用场景。
    const handleBack = useCallback(() => {
        setShowStatus(false);
    }, [])

    // 这么做是为了拿到子组件 Header 传递过来的ref， 需要在 Header 组件中加上 ref = {ref}, 不然只是Header传递上来，但是父组件接收不到
    // 利用的是 Header 组件 ref = {ref} 和 父组件 ref = {headerEl} 那么 ref === headerEl  也就是说可以直接拿到子元素的 dom 元素
    // 获取上传过来的真实dom元素用 headerEl.current
    // React.forwardRef 是将ref向上传递，也是需要给内部元素加上 ref={ref}
    const headerEl = useRef(null)
    console.log('ref:', headerEl)

    // 将传给子组件的函数用 useCallback 包裹，这也是 useCallback 的常用场景。
    const handleScroll = useCallback((pos) => {
        let minScrollY = -45;
        let percent = Math.abs(pos.y / minScrollY);
        let headerDom = headerEl.current;
        // 滑过顶部的高度开始变化
        if (pos.y < minScrollY) {
            headerDom.style.backgroundColor = '#d44439';
            headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
            setTitle(currentAlbum.name);
            setIsMarquee(true);
        } else {
            headerDom.style.backgroundColor = "";
            headerDom.style.opacity = 1;
            setTitle("歌单");
            setIsMarquee(false);
        }
    }, [currentAlbum]);



    const renderTopDesc = () => {
        return (
            <div className="album-top-desc" background={currentAlbum.coverImgUrl} style={{ background: `url(${currentAlbum.coverImgUrl})` }}>
                <div className="background">
                    <div className="filter"></div>
                </div>
                <div className="img-wrapper">
                    <div className="decorate"></div>
                    {/* <Lazyload placeholder={<img width='100%' height='100%' src={require('./music.png')} alt='music' />}> */}
                    <img src={currentAlbum.coverImgUrl + "?param=300x300"} alt="music" width="100%" height="100%" />
                    {/* </Lazyload> */}
                    <div className="play-count">
                        <i className="iconfont play">&#xe757;</i>
                        <span className="count">{getCount(currentAlbum.subscribedCount)}</span>
                    </div>
                </div>
                <div className="desc-wrapper">
                    <div className="title">{currentAlbum.name}</div>
                    <div className="person">
                        <div className="avatar">
                            <img src={currentAlbum.creator.avatarUrl} alt="" />
                        </div>
                        <div className="name">{currentAlbum.creator.nickname}</div>
                    </div>
                </div>
            </div>
        )
    }

    const renderMenu = () => {
        return (
            <div className="album-menu">
                <div>
                    <i className="iconfont">&#xe62f;</i>
                    评论
                </div>
                <div>
                    <i className="iconfont">&#xe73c;</i>
                    点赞
                </div>
                <div>
                    <i className="iconfont">&#xe645;</i>
                    收藏
                </div>
                <div>
                    <i className="iconfont">&#xe606;</i>
                    更多
                </div>
            </div>
        )
    }

    const renderSongList = () => {
        return (
            <div className='album-song-list'>
                <div className="first_line">
                    <div className="play_all">
                        <i className="iconfont">&#xe663;</i>
                        <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
                    </div>
                    <div className="add_list">
                        <i className="iconfont">&#xe645;</i>
                        <span > 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
                    </div>
                </div>
                <div className='album-song-list-item'>
                    {
                        currentAlbum.tracks.map((item, index) => {
                            return (
                                <li key={index}>
                                    <span className="index">{index + 1}</span>
                                    <div className="info">
                                        <span>{item.name}</span>
                                        <span>
                                            {getName(item.ar)} - {item.al.name}
                                        </span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </div>
            </div>
        )

    }

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames='fly'
            appear={true}
            unmountOnExit
            onExited={props.history.goBack}
        >
            <div className='album-container'>
                <Header title={"返回"} handleClick={handleBack} ref={headerEl} isMarquee={isMarquee} ></Header>
                {
                    !isEmptyObject(currentAlbum) ? (
                        <Scroll bounceTop={false} onScroll={handleScroll}>
                            <div>
                                {renderTopDesc()}
                                {renderMenu()}
                                {renderSongList()}
                            </div>
                        </Scroll>
                    ) : null
                }
                {enterLoading ? <Loading></Loading> : null}
            </div>

        </CSSTransition>
    )
}

const mapStateToProps = (state) => ({
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    enterLoading: state.getIn(['album', 'enterLoading'])
})
const mapDispatchToProps = (dispatch) => ({
    getAlbumDataDispatch: (id) => {
        dispatch(actionCreators.getAlbumList(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Album))