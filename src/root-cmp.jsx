import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'
import { AppHeader } from './cmps/app-header'

export class RootCmp extends React.Component {

    render() {
        return (
            <div className='app'>
                <AppHeader />
                <main>
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    </Routes>
                </main>
            </div>
        )
    }
}


