import React from 'react'
import { Link } from 'react-router-dom'
import styles from './header-styles.scss'


const Header: React.FC = () => {
  return <header className={styles.container}>
    <div className={styles.title}>
        <p>
          Home
        </p>  
        <Link to="/login">Login</Link>         
    </div>
  </header>
}

export default Header