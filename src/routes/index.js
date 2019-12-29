import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import Album from '../application/Album';
import Test from '../application/Test';

const setTitle = (title) => {
    document.title = title
};

export default [
    /* 详情页 Album 组件可以不使用绝对定位，而是放在和 '/' 路由平级的位置，但是要放在 '/' 前面,不然的话，会先匹配到'/'，并且要用精准匹配，不然会匹配到 '/' 的子路由里去，但是 '/' 不能用精准匹配，不然会没办法匹配子路由
    {
        path: '/recommend/:id',
        exact: true,
        component: Album,
    },
    */
    {
        path: '/test',
        component: Test,
        exact: true
    },
    {
        path: '/recommend/:id',
        component: Album,
        exact: true,
        // 可以往子路由里面塞参数，比如下面的meta
        meta: { title: '专辑详情' },
    },
    {
        path: '/rank/:id',
        component: Album,
        exact: true,
        meta: { title: '专辑详情' },
    },
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => (
                    <Redirect to={"/recommend"} />
                )
            },
            {
                path: '/recommend',
                component: Recommend,
                exact: true,
                // 可以往子路由里面塞参数，比如下面的meta
                // meta: { title: '网易云音乐' },
            },
            {
                path: '/singers',
                component: Singers,
                exact: true,
            },
            {
                path: '/rank',
                component: Rank,
                exact: true
            }
        ]
    }
]