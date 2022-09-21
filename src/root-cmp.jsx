import React from 'react'
import { Routes, Route } from 'react-router'

import './assets/styles/main.scss'

import routes from './routes'

export class RootCmp extends React.Component {

    render() {
        return (
            <div className='app'>
                <Routes>
                    {routes.map(route => {
                        const nestedRoute = route.nestedRoute

                        return <Route key={route.path} exact={true}
                            element={route.component} path={route.path} >

                            {nestedRoute &&
                                <Route key={nestedRoute.path} exact={true}
                                    element={nestedRoute.component} path={nestedRoute.path} />
                            }
                        </Route>
                    })}
                </Routes>
            </div>
        )
    }
}


