const authTokenKey = 'AUTH_TOKEN'

export function setToken(authToken) {
    localStorage.setItem(authTokenKey, authToken)
    console.log('Set local storage to: ' + authToken)
}

export function getToken() {
    return localStorage.getItem(authTokenKey)
}

export function clearToken() {
    localStorage.setItem(authTokenKey, '')
}