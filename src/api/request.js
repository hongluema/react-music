import { axiosInstance, categoryTypes } from './config'

// 获取 banner 图片
export const getBannerRequest = () => {
    return axiosInstance.get('/banner');
}

// 获取推荐歌单
export const getRecommendListRequest = () => {
    return axiosInstance.get('/personalized')
}

// 获取热门歌手数据
export const getHotSingerListRequest = (count) => {
    return axiosInstance.get(`/top/artists?offset=${count}`)
}

// 获取歌手分类列表
export const getSingerListRequest = (category, alpha, count) => {
    return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`)
}

// 获取所有榜单内容摘要
export const getRankListRequest = () => {
    return axiosInstance.get('/toplist/detail')
}

// 获取歌单详情
export const getAlbumDetailRequest = (id) => {
    return axiosInstance.get(`/playlist/detail?id=${id}`)
}