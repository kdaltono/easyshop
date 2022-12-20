import { configureStore } from '@reduxjs/toolkit'
import rootreducer from './rootreducer'
const LOCAL_STORAGE_ITEM = "ssbstate"

class StateLoader {
    loadState() {
        try {
            let serializedState = localStorage.getItem(LOCAL_STORAGE_ITEM)
            if (serializedState === null) {
                return this.initializeState()
            }
            return JSON.parse(serializedState)
        } catch (err) {
            return this.initializeState()
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state)
            localStorage.setItem(LOCAL_STORAGE_ITEM, serializedState)
        } catch (err) {
            console.err("Couldn't save store state")
        }
    }

    initializeState() {
        return configureStore({
            reducer: rootreducer
        }).getState()
    }
}

export default StateLoader