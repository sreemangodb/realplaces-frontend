import React from 'react'
import Login from '../../Components/Login/Login'
import Registration from '../../Components/Registration/Registration'

const LoginSignUp = ({login ,isLogin, setIsLogin}) => {
  return (
    <div>
        {
            login ? <Login isLogin={isLogin} setIsLogin={setIsLogin}/> : <Registration/>
        }
       
    </div>
  )
}

export default LoginSignUp