import { Home } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'

type Props = {
  LoginPage: React.FC
}

const Router: React.FC<Props> = ({ LoginPage }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router