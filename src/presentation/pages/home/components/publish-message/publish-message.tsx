import Button from '@/presentation/components/button/button'
import React, { useState } from 'react'
import styles from './publish-message-styles.scss'

type StateProps = {
  message: string
}

const PublishMessage: React.FC = () => {
  const [state, setState] = useState<StateProps>({
    message: ''
  })

  const onChangeHandler = (value) => {
    setState({
      ...state,
      message: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return <form data-testid="publish-form" className={styles.container}>
    <textarea data-testid="publish-text" value={state.message} onChange={(e) => onChangeHandler(e.target.value)} placeholder="Tell us about your day!">
    </textarea>
    <div className={styles.action}>
      <Button testid="publish-button" title="Publish" disabled={state.message.length === 0} action={handleSubmit} variant="primary" />
      {state.message.length > 0 && <Button testid="clear-text" title="clear" action={() => setState({...state, message: ''})} variant="text" />}
    </div>    
  </form>
}

export default PublishMessage