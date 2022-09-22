import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import './index.css';
import { NavigationBar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { AddMeal } from './components/addmeal/addmeal';
import { Meal } from './components/meal/meal'
import { MealViewerMain } from './components/meal/mealviewer/mealviewer'
import { MealList } from './components/meallist/meallist'
import { MealListViewerMain } from './components/meallist/meallistviewer/meallistviewer'
import { AddIngredients } from './components/addingredient/addingredient'
import { AddShoppingList } from './components/addshoppinglist/addshoppinglist'
import { PrintListMain } from './components/print/print'

function Layout() {
    return (
        <div>
            <NavigationBar />
            <Outlet />
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />}></Route>
                    <Route path="addmeal" element={<AddMeal />}></Route>
                    <Route path="meal" element={<Meal />}></Route>
                    <Route path="getmeal/*" element={<MealViewerMain />}></Route>
                    <Route path="lists" element={<MealList />}></Route>
                    <Route path="list/*" element={<MealListViewerMain />}></Route>
                    <Route path="addingr" element={<AddIngredients />}></Route>
                    <Route path="addlist" element={<AddShoppingList />}></Route>
                    <Route path="print/*" element={<PrintListMain />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
  