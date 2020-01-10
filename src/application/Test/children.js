import React from 'react'
import { withRouter } from 'react-router-dom'

function Children(props) {

    console.log('props:', props)

    return (
        <div>
            {props.children}
        </div>
    )
}

export default React.memo(withRouter(Children))