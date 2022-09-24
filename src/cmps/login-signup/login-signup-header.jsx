import loginLogo from '../../assets/img/login-logo.svg'

export const LoginSignupHeader = () => {
    return (
        <header className='login-signup-header'>
            <div className='logo'>
                <img src={loginLogo} alt='logo' />
                Rello
            </div>
        </header>
    )
}