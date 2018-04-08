import { SERVER_UPDATE_OFF } from './state/actions'

export function toggleOffServerUpdate() {
  return {
    type: SERVER_UPDATE_OFF,
  }
}