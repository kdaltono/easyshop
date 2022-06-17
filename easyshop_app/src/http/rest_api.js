import axios from 'axios';

const url = 'http://127.0.0.1:3000/';

const noConn = Promise.resolve({ data: 'No connection to server', err: 'ERR' });

export async function getRestMessage() {
    try {
        return await axios.get(url);
    } catch (err) {
        console.error(err);
        return noConn;
    }
}

export async function getMealIngredients(mealId) {
    try {
        return await axios.get(`${url}m/${mealId}`)
    } catch (err) {
        console.error(err);
        return noConn;
    }
}

export async function insertMeal(mealData) {
    try {
        return await axios.post(`${url}m/`, { mealData: mealData });
    } catch (err) {
        console.error(err);
        return noConn;
    }
}

export async function getAllMeals() {
    try {
        return await axios.get(`${url}m/all`)
    } catch (err) {
        console.error(err);
        return noConn
    }
}