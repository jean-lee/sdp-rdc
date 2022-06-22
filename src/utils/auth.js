import Cookies from 'js-cookie'

let TokenKey = 'IamToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(key, token) {
  TokenKey = key 
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
