import * as socketActions from './state/actions/socket'
import { SERVER_UPDATE_OFF } from './state/actions'

export default function reducer(serverUpdate = false, action) {
  if (action.type === SERVER_UPDATE_OFF) {
    return false
  }

  return Object.keys(socketActions).includes(action.type.split('serverToClient/')[1])
}