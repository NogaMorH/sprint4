import React from 'react'
import { Routes, Route } from 'react-router'

import './assets/styles/main.scss'

import routes from './routes'

export class RootCmp extends React.Component {

    render() {
        return (
            <div className='app'>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true}
                        element={route.component} path={route.path} />)}
                </Routes>
            </div>
        )
    }
}


