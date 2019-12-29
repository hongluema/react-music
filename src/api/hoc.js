

const verify = (Comp) => {
    return class realComp extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                isLogin: '初始化',
            }
        }
        render() {
            if (this.state.isLogin === '初始化') {
                return null
            } else if ('未登陆') {
                return <Redirect to='/login' />
            }
            return <Comp {...this.props} />
        }
    }
}