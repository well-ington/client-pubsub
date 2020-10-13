import { RemoteAuthentication } from "@/data/usecases/authentication"
import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client"
import { Login } from "@/presentation/pages"
import { ValidationConstructor, ValidatorComposite } from "@/validation/validators"
import React from 'react'





export const LoginPage: React.FC = () => {
  const url = ''
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidatorComposite.build([
    ...ValidationConstructor.field('email').required().email().build(),
    ...ValidationConstructor.field('password').required().minLength(5).build()
  ])

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}