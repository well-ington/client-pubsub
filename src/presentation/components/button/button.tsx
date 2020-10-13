import React from 'react'
import styles from './button-styles.scss'

type Props = {
  variant: string
  title: string
  action: (event?) => void
  disabled?: boolean
  testid?: string
}
//primary, secondary, text
const Button: React.FC<Props> = ({variant, testid, title, action, disabled}: Props) => {
  return <button className={[styles[variant], styles.button, disabled ?  styles.disabled : ''].join(' ')} data-testid={testid} onClick={action} disabled={disabled}>{title}</button>
}

export default Button