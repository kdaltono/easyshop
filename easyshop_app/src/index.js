import React from 'react'
import { unstable_HistoryRouter as HistoryRouter, Routes, Route, Outlet } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import StateLoader from './features/user/stateloader'
import rootReducer from './features/user/rootreducer'
import { Provider } from 'react-redux'
import { useSelector } from "react-redux"

import history from './utils/history'
import './index.css';
import { NavigationBar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { AddMeal } from './components/addmeal/addmeal';
import { Meal } from './components/meal/meal'
import { MealViewerMain } from './components/meal/mealviewer/mealviewer'
import { MealList } from './components/meallist/meallist'
import { MealListViewerMain } from './components/meallist/meallistviewer/meallistviewer'
import { AddShoppingList } from './components/addshoppinglist/addshoppinglist'
import { PrintListMain } from './components/print/print'
import { LoginBase } from './components/login/login'
import { Register } from './components/register/register'
import { configureStore } from '@reduxjs/toolkit'
import { LoggedOut } from './components/login/loggedout/loggedout'

function Layout() {
    const loggedIn = useSelector((state) => state.user.loggedIn)

    return (
        <div>
            <NavigationBar 
                loggedIn={loggedIn}/>
            <Outlet />
        </div>
    )
}

function App() {
    const stateLoader = new StateLoader()

    StateLoader._store = configureStore({
        reducer: rootReducer,
        preloadedState: stateLoader.loadState()
    })

    StateLoader._store.subscribe(() => {
        console.log(JSON.stringify(StateLoader._state))
        stateLoader.saveState(StateLoader._store.getState())
    })

    return (
        <Provider store={StateLoader._store}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap" rel="stylesheet"/>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />}></Route>
                        <Route path="addmeal" element={<AddMeal />}></Route>
                        <Route path="meal" element={<Meal />}></Route>
                        <Route path="getmeal/*" element={<MealViewerMain />}></Route>
                        <Route path="lists" element={<MealList />}></Route>
                        <Route path="list/*" element={<MealListViewerMain />}></Route>
                        <Route path="addlist" element={<AddShoppingList />}></Route>
                        <Route path="print/*" element={<PrintListMain />}></Route>
                        <Route path="login" element={<LoginBase />}></Route>
                        <Route path="register" element={<Register />}></Route>
                        <Route path="loggedout" element={<LoggedOut />}></Route>
                    </Route>
                </Routes>
            </HistoryRouter>
        </Provider>
    )
}
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
  