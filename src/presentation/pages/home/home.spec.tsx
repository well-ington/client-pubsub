import React from 'react'
import { createMemoryHistory } from 'history'
import { render, RenderResult } from '@testing-library/react'
import { Home } from '..'
import { Route, Router } from 'react-router-dom'




type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/']})
  const sut = render(
    <Router history={history}>
      <Route path="/" component={Home} />
    </Router> 
  )
  return {
    sut
  }
}

describe('Home page', () => {
  test('Should render without error', () => {
    const { sut } = makeSut()
    const form = sut.getByTestId('publish-form')
    expect(form)
  });
});