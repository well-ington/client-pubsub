import React from 'react'
import Styles from './spinner-style.scss'

type THTMLProps = React.HTMLAttributes<HTMLElement> | React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>



const Spinner: React.FC<THTMLProps> = (props: THTMLProps) => {
  return <div {...props} data-testid="spinner" className={[Styles.spinner, props.className].join(' ')}><div></div><div></div><div></div></div>
}

export default Spinner;