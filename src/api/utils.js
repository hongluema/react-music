// 用来计算听过的人数
export const getCount = (count) => {
    if (count < 0) return;
    if (count < 10000) {
        return count;
    } else if (Math.floor(count / 10000) < 10000) {
        return Math.floor(count / 1000) / 10 + "万";
    } else {
        return Math.floor(count / 10000000) / 10 + "亿";
    }
}

// 防抖函数
export const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func(args)
            clearTimeout(timer)
        }, delay)
    }
}

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = rankList => {
    for (let i = 0; i < rankList.length - 1; i++) {
        if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
            return i + 1;
        }
    }
};

// 处理歌手列表拼接歌手名字
export const getName = list => {
    let str = "";
    list.map((item, index) => {
        str += index === 0 ? item.name : "/" + item.name;
        return item;
    });
    return str;
};

// 判断一个对象是否为空
/*
    写这个函数的原因：当页面进入 Ajax 请求还没有获取数据时，currentAlbum 的值为初始态 {}。直到数据异步加载完成，
    currentAlbum 才会改变，那么在这个过程中，通过 currentAlbum.creator 为 undefined，通过 current.creator.avatarUrl 取值自然会报错。
    这样的问题在日常开发中非常常见，那怎么避免这个问题？
    我们需要在渲染前做一个非空对象的判断。
*/
export const isEmptyObject = obj => !obj || Object.keys(obj).length === 0;