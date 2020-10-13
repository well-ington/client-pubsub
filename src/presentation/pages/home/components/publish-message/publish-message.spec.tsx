import React from 'react'
import { RenderResult, render, fireEvent } from '@testing-library/react'
import PublishMessage from './publish-message'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<PublishMessage />)  
  return {
    sut
  }
}


describe('Publish message component', () => {
  test('Should start with publish button disabled', () => {
    const {sut} = makeSut()    
    const publishButton = sut.getByTestId('publish-button') as HTMLButtonElement
    expect(publishButton.disabled).toEqual(true)
  })

  test('Publish button should be enabled if textarea is populated', () => {
    const {sut} = makeSut()
    const textarea = sut.getByTestId('publish-text')
    fireEvent.input(textarea, {target: { value: faker.random.words()}})
    const publishButton = sut.getByTestId('publish-button') as HTMLButtonElement
    expect(publishButton.disabled).toEqual(false)
    const clearButton = sut.getByTestId('clear-text')
    expect(clearButton)
  })

})