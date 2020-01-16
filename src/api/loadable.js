import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../baseUI/loading'

export default (loader) => {
    return Loadable({
        loader: loader,
        loading: <Loading />
    })
}


