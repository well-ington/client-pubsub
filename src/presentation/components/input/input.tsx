import React, { useContext } from 'react'
import Context from '@/presentation/context/form/form-content'
import Styles from './input-styles.scss'

type TProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<TProps> = (props: TProps) => {
  
  //getting parent state from react context hook
  const {state, setState} = useContext(Context)  

  const error = state[`${props.name}Error`]
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void  => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void  => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const getStatus = () => {
    return error ? `🔴` : '🟢'
  }

  const getTitle = () => {
    return error ? error : 'No problem!'
  }

  return <div className={Styles.inputWrap}>
          <input data-testid={props.name} {...props} readOnly onFocus={enableInput} onChange={handleChange} />
          <span data-testid={`${props.type}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
        </div>
}

export default Input