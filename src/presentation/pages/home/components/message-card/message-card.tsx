import React from 'react'
import { TsubscriptionMessage } from "@/domain/models"
import styles from './message-card-styles.scss'

type Props = {
  message: TsubscriptionMessage
}

const MessageCard: React.FC<Props> = ({message}) => {
  return <div className={styles.container}>
    <img className={styles.avatar} src={message.avatar} width={55} height={55} />
    <div className={styles.content}>
              <div className={styles.header}>
                <p>{message.name}</p>
                <p>{message.username}</p>
                <p>{message.date}</p>
              </div>
            <div className={styles.message}>
              <p>{message.content}</p>            
              <p style={{opacity: '0.2'}}>{message.level}</p>
            </div>            
    </div>
  </div>
}

export default MessageCard