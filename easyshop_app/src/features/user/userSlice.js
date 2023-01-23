import { createSlice } from '@reduxjs/toolkit'

// TODO: Split this up into multiple slices. Seems like this one is a bit complex

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        apiKey: '',
        loggedIn: false,
        user_id: '',
        full_name: '',
        first_name: '',
        last_name: ''
    },
    reducers: {
        clearValues: (state) => {
            console.log("Clearing values from Redux Store")
            state.apiKey = ''
            state.loggedIn = false
            state.user_id = ''
            state.full_name = ''
            state.first_name = ''
            state.last_name = ''
        },
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
        setLoggedInToTrue: (state) => {
            state.loggedIn = true
        },
        setLoggedInToFalse: (state) => {
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
        },
        getFirstName: (state) => {
            return state.first_name
        },
        setFirstName: (state, action) => {
            state.first_name = action.payload
        },
        getLastName: (state) => {
            return state.last_name
        },
        setLastName: (state, action) => {
            state.last_name = action.payload
        }
    }
})

export const { 
    clearKey, 
    setKey, 
    isLoggedIn, 
    setLoggedInToTrue, 
    setLoggedInToFalse, 
    getUserId, 
    setUserId, 
    getFullName, 
    setFullName ,
    getFirstName,
    setFirstName,
    getLastName,
    setLastName,
    clearValues
} = userSlice.actions

export default userSlice.reducer