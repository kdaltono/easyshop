import axios from 'axios';

const url = 'http://127.0.0.1:3000/';

export const noConn = Promise.resolve({ data: 'No connection to server', error: 'ERR' });

export async function getRestMessage() {
    try {
        return await axios.get(url);
    } catch (err) {
        console.error(err);
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getMealIngredients(mealId) {
    try {
        return await axios.get(`${url}m/${mealId}`)
    } catch (err) {
        console.error(err);
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function insertMeal(mealData) {
    try {
        return await axios.post(`${url}m/`, { mealData: mealData });
    } catch (err) {
        console.error(err);
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getAllMeals() {
    try {
        return await axios.get(`${url}m/all`)
    } catch (err) {
        console.error(err);
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getAllIngredientCategories() {
    try {
        return await axios.get(`${url}ic/all`)
    } catch (err) {
        console.error(err);
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function getAllIngredients() {
    try {
        return await axios.get(`${url}i/all`)
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}

export async function insertMealIngredients(mealIngredientData) {
    try {
        return await axios.post(`${url}mi`, { mealIngredientData: mealIngredientData })
    } catch (err) {
        console.error(err)
        return {
            data: err.message,
            error: 'ERR'
        }
    }
}