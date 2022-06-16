import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import './index.css';
import { NavigationBar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { AddMeal } from './components/addmeal/addmeal';

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
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
  