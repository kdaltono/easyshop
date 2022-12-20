import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        apiKey: '',
        loggedIn: false,
        user_id: '',
        full_name: ''
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
        },
        getUserId: (state) => {
            return state.user_id
        },
        setUserId: (state, action) => {
            state.user_id = action.payload
        },
        getFullName: (state) => {
            return state.full_name
        },
        setFullName: (state, action) => {
            state.full_name = action.payload
        }
    }
})

export const { 
    clearKey, 
    setKey, 
    isLoggedIn, 
    setLoggedIn, 
    setLoggedOut, 
    getUserId, 
    setUserId, 
    getFullName, 
    setFullName 
} = userSlice.actions

export default userSlice.reducer