import MoleculeNotification from '@s-ui/react-molecule-notification'
import {useEffect, useState} from 'react'
import DashboardService from './service'

const empty = {
  show: false,
  message: 'lorem fistrum'
}

const Dashboard = () => {
  const [notification, setNotification] = useState(empty)

  useEffect(() => {
    const service = new DashboardService('http://localhost:8001/feed')
    service.onMessage(event => {
      setNotification({show: true, message: event.fact})
    })
  })

  const onClose = () => {
    setNotification(empty)
  }
  return (
    <>
      <MoleculeNotification
        onClose={onClose}
        show={notification.show}
        type="info"
        autoClose="manual"
      >
        {notification.message}
      </MoleculeNotification>
    </>
  )
}

export default Dashboard
