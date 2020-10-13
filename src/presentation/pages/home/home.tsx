import React, { useState } from 'react'
import faker from 'faker'
import { TsubscriptionMessage } from '@/domain/models/subscription-model'
import { Footer, Header, MessageCard, PublishMessage} from './components'
import styles from './home-styles.scss'

interface IsubscriptionResponse {
  
}

//dependecy to fetch for subscriptions
type Props = {
  getSubscription: () => Promise<void>
}


const fakeData = []

//generating fake data

for (let index = 0; index < 20; index++) {
  fakeData.push({
    name: faker.name.firstName(),
    content: faker.random.words(Math.floor(Math.random() * 20) + 4),
    date: (faker.date.recent()).toDateString(),
    username: faker.internet.userName(),
    avatar: faker.internet.avatar(),
    level: ['A','B','C','D'][Math.floor(Math.random() * 4)]
  })
}

type StateProps = {
  level: string
}

const Home: React.FC = () => {
  const [state, setState] = useState<StateProps>({
    level: ['A','B','C','D'][Math.floor(Math.random() * 4)]
  })
  
  const filtered = fakeData.filter((element) => element.level >= state.level)

  return <div className={styles.container}>
    <div className={styles.main}>
      <Header />
      <PublishMessage />
      <main className={styles.messages}>
        {
          filtered.map((message: TsubscriptionMessage, index) => {
            return <MessageCard key={`message${index}`} message={message} />
          })
        }
      </main>
      <Footer />
    </div>
  </div>
}

export default Home