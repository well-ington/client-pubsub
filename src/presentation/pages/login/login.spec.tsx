import React from 'react'
import { Login } from '@/presentation/pages'
import faker from 'faker'
import { Route, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import 'jest-localstorage-mock'

import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'


type SutTypes = {
  sut: RenderResult,
  authenticationSpy: AuthenticationSpy,
  history: any
}

type SutParams = {
  validationError: string
}



const makeSut = (params?: SutParams): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/login']})
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(  
    <Router history={history}>
      <Route path="/login" component={() => <Login validation={validationStub} authentication={authenticationSpy} />} />
    </Router>
  )
  return {
    sut,
    authenticationSpy,
    history
  }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)  
  const submitButton = sut.getByTestId('sub-button') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')    
  fireEvent.input(emailInput, {target: { value: email }})
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.email()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, {target: { value: password }})
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const status = sut.getByTestId(`${fieldName}-status`)
    expect(status.title).toEqual(validationError || 'No problem!')
    expect(status.textContent).toEqual(validationError ? '🔴' : '🟢')
}



describe('Login Component', () => {
  afterEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')    
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('sub-button') as HTMLButtonElement
    expect(submitButton.disabled).toEqual(true)
    
    simulateStatusForField(sut, 'email', validationError)
    simulateStatusForField(sut, 'password', validationError)  
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({validationError})    
    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password', validationError) 
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password') 
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    simulateStatusForField(sut, 'email') 
  })

   test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)   
    const submitButton = sut.getByTestId('sub-button') as HTMLButtonElement
    expect(submitButton.disabled).toEqual(false)

  })

  test('Should show loading on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toEqual(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({validationError})  
    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toEqual(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    simulateValidSubmit(sut)
    const errorWrap = sut.getByTestId('error-wrap') 
    await waitFor(() => errorWrap)
    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toEqual(error.message)
    expect(errorWrap.childElementCount).toBe(1) 
  })

  test('Should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy, history } = makeSut()
    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.length).toEqual(1)
    expect(history.location.pathname).toEqual('/')
  })

  test('Should go to signup page', () => {
    const { sut, history } = makeSut()
    simulateValidSubmit(sut)
    const register = sut.getByTestId('signup')
    fireEvent.click(register)
    expect(history.location.pathname).toEqual('/signup')
  })
  
})