import { configureStore } from '@reduxjs/toolkit'
import rootreducer from './rootreducer'
const LOCAL_STORAGE_ITEM = "ssbstate"

class StateLoader {
    static _store

    loadState() {
        try {
            let serializedState = localStorage.getItem(LOCAL_STORAGE_ITEM)
            if (serializedState === null) {
                return StateLoader.initializeState()
            }
            return JSON.parse(serializedState)
        } catch (err) {
            return StateLoader.initializeState()
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

    static clearStore() {
        // This doesn't instantly update the screen like it probably should
        try {
            localStorage.setItem(LOCAL_STORAGE_ITEM, '')
            this._store = StateLoader.initializeState()
        } catch (err) {
            console.err("Couldn't clear stored state")
        }
    }

    static initializeState() {
        return configureStore({
            reducer: rootreducer
        }).getState()
    }
}

export default StateLoader