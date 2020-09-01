import { auth } from '../firebase'

function login(userCallback) {
  auth.signInAnonymously()
  auth.onAuthStateChanged(userCallback)
}

export { login }
