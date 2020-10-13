import React, { useEffect, useState } from 'react'
import { Input, FormStatus } from '@/presentation/components/'
import Context from '@/presentation/context/form/form-content'
import Styles from './login-styles.scss'
import { Link, useHistory } from 'react-router-dom'

type TLoginInjectedProps = {
  validation: any,
  authentication: any
}

const Login: React.FC<TLoginInjectedProps> = ({validation, authentication}) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',    
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({email: state.email, password: state.password})
      localStorage.setItem('accessToken', account.accessToken)
      history.replace('/')
    } catch(error) {
      
      setState({ 
        ...state, 
        isLoading: false,
        mainError: error.message
        })

    }   
  }

  return (    
    <div className={Styles.login}>
      <Context.Provider value={{state, setState}}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Type your e-mail" />
          <Input type="password" name="password" placeholder="Type your password" />
          <small><a href="#">Forgot your password?</a></small>
          <button data-testid="sub-button" disabled={!!(state.emailError || state.passwordError)} className={Styles.submit} type="submit">Enter</button>
          <Link to="/signup" data-testid="signup" className={Styles.registerLink}>Create a new account</Link> 
          <FormStatus />         
        </form>     
      </Context.Provider>
    </div>
  )
}

export default Login