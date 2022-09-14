import { Board } from './pages/board.jsx'
import { Home } from './pages/home.jsx'
import { LoginSignup } from './pages/login-signup.jsx'
import { TemplatePage } from './pages/template-page.jsx'
import { UserProfile } from './pages/user-profile.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <Home />,
    },
    {
        path: 'template',
        component: <TemplatePage />,
    },
    {
        path: 'board/:id',
        component: <Board />,
    },
    {
        path: 'login',
        component: <LoginSignup />,
    },
    {
        path: 'user/:id',
        component: <UserProfile />,
    }
]

export default routes