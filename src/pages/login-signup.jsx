// import * as React from 'react'
import { LoginSignupHeader } from '../cmps/login-signup/login-signup-header'
import { useState } from 'react'
import { Login } from '../cmps/login-signup/login'
import { SignUp } from '../cmps/login-signup/signup'

export const LoginSignup = () => {

    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className='login-signup-page'>
            <LoginSignupHeader />
            {isLogin
                ? <Login setIsLogin={setIsLogin} />
                : <SignUp setIsLogin={setIsLogin} />}
        </div>
    )
}