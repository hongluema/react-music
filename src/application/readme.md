## 项目核心功能
### Recommend 推荐模块，是Home的子组件
    - store目录是redux数据层的东西
        - actionCreators.js 放不同action的地方
        - constants.js 常量集合，存放不同的 action 的 type 的值
        - index.js 用来导出 reducer，action
        - reducer.js 存放 initialState 和 reducer 函数

## 数据层的开发（案例是参考：歌手List开发） 包括
    - axios请求处理
        + 在 src/api/request.js 中编写 axios请求
    - redux层开发
        + 在组件内部创建 store文件夹
        + store目录是redux数据层的东西
            - actionCreators.js 放不同action的地方
            - constants.js 常量集合，存放不同的 action 的 type 的值
            - index.js 用来导出 reducer，action
            - reducer.js 存放 initialState 和 reducer 函数
        1. 声明初始化 state: 初始化 state 在reducer 中进行
        2. 定义 constants
        3. 定义 reducer 函数
        4. 编写具体的 action
        5. 将相关变量导出

    - 组件连接Redux
        + 需要将写的 reducer 注册到全局 store 中，在 src/store/reducer.js 中
        + 在组件当中连接redux mapStateToProps 、mapDispatchToProps、connect
