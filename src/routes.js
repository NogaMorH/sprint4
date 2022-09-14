import { Home } from './pages/home.jsx'

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