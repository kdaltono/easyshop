import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        apiKey: '',
        loggedIn: false
    },
    reducers: {
        clearKey: (state) => {
            state.apiKey = ''
        },
        setKey: (state, action) => {
            console.log("setKey(): setting key to: " + action.payload)
            state.apiKey = action.payload
        },
        isLoggedIn: (state) => {
            return state.loggedIn
        },
        setLoggedIn: (state) => {
            state.loggedIn = true
        },
        setLoggedOut: (state) => {
            state.loggedIn = false
        }
    }
})

export const { clearKey, setKey, isLoggedIn, setLoggedIn, setLoggedOut } = userSlice.actions
export default userSlice.reducer