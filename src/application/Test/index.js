import React, { useState } from 'react';
import Scroll from '../../baseUI/scroll'
import Children from './children'
// import './style.scss'
import './style.css'
import Loading from '../../baseUI/loading'
import LoadingV2 from '../../baseUI/loading-v2'

function Test(props) {

    console.log('屏幕的宽度和高度:', document.documentElement.clientWidth, '-', document.documentElement.clientHeight)
    console.log('body的宽度和高度:', document.body.clientWidth, '-', document.body.clientHeight)
    console.log('root的宽度和高度:', document.getElementById('root').clientWidth, '-', document.getElementById('root').clientHeight)

    const [page, setPage] = useState(0)

    const getUserList = (page) => {
        setPage(page)
    }

    return (
        <div className='test-wrapper'>

            <div className="wrapper">
                <div className="one">
                    one
                </div>
                <div className="three">
                    three
                </div>
                <div className="two">
                    two
                </div>

            </div>

            <Children name='test-children'>
                nihaoa
            </Children>
            <Scroll onScroll={() => { console.log('onscroll ...') }} pullDown={() => { console.log('pull down...') }} pullUp={() => { console.log('pull up...') }} pullUpLoading={true} pullDownLoading={true}>
                <div>
                    <div className="item">hello1</div>
                    <div className="item">hello2</div>
                    <div className="item">hello3</div>
                    <div className="item">hello4</div>
                    <div className="item">hello5</div>
                    <div className="item">hello6</div>
                    <div className="item">hello7</div>
                    <div className="item">hello8</div>
                    <div className="item">hello9</div>
                    <div className="item">hello10</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello</div>
                    <div className="item">hello91</div>
                    <div className="item">hello92</div>
                    <div className="item">hello93</div>
                    <div className="item">hello94</div>
                    <div className="item">hello95</div>
                    <div className="item">hello96</div>
                    <div className="item">hello97</div>
                    <div className="item">hello98</div>
                    <div className="item">hello99</div>
                    <div className="item">hello100</div>
                </div>
            </Scroll>
            {/* {true ? <Loading></Loading> : null}
            {true ? <LoadingV2></LoadingV2> : null} */}
        </div>
    )
}

export default Test